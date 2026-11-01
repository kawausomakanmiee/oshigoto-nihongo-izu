'use strict';
const {vocab, languages, courses: courseNames} = IzuData;
const $ = id => document.getElementById(id);
const storageKey = 'izu-japanese-beta-v1';
const validIds = new Set(vocab.map(v => v.id));
const cleanIds = values => [...new Set(Array.isArray(values) ? values.filter(id => validIds.has(id)) : [])];
let state = {learned: [], wrong: [], lang: 'id', furi: true};
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {};
  state = {learned: cleanIds(saved.learned), wrong: cleanIds(saved.wrong),
    lang: languages.some(l => l.code === saved.lang) ? saved.lang : 'id', furi: saved.furi !== false};
} catch { storageAvailable = false; }
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); storageAvailable = true; }
  catch { storageAvailable = false; }
  renderStorageStatus();
}
function renderStorageStatus() {
  $('storageStatus').textContent = storageAvailable ? '' : 'このブラウザに記録を保存できません。 / Catatan tidak dapat disimpan di browser ini.';
}
const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
function ruby(text) {
  return escapeHTML(text).replace(/([一-龯々]+)\[([^\]]+)\]/g, (_, word, reading) =>
    `<ruby>${word}<rt>${reading}</rt></ruby>`);
}
// Read kana explicitly so speech engines do not guess unfamiliar hospitality terms.
const spoken = text => text.replace(/([一-龯々]+)\[([^\]]+)\]/g, '$2');
const localize = translations => translations?.[state.lang] ?? translations?.ja ?? '';
function translated(id, translations) {
  $(id).textContent = localize(translations);
  $(id).lang = translations?.[state.lang] != null ? state.lang : 'ja';
}
const wordHTML = v => `<ruby>${escapeHTML(v.word)}<rt>${escapeHTML(v.reading)}</rt></ruby>`;
let index = 0, mode = 'learn', quizList = [], quizIndex = 0, reviewMode = false;
let choices = [], selectedId = null, sessionCorrect = 0;
function filtered() { return vocab.filter(v => $('course').value === 'all' || v.course === $('course').value); }
function reviewWords() { return filtered().filter(v => state.wrong.includes(v.id)); }
function renderSummary() {
  $('summary').textContent = `${state.learned.length} / ${vocab.length} 語を学習`;
  $('bar').style.width = `${state.learned.length / vocab.length * 100}%`;
  $('progress').setAttribute('aria-valuenow', state.learned.length);
  $('reviewCount').textContent = reviewWords().length ? `${reviewWords().length}語が復習待ちです。` : 'このコースに復習待ちの単語はありません。';
  $('startReview').disabled = reviewWords().length === 0;
}
function setMode(next) {
  stopSpeech();
  mode = next;
  for (const key of ['learn', 'quiz', 'review']) {
    $(key).classList.toggle('hidden', key !== mode);
    const tab = $('tab' + key[0].toUpperCase() + key.slice(1));
    tab.classList.toggle('active', key === mode);
    tab.setAttribute('aria-pressed', String(key === mode));
  }
}
function renderCard() {
  const list = filtered();
  index = Math.max(0, Math.min(index, list.length - 1));
  const v = list[index];
  $('courseLabel').innerHTML = ruby(courseNames[v.course]);
  $('position').textContent = `${index + 1} / ${list.length}`;
  $('word').innerHTML = wordHTML(v);
  translated('meaning', v.meaning);
  $('sentence').innerHTML = ruby(v.sentence);
  translated('translated', v.translated);
  $('aliases').classList.toggle('hidden', !v.aliases.length);
  $('aliasWords').innerHTML = v.aliases.map(wordHTML).join(' / ');
  translated('aliasNote', v.note);
  $('aliasSentence').innerHTML = ruby(v.aliasSentence || '');
  translated('aliasTranslation', v.aliasTranslation);
  $('mark').textContent = state.learned.includes(v.id) ? '✓ 学習済み / Sudah dipelajari' : '✓ 覚えた / Sudah ingat';
  $('mark').setAttribute('aria-pressed', String(state.learned.includes(v.id)));
  $('prev').disabled = index === 0;
  $('next').disabled = index === list.length - 1;
  renderSummary();
}
function shuffled(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function prepareQuestion() {
  selectedId = null;
  const v = quizList[quizIndex];
  choices = v ? shuffled([v, ...shuffled(vocab.filter(item => item.id !== v.id)).slice(0, 3)]) : [];
}
function startQuiz(review) {
  reviewMode = review;
  quizList = shuffled(review ? reviewWords() : filtered());
  quizIndex = 0;
  sessionCorrect = 0;
  prepareQuestion();
  setMode('quiz');
  renderQuiz();
}
function renderQuiz() {
  const v = quizList[quizIndex];
  const answered = selectedId !== null;
  $('options').replaceChildren();
  $('quizNext').disabled = !v || !answered;
  $('quizSpeak').disabled = !v;
  $('quizRestart').classList.toggle('hidden', !!v);
  $('feedback').classList.toggle('hidden', !!v && !answered);
  $('quizPosition').textContent = v ? `${quizIndex + 1} / ${quizList.length}` : `${quizList.length} / ${quizList.length}`;
  if (!v) {
    $('quizWord').textContent = '完了！ / Selesai!';
    $('feedback').textContent = `${quizList.length}問中 ${sessionCorrect}問正解 / Benar: ${sessionCorrect} dari ${quizList.length}`;
    renderSummary();
    return;
  }
  $('quizWord').innerHTML = [v, ...v.aliases].map(wordHTML).join(' / ');
  for (const choice of choices) {
    const button = document.createElement('button');
    button.textContent = localize(choice.meaning);
    button.lang = choice.meaning[state.lang] != null ? state.lang : 'ja';
    button.disabled = answered;
    if (answered && choice.id === v.id) button.classList.add('correct');
    if (answered && choice.id === selectedId && selectedId !== v.id) button.classList.add('wrong');
    button.onclick = () => {
      if (selectedId !== null) return;
      selectedId = choice.id;
      if (choice.id === v.id) {
        sessionCorrect++;
        state.wrong = state.wrong.filter(id => id !== v.id);
        if (!state.learned.includes(v.id)) state.learned.push(v.id);
      } else if (!state.wrong.includes(v.id)) state.wrong.push(v.id);
      save(); renderQuiz(); renderSummary();
      $('quizNext').focus();
    };
    $('options').append(button);
  }
  if (answered) {
    const ok = selectedId === v.id;
    $('feedback').innerHTML = `<strong>${ok ? '正解！ / Benar!' : 'もう一度復習しましょう。 / Mari ulangi lagi.'}</strong><p>${ruby(v.sentence)}</p><p lang="${escapeHTML(state.lang)}">${escapeHTML(localize(v.translated))}</p>`;
  }
}
let utterance;
function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  $('audioStatus').textContent = '';
}
function speak(text) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    $('audioStatus').textContent = '音声に対応していません。 / Audio tidak didukung.'; return;
  }
  stopSpeech();
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP'; utterance.rate = 0.83;
  const voice = speechSynthesis.getVoices().find(v => /^ja(?:-|_)/i.test(v.lang));
  if (voice) utterance.voice = voice;
  $('audioStatus').textContent = '再生中 / Memutar audio…';
  utterance.onend = () => { $('audioStatus').textContent = ''; };
  utterance.onerror = event => {
    if (!['canceled', 'interrupted'].includes(event.error)) $('audioStatus').textContent = '音声を再生できません。端末の日本語音声を確認してください。 / Periksa suara bahasa Jepang di perangkat Anda.';
  };
  speechSynthesis.speak(utterance);
}
for (const lang of languages) {
  const option = document.createElement('option'); option.value = lang.code; option.textContent = lang.label;
  $('lang').append(option);
}
$('lang').value = state.lang;
$('furi').checked = state.furi;
document.body.classList.toggle('hide-furi', !state.furi);
document.querySelectorAll('[data-ruby]').forEach(el => {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const span = document.createElement('span'); span.innerHTML = ruby(node.textContent);
    node.replaceWith(...span.childNodes);
  }
});
$('tabLearn').onclick = () => { setMode('learn'); renderCard(); };
$('tabQuiz').onclick = () => startQuiz(false);
$('tabReview').onclick = () => { setMode('review'); renderSummary(); };
$('course').onchange = () => { stopSpeech(); index = 0; if (mode === 'quiz') startQuiz(reviewMode); else renderCard(); };
$('lang').onchange = () => { state.lang = $('lang').value; save(); renderCard(); if (mode === 'quiz') renderQuiz(); };
$('furi').onchange = () => { state.furi = $('furi').checked; document.body.classList.toggle('hide-furi', !state.furi); save(); };
$('prev').onclick = () => { stopSpeech(); index--; renderCard(); };
$('next').onclick = () => { stopSpeech(); index++; renderCard(); };
$('mark').onclick = () => { const id = filtered()[index].id; if (!state.learned.includes(id)) state.learned.push(id); save(); renderCard(); };
$('speak').onclick = () => { const v = filtered()[index]; speak(v.reading + '。' + spoken(v.sentence)); };
$('aliasSpeak').onclick = () => { const v = filtered()[index]; speak(v.aliases.map(a => a.reading).join('。') + '。' + spoken(v.aliasSentence)); };
$('quizSpeak').onclick = () => { const v = quizList[quizIndex]; if (v) speak([v, ...v.aliases].map(a => a.reading).join('。')); };
$('quizNext').onclick = () => { stopSpeech(); quizIndex++; prepareQuestion(); renderQuiz(); $('quizWord').focus(); };
$('quizRestart').onclick = () => startQuiz(reviewMode);
$('startReview').onclick = () => startQuiz(true);
$('reset').onclick = () => {
  if (!confirm('この端末の学習記録をすべて消去しますか？ / Hapus semua catatan belajar di perangkat ini?')) return;
  state.learned = []; state.wrong = []; index = 0; save(); setMode('learn'); renderCard();
};
window.addEventListener('pagehide', stopSpeech);
renderStorageStatus(); renderCard();
