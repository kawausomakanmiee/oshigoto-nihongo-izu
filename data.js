'use strict';
// Stable IDs preserve existing learning records. Japanese ruby notation: 漢字[かんじ].
// Add vi/my translations and a language entry when reviewed; missing fields fall back to ja.
const IzuData = {
  "languages": [
    {
      "code": "id",
      "label": "Bahasa Indonesia"
    },
    {
      "code": "ja",
      "label": "やさしい日本語"
    }
  ],
  "courses": {
    "basic": "基本[きほん]・報連相[ほうれんそう]",
    "room": "客室[きゃくしつ]・清掃[せいそう]",
    "service": "接客[せっきゃく]・食事[しょくじ]"
  },
  "vocab": [
    {
      "id": 1,
      "course": "basic",
      "word": "確認",
      "reading": "かくにん",
      "meaning": {
        "id": "Memeriksa untuk memastikan",
        "ja": "まちがいがないか、たしかめる"
      },
      "sentence": "予約[よやく]を確認[かくにん]してください。",
      "translated": {
        "id": "Tolong periksa reservasinya.",
        "ja": "よやくにまちがいがないか、たしかめてください。"
      },
      "aliases": []
    },
    {
      "id": 2,
      "course": "basic",
      "word": "報告",
      "reading": "ほうこく",
      "meaning": {
        "id": "Melaporkan",
        "ja": "仕事のようすをつたえる"
      },
      "sentence": "終[お]わったら報告[ほうこく]してください。",
      "translated": {
        "id": "Setelah selesai, tolong laporkan.",
        "ja": "しごとがおわったら、ようすをつたえてください。"
      },
      "aliases": []
    },
    {
      "id": 3,
      "course": "basic",
      "word": "連絡",
      "reading": "れんらく",
      "meaning": {
        "id": "Menghubungi / memberi informasi",
        "ja": "ひつようなことをつたえる"
      },
      "sentence": "フロントに連絡[れんらく]してください。",
      "translated": {
        "id": "Tolong hubungi resepsionis.",
        "ja": "フロントに、ひつようなことをつたえてください。"
      },
      "aliases": []
    },
    {
      "id": 4,
      "course": "basic",
      "word": "相談",
      "reading": "そうだん",
      "meaning": {
        "id": "Berkonsultasi",
        "ja": "こまったことをはなして、どうすればよいかきく"
      },
      "sentence": "困[こま]ったら先輩[せんぱい]に相談[そうだん]してください。",
      "translated": {
        "id": "Jika mengalami kesulitan, konsultasikan dengan senior.",
        "ja": "こまったら、せんぱいにどうすればよいかきいてください。"
      },
      "aliases": []
    },
    {
      "id": 5,
      "course": "basic",
      "word": "指示",
      "reading": "しじ",
      "meaning": {
        "id": "Instruksi",
        "ja": "なにをするか、つたえること"
      },
      "sentence": "指示[しじ]を聞[き]いてください。",
      "translated": {
        "id": "Tolong dengarkan instruksinya.",
        "ja": "なにをするか、せつめいをきいてください。"
      },
      "aliases": []
    },
    {
      "id": 6,
      "course": "basic",
      "word": "担当",
      "reading": "たんとう",
      "meaning": {
        "id": "Bertugas / tanggung jawab",
        "ja": "うけもつしごと"
      },
      "sentence": "今日[きょう]は清掃[せいそう]を担当[たんとう]します。",
      "translated": {
        "id": "Hari ini saya bertugas membersihkan kamar.",
        "ja": "きょうは、わたしがそうじをします。"
      },
      "aliases": []
    },
    {
      "id": 7,
      "course": "basic",
      "word": "申し送り",
      "reading": "もうしおくり",
      "meaning": {
        "id": "Serah terima informasi antar sif",
        "ja": "つぎにはたらくひとに、ひつようなじょうほうをつたえること"
      },
      "sentence": "夜勤[やきん]の人[ひと]に申[もう]し送[おく]りをします。",
      "translated": {
        "id": "Saya akan menyampaikan informasi serah terima kepada staf sif malam.",
        "ja": "よるにはたらくひとに、ひつようなじょうほうをつたえます。"
      },
      "aliases": []
    },
    {
      "id": 8,
      "course": "basic",
      "word": "優先",
      "reading": "ゆうせん",
      "meaning": {
        "id": "Mendahulukan / prioritas",
        "ja": "ほかのことより、さきにすること"
      },
      "sentence": "この部屋[へや]を優先[ゆうせん]してください。",
      "translated": {
        "id": "Tolong dahulukan pekerjaan di kamar ini.",
        "ja": "このへやのしごとを、ほかのへやよりさきにしてください。"
      },
      "aliases": []
    },
    {
      "id": 9,
      "course": "basic",
      "word": "完了",
      "reading": "かんりょう",
      "meaning": {
        "id": "Selesai",
        "ja": "仕事がおわること"
      },
      "sentence": "清掃[せいそう]が完了[かんりょう]しました。",
      "translated": {
        "id": "Pembersihan sudah selesai.",
        "ja": "そうじがおわりました。"
      },
      "aliases": []
    },
    {
      "id": 10,
      "course": "basic",
      "word": "異常",
      "reading": "いじょう",
      "meaning": {
        "id": "Kondisi tidak normal",
        "ja": "いつもとちがうこと"
      },
      "sentence": "異常[いじょう]があれば報告[ほうこく]してください。",
      "translated": {
        "id": "Jika ada kondisi tidak normal, tolong laporkan.",
        "ja": "いつもとちがうことがあれば、つたえてください。"
      },
      "aliases": []
    },
    {
      "id": 11,
      "course": "room",
      "word": "客室",
      "reading": "きゃくしつ",
      "meaning": {
        "id": "Kamar tamu",
        "ja": "おきゃくさまがとまるへや"
      },
      "sentence": "客室[きゃくしつ]を確認[かくにん]してください。",
      "translated": {
        "id": "Tolong periksa kamar tamu.",
        "ja": "おきゃくさまのへやに、もんだいがないかたしかめてください。"
      },
      "aliases": []
    },
    {
      "id": 12,
      "course": "room",
      "word": "清掃",
      "reading": "せいそう",
      "meaning": {
        "id": "Pembersihan",
        "ja": "そうじすること"
      },
      "sentence": "客室[きゃくしつ]を清掃[せいそう]します。",
      "translated": {
        "id": "Saya membersihkan kamar tamu.",
        "ja": "おきゃくさまのへやをそうじします。"
      },
      "aliases": []
    },
    {
      "id": 13,
      "course": "room",
      "word": "備品",
      "reading": "びひん",
      "meaning": {
        "id": "Perlengkapan",
        "ja": "しせつでつかうもの"
      },
      "sentence": "備品[びひん]の数[かず]を確認[かくにん]してください。",
      "translated": {
        "id": "Tolong periksa jumlah perlengkapan.",
        "ja": "しせつでつかうものが、いくつあるかたしかめてください。"
      },
      "aliases": []
    },
    {
      "id": 14,
      "course": "room",
      "word": "補充",
      "reading": "ほじゅう",
      "meaning": {
        "id": "Menambah persediaan yang kurang",
        "ja": "たりないものをたすこと"
      },
      "sentence": "タオルを補充[ほじゅう]してください。",
      "translated": {
        "id": "Tolong tambahkan persediaan handuk.",
        "ja": "たりないタオルをたしてください。"
      },
      "aliases": []
    },
    {
      "id": 15,
      "course": "room",
      "word": "交換",
      "reading": "こうかん",
      "meaning": {
        "id": "Mengganti",
        "ja": "あたらしいものにかえる"
      },
      "sentence": "シーツを交換[こうかん]してください。",
      "translated": {
        "id": "Tolong ganti seprai.",
        "ja": "シーツをあたらしいものにかえてください。"
      },
      "aliases": []
    },
    {
      "id": 16,
      "course": "room",
      "word": "回収",
      "reading": "かいしゅう",
      "meaning": {
        "id": "Mengumpulkan / mengambil kembali",
        "ja": "つかったものをあつめる"
      },
      "sentence": "使[つか]ったタオルを回収[かいしゅう]します。",
      "translated": {
        "id": "Saya mengumpulkan handuk bekas pakai.",
        "ja": "つかったタオルをあつめます。"
      },
      "aliases": []
    },
    {
      "id": 17,
      "course": "room",
      "word": "点検",
      "reading": "てんけん",
      "meaning": {
        "id": "Pemeriksaan kondisi",
        "ja": "もんだいがないかしらべる"
      },
      "sentence": "設備[せつび]を点検[てんけん]してください。",
      "translated": {
        "id": "Tolong periksa fasilitasnya.",
        "ja": "しせつのきかいなどに、もんだいがないかしらべてください。"
      },
      "aliases": []
    },
    {
      "id": 18,
      "course": "room",
      "word": "忘れ物",
      "reading": "わすれもの",
      "meaning": {
        "id": "Barang tertinggal",
        "ja": "おきゃくさまがおいていったもの"
      },
      "sentence": "忘[わす]れ物[もの]がありました。",
      "translated": {
        "id": "Ada barang tamu yang tertinggal.",
        "ja": "おきゃくさまがおいていったものがありました。"
      },
      "aliases": []
    },
    {
      "id": 19,
      "course": "room",
      "word": "寝具",
      "reading": "しんぐ",
      "meaning": {
        "id": "Perlengkapan tidur",
        "ja": "ふとんやまくらなど"
      },
      "sentence": "寝具[しんぐ]を準備[じゅんび]してください。",
      "translated": {
        "id": "Tolong siapkan perlengkapan tidur.",
        "ja": "ふとんやまくらなどを、よういしてください。"
      },
      "aliases": []
    },
    {
      "id": 20,
      "course": "room",
      "word": "汚れ",
      "reading": "よごれ",
      "meaning": {
        "id": "Noda / kotoran",
        "ja": "きれいではないところ"
      },
      "sentence": "シーツに汚[よご]れがあります。",
      "translated": {
        "id": "Ada noda pada seprai.",
        "ja": "シーツに、きれいではないところがあります。"
      },
      "aliases": []
    },
    {
      "id": 21,
      "course": "service",
      "word": "予約",
      "reading": "よやく",
      "meaning": {
        "id": "Reservasi",
        "ja": "まえもってもうしこむこと"
      },
      "sentence": "予約[よやく]を確認[かくにん]いたします。",
      "translated": {
        "id": "Saya akan memeriksa reservasi Anda.",
        "ja": "よやくのないようを、たしかめます。"
      },
      "aliases": []
    },
    {
      "id": 22,
      "course": "service",
      "word": "受付",
      "reading": "うけつけ",
      "meaning": {
        "id": "Penerimaan tamu / tempat pendaftaran",
        "ja": "おきゃくさまのてつづき、またはそのばしょ"
      },
      "sentence": "受付[うけつけ]はこちらです。",
      "translated": {
        "id": "Silakan melakukan pendaftaran di sini.",
        "ja": "てつづきをするばしょは、こちらです。"
      },
      "aliases": []
    },
    {
      "id": 23,
      "course": "service",
      "word": "案内",
      "reading": "あんない",
      "meaning": {
        "id": "Mengantar / memberi petunjuk",
        "ja": "ばしょなどをおしえること"
      },
      "sentence": "お部屋[へや]までご案内[あんない]します。",
      "translated": {
        "id": "Saya akan mengantar Anda ke kamar.",
        "ja": "おきゃくさまをへやまでおつれします。"
      },
      "aliases": []
    },
    {
      "id": 24,
      "course": "service",
      "word": "精算",
      "reading": "せいさん",
      "meaning": {
        "id": "Menghitung dan menyelesaikan pembayaran",
        "ja": "りょうきんをたしかめて、はらうこと"
      },
      "sentence": "こちらでご精算[せいさん]をお願[ねが]いします。",
      "translated": {
        "id": "Silakan menyelesaikan pembayaran di sini.",
        "ja": "こちらで、りょうきんをはらってください。"
      },
      "aliases": []
    },
    {
      "id": 25,
      "course": "service",
      "word": "配膳",
      "reading": "はいぜん",
      "meaning": {
        "id": "Menyajikan dan menata hidangan",
        "ja": "りょうりやしょっきをならべること"
      },
      "sentence": "夕食[ゆうしょく]の配膳[はいぜん]をお願[ねが]いします。",
      "translated": {
        "id": "Tolong siapkan dan sajikan makan malam.",
        "ja": "ゆうしょくのりょうりやしょっきを、ならべてください。"
      },
      "aliases": []
    },
    {
      "id": 26,
      "course": "service",
      "word": "下膳",
      "reading": "げぜん",
      "meaning": {
        "id": "Mengangkat peralatan makan setelah makan",
        "ja": "しょくごのしょっきをかたづけること"
      },
      "sentence": "食事[しょくじ]が終[お]わったら下膳[げぜん]してください。",
      "translated": {
        "id": "Setelah tamu selesai makan, tolong bereskan peralatan makannya.",
        "ja": "しょくじがおわったら、しょっきをかたづけてください。"
      },
      "aliases": [
        {
          "word": "下げ膳",
          "reading": "さげぜん"
        }
      ],
      "note": {
        "ja": "「げぜん」と「さげぜん」は、どちらもしょくじのあとのしょっきをかたづけることです。しせつでつかういいかたをたしかめましょう。",
        "id": "Gezen dan sagezen sama-sama berarti membereskan peralatan makan setelah makan. Pastikan istilah yang digunakan di tempat kerja Anda."
      },
      "aliasSentence": "お皿[さら]を下[さ]げてください。",
      "aliasTranslation": {
        "ja": "つかったおさらを、かたづけてください。",
        "id": "Tolong angkat piring yang sudah digunakan."
      }
    },
    {
      "id": 27,
      "course": "service",
      "word": "お品書き",
      "reading": "おしながき",
      "meaning": {
        "id": "Daftar hidangan",
        "ja": "りょうりのないようをかいたもの"
      },
      "sentence": "お品書[しなが]きをお持[も]ちします。",
      "translated": {
        "id": "Saya akan membawakan daftar hidangan.",
        "ja": "りょうりのないようをかいたものを、もってきます。"
      },
      "aliases": []
    },
    {
      "id": 28,
      "course": "service",
      "word": "アレルギー",
      "reading": "あれるぎー",
      "meaning": {
        "id": "Alergi",
        "ja": "たべものなどで、からだにしょうじょうがでること"
      },
      "sentence": "食物[しょくもつ]アレルギーはございますか。",
      "translated": {
        "id": "Apakah Anda memiliki alergi makanan?",
        "ja": "たべるとからだにアレルギーのしょうじょうがでる、たべものはありますか。"
      },
      "aliases": []
    },
    {
      "id": 29,
      "course": "service",
      "word": "大浴場",
      "reading": "だいよくじょう",
      "meaning": {
        "id": "Pemandian umum besar",
        "ja": "おおきなきょうどうのおふろ"
      },
      "sentence": "大浴場[だいよくじょう]は二階[にかい]にあります。",
      "translated": {
        "id": "Pemandian bersama yang besar berada di lantai dua.",
        "ja": "みなさんでつかうおおきなおふろは、にかいにあります。"
      },
      "aliases": []
    },
    {
      "id": 30,
      "course": "service",
      "word": "送迎",
      "reading": "そうげい",
      "meaning": {
        "id": "Antar-jemput",
        "ja": "くるまなどでおくりむかえすること"
      },
      "sentence": "駅[えき]まで送迎[そうげい]いたします。",
      "translated": {
        "id": "Kami menyediakan antar-jemput ke stasiun.",
        "ja": "くるまで、えきまでおおくりしたり、えきへおむかえにいったりします。"
      },
      "aliases": []
    }
  ]
};
