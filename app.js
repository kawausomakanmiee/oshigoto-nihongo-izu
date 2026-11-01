'use strict';
// Add new languages by adding fields to each record's meaning and translated objects.
const rows = [
['basic','確認','かくにん','Memeriksa untuk memastikan','まちがいがないか、たしかめる','予約を確認してください。','Tolong periksa reservasinya.'],
['basic','報告','ほうこく','Melaporkan','仕事のようすをつたえる','終わったら報告してください。','Setelah selesai, tolong laporkan.'],
['basic','連絡','れんらく','Menghubungi / memberi informasi','ひつようなことをつたえる','フロントに連絡してください。','Tolong hubungi resepsionis.'],
['basic','相談','そうだん','Berkonsultasi','こまったことを話す','困ったら先輩に相談してください。','Jika mengalami kesulitan, konsultasikan dengan senior.'],
['basic','指示','しじ','Instruksi','何をするか、つたえること','指示を聞いてください。','Tolong dengarkan instruksinya.'],
['basic','担当','たんとう','Penanggung jawab / bertugas','受け持つ仕事','今日は清掃を担当します。','Hari ini saya bertugas membersihkan kamar.'],
['basic','申し送り','もうしおくり','Serah terima informasi antarshift','つぎの人に情報をつたえる','夜勤の人に申し送りをします。','Saya akan menyampaikan informasi kepada staf shift malam.'],
['basic','優先','ゆうせん','Prioritas','先にすること','この部屋を優先してください。','Tolong prioritaskan kamar ini.'],
['basic','完了','かんりょう','Selesai','仕事がおわること','清掃が完了しました。','Pembersihan sudah selesai.'],
['basic','異常','いじょう','Kondisi tidak normal','いつもとちがうこと','異常があれば報告してください。','Jika ada kondisi tidak normal, tolong laporkan.'],
['room','客室','きゃくしつ','Kamar tamu','おきゃくさまがとまるへや','客室を確認してください。','Tolong periksa kamar tamu.'],
['room','清掃','せいそう','Pembersihan','そうじすること','客室を清掃します。','Saya membersihkan kamar tamu.'],
['room','備品','びひん','Perlengkapan','しせつでつかうもの','備品の数を確認してください。','Tolong periksa jumlah perlengkapan.'],
['room','補充','ほじゅう','Menambah persediaan yang kurang','たりないものをたすこと','タオルを補充してください。','Tolong tambahkan persediaan handuk.'],
['room','交換','こうかん','Mengganti','あたらしいものにかえる','シーツを交換してください。','Tolong ganti seprai.'],
['room','回収','かいしゅう','Mengumpulkan / mengambil kembali','つかったものをあつめる','使ったタオルを回収します。','Saya mengumpulkan handuk bekas pakai.'],
['room','点検','てんけん','Pemeriksaan kondisi','もんだいがないかしらべる','設備を点検してください。','Tolong periksa fasilitasnya.'],
['room','忘れ物','わすれもの','Barang tertinggal','おきゃくさまがおいていったもの','忘れ物がありました。','Ada barang tamu yang tertinggal.'],
['room','寝具','しんぐ','Perlengkapan tidur','ふとんやまくらなど','寝具を準備してください。','Tolong siapkan perlengkapan tidur.'],
['room','汚れ','よごれ','Noda / kotoran','きれいではないところ','シーツに汚れがあります。','Ada noda pada seprai.'],
['service','予約','よやく','Reservasi','まえもってもうしこむこと','予約を確認いたします。','Saya akan memeriksa reservasi Anda.'],
['service','受付','うけつけ','Resepsionis / penerimaan','おきゃくさまのてつづきをすること','受付はこちらです。','Resepsionis ada di sini.'],
['service','案内','あんない','Mengantar / memberi petunjuk','ばしょなどをおしえること','お部屋までご案内します。','Saya akan mengantar Anda ke kamar.'],
['service','精算','せいさん','Pelunasan pembayaran','りょうきんをけいさんしてはらうこと','こちらでご精算をお願いします。','Silakan lakukan pembayaran di sini.'],
['service','配膳','はいぜん','Menyajikan dan menata hidangan','りょうりやしょっきをならべること','夕食の配膳をお願いします。','Tolong siapkan dan sajikan makan malam.'],
['service','下膳','げぜん','Mengangkat peralatan makan setelah makan','しょくごのしょっきをかたづけること','食事が終わったら下膳してください。','Setelah makan selesai, tolong angkat peralatan makannya.'],
['service','お品書き','おしながき','Daftar hidangan','りょうりのないようをかいたもの','お品書きをお持ちします。','Saya akan membawakan daftar hidangan.'],
['service','アレルギー','あれるぎー','Alergi','たべものなどでからだに反応がでること','食物アレルギーはございますか。','Apakah Anda memiliki alergi makanan?'],
['service','大浴場','だいよくじょう','Pemandian umum besar','おおきなきょうどうのおふろ','大浴場は二階にあります。','Pemandian umum besar berada di lantai dua.'],
['service','送迎','そうげい','Antar-jemput','くるまなどでおくりむかえすること','駅まで送迎いたします。','Kami menyediakan antar-jemput ke stasiun.']
];
const vocab=rows.map((r,i)=>({id:i+1,course:r[0],word:r[1],reading:r[2],meaning:{id:r[3],ja:r[4]},sentence:r[5],translated:{id:r[6],ja:r[4]}}));
const $=id=>document.getElementById(id),storageKey='izu-japanese-beta-v1';
let state={learned:[],wrong:[]};try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');state={learned:Array.isArray(saved.learned)?saved.learned:[],wrong:Array.isArray(saved.wrong)?saved.wrong:[]}}catch{}
const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(state))}catch{}};
const courseNames={basic:'基本・報連相',room:'客室・清掃',service:'接客・食事'};
let index=0,mode='learn',quizList=[],quizIndex=0,answered=false,reviewMode=false;
function ruby(s){const escape=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));return escape(s).replace(/([一-龯々]+)([ぁ-ゖ]*)/g,(m,kanji,tail)=>{const dict={'予約':'よやく','確認':'かくにん','終':'お','報告':'ほうこく','連絡':'れんらく','困':'こま','先輩':'せんぱい','相談':'そうだん','指示':'しじ','聞':'き','今日':'きょう','清掃':'せいそう','担当':'たんとう','夜勤':'やきん','人':'ひと','申':'もう','送':'おく','部屋':'へや','優先':'ゆうせん','完了':'かんりょう','異常':'いじょう','客室':'きゃくしつ','備品':'びひん','数':'かず','補充':'ほじゅう','交換':'こうかん','使':'つか','回収':'かいしゅう','設備':'せつび','点検':'てんけん','忘':'わす','物':'もの','寝具':'しんぐ','準備':'じゅんび','汚':'よご','受付':'うけつけ','案内':'あんない','精算':'せいさん','夕食':'ゆうしょく','配膳':'はいぜん','食事':'しょくじ','下膳':'げぜん','品書':'しなが','持':'も','食物':'しょくもつ','大浴場':'だいよくじょう','二階':'にかい','駅':'えき','送迎':'そうげい'};let read=dict[kanji];if(!read)return m;return '<ruby>'+escape(kanji)+'<rt>'+escape(read)+'</rt></ruby>'+tail})}
function filtered(){return vocab.filter(v=>$('course').value==='all'||v.course===$('course').value)}
function renderSummary(){$('summary').textContent=state.learned.length+' / 30 語を学習';$('bar').style.width=(state.learned.length/30*100)+'%';$('reviewCount').textContent=state.wrong.length?state.wrong.length+'語が復習待ちです。':'復習待ちの単語はありません。';$('startReview').disabled=!state.wrong.length}
function showMode(m){mode=m;['learn','quiz','review'].forEach(k=>{$(k).classList.toggle('hidden',k!==m);$('tab'+k[0].toUpperCase()+k.slice(1)).classList.toggle('active',k===m)});if(m==='learn')renderCard();if(m==='review')renderSummary();if(m==='quiz')startQuiz(false)}
function renderCard(){const list=filtered();if(index>=list.length)index=0;const v=list[index];if(!v)return;$('courseLabel').textContent=courseNames[v.course];$('position').textContent=(index+1)+' / '+list.length;$('word').innerHTML='<ruby>'+v.word+'<rt>'+v.reading+'</rt></ruby>';$('meaning').textContent=v.meaning[$('lang').value];$('sentence').innerHTML=ruby(v.sentence);$('translated').textContent=v.translated[$('lang').value];$('mark').textContent=state.learned.includes(v.id)?'✓ 学習済み':'✓ 覚えた';$('prev').disabled=index===0;$('next').disabled=index===list.length-1;renderSummary()}
function speak(v){if(!('speechSynthesis'in window)){alert('このブラウザでは音声再生を利用できません。');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(v);u.lang='ja-JP';u.rate=.83;speechSynthesis.speak(u)}
function shuffled(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function startQuiz(review){reviewMode=review;quizList=shuffled(review?vocab.filter(v=>state.wrong.includes(v.id)):filtered());quizIndex=0;mode='quiz';['learn','quiz','review'].forEach(k=>$(k).classList.toggle('hidden',k!=='quiz'));['tabLearn','tabQuiz','tabReview'].forEach(k=>$(k).classList.toggle('active',k==='tabQuiz'));renderQuiz()}
function renderQuiz(){answered=false;const v=quizList[quizIndex];if(!v){$('quizWord').textContent='完了！';$('options').innerHTML='';$('feedback').classList.remove('hidden');$('feedback').textContent='このコースの問題が終わりました。';$('quizNext').disabled=true;renderSummary();return}const lang=$('lang').value;$('quizPosition').textContent=(quizIndex+1)+' / '+quizList.length;$('quizWord').innerHTML='<ruby>'+v.word+'<rt>'+v.reading+'</rt></ruby>';$('feedback').classList.add('hidden');$('quizNext').disabled=true;const others=shuffled(vocab.filter(x=>x.id!==v.id)).slice(0,3);const choices=shuffled([v,...others]);$('options').replaceChildren(...choices.map(c=>{const b=document.createElement('button');b.textContent=c.meaning[lang];b.onclick=()=>{if(answered)return;answered=true;const ok=c.id===v.id;b.classList.add(ok?'correct':'wrong');for(const button of $('options').children){button.disabled=true;if(button.textContent===v.meaning[lang])button.classList.add('correct')}if(ok){state.wrong=state.wrong.filter(id=>id!==v.id);if(!state.learned.includes(v.id))state.learned.push(v.id)}else if(!state.wrong.includes(v.id))state.wrong.push(v.id);save();$('feedback').classList.remove('hidden');$('feedback').textContent=(ok?'正解！':'もう一度復習しましょう。')+' '+v.sentence+' / '+v.translated[lang];$('quizNext').disabled=false;renderSummary()};return b}))}
$('tabLearn').onclick=()=>showMode('learn');$('tabQuiz').onclick=()=>showMode('quiz');$('tabReview').onclick=()=>showMode('review');$('course').onchange=()=>{index=0;if(mode==='quiz')startQuiz(false);else renderCard()};$('lang').onchange=()=>{renderCard();if(mode==='quiz')renderQuiz()};$('furi').onchange=()=>document.body.classList.toggle('hide-furi',!$('furi').checked);$('prev').onclick=()=>{index--;renderCard()};$('next').onclick=()=>{index++;renderCard()};$('speak').onclick=()=>speak(filtered()[index].word+'。'+filtered()[index].sentence);$('mark').onclick=()=>{const id=filtered()[index].id;if(!state.learned.includes(id))state.learned.push(id);save();renderCard()};$('quizSpeak').onclick=()=>{const v=quizList[quizIndex];if(v)speak(v.word)};$('quizNext').onclick=()=>{quizIndex++;renderQuiz()};$('startReview').onclick=()=>startQuiz(true);$('reset').onclick=()=>{if(confirm('この端末の学習記録をすべて消去しますか？')){state={learned:[],wrong:[]};save();renderCard();renderSummary()}};renderCard();
