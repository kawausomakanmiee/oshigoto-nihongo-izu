'use strict';
// Conversation progress never writes to the vocabulary key or resets word records.
const lessonStorageKey = 'izu-conversations-v1';
const lessonAudience = 'international-staff';
const lessons = IzuLessons.lessons.filter(lesson => lesson.audience === lessonAudience && IzuLessons.audiences[lesson.audience]?.enabled);
let lessonProgress = {version: 1, completed: [], results: {}};
let lessonStorageMessage = '';
try {
  const stored = JSON.parse(localStorage.getItem(lessonStorageKey) || '{}') || {};
  lessonProgress.completed = [...new Set(Array.isArray(stored.completed)
    ? stored.completed.filter(id => lessons.some(lesson => lesson.id === id)) : [])];
  for (const lesson of lessons) {
    const result = stored.results?.[lesson.quiz.id];
    if (!result || !Number.isSafeInteger(result.attempts) || result.attempts < 1
      || !Number.isSafeInteger(result.correctCount) || result.correctCount < 0 || result.correctCount > result.attempts
      || !lesson.quiz.choices.some(choice => choice.id === result.lastChoiceId)) continue;
    lessonProgress.results[lesson.quiz.id] = {
      attempts: result.attempts, correctCount: result.correctCount, lastChoiceId: result.lastChoiceId
    };
  }
} catch {
  lessonStorageMessage = '会話の記録を読み込めませんでした。この回は新しく始めます。 / Catatan percakapan tidak dapat dibaca. Mulai sesi baru.';
}
let activeLesson = null;
let lessonChoices = [];
let lessonAnswer = null;
let lessonQuizOpen = false;
let lessonStep = 0;
let dialoguePage = 0;
let returnLesson = null;
function saveLessonProgress() {
  try {
    localStorage.setItem(lessonStorageKey, JSON.stringify(lessonProgress));
    lessonStorageMessage = '';
  } catch {
    lessonStorageMessage = '会話の記録を保存できません。この画面では練習を続けられます。 / Catatan percakapan tidak dapat disimpan. Anda tetap bisa berlatih di halaman ini.';
  }
}
function lessonTranslation(translations) {
  // Japanese is already displayed with ruby; Indonesian is supplementary.
  return state.lang === 'ja' ? '' : `<p class="muted" lang="${translations[state.lang] != null ? escapeHTML(state.lang) : 'ja'}">${translations[state.lang] != null ? escapeHTML(translations[state.lang]) : ruby(translations.ja)}</p>`;
}
function bilingual(translations, tag = 'p') {
  return `<${tag} lang="ja">${ruby(translations.ja)}</${tag}>${lessonTranslation(translations)}`;
}
function renderLessons() {
  $('lessonSummary').textContent = `${lessonProgress.completed.length} / ${lessons.length} 会話を完了 / Percakapan selesai`;
  $('lessonStorageStatus').textContent = lessonStorageMessage;
  $('lessonList').classList.toggle('hidden', !!activeLesson);
  $('lessonDetail').classList.toggle('hidden', !activeLesson);
  $('lessonReturn').classList.toggle('hidden', mode !== 'learn' || !returnLesson);
  $('lessonList').replaceChildren(...lessons.map((lesson, i) => {
    const button = document.createElement('button');
    button.className = 'lesson-tile';
    const result = lessonProgress.results[lesson.quiz.id];
    button.innerHTML = `<span class="pill">${i + 1} / ${lessons.length}</span>${bilingual(lesson.title, 'strong')}
      <span class="lesson-status">${lessonProgress.completed.includes(lesson.id) ? '✓ 完了 / Selesai' : '未完了 / Belum selesai'}${result ? ` · ${result.correctCount} / ${result.attempts} 回正解` : ''}</span>`;
    button.onclick = () => openLesson(lesson.id);
    return button;
  }));
  if (!activeLesson) return;
  $('lessonTitle').innerHTML = ruby(activeLesson.title.ja);
  $('lessonTitleId').textContent = state.lang === 'ja' ? '' : localize(activeLesson.title);
  $('lessonGoal').innerHTML = bilingual(activeLesson.goal);
  const shownLines = activeLesson.dialogue.slice(dialoguePage * 2, dialoguePage * 2 + 2);
  $('lessonDialogue').replaceChildren(...shownLines.map((line, i) => {
    const item = document.createElement('li');
    item.className = `dialogue-line speaker-${line.speaker}`;
    item.innerHTML = `<span class="speaker">${ruby(activeLesson.speakers[line.speaker].ja)}</span>
      <p class="sentence" lang="ja">${ruby(line.text)}</p>${lessonTranslation(line.translated)}`;
    const audio = document.createElement('button');
    audio.className = 'line-audio'; audio.textContent = '🔊 きく / Dengarkan';
    audio.setAttribute('aria-label', `${dialoguePage * 2 + i + 1}：${spoken(activeLesson.speakers[line.speaker].ja)}の音声`);
    const status = document.createElement('p');
    status.className = 'status line-status'; status.setAttribute('role', 'status');
    audio.onclick = () => speak(spoken(line.text), status);
    item.append(audio, status); return item;
  }));
  $('lessonPagePosition').textContent = `会話 ${dialoguePage + 1} / ${Math.ceil(activeLesson.dialogue.length / 2)}`;
  $('lessonPairPrev').disabled = dialoguePage === 0;
  $('lessonPractice').textContent = dialoguePage < Math.ceil(activeLesson.dialogue.length / 2) - 1 ? '次の会話へ →' : '返事を練習する →';
  $('lessonPhrase').innerHTML = bilingual(activeLesson.phrase);
  $('lessonVocab').replaceChildren(...activeLesson.vocabIds.map(id => {
    const word = vocab.find(v => v.id === id);
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = `${wordHTML(word)} <span>→ カード / Kartu</span>`;
    button.onclick = () => {
      returnLesson = activeLesson.id;
      $('course').value = 'all';
      index = vocab.findIndex(v => v.id === id);
      setMode('learn'); renderCard();
      $('word').scrollIntoView({block: 'center'});
      $('lessonReturn').focus();
    };
    const meaning = document.createElement('p');
    meaning.textContent = localize(word.meaning);
    meaning.lang = word.meaning[state.lang] != null ? state.lang : 'ja';
    item.append(button, meaning); return item;
  }));
  renderLessonQuiz();
  renderLessonStep();
}
function renderLessonStep() {
  $('lessonListen').classList.toggle('hidden', lessonStep !== 0);
  $('lessonQuiz').classList.toggle('hidden', lessonStep !== 1);
  $('lessonReviewStep').classList.toggle('hidden', lessonStep !== 2);
  for (const [i,id] of ['stepHear','stepAnswer','stepReview'].entries()) {
    $(id).classList.toggle('current-step', i === lessonStep);
    if (i === lessonStep) $(id).setAttribute('aria-current','step');
    else $(id).removeAttribute('aria-current');
  }
  $('lessonToReview').disabled = lessonAnswer !== activeLesson.quiz.answerId;
  $('lessonComplete').disabled = lessonProgress.completed.includes(activeLesson.id) || lessonAnswer !== activeLesson.quiz.answerId;
  $('lessonComplete').textContent = lessonProgress.completed.includes(activeLesson.id) ? '✓ 学習済み / Selesai' : '✓ このレッスンを完了する';
  $('lessonNext').classList.toggle('hidden', !lessonProgress.completed.includes(activeLesson.id) || lessons.indexOf(activeLesson) === lessons.length - 1);
}
function goLessonStep(step) {
  stopSpeech(); lessonStep = step;
  if (step === 1) lessonQuizOpen = true;
  renderLessons();
  $('lessonTitle').scrollIntoView({block:'start'});
}
function openLesson(id, preserve = false) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) return;
  if (!preserve || activeLesson?.id !== id) {
    activeLesson = lesson;
    lessonChoices = shuffled(lesson.quiz.choices);
    lessonAnswer = lessonProgress.results[lesson.quiz.id]?.lastChoiceId ?? null;
    lessonQuizOpen = false;
    lessonStep = 0;
    dialoguePage = 0;
    $('lessonCompleteStatus').textContent = '';
  }
  returnLesson = null;
  setMode('lessons'); renderLessons();
  $('lessonTitle').focus({preventScroll: true});
  $('lessonTitle').scrollIntoView({block: 'start'});
}
function renderLessonQuiz() {
  const quiz = activeLesson.quiz;
  const result = lessonProgress.results[quiz.id];
  // Step visibility is controlled by renderLessonStep().
  $('lessonQuizContext').innerHTML = bilingual(quiz.context);
  $('lessonQuizPrompt').innerHTML = bilingual(quiz.prompt);
  $('lessonResults').textContent = result ? `これまで ${result.attempts} 回回答・${result.correctCount} 回正解 / Jawaban benar: ${result.correctCount} dari ${result.attempts}` : 'まだ回答していません / Belum dijawab';
  $('lessonOptions').replaceChildren(...lessonChoices.map(choice => {
    const button = document.createElement('button');
    button.dataset.choice = choice.id;
    button.innerHTML = bilingual(choice.translated);
    button.disabled = lessonAnswer !== null;
    if (lessonAnswer !== null) {
      if (choice.id === quiz.answerId) button.classList.add('correct');
      else if (choice.id === lessonAnswer) button.classList.add('wrong');
    }
    button.onclick = () => {
      if (lessonAnswer !== null) return;
      lessonAnswer = choice.id;
      const previous = lessonProgress.results[quiz.id];
      lessonProgress.results[quiz.id] = {
        attempts: (previous?.attempts || 0) + 1,
        correctCount: (previous?.correctCount || 0) + Number(choice.id === quiz.answerId),
        lastChoiceId: choice.id
      };
      saveLessonProgress(); renderLessons();
      $('lessonFeedback').focus({preventScroll: true});
      $('lessonFeedback').scrollIntoView({block: 'start'});
    };
    return button;
  }));
  const selected = quiz.choices.find(choice => choice.id === lessonAnswer);
  $('lessonFeedback').classList.toggle('hidden', !selected);
  $('lessonRetry').classList.toggle('hidden', !selected);
  if (selected) {
    const correct = quiz.choices.find(choice => choice.id === quiz.answerId);
    $('lessonFeedback').innerHTML = `<strong>${lessonAnswer === quiz.answerId ? '✓ 正解 / Benar' : 'もう一度、考えましょう / Mari pikirkan lagi'}</strong>
      ${bilingual(selected.explanation)}<h4>${ruby('適切[てきせつ]な返事[へんじ] / Respons yang tepat')}</h4>${bilingual(correct.translated)}
      ${lessonAnswer === quiz.answerId ? '' : bilingual(correct.explanation)}`;
  }
  const completed = lessonProgress.completed.includes(activeLesson.id);
  $('lessonComplete').disabled = completed || lessonAnswer !== quiz.answerId;
  $('lessonComplete').textContent = completed ? '✓ この会話は完了 / Percakapan selesai' : '✓ この会話を完了する / Tandai selesai';
  $('lessonNext').classList.toggle('hidden', !completed || lessons.indexOf(activeLesson) === lessons.length - 1);
}
function renderHomeProgress() {
  $('homeProgress').textContent = `会話 ${lessonProgress.completed.length} / ${lessons.length} 完了 · 単語 ${state.learned.length} / ${vocab.length} 学習済み`;
}
$('homeLessons').onclick = () => { activeLesson = null; returnLesson = null; setMode('lessons'); renderLessons(); };
$('homeWords').onclick = () => { setMode('learn'); renderCard(); };
$('homeQuiz').onclick = () => startQuiz(false);
$('homeReview').onclick = () => { setMode('review'); renderSummary(); };
window.addEventListener('izumodechange', renderHomeProgress);
$('tabLessons').onclick = () => { activeLesson = null; returnLesson = null; setMode('lessons'); renderLessons(); };
$('lessonBack').onclick = () => { activeLesson = null; returnLesson = null; setMode('lessons'); renderLessons(); $('lessonList').querySelector('button')?.focus(); };
$('lessonPractice').onclick = () => {
  const total = Math.ceil(activeLesson.dialogue.length / 2);
  if (dialoguePage < total - 1) { stopSpeech(); dialoguePage++; renderLessons(); $('lessonTitle').scrollIntoView({block:'start'}); }
  else goLessonStep(1);
};
$('lessonPairPrev').onclick = () => { if(dialoguePage > 0) { stopSpeech(); dialoguePage--; renderLessons(); $('lessonTitle').scrollIntoView({block:'start'}); } };
$('lessonQuizBack').onclick = () => goLessonStep(0);
$('lessonToReview').onclick = () => { if (lessonAnswer === activeLesson.quiz.answerId) goLessonStep(2); };
$('lessonReviewBack').onclick = () => goLessonStep(1);
$('lessonRetry').onclick = () => { lessonAnswer = null; lessonChoices = shuffled(activeLesson.quiz.choices); renderLessonQuiz(); $('lessonQuizPrompt').focus({preventScroll: true}); $('lessonQuiz').scrollIntoView({block: 'start'}); };
$('lessonComplete').onclick = () => {
  if (lessonAnswer !== activeLesson.quiz.answerId || lessonProgress.completed.includes(activeLesson.id)) return;
  lessonProgress.completed.push(activeLesson.id);
  saveLessonProgress(); renderLessons(); $('lessonCompleteStatus').textContent = '会話を完了しました。 / Percakapan selesai.';
};
$('lessonNext').onclick = () => { const next = lessons[lessons.indexOf(activeLesson) + 1]; if (next) openLesson(next.id); };
$('lessonReturn').onclick = () => { if (returnLesson) openLesson(returnLesson, true); };
$('lessonReset').onclick = () => {
  if (!confirm('会話の学習記録だけを消去しますか？単語の記録は残ります。 / Hapus catatan percakapan saja? Catatan kosakata tetap disimpan.')) return;
  stopSpeech();
  lessonProgress = {version: 1, completed: [], results: {}};
  activeLesson = null; returnLesson = null; lessonAnswer = null;
  saveLessonProgress(); renderLessons();
};
window.addEventListener('izumodechange', () => {
  $('lessonReturn').classList.toggle('hidden', mode !== 'learn' || !returnLesson);
});
window.addEventListener('izulanguagechange', renderLessons);
setMode('home'); renderLessons(); renderHomeProgress();
