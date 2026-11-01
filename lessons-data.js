'use strict';
// Stable lesson/question/choice IDs are persisted independently of vocabulary records.
const IzuLessons = {
  "schemaVersion": 1,
  "audiences": {
    "international-staff": {
      "label": {
        "ja": "外国人[がいこくじん]スタッフ",
        "id": "Staf internasional"
      },
      "enabled": true
    },
    "japanese-staff": {
      "label": {
        "ja": "日本人[にほんじん]スタッフ",
        "id": "Staf Jepang"
      },
      "enabled": false,
      "futureTopics": [
        "plain-japanese-instructions",
        "intercultural-understanding",
        "approachable-workplace"
      ]
    }
  },
  "lessons": [
    {
      "id": "clarify",
      "audience": "international-staff",
      "skills": [
        "listen",
        "clarify",
        "respond"
      ],
      "title": {
        "ja": "仕事[しごと]の指示[しじ]がわからないとき",
        "id": "Saat instruksi kerja belum jelas"
      },
      "goal": {
        "ja": "わからない点[てん]を具体的[ぐたいてき]に聞[き]き、指示[しじ]を確認[かくにん]する。",
        "id": "Tanyakan bagian yang belum jelas secara spesifik dan pastikan instruksinya."
      },
      "speakers": {
        "senior": {
          "ja": "先輩[せんぱい]",
          "id": "Senior"
        },
        "staff": {
          "ja": "スタッフ",
          "id": "Staf"
        }
      },
      "dialogue": [
        {
          "speaker": "senior",
          "text": "この部屋[へや]を優先[ゆうせん]して、清掃[せいそう]をお願[ねが]いします。",
          "translated": {
            "ja": "この部屋[へや]を優先[ゆうせん]して、清掃[せいそう]をお願[ねが]いします。",
            "id": "Tolong dahulukan pembersihan kamar ini."
          }
        },
        {
          "speaker": "staff",
          "text": "すみません。「優先[ゆうせん]する」は、どういう意味[いみ]ですか。",
          "translated": {
            "ja": "すみません。「優先[ゆうせん]する」は、どういう意味[いみ]ですか。",
            "id": "Maaf, apa yang dimaksud dengan \"mendahulukan\"?"
          }
        },
        {
          "speaker": "senior",
          "text": "ほかの部屋[へや]より先[さき]に、この部屋[へや]を清掃[せいそう]するということです。",
          "translated": {
            "ja": "ほかの部屋[へや]より先[さき]に、この部屋[へや]を清掃[せいそう]するということです。",
            "id": "Artinya membersihkan kamar ini lebih dulu daripada kamar yang lain."
          }
        },
        {
          "speaker": "staff",
          "text": "では、この部屋[へや]から始[はじ]めればいいですか。",
          "translated": {
            "ja": "では、この部屋[へや]から始[はじ]めればいいですか。",
            "id": "Jadi, saya mulai dari kamar ini, ya?"
          }
        },
        {
          "speaker": "senior",
          "text": "はい。終[お]わったら、私[わたし]に報告[ほうこく]してください。",
          "translated": {
            "ja": "はい。終[お]わったら、私[わたし]に報告[ほうこく]してください。",
            "id": "Ya. Setelah selesai, laporkan kepada saya."
          }
        },
        {
          "speaker": "staff",
          "text": "わかりました。終[お]わったら報告[ほうこく]します。",
          "translated": {
            "ja": "わかりました。終[お]わったら報告[ほうこく]します。",
            "id": "Baik. Saya akan melapor setelah selesai."
          }
        }
      ],
      "vocabIds": [
        8,
        12,
        1,
        2
      ],
      "phrase": {
        "ja": "「〜ということですか」は、自分[じぶん]の理解[りかい]を確認[かくにん]する言[い]い方[かた]です。",
        "id": "Ungkapan \"...to iu koto desu ka\" digunakan untuk memastikan pemahaman Anda."
      },
      "quiz": {
        "id": "clarify-reply",
        "context": {
          "ja": "先輩[せんぱい]から「この部屋[へや]を優先[ゆうせん]して」と言[い]われましたが、「優先[ゆうせん]」の意味[いみ]がわかりません。",
          "id": "Senior meminta Anda mendahulukan kamar ini, tetapi Anda belum memahami arti kata tersebut."
        },
        "prompt": {
          "ja": "作業[さぎょう]を始[はじ]める前[まえ]に、どう返事[へんじ]をしますか。",
          "id": "Bagaimana Anda merespons sebelum mulai bekerja?"
        },
        "choices": [
          {
            "id": "clarify",
            "text": "すみません。「優先[ゆうせん]する」は、ほかの部屋[へや]より先[さき]にするということですか。",
            "translated": {
              "ja": "すみません。「優先[ゆうせん]する」は、ほかの部屋[へや]より先[さき]にするということですか。",
              "id": "Maaf, apakah maksudnya mengerjakan kamar ini lebih dulu daripada yang lain?"
            },
            "explanation": {
              "ja": "わからない言葉[ことば]を具体的[ぐたいてき]に挙[あ]げ、自分[じぶん]の理解[りかい]を確認[かくにん]しています。わからないまま進[すす]めず、聞[き]き直[なお]しましょう。",
              "id": "Anda menyebut kata yang belum jelas dan memeriksa pemahaman Anda. Tanyakan kembali sebelum melanjutkan."
            }
          },
          {
            "id": "agree",
            "text": "はい、わかりました。いつもの順番[じゅんばん]で進[すす]めます。",
            "translated": {
              "ja": "はい、わかりました。いつもの順番[じゅんばん]で進[すす]めます。",
              "id": "Baik, saya mengerti. Saya akan mengikuti urutan seperti biasa."
            },
            "explanation": {
              "ja": "いつもの順番[じゅんばん]では、指示[しじ]と違[ちが]う可能性[かのうせい]があります。わかったふりをせず、順番[じゅんばん]を確認[かくにん]しましょう。",
              "id": "Urutan biasa mungkin berbeda dari instruksi. Jangan mengaku paham; pastikan urutannya."
            }
          },
          {
            "id": "delay",
            "text": "今[いま]の作業[さぎょう]が終[お]わってから、この部屋[へや]に入[はい]ります。",
            "translated": {
              "ja": "今[いま]の作業[さぎょう]が終[お]わってから、この部屋[へや]に入[はい]ります。",
              "id": "Saya akan mengerjakan kamar ini setelah pekerjaan yang sedang saya lakukan selesai."
            },
            "explanation": {
              "ja": "先[さき]にする作業[さぎょう]を自分[じぶん]だけで決[き]めています。何[なに]を先[さき]にするか聞[き]きましょう。",
              "id": "Anda menentukan prioritas sendiri. Tanyakan pekerjaan mana yang harus dilakukan lebih dulu."
            }
          },
          {
            "id": "delegate",
            "text": "その部屋[へや]は、ほかの人[ひと]にお願[ねが]いしてもいいですか。",
            "translated": {
              "ja": "その部屋[へや]は、ほかの人[ひと]にお願[ねが]いしてもいいですか。",
              "id": "Bolehkah saya meminta orang lain mengerjakan kamar itu?"
            },
            "explanation": {
              "ja": "担当[たんとう]を変[か]える相談[そうだん]になっています。まず、わからない指示[しじ]の意味[いみ]を確認[かくにん]しましょう。",
              "id": "Ini membahas pengalihan tugas, bukan arti instruksi. Pastikan arti instruksinya dahulu."
            }
          }
        ],
        "answerId": "clarify"
      }
    },
    {
      "id": "cleaning",
      "audience": "international-staff",
      "skills": [
        "listen",
        "clarify",
        "respond"
      ],
      "title": {
        "ja": "客室清掃[きゃくしつせいそう]が終[お]わったとき",
        "id": "Setelah pembersihan kamar selesai"
      },
      "goal": {
        "ja": "部屋番号[へやばんごう]と完了[かんりょう]した作業[さぎょう]を報告[ほうこく]する。",
        "id": "Laporkan nomor kamar dan pekerjaan yang sudah selesai."
      },
      "speakers": {
        "senior": {
          "ja": "先輩[せんぱい]",
          "id": "Senior"
        },
        "staff": {
          "ja": "スタッフ",
          "id": "Staf"
        }
      },
      "dialogue": [
        {
          "speaker": "staff",
          "text": "先輩[せんぱい]、203号室[ごうしつ]の清掃[せいそう]が終[お]わりました。",
          "translated": {
            "ja": "先輩[せんぱい]、203号室[ごうしつ]の清掃[せいそう]が終[お]わりました。",
            "id": "Pembersihan kamar 203 sudah selesai."
          }
        },
        {
          "speaker": "senior",
          "text": "お疲[つか]れさまです。備品[びひん]の補充[ほじゅう]も終[お]わっていますか。",
          "translated": {
            "ja": "お疲[つか]れさまです。備品[びひん]の補充[ほじゅう]も終[お]わっていますか。",
            "id": "Terima kasih atas kerjanya. Apakah perlengkapannya juga sudah diisi ulang?"
          }
        },
        {
          "speaker": "staff",
          "text": "はい。タオルとアメニティを補充[ほじゅう]しました。確認[かくにん]をお願[ねが]いします。",
          "translated": {
            "ja": "はい。タオルとアメニティを補充[ほじゅう]しました。確認[かくにん]をお願[ねが]いします。",
            "id": "Ya. Saya sudah mengisi ulang handuk dan amenitas. Mohon diperiksa."
          }
        },
        {
          "speaker": "senior",
          "text": "わかりました。私[わたし]が確認[かくにん]します。",
          "translated": {
            "ja": "わかりました。私[わたし]が確認[かくにん]します。",
            "id": "Baik, saya akan memeriksanya."
          }
        },
        {
          "speaker": "staff",
          "text": "確認[かくにん]が終[お]わるまで、次[つぎ]の部屋[へや]を清掃[せいそう]してもいいですか。",
          "translated": {
            "ja": "確認[かくにん]が終[お]わるまで、次[つぎ]の部屋[へや]を清掃[せいそう]してもいいですか。",
            "id": "Bolehkah saya membersihkan kamar berikutnya sambil menunggu pemeriksaan selesai?"
          }
        },
        {
          "speaker": "senior",
          "text": "はい、204号室[ごうしつ]をお願[ねが]いします。",
          "translated": {
            "ja": "はい、204号室[ごうしつ]をお願[ねが]いします。",
            "id": "Ya, tolong bersihkan kamar 204."
          }
        }
      ],
      "vocabIds": [
        11,
        12,
        13,
        14,
        1
      ],
      "phrase": {
        "ja": "「確認[かくにん]をお願[ねが]いします」で、次[つぎ]にしてほしいことも伝[つた]えます。",
        "id": "Dengan \"kakunin o onegai shimasu\", Anda juga menyampaikan tindakan selanjutnya yang diperlukan."
      },
      "quiz": {
        "id": "cleaning-reply",
        "context": {
          "ja": "203号室[ごうしつ]の清掃[せいそう]と備品[びひん]の補充[ほじゅう]が終[お]わりました。先輩[せんぱい]の確認[かくにん]はまだです。",
          "id": "Pembersihan dan pengisian perlengkapan kamar 203 selesai, tetapi senior belum memeriksanya."
        },
        "prompt": {
          "ja": "先輩[せんぱい]に、どう報告[ほうこく]しますか。",
          "id": "Bagaimana Anda melaporkannya kepada senior?"
        },
        "choices": [
          {
            "id": "complete",
            "text": "203号室[ごうしつ]の清掃[せいそう]と補充[ほじゅう]が終[お]わりました。確認[かくにん]をお願[ねが]いします。",
            "translated": {
              "ja": "203号室[ごうしつ]の清掃[せいそう]と補充[ほじゅう]が終[お]わりました。確認[かくにん]をお願[ねが]いします。",
              "id": "Pembersihan dan pengisian perlengkapan kamar 203 selesai. Mohon diperiksa."
            },
            "explanation": {
              "ja": "部屋番号[へやばんごう]と終[お]わった作業[さぎょう]が具体的[ぐたいてき]です。まだ受[う]けていない確認[かくにん]も依頼[いらい]しています。",
              "id": "Anda menyebut nomor kamar dan pekerjaan yang selesai, serta meminta pemeriksaan yang belum dilakukan."
            }
          },
          {
            "id": "ready",
            "text": "203号室[ごうしつ]は、お客様[きゃくさま]をご案内[あんない]できます。",
            "translated": {
              "ja": "203号室[ごうしつ]は、お客様[きゃくさま]をご案内[あんない]できます。",
              "id": "Kamar 203 sudah bisa digunakan untuk menerima tamu."
            },
            "explanation": {
              "ja": "先輩[せんぱい]の確認[かくにん]がまだなので、案内[あんない]できるとは決[き]められません。終[お]わった作業[さぎょう]を伝[つた]えましょう。",
              "id": "Senior belum memeriksa kamar. Laporkan pekerjaan yang selesai tanpa memutuskan sendiri bahwa kamar siap menerima tamu."
            }
          },
          {
            "id": "vague",
            "text": "終[お]わりましたので、次[つぎ]に行[い]きます。",
            "translated": {
              "ja": "終[お]わりましたので、次[つぎ]に行[い]きます。",
              "id": "Sudah selesai, saya akan lanjut."
            },
            "explanation": {
              "ja": "どの部屋[へや]の何[なに]が終[お]わったかが伝[つた]わりません。部屋番号[へやばんごう]と作業[さぎょう]を伝[つた]えましょう。",
              "id": "Belum jelas kamar dan pekerjaan mana yang selesai. Sebutkan nomor kamar dan pekerjaannya."
            }
          },
          {
            "id": "unchecked",
            "text": "203号室[ごうしつ]の確認[かくにん]も終[お]わりました。",
            "translated": {
              "ja": "203号室[ごうしつ]の確認[かくにん]も終[お]わりました。",
              "id": "Pemeriksaan kamar 203 juga sudah selesai."
            },
            "explanation": {
              "ja": "先輩[せんぱい]の確認[かくにん]はまだです。実際[じっさい]に終[お]わったことだけを報告[ほうこく]しましょう。",
              "id": "Pemeriksaan senior belum dilakukan. Laporkan hanya hal yang benar-benar sudah selesai."
            }
          }
        ],
        "answerId": "complete"
      }
    },
    {
      "id": "lost-property",
      "audience": "international-staff",
      "skills": [
        "listen",
        "clarify",
        "respond"
      ],
      "title": {
        "ja": "お客様[きゃくさま]の忘[わす]れ物[もの]を発見[はっけん]したとき",
        "id": "Saat menemukan barang tamu yang tertinggal"
      },
      "goal": {
        "ja": "見[み]つけた場所[ばしょ]と物[もの]を伝[つた]え、対応[たいおう]を確認[かくにん]する。",
        "id": "Sampaikan lokasi dan barang yang ditemukan, lalu pastikan cara penanganannya."
      },
      "speakers": {
        "senior": {
          "ja": "先輩[せんぱい]",
          "id": "Senior"
        },
        "staff": {
          "ja": "スタッフ",
          "id": "Staf"
        }
      },
      "dialogue": [
        {
          "speaker": "staff",
          "text": "先輩[せんぱい]、205号室[ごうしつ]の机[つくえ]の上[うえ]に、腕時計[うでどけい]の忘[わす]れ物[もの]がありました。",
          "translated": {
            "ja": "先輩[せんぱい]、205号室[ごうしつ]の机[つくえ]の上[うえ]に、腕時計[うでどけい]の忘[わす]れ物[もの]がありました。",
            "id": "Saya menemukan jam tangan yang tertinggal di atas meja kamar 205."
          }
        },
        {
          "speaker": "senior",
          "text": "わかりました。まだ、そのままにしてありますか。",
          "translated": {
            "ja": "わかりました。まだ、そのままにしてありますか。",
            "id": "Baik. Apakah barangnya masih di tempat ditemukan?"
          }
        },
        {
          "speaker": "staff",
          "text": "はい。どうすればいいですか。",
          "translated": {
            "ja": "はい。どうすればいいですか。",
            "id": "Ya. Apa yang sebaiknya saya lakukan?"
          }
        },
        {
          "speaker": "senior",
          "text": "部屋番号[へやばんごう]と見[み]つけた場所[ばしょ]をメモして、フロントに連絡[れんらく]してください。",
          "translated": {
            "ja": "部屋番号[へやばんごう]と見[み]つけた場所[ばしょ]をメモして、フロントに連絡[れんらく]してください。",
            "id": "Catat nomor kamar dan lokasi ditemukannya, lalu hubungi resepsionis."
          }
        },
        {
          "speaker": "staff",
          "text": "205号室[ごうしつ]の机[つくえ]の上[うえ]ですね。連絡[れんらく]してから、取[と]り扱[あつか]いを確認[かくにん]します。",
          "translated": {
            "ja": "205号室[ごうしつ]の机[つくえ]の上[うえ]ですね。連絡[れんらく]してから、取[と]り扱[あつか]いを確認[かくにん]します。",
            "id": "Di atas meja kamar 205, ya. Saya akan menghubungi resepsionis dan memastikan cara penanganannya."
          }
        },
        {
          "speaker": "senior",
          "text": "お願[ねが]いします。施設[しせつ]の忘[わす]れ物[もの]の手順[てじゅん]に沿[そ]って対応[たいおう]しましょう。",
          "translated": {
            "ja": "お願[ねが]いします。施設[しせつ]の忘[わす]れ物[もの]の手順[てじゅん]に沿[そ]って対応[たいおう]しましょう。",
            "id": "Terima kasih. Mari ikuti prosedur barang tertinggal di fasilitas ini."
          }
        }
      ],
      "vocabIds": [
        18,
        3,
        1
      ],
      "phrase": {
        "ja": "忘[わす]れ物[もの]の保管[ほかん]・連絡[れんらく]の方法[ほうほう]は、施設[しせつ]の手順[てじゅん]を確認[かくにん]します。",
        "id": "Pastikan prosedur fasilitas untuk penyimpanan dan pelaporan barang tertinggal."
      },
      "quiz": {
        "id": "lost-property-reply",
        "context": {
          "ja": "退室後[たいしつご]の205号室[ごうしつ]で腕時計[うでどけい]を見[み]つけました。誰[だれ]の物[もの]かは、まだ確認[かくにん]できていません。",
          "id": "Anda menemukan jam tangan di kamar 205 setelah tamu keluar, tetapi pemiliknya belum dipastikan."
        },
        "prompt": {
          "ja": "最初[さいしょ]に、どう伝[つた]えますか。",
          "id": "Apa yang Anda sampaikan pertama kali?"
        },
        "choices": [
          {
            "id": "report",
            "text": "205号室[ごうしつ]の机[つくえ]の上[うえ]に腕時計[うでどけい]がありました。対応[たいおう]を確認[かくにん]してもいいですか。",
            "translated": {
              "ja": "205号室[ごうしつ]の机[つくえ]の上[うえ]に腕時計[うでどけい]がありました。対応[たいおう]を確認[かくにん]してもいいですか。",
              "id": "Ada jam tangan di atas meja kamar 205. Bolehkah saya memastikan cara menanganinya?"
            },
            "explanation": {
              "ja": "場所[ばしょ]と物[もの]を具体的[ぐたいてき]に伝[つた]え、持[も]ち主[ぬし]を決[き]めつけずに対応[たいおう]を確認[かくにん]しています。",
              "id": "Anda menyebut lokasi dan barang secara spesifik serta memastikan penanganannya tanpa menebak pemiliknya."
            }
          },
          {
            "id": "guess",
            "text": "205号室[ごうしつ]のお客様[きゃくさま]の時計[とけい]なので、私[わたし]から電話[でんわ]します。",
            "translated": {
              "ja": "205号室[ごうしつ]のお客様[きゃくさま]の時計[とけい]なので、私[わたし]から電話[でんわ]します。",
              "id": "Karena ini jam tamu kamar 205, saya akan meneleponnya sendiri."
            },
            "explanation": {
              "ja": "持[も]ち主[ぬし]はまだ確認[かくにん]できていません。自分[じぶん]で連絡[れんらく]を決[き]めず、施設[しせつ]の手順[てじゅん]を確認[かくにん]しましょう。",
              "id": "Pemilik belum dipastikan. Jangan memutuskan sendiri untuk menghubunginya; pastikan prosedur fasilitas."
            }
          },
          {
            "id": "wait",
            "text": "忘[わす]れ物[もの]がありました。お客様[きゃくさま]から連絡[れんらく]があるまで待[ま]ちます。",
            "translated": {
              "ja": "忘[わす]れ物[もの]がありました。お客様[きゃくさま]から連絡[れんらく]があるまで待[ま]ちます。",
              "id": "Ada barang tertinggal. Saya akan menunggu tamu menghubungi kita."
            },
            "explanation": {
              "ja": "場所[ばしょ]と物[もの]が不明[ふめい]で、報告[ほうこく]も遅[おく]れてしまいます。見[み]つけた時点[じてん]で具体的[ぐたいてき]に伝[つた]えましょう。",
              "id": "Lokasi dan barang belum jelas, dan laporan bisa terlambat. Sampaikan secara spesifik saat ditemukan."
            }
          },
          {
            "id": "move",
            "text": "ほかの物[もの]と一緒[いっしょ]に、清掃用[せいそうよう]のカートに入[い]れておきます。",
            "translated": {
              "ja": "ほかの物[もの]と一緒[いっしょ]に、清掃用[せいそうよう]のカートに入[い]れておきます。",
              "id": "Saya akan menaruhnya di troli pembersih bersama barang lain."
            },
            "explanation": {
              "ja": "取[と]り扱[あつか]いを確認[かくにん]する前[まえ]に移動[いどう]させると、見[み]つけた場所[ばしょ]がわからなくなることがあります。先[さき]に報告[ほうこく]しましょう。",
              "id": "Memindahkan sebelum memastikan penanganannya dapat membuat lokasi penemuan tidak jelas. Laporkan dahulu."
            }
          }
        ],
        "answerId": "report"
      }
    },
    {
      "id": "serving",
      "audience": "international-staff",
      "skills": [
        "listen",
        "clarify",
        "respond"
      ],
      "title": {
        "ja": "レストランで配膳[はいぜん]の指示[しじ]を受[う]けたとき",
        "id": "Saat menerima instruksi penyajian di restoran"
      },
      "goal": {
        "ja": "品物[しなもの]と場所[ばしょ]、注意点[ちゅういてん]を確認[かくにん]して返事[へんじ]をする。",
        "id": "Pastikan barang, tujuan, dan hal yang perlu diperhatikan sebelum merespons."
      },
      "speakers": {
        "senior": {
          "ja": "先輩[せんぱい]",
          "id": "Senior"
        },
        "staff": {
          "ja": "スタッフ",
          "id": "Staf"
        }
      },
      "dialogue": [
        {
          "speaker": "senior",
          "text": "この料理[りょうり]を、3番[ばん]テーブルにお願[ねが]いします。",
          "translated": {
            "ja": "この料理[りょうり]を、3番[ばん]テーブルにお願[ねが]いします。",
            "id": "Tolong bawa hidangan ini ke meja nomor 3."
          }
        },
        {
          "speaker": "staff",
          "text": "3番[ばん]テーブルですね。こちらの二[ふた]つを運[はこ]べばいいですか。",
          "translated": {
            "ja": "3番[ばん]テーブルですね。こちらの二[ふた]つを運[はこ]べばいいですか。",
            "id": "Meja nomor 3, ya. Apakah saya membawa dua hidangan ini?"
          }
        },
        {
          "speaker": "senior",
          "text": "はい。お皿[さら]が熱[あつ]いので、気[き]をつけてください。",
          "translated": {
            "ja": "はい。お皿[さら]が熱[あつ]いので、気[き]をつけてください。",
            "id": "Ya. Hati-hati, piringnya panas."
          }
        },
        {
          "speaker": "staff",
          "text": "わかりました。お客様[きゃくさま]にも、お皿[さら]が熱[あつ]いことをお伝[つた]えします。",
          "translated": {
            "ja": "わかりました。お客様[きゃくさま]にも、お皿[さら]が熱[あつ]いことをお伝[つた]えします。",
            "id": "Baik. Saya juga akan memberi tahu tamu bahwa piringnya panas."
          }
        },
        {
          "speaker": "senior",
          "text": "お願[ねが]いします。配膳[はいぜん]が終[お]わったら、こちらに戻[もど]ってください。",
          "translated": {
            "ja": "お願[ねが]いします。配膳[はいぜん]が終[お]わったら、こちらに戻[もど]ってください。",
            "id": "Terima kasih. Setelah selesai menyajikan, silakan kembali ke sini."
          }
        },
        {
          "speaker": "staff",
          "text": "はい。3番[ばん]テーブルに配膳[はいぜん]してから、戻[もど]ります。",
          "translated": {
            "ja": "はい。3番[ばん]テーブルに配膳[はいぜん]してから、戻[もど]ります。",
            "id": "Baik. Setelah menyajikan ke meja nomor 3, saya akan kembali."
          }
        }
      ],
      "vocabIds": [
        25,
        5,
        1
      ],
      "phrase": {
        "ja": "「〜ですね」と繰[く]り返[かえ]すと、聞[き]き間違[まちが]いに気[き]づきやすくなります。",
        "id": "Mengulangi instruksi dengan \"...desu ne\" membantu menemukan kesalahan saat mendengar."
      },
      "quiz": {
        "id": "serving-reply",
        "context": {
          "ja": "先輩[せんぱい]から「この二[ふた]つを3番[ばん]テーブルへ。お皿[さら]が熱[あつ]いので気[き]をつけて」と指示[しじ]されました。",
          "id": "Senior meminta Anda membawa dua hidangan ke meja 3 dan mengingatkan bahwa piringnya panas."
        },
        "prompt": {
          "ja": "指示[しじ]を確認[かくにん]し、注意点[ちゅういてん]も伝[つた]える返事[へんじ]はどれですか。",
          "id": "Respons mana yang memastikan instruksi sekaligus menyampaikan hal yang perlu diperhatikan?"
        },
        "choices": [
          {
            "id": "repeat",
            "text": "この二[ふた]つを3番[ばん]テーブルへ運[はこ]びます。お皿[さら]が熱[あつ]いことも、お客様[きゃくさま]にお伝[つた]えします。",
            "translated": {
              "ja": "この二[ふた]つを3番[ばん]テーブルへ運[はこ]びます。お皿[さら]が熱[あつ]いことも、お客様[きゃくさま]にお伝[つた]えします。",
              "id": "Saya akan membawa dua hidangan ini ke meja 3 dan memberi tahu tamu bahwa piringnya panas."
            },
            "explanation": {
              "ja": "品物[しなもの]と行[い]き先[さき]を繰[く]り返[かえ]し、熱[あつ]いお皿[さら]への注意[ちゅうい]も伝[つた]えています。",
              "id": "Anda mengulangi barang dan tujuan serta menyampaikan perhatian terhadap piring panas."
            }
          },
          {
            "id": "table",
            "text": "3番[ばん]テーブルですね。空[あ]いているお皿[さら]を下[さ]げてきます。",
            "translated": {
              "ja": "3番[ばん]テーブルですね。空[あ]いているお皿[さら]を下[さ]げてきます。",
              "id": "Meja 3, ya. Saya akan membereskan piring yang sudah digunakan."
            },
            "explanation": {
              "ja": "配膳[はいぜん]の指示[しじ]なのに、下膳[げぜん]の返事[へんじ]になっています。する作業[さぎょう]も確認[かくにん]しましょう。",
              "id": "Instruksinya menyajikan, tetapi Anda merespons dengan membereskan piring. Pastikan jenis pekerjaannya juga."
            }
          },
          {
            "id": "cool",
            "text": "この二[ふた]つですね。冷[さ]めるまで待[ま]ってから運[はこ]びます。",
            "translated": {
              "ja": "この二[ふた]つですね。冷[さ]めるまで待[ま]ってから運[はこ]びます。",
              "id": "Dua hidangan ini, ya. Saya akan menunggu sampai dingin sebelum membawanya."
            },
            "explanation": {
              "ja": "熱[あつ]いので注意[ちゅうい]する指示[しじ]を、料理[りょうり]が冷[さ]めるまで待[ま]つことに変[か]えています。運[はこ]び方[かた]に不安[ふあん]があれば相談[そうだん]しましょう。",
              "id": "Anda mengubah peringatan agar berhati-hati menjadi menunggu hidangan dingin. Jika ragu cara membawanya, konsultasikan."
            }
          },
          {
            "id": "number",
            "text": "この二[ふた]つを2番[ばん]テーブルへ運[はこ]びます。熱[あつ]いこともお伝[つた]えします。",
            "translated": {
              "ja": "この二[ふた]つを2番[ばん]テーブルへ運[はこ]びます。熱[あつ]いこともお伝[つた]えします。",
              "id": "Saya akan membawa dua hidangan ini ke meja 2 dan memberi tahu tamu bahwa piringnya panas."
            },
            "explanation": {
              "ja": "注意点[ちゅういてん]は伝[つた]わっていますが、テーブル番号[ばんごう]が違[ちが]います。行[い]き先[さき]も正確[せいかく]に確認[かくにん]しましょう。",
              "id": "Peringatannya sudah benar, tetapi nomor mejanya salah. Pastikan tujuan dengan tepat."
            }
          }
        ],
        "answerId": "repeat"
      }
    },
    {
      "id": "equipment",
      "audience": "international-staff",
      "skills": [
        "listen",
        "clarify",
        "respond"
      ],
      "title": {
        "ja": "客室設備[きゃくしつせつび]の故障[こしょう]を発見[はっけん]したとき",
        "id": "Saat menemukan kerusakan fasilitas kamar"
      },
      "goal": {
        "ja": "場所[ばしょ]と確認[かくにん]できた状態[じょうたい]を伝[つた]え、対応[たいおう]を相談[そうだん]する。",
        "id": "Sebutkan lokasi dan kondisi yang Anda amati, lalu konsultasikan penanganannya."
      },
      "speakers": {
        "senior": {
          "ja": "先輩[せんぱい]",
          "id": "Senior"
        },
        "staff": {
          "ja": "スタッフ",
          "id": "Staf"
        }
      },
      "dialogue": [
        {
          "speaker": "staff",
          "text": "先輩[せんぱい]、206号室[ごうしつ]のエアコンに異常[いじょう]があります。電源[でんげん]が入[はい]りません。",
          "translated": {
            "ja": "先輩[せんぱい]、206号室[ごうしつ]のエアコンに異常[いじょう]があります。電源[でんげん]が入[はい]りません。",
            "id": "AC di kamar 206 bermasalah dan tidak dapat dinyalakan."
          }
        },
        {
          "speaker": "senior",
          "text": "リモコンを操作[そうさ]しても動[うご]きませんか。",
          "translated": {
            "ja": "リモコンを操作[そうさ]しても動[うご]きませんか。",
            "id": "Apakah tetap tidak berfungsi saat dioperasikan dengan remote?"
          }
        },
        {
          "speaker": "staff",
          "text": "はい。操作[そうさ]しても動[うご]きません。どう対応[たいおう]すればいいですか。",
          "translated": {
            "ja": "はい。操作[そうさ]しても動[うご]きません。どう対応[たいおう]すればいいですか。",
            "id": "Ya, tetap tidak berfungsi. Bagaimana sebaiknya saya menanganinya?"
          }
        },
        {
          "speaker": "senior",
          "text": "フロントに連絡[れんらく]してください。私[わたし]から設備担当[せつびたんとう]にも相談[そうだん]します。",
          "translated": {
            "ja": "フロントに連絡[れんらく]してください。私[わたし]から設備担当[せつびたんとう]にも相談[そうだん]します。",
            "id": "Tolong hubungi resepsionis. Saya juga akan menghubungi petugas fasilitas."
          }
        },
        {
          "speaker": "staff",
          "text": "わかりました。206号室[ごうしつ]のエアコンが動[うご]かないと報告[ほうこく]します。",
          "translated": {
            "ja": "わかりました。206号室[ごうしつ]のエアコンが動[うご]かないと報告[ほうこく]します。",
            "id": "Baik, saya akan melaporkan bahwa AC kamar 206 tidak berfungsi."
          }
        },
        {
          "speaker": "senior",
          "text": "お願[ねが]いします。自分[じぶん]で分解[ぶんかい]せず、担当者[たんとうしゃ]の対応[たいおう]を待[ま]ってください。",
          "translated": {
            "ja": "お願[ねが]いします。自分[じぶん]で分解[ぶんかい]せず、担当者[たんとうしゃ]の対応[たいおう]を待[ま]ってください。",
            "id": "Terima kasih. Jangan membongkarnya sendiri; tunggu penanganan petugas yang bertanggung jawab."
          }
        }
      ],
      "vocabIds": [
        10,
        3,
        4,
        2
      ],
      "phrase": {
        "ja": "「電源[でんげん]が入[はい]りません」は、機械[きかい]をつけられない状態[じょうたい]を伝[つた]える言[い]い方[かた]です。",
        "id": "\"Dengen ga hairimasen\" berarti perangkat tidak dapat dinyalakan."
      },
      "quiz": {
        "id": "equipment-reply",
        "context": {
          "ja": "206号室[ごうしつ]でリモコンを操作[そうさ]しても、エアコンが動[うご]きません。原因[げんいん]はわかりません。",
          "id": "AC kamar 206 tidak berfungsi meskipun remote dioperasikan. Penyebabnya belum diketahui."
        },
        "prompt": {
          "ja": "先輩[せんぱい]への報告[ほうこく]として、最[もっと]も適切[てきせつ]なのはどれですか。",
          "id": "Laporan mana yang paling tepat disampaikan kepada senior?"
        },
        "choices": [
          {
            "id": "condition",
            "text": "206号室[ごうしつ]のエアコンが、リモコンを操作[そうさ]しても動[うご]きません。対応[たいおう]を相談[そうだん]したいです。",
            "translated": {
              "ja": "206号室[ごうしつ]のエアコンが、リモコンを操作[そうさ]しても動[うご]きません。対応[たいおう]を相談[そうだん]したいです。",
              "id": "AC kamar 206 tidak berfungsi meskipun saya mengoperasikan remote. Saya ingin berkonsultasi tentang penanganannya."
            },
            "explanation": {
              "ja": "部屋番号[へやばんごう]と確認[かくにん]した状態[じょうたい]を伝[つた]えています。原因[げんいん]を決[き]めつけず、対応[たいおう]を相談[そうだん]しましょう。",
              "id": "Anda menyebut nomor kamar dan kondisi yang diamati. Jangan menebak penyebabnya; konsultasikan penanganannya."
            }
          },
          {
            "id": "battery",
            "text": "206号室[ごうしつ]はリモコンの電池切[でんちぎ]れです。交換[こうかん]すれば使[つか]えます。",
            "translated": {
              "ja": "206号室[ごうしつ]はリモコンの電池切[でんちぎ]れです。交換[こうかん]すれば使[つか]えます。",
              "id": "Baterai remote kamar 206 habis. AC akan berfungsi setelah baterainya diganti."
            },
            "explanation": {
              "ja": "電池切[でんちぎ]れとは、まだ確認[かくにん]できていません。確認[かくにん]した状態[じょうたい]を伝[つた]えましょう。",
              "id": "Belum dipastikan bahwa baterainya habis. Laporkan kondisi yang sudah Anda amati."
            }
          },
          {
            "id": "later",
            "text": "206号室[ごうしつ]のエアコンが動[うご]かないので、清掃[せいそう]が全部[ぜんぶ]終[お]わったら連絡[れんらく]します。",
            "translated": {
              "ja": "206号室[ごうしつ]のエアコンが動[うご]かないので、清掃[せいそう]が全部[ぜんぶ]終[お]わったら連絡[れんらく]します。",
              "id": "AC kamar 206 tidak berfungsi. Saya akan melapor setelah semua pembersihan selesai."
            },
            "explanation": {
              "ja": "対応[たいおう]が遅[おく]れると、お客様[きゃくさま]の案内[あんない]に影響[えいきょう]することがあります。見[み]つけた時点[じてん]で報告[ほうこく]しましょう。",
              "id": "Menunda laporan dapat memengaruhi kesiapan kamar untuk tamu. Laporkan saat masalah ditemukan."
            }
          },
          {
            "id": "repair",
            "text": "206号室[ごうしつ]のエアコンが動[うご]きません。カバーを外[はず]して確認[かくにん]します。",
            "translated": {
              "ja": "206号室[ごうしつ]のエアコンが動[うご]きません。カバーを外[はず]して確認[かくにん]します。",
              "id": "AC kamar 206 tidak berfungsi. Saya akan membuka penutupnya untuk memeriksa."
            },
            "explanation": {
              "ja": "担当[たんとう]でない修理[しゅうり]を自分[じぶん]で始[はじ]めず、状態[じょうたい]を伝[つた]えて指示[しじ]を受[う]けましょう。",
              "id": "Jangan mulai memperbaiki sendiri di luar tugas Anda. Laporkan kondisinya dan minta instruksi."
            }
          }
        ],
        "answerId": "condition"
      }
    },
    {
      "id": "health",
      "audience": "international-staff",
      "skills": [
        "listen",
        "clarify",
        "respond"
      ],
      "title": {
        "ja": "体調[たいちょう]が悪[わる]く、先輩[せんぱい]に相談[そうだん]するとき",
        "id": "Saat berkonsultasi dengan senior karena kurang sehat"
      },
      "goal": {
        "ja": "今[いま]の体調[たいちょう]と仕事[しごと]への影響[えいきょう]を具体的[ぐたいてき]に伝[つた]える。",
        "id": "Sampaikan kondisi Anda saat ini dan dampaknya terhadap pekerjaan secara spesifik."
      },
      "speakers": {
        "senior": {
          "ja": "先輩[せんぱい]",
          "id": "Senior"
        },
        "staff": {
          "ja": "スタッフ",
          "id": "Staf"
        }
      },
      "dialogue": [
        {
          "speaker": "staff",
          "text": "先輩[せんぱい]、少[すこ]し相談[そうだん]してもいいですか。",
          "translated": {
            "ja": "先輩[せんぱい]、少[すこ]し相談[そうだん]してもいいですか。",
            "id": "Bolehkah saya berkonsultasi sebentar?"
          }
        },
        {
          "speaker": "senior",
          "text": "はい、どうしましたか。",
          "translated": {
            "ja": "はい、どうしましたか。",
            "id": "Tentu. Ada apa?"
          }
        },
        {
          "speaker": "staff",
          "text": "さっきからめまいがして、立[た]っているのがつらいです。少[すこ]し休[やす]んでもいいですか。",
          "translated": {
            "ja": "さっきからめまいがして、立[た]っているのがつらいです。少[すこ]し休[やす]んでもいいですか。",
            "id": "Sejak tadi saya merasa pusing dan sulit berdiri. Bolehkah saya beristirahat sebentar?"
          }
        },
        {
          "speaker": "senior",
          "text": "無理[むり]をしないでください。座[すわ]れる場所[ばしょ]で休[やす]みましょう。責任者[せきにんしゃ]にも連絡[れんらく]します。",
          "translated": {
            "ja": "無理[むり]をしないでください。座[すわ]れる場所[ばしょ]で休[やす]みましょう。責任者[せきにんしゃ]にも連絡[れんらく]します。",
            "id": "Jangan memaksakan diri. Mari beristirahat di tempat Anda bisa duduk. Saya juga akan menghubungi penanggung jawab."
          }
        },
        {
          "speaker": "staff",
          "text": "ありがとうございます。今[いま]、配膳[はいぜん]の途中[とちゅう]です。残[のこ]りの作業[さぎょう]をお願[ねが]いできますか。",
          "translated": {
            "ja": "ありがとうございます。今[いま]、配膳[はいぜん]の途中[とちゅう]です。残[のこ]りの作業[さぎょう]をお願[ねが]いできますか。",
            "id": "Terima kasih. Saya sedang menyajikan makanan. Bisakah pekerjaan yang tersisa ditangani orang lain?"
          }
        },
        {
          "speaker": "senior",
          "text": "はい、こちらで引[ひ]き継[つ]ぎます。まずは休[やす]んでください。",
          "translated": {
            "ja": "はい、こちらで引[ひ]き継[つ]ぎます。まずは休[やす]んでください。",
            "id": "Ya, kami akan mengambil alih. Silakan beristirahat dahulu."
          }
        }
      ],
      "vocabIds": [
        4,
        3,
        25
      ],
      "phrase": {
        "ja": "「体調[たいちょう]が悪[わる]い」は、体[からだ]の調子[ちょうし]がよくないという意味[いみ]です。この会話[かいわ]は診断[しんだん]や医療[いりょう]の指示[しじ]ではありません。",
        "id": "\"Taichou ga warui\" berarti kondisi tubuh kurang baik. Percakapan ini bukan diagnosis atau petunjuk medis."
      },
      "quiz": {
        "id": "health-reply",
        "context": {
          "ja": "配膳中[はいぜんちゅう]にめまいがして、立[た]っているのがつらくなりました。先輩[せんぱい]に相談[そうだん]します。",
          "id": "Saat menyajikan makanan, Anda merasa pusing dan sulit berdiri. Anda berkonsultasi dengan senior."
        },
        "prompt": {
          "ja": "今[いま]の状態[じょうたい]と必要[ひつよう]な対応[たいおう]を伝[つた]えるには、どう言[い]いますか。",
          "id": "Bagaimana Anda menyampaikan kondisi saat ini dan bantuan yang diperlukan?"
        },
        "choices": [
          {
            "id": "explain",
            "text": "めまいがして、立[た]っているのがつらいです。休[やす]んでもいいですか。残[のこ]りの配膳[はいぜん]も相談[そうだん]したいです。",
            "translated": {
              "ja": "めまいがして、立[た]っているのがつらいです。休[やす]んでもいいですか。残[のこ]りの配膳[はいぜん]も相談[そうだん]したいです。",
              "id": "Saya pusing dan sulit berdiri. Bolehkah saya beristirahat? Saya juga ingin membahas pekerjaan penyajian yang tersisa."
            },
            "explanation": {
              "ja": "症状[しょうじょう]と仕事[しごと]への影響[えいきょう]を具体的[ぐたいてき]に伝[つた]え、休憩[きゅうけい]と引[ひ]き継[つ]ぎを相談[そうだん]しています。",
              "id": "Anda menjelaskan gejala dan dampaknya pada pekerjaan serta berkonsultasi tentang istirahat dan pengalihan tugas."
            }
          },
          {
            "id": "continue",
            "text": "めまいがしますが、配膳[はいぜん]が終[お]わるまでは続[つづ]けます。",
            "translated": {
              "ja": "めまいがしますが、配膳[はいぜん]が終[お]わるまでは続[つづ]けます。",
              "id": "Saya pusing, tetapi akan melanjutkan sampai penyajian selesai."
            },
            "explanation": {
              "ja": "立[た]っているのがつらい状態[じょうたい]で作業[さぎょう]を続[つづ]けず、まず状態[じょうたい]を伝[つた]えて休[やす]む相談[そうだん]をしましょう。",
              "id": "Jika sulit berdiri, jangan memaksakan pekerjaan. Jelaskan kondisi Anda dan konsultasikan istirahat dahulu."
            }
          },
          {
            "id": "vague",
            "text": "今日[きょう]は体調[たいちょう]がよくありません。残[のこ]りはいつもどおりで大丈夫[だいじょうぶ]です。",
            "translated": {
              "ja": "今日[きょう]は体調[たいちょう]がよくありません。残[のこ]りはいつもどおりで大丈夫[だいじょうぶ]です。",
              "id": "Hari ini saya kurang sehat. Pekerjaan sisanya bisa tetap seperti biasa."
            },
            "explanation": {
              "ja": "どんな状態[じょうたい]か、何[なに]に困[こま]っているかが伝[つた]わりません。めまいと、立[た]つのがつらいことを伝[つた]えましょう。",
              "id": "Kondisi dan kesulitan Anda belum jelas. Sampaikan bahwa Anda pusing dan sulit berdiri."
            }
          },
          {
            "id": "leave",
            "text": "少[すこ]し休[やす]みます。配膳[はいぜん]のことは、戻[もど]ってから報告[ほうこく]します。",
            "translated": {
              "ja": "少[すこ]し休[やす]みます。配膳[はいぜん]のことは、戻[もど]ってから報告[ほうこく]します。",
              "id": "Saya akan beristirahat sebentar. Saya akan melaporkan pekerjaan penyajian setelah kembali."
            },
            "explanation": {
              "ja": "体調[たいちょう]と、途中[とちゅう]の作業[さぎょう]を今[いま]伝[つた]えましょう。誰[だれ]が引[ひ]き継[つ]ぐかも相談[そうだん]できます。",
              "id": "Sampaikan kondisi Anda dan pekerjaan yang belum selesai sekarang agar pengalihan tugas dapat diatur."
            }
          }
        ],
        "answerId": "explain"
      }
    }
  ]
};
