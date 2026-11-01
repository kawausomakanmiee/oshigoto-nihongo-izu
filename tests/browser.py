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
        p.reload()
        expect(p.locator('#lang')).to_have_value('ja')
        expect(p.locator('#furi')).not_to_be_checked()

    def test_legacy_records_and_invalid_ids(self):
        p=self.page
        p.evaluate('(key)=>localStorage.setItem(key,JSON.stringify({learned:[1,1,999,"2"],wrong:[26,26,-1]}))',KEY)
        p.reload()
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
        p.reload()
        expect(p.locator('#summary')).to_have_text('10 / 30 語を学習')
        p.locator('#tabReview').click()
        p.once('dialog',lambda d:d.dismiss()); p.locator('#reset').click()
        expect(p.locator('#review')).to_be_visible()
        p.once('dialog',lambda d:d.accept()); p.locator('#reset').click()
        expect(p.locator('#learn')).to_be_visible()
        expect(p.locator('#summary')).to_have_text('0 / 30 語を学習')
        p.reload(); self.assertEqual(self.state()['learned'],[])

    def test_storage_denied_and_corrupt_json(self):
        p=self.page
        for value in ['null','{broken']:
            p.evaluate('([key,value])=>localStorage.setItem(key,value)',[KEY,value]); p.reload()
            expect(p.locator('#word')).to_contain_text('確認')
        p.evaluate("() => {Storage.prototype.setItem = () => {throw new Error('blocked')};}")
        p.locator('#mark').click()
        expect(p.locator('#storageStatus')).to_contain_text('保存できません')
        expect(p.locator('#summary')).to_have_text('1 / 30 語を学習')

    def test_speech_readings_errors_and_unsupported(self):
        p=self.page
        p.evaluate('''() => {
          window.said=[];
          speechSynthesis.speak=(u)=>{window.said.push({text:u.text,lang:u.lang,rate:u.rate}); window.lastUtterance=u;};
          speechSynthesis.cancel=()=>{};
        }''')
        p.locator('#course').select_option('service')
        for _ in range(5): p.locator('#next').click()
        p.locator('#speak').click(); p.locator('#aliasSpeak').click()
        said=p.evaluate('window.said')
        self.assertEqual(said[0]['text'],'げぜん。しょくじがおわったらげぜんしてください。')
        self.assertEqual(said[1]['text'],'さげぜん。おさらをさげてください。')
        self.assertEqual(said[0]['lang'],'ja-JP')
        p.evaluate("window.lastUtterance.onerror({error:'language-unavailable'})")
        expect(p.locator('#audioStatus')).to_contain_text('再生できません')
        p.evaluate("delete window.speechSynthesis; delete window.SpeechSynthesisUtterance")
        p.locator('#speak').click()
        expect(p.locator('#audioStatus')).to_contain_text('対応していません')

    def test_future_language_fallback(self):
        p=self.page
        p.evaluate("state.lang='vi'; renderCard()")
        expect(p.locator('#meaning')).to_have_text('まちがいがないか、たしかめる')
        expect(p.locator('#meaning')).to_have_attribute('lang','ja')
        p.locator('#tabQuiz').click()
        self.assertTrue(all(b.inner_text() for b in p.locator('#options button').all()))

if __name__=='__main__': unittest.main(verbosity=2)
