"""Real Chromium regressions; starts its own isolated local HTTP server."""
import functools
import http.server
import json
from pathlib import Path
import re
import threading
import unittest
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
KEY = 'izu-japanese-beta-v1'

class BrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
        cls.server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.url = f'http://127.0.0.1:{cls.server.server_port}'
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch(executable_path='/usr/bin/chromium', headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close(); cls.pw.stop(); cls.server.shutdown(); cls.server.server_close()

    def setUp(self):
        self.context = self.browser.new_context(viewport={'width': 390, 'height': 844})
        self.page = self.context.new_page()
        self.errors = []
        self.page.on('pageerror', lambda error: self.errors.append(str(error)))
        self.page.goto(self.url)
        self.page.locator("#tabLearn").click()

    def tearDown(self):
        self.context.close()
        self.assertEqual(self.errors, [])

    def state(self):
        return self.page.evaluate(f'JSON.parse(localStorage.getItem({json.dumps(KEY)}))')

    def answer(self, correct):
        answer = self.page.evaluate('localize(quizList[quizIndex].meaning)')
        for b in self.page.locator('#options button').all():
            if (b.inner_text() == answer) == correct:
                b.click(); return
        self.fail('Answer not found')

    def test_all_30_cards_ruby_translations_and_mobile(self):
        p = self.page
        data = p.evaluate('IzuData.vocab')
        self.assertEqual([v['id'] for v in data], list(range(1,31)))
        self.assertEqual([sum(v['course']==c for v in data) for c in ['basic','room','service']], [10,10,10])
        for i,v in enumerate(data):
            expect(p.locator('#word ruby')).to_contain_text(v['word'])
            expect(p.locator('#meaning')).to_have_text(v['meaning']['id'])
            expect(p.locator('#translated')).to_have_text(v['translated']['id'])
            # Every kanji in examples has an explicit reading, including お願い and 申し送り.
            plain = p.locator('#sentence').evaluate('(el) => {const c=el.cloneNode(true); c.querySelectorAll("ruby").forEach(r=>r.remove()); return c.textContent;}')
            self.assertIsNone(re.search('[一-龯々]', plain), (v['word'],plain))
            self.assertNotIn('[',p.locator('#sentence').inner_text())
            self.assertTrue(p.evaluate('document.documentElement.scrollWidth <= innerWidth'))
            if i < 29: p.locator('#next').click()
        expect(p.locator('#next')).to_be_disabled()
        for width in [320,375,430,768]:
            p.set_viewport_size({'width':width,'height':844})
            self.assertTrue(p.evaluate('document.documentElement.scrollWidth <= innerWidth'))
        p.locator('#course').select_option('service')
        for _ in range(5): p.locator('#next').click()
        expect(p.locator('#aliases')).to_be_visible()
        expect(p.locator('#aliasWords rt')).to_have_text('さげぜん')
        p.locator('#lang').select_option('ja')
        expect(p.locator('#translated')).to_have_text(data[25]['translated']['ja'])
        p.locator('#furi').uncheck()
        self.assertEqual(p.locator('#aliasWords rt').evaluate('(e)=>getComputedStyle(e).visibility'),'hidden')
        p.reload(); p.locator('#tabLearn').click()
        expect(p.locator('#lang')).to_have_value('ja')
        expect(p.locator('#furi')).not_to_be_checked()

    def test_legacy_records_and_invalid_ids(self):
        p=self.page
        p.evaluate('(key)=>localStorage.setItem(key,JSON.stringify({learned:[1,1,999,"2"],wrong:[26,26,-1]}))',KEY)
        p.reload(); p.locator('#tabLearn').click()
        expect(p.locator('#summary')).to_have_text('1 / 30 語を学習')
        p.locator('#mark').click()
        self.assertEqual(self.state()['learned'],[1])
        p.locator('#tabReview').click()
        expect(p.locator('#reviewCount')).to_contain_text('1語')
        p.locator('#course').select_option('basic')
        expect(p.locator('#startReview')).to_be_disabled()
        p.locator('#course').select_option('service')
        p.locator('#startReview').click()
        expect(p.locator('#quizWord')).to_contain_text('下げ膳')
        self.answer(True)
        self.assertEqual(self.state()['wrong'],[])
        p.locator('#quizNext').click()
        expect(p.locator('#quizSpeak')).to_be_disabled()
        expect(p.locator('#quizRestart')).to_be_visible()

    def test_quiz_language_change_does_not_allow_reanswer(self):
        p=self.page
        p.locator('#tabQuiz').click()
        self.assertEqual(p.locator('#options button').count(),4)
        self.answer(False)
        wrong=self.state()['wrong']
        p.locator('#lang').select_option('ja')
        self.assertEqual(p.locator('#options button:disabled').count(),4)
        expect(p.locator('#feedback')).to_contain_text('もう一度')
        self.assertEqual(self.state()['wrong'],wrong)
        p.locator('#tabReview').click(); p.locator('#startReview').click()
        self.answer(True)
        self.assertEqual(self.state()['wrong'],[])
        p.locator('#quizNext').click()
        expect(p.locator('#quizPosition')).to_have_text('1 / 1')
        expect(p.locator('#feedback')).to_contain_text('1問中 1問正解')

    def test_full_quiz_and_reset_from_review(self):
        p=self.page
        p.locator('#course').select_option('basic'); p.locator('#tabQuiz').click()
        for _ in range(10):
            self.answer(True); p.locator('#quizNext').click()
        expect(p.locator('#feedback')).to_contain_text('10問中 10問正解')
        self.assertEqual(len(self.state()['learned']),10)
        p.reload(); p.locator('#tabLearn').click()
        expect(p.locator('#summary')).to_have_text('10 / 30 語を学習')
        p.locator('#tabReview').click()
        p.once('dialog',lambda d:d.dismiss()); p.locator('#reset').click()
        expect(p.locator('#review')).to_be_visible()
        p.once('dialog',lambda d:d.accept()); p.locator('#reset').click()
        expect(p.locator('#learn')).to_be_visible()
        expect(p.locator('#summary')).to_have_text('0 / 30 語を学習')
        p.reload(); p.locator('#tabLearn').click(); self.assertEqual(self.state()['learned'],[])

    def test_storage_denied_and_corrupt_json(self):
        p=self.page
        for value in ['null','{broken']:
            p.evaluate('([key,value])=>localStorage.setItem(key,value)',[KEY,value]); p.reload(); p.locator('#tabLearn').click()
            expect(p.locator('#word')).to_contain_text('確認')
        p.evaluate("() => {Storage.prototype.setItem = () => {throw new Error('blocked')};}")
        p.locator('#mark').click()
        expect(p.locator('#storageStatus')).to_contain_text('保存できません')
        expect(p.locator('#summary')).to_have_text('1 / 30 語を学習')

    def test_speech_readings_errors_and_unsupported(self):
        p=self.page
        p.evaluate('''() => {
          window.said=[];
          speechSynthesis.getVoices=()=>[{name:'English',voiceURI:'en',lang:'en-US',default:true},{name:'日本語',voiceURI:'ja',lang:'ja-JP'}];
          speechSynthesis.speak=(u)=>{window.said.push({text:u.text,lang:u.lang,rate:u.rate,voice:u.voice.voiceURI}); window.lastUtterance=u;};
          window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
          speechSynthesis.cancel=()=>{};
        }''')
        p.locator('#course').select_option('service')
        for _ in range(5): p.locator('#next').click()
        p.locator('#speak').click(); p.locator('#aliasSpeak').click()
        said=p.evaluate('window.said')
        self.assertEqual(said[0]['text'],'下膳。食事が終わったら下膳してください。')
        self.assertEqual(said[1]['text'],'下げ膳。お皿を下げてください。')
        self.assertEqual(said[0]['lang'],'ja-JP')
        self.assertEqual(said[0]['rate'],1)
        self.assertEqual(said[0]['voice'],'ja')
        p.evaluate("window.lastUtterance.onerror({error:'language-unavailable'})")
        expect(p.locator('#audioStatus')).to_contain_text('再生できません')
        p.evaluate("delete window.speechSynthesis; delete window.SpeechSynthesisUtterance")
        p.locator('#speak').click()
        expect(p.locator('#audioStatus')).to_contain_text('対応していません')

    def test_voice_settings_survive_reload(self):
        p=self.page
        self.context.add_init_script("""(() => {
          window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
          speechSynthesis.getVoices=()=>[
            {name:'English',voiceURI:'en',lang:'en-US'},
            {name:'Japanese A',voiceURI:'ja-a',lang:'ja-JP',default:true},
            {name:'Japanese B',voiceURI:'ja-b',lang:'ja-JP'}];
          speechSynthesis.cancel=()=>{};
          speechSynthesis.speak=u=>{window.lastSpoken={text:u.text,voice:u.voice.voiceURI,rate:u.rate};};
        })()""")
        p.reload(); p.locator('#tabLearn').click()
        p.locator('.audio-settings summary').click()
        self.assertEqual(p.locator('#voice option').count(),3) # Auto + two Japanese voices.
        p.locator('#voice').select_option('ja-b')
        p.locator('#rate').select_option('0.85')
        p.reload(); p.locator('#tabLearn').click()
        expect(p.locator('#voice')).to_have_value('ja-b')
        expect(p.locator('#rate')).to_have_value('0.85')
        p.locator('#speak').click()
        result=p.evaluate('window.lastSpoken')
        self.assertEqual(result,{'text':'確認。予約を確認してください。','voice':'ja-b','rate':0.85})

    def test_delayed_voices_and_no_foreign_fallback(self):
        p=self.page
        p.evaluate("""() => {
          window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
          window.voices=[{name:'English',voiceURI:'en',lang:'en-US',default:true}];
          window.said=[];
          speechSynthesis.getVoices=()=>window.voices;
          speechSynthesis.cancel=()=>{};
          speechSynthesis.speak=u=>window.said.push(u.text);
        }""")
        p.locator('#speak').click()
        expect(p.locator('#audioStatus')).to_contain_text('見つかりません')
        self.assertEqual(p.evaluate('window.said'),[])
        # Voices arriving after a user request are picked up without reloading.
        p.locator('#speak').click()
        p.evaluate("""() => {
          window.voices.push({name:'Japanese',voiceURI:'ja',lang:'ja-JP'});
          speechSynthesis.dispatchEvent(new Event('voiceschanged'));
        }""")
        expect(p.locator('#audioStatus')).to_contain_text('再生中')
        self.assertEqual(p.evaluate('window.said'),['確認。予約を確認してください。'])
        # A pending request must not play after navigating to another mode.
        p.evaluate('window.voices=[]')
        p.locator('#speak').click()
        p.locator('#tabReview').click()
        p.evaluate("""() => {
          window.voices.push({name:'Japanese',voiceURI:'ja',lang:'ja-JP'});
          speechSynthesis.dispatchEvent(new Event('voiceschanged'));
        }""")
        self.assertEqual(p.evaluate('window.said'),['確認。予約を確認してください。'])

    def test_future_language_fallback(self):
        p=self.page
        p.evaluate("state.lang='vi'; renderCard()")
        expect(p.locator('#meaning')).to_have_text('まちがいがないか、たしかめる')
        expect(p.locator('#meaning')).to_have_attribute('lang','ja')
        p.locator('#tabQuiz').click()
        self.assertTrue(all(b.inner_text() for b in p.locator('#options button').all()))

    def test_conversation_six_lessons_content_and_completion(self):
        p=self.page
        p.goto(self.url)
        expect(p.locator('#lessons')).to_be_visible()
        expect(p.locator('#coursePanel')).to_be_hidden()
        self.assertEqual(p.locator('.lesson-tile').count(),6)
        data=p.evaluate('IzuLessons.lessons')
        self.assertEqual(len(set(l['id'] for l in data)),6)
        word_data=p.evaluate('IzuData.vocab')
        old_record={'learned':[1,2],'wrong':[18],'lang':'id','furi':True,'voiceURI':'','rate':1}
        p.evaluate('([key,value])=>localStorage.setItem(key,JSON.stringify(value))',[KEY,old_record])
        for lesson in data:
            self.assertGreaterEqual(len(lesson['dialogue']),4)
            self.assertLessEqual(len(lesson['dialogue']),8)
            self.assertEqual(len(lesson['quiz']['choices']),4)
            self.assertEqual(len(set(c['id'] for c in lesson['quiz']['choices'])),4)
            self.assertIn(lesson['quiz']['answerId'],[c['id'] for c in lesson['quiz']['choices']])
            for line in lesson['dialogue']:
                self.assertTrue(line['translated']['id'])
                plain=re.sub(r'[一-龯々]+\[[^\]]+\]','',line['text'])
                self.assertIsNone(re.search('[一-龯々]',plain),line['text'])
            p.locator('.lesson-tile').nth(data.index(lesson)).click()
            self.assertEqual(p.locator('#lessonDialogue .dialogue-line').count(),len(lesson['dialogue']))
            for i,line in enumerate(lesson['dialogue']):
                expect(p.locator('#lessonDialogue .muted').nth(i)).to_have_text(line['translated']['id'])
            self.assertEqual(p.locator('#lessonVocab li').count(),len(lesson['vocabIds']))
            for width in [320,390,768]:
                p.set_viewport_size({'width':width,'height':844})
                self.assertTrue(p.evaluate('document.documentElement.scrollWidth<=innerWidth'))
            p.locator('#lessonPractice').click()
            expect(p.locator('#lessonComplete')).to_be_disabled()
            # Exercise every distractor's own explanation before the correct answer.
            for choice in lesson['quiz']['choices']:
                p.locator(f'#lessonOptions [data-choice="{choice["id"]}"]').click()
                self.assertEqual(p.locator('#lessonOptions button:disabled').count(),4)
                expect(p.locator('#lessonFeedback')).to_contain_text(choice['explanation']['id'])
                expect(p.locator('#lessonComplete')).to_be_disabled() if choice['id']!=lesson['quiz']['answerId'] else None
                p.locator('#lessonRetry').click()
            p.locator(f'#lessonOptions [data-choice="{lesson["quiz"]["answerId"]}"]').click()
            p.locator('#lessonComplete').click()
            expect(p.locator('#lessonComplete')).to_be_disabled()
            p.locator('#lessonBack').click()
        expect(p.locator('#lessonSummary')).to_contain_text('6 / 6')
        # Conversation activity must leave the raw vocabulary record unchanged.
        self.assertEqual(self.state(),old_record)
        p.reload(); expect(p.locator('#lessonSummary')).to_contain_text('6 / 6')
        results=p.evaluate('lessonProgress.results')
        self.assertEqual(len(results),6)
        self.assertTrue(all(r['attempts']==5 and r['correctCount']==2 for r in results.values()))
        self.assertFalse(p.evaluate('IzuLessons.audiences["japanese-staff"].enabled'))

    def test_conversation_card_return_and_language_lock(self):
        p=self.page
        p.locator('#tabLessons').click(); p.locator('.lesson-tile').first.click()
        p.locator('#lessonPractice').click()
        correct=p.evaluate('activeLesson.quiz.answerId')
        wrong=p.evaluate('activeLesson.quiz.choices.find(c=>c.id!==activeLesson.quiz.answerId).id')
        p.locator(f'[data-choice="{wrong}"]').click()
        record=p.evaluate('JSON.stringify(lessonProgress)')
        p.locator('#lang').select_option('ja')
        self.assertEqual(p.locator('#lessonOptions button:disabled').count(),4)
        self.assertEqual(p.evaluate('JSON.stringify(lessonProgress)'),record)
        self.assertEqual(p.locator('#lessonDialogue [lang=id]').count(),0)
        p.locator('#lessonVocab button').first.click()
        expect(p.locator('#learn')).to_be_visible()
        word_id=p.evaluate('activeLesson.vocabIds[0]')
        expect(p.locator('#word')).to_contain_text(p.evaluate(f'vocab.find(v=>v.id==={word_id}).word'))
        p.locator('#mark').click()
        p.locator('#lessonReturn').click()
        expect(p.locator('#lessonDetail')).to_be_visible()
        expect(p.locator('#lessonQuiz')).to_be_visible()
        self.assertEqual(p.locator('#lessonOptions button:disabled').count(),4)
        p.locator('#lessonRetry').click()
        p.locator(f'[data-choice="{correct}"]').click()
        p.locator('#furi').uncheck()
        self.assertEqual(p.locator('#lessonDialogue rt').first.evaluate('(e)=>getComputedStyle(e).visibility'),'hidden')
        p.locator('#lessonComplete').click()
        p.locator('#lessonNext').click()
        self.assertEqual(p.evaluate('activeLesson.id'),'cleaning')

    def test_conversation_audio_and_missing_voice(self):
        p=self.page
        p.locator('#tabLessons').click(); p.locator('.lesson-tile').first.click()
        p.evaluate("""() => {
          window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
          speechSynthesis.getVoices=()=>[{name:'日本語',voiceURI:'ja',lang:'ja-JP'}];
          speechSynthesis.cancel=()=>{};
          window.said=[];
          speechSynthesis.speak=u=>window.said.push({text:u.text,lang:u.lang,rate:u.rate});
        }""")
        for i in range(6):p.locator('#lessonDialogue .line-audio').nth(i).click()
        said=p.evaluate('window.said')
        self.assertEqual(len(said),6)
        self.assertEqual(said[0]['text'],'この部屋を優先して、清掃をお願いします。')
        self.assertTrue(all(s['lang']=='ja-JP' and s['rate']==1 for s in said))
        p.evaluate('speechSynthesis.getVoices=()=>[]')
        p.locator('#lessonDialogue .line-audio').first.click()
        expect(p.locator('#lessonDialogue .line-status').first).to_contain_text('見つかりません')
        self.assertEqual(len(p.evaluate('window.said')),6)

    def test_conversation_storage_failures_and_separate_resets(self):
        p=self.page
        p.evaluate('(key)=>localStorage.setItem(key,JSON.stringify({learned:[3],wrong:[18]}))',KEY)
        p.evaluate("localStorage.setItem('izu-conversations-v1','{broken')")
        p.reload()
        expect(p.locator('#lessonStorageStatus')).to_contain_text('読み込めません')
        p.locator('.lesson-tile').first.click(); p.locator('#lessonPractice').click()
        correct=p.evaluate('activeLesson.quiz.answerId')
        p.locator(f'[data-choice="{correct}"]').click(); p.locator('#lessonComplete').click()
        self.assertEqual(self.state()['learned'],[3])
        # Word reset and conversation reset each affect only their own key.
        p.locator('#tabLearn').click()
        p.once('dialog',lambda d:d.accept()); p.locator('#reset').click()
        self.assertEqual(p.evaluate('lessonProgress.completed.length'),1)
        p.locator('#tabLessons').click()
        p.locator('#lessons details summary').click()
        p.once('dialog',lambda d:d.dismiss()); p.locator('#lessonReset').click()
        self.assertEqual(p.evaluate('lessonProgress.completed.length'),1)
        p.once('dialog',lambda d:d.accept()); p.locator('#lessonReset').click()
        self.assertEqual(p.evaluate('lessonProgress.completed'),[])
        self.assertEqual(self.state()['learned'],[])
        p.locator('.lesson-tile').first.click(); p.locator('#lessonPractice').click()
        p.evaluate("() => {Storage.prototype.setItem=()=>{throw new Error('blocked')};}")
        p.locator(f'[data-choice="{correct}"]').click()
        expect(p.locator('#lessonStorageStatus')).to_contain_text('保存できません')
        p.locator('#lessonComplete').click()
        expect(p.locator('#lessonSummary')).to_contain_text('1 / 6')

if __name__=='__main__': unittest.main(verbosity=2)
