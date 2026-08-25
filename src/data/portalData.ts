import { LessonNote, LearningModule, Competition, StudentProfile } from '../types';

export const EXTERNAL_LINKS = {
  RESOURCES: 'https://drive.google.com/drive/folders/1YG0xAIyB0t2mS_ErbL1NiIFEZvIet0FE',
  ACTIVITIES: 'https://drive.google.com/drive/folders/1vVaTGJI2Y0HB6vCViPm9_6tK_dXhD9eP',
  LESSON_NOTES: 'https://docs.google.com/spreadsheets/d/1xOToL8WTUBYhG4uJM2RlLm4d6aln70g0ldA1sL6l_oc/edit?gid=0#gid=0',
};

export const ASSETS = {
  robotMascotSide: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKMCVziNyE69H_6J5k__UAld-9upq-DC-kXqUtNAxzMbPnsx5gwG7c2EYMUGodT2Z6Ip3myFHsVY-U67xdw76O-m82_61s5eKa_HjEZj__7rELXlQRbXV9sW5ydVN8qlvRLjyhOi-W_p7xGcuEb6-J8GfKAPRDurZq-UxhAXKtnCquNGOfWzcNm1zG21KFWWX9MYh1UpJYACwGze7eqVR3GrFwfUVjFgMcA2_48JaW82dTDcIam9Je',
  competitionRobotTrophy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdHL8EImgY_zlzPscNlFG7mGwhIVQuYUZUNoGUCMcPeZfBKNI_BUzYmPMIfkulUTSuyjVULEOfecJ0sbnBdWp_anaClgW6aF7hx89Q2SG0xBPAp_QOCMr69msLOTsjxOjpZ0PFCTFwJo7pOoLgJECIFomRxXj0TidRPqw7gpbvjDfaHkQQwG84wkpCz6HRsBb7DIDz4Raz3lqe4cZaza84Hwb_VCoNqppBvj2goZQ1nMEi4VvbXtjb',
  robotHeroCompetition: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdHL8EImgY_zlzPscNlFG7mGwhIVQuYUZUNoGUCMcPeZfBKNI_BUzYmPMIfkulUTSuyjVULEOfecJ0sbnBdWp_anaClgW6aF7hx89Q2SG0xBPAp_QOCMr69msLOTsjxOjpZ0PFCTFwJo7pOoLgJECIFomRxXj0TidRPqw7gpbvjDfaHkQQwG84wkpCz6HRsBb7DIDz4Raz3lqe4cZaza84Hwb_VCoNqppBvj2goZQ1nMEi4VvbXtjb',
  robotAvatarRound: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzPdN5UYpYHq8_EpCtxR-ruttLnKugQhduaJQZjb-xfJOZI-JN19x1qH1IqkSCcSLiDLhQ4rf6RPlRR9u05OJ3a-oT1PGdSBJ7dKEgBkxiAXG4g2BDOsfkU9xWtL5r5kR16coK_GdElkJvvVolhwxOuuQVL-htXRKcPqzLEVRjy-74qQyQDloJsRAYF81cXykaPMaJ9eXxNFaeZFGHB8voyhBe-iM4YSrSmmATHPnLt-fDjAm7TMaK',
  class6HeroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO03_f11aVN_J721iYRDVP_BXY217k9Py-GZrLysviEZQ1MTvAiiWlyHH7oS4IxzMkltGghxIpZfuHm6hH540_PUmC1-YzawARnOnxlEa-p1H0rE1S8JBXrImxmISYbL49pJ1VeFHHL2JN9iU0wkjG8NNfqkpIzfFqSiCe9hEpy9ud4Jz9VZctKV2fvmAbZQHysQ1Etb846D0slbdujNm4QoaneNRCMuDQQRcKk02YZZzwjMqhMxk2',
  robotAvatarExcited: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoqy-mCh1v7OjoKQ1y_CirgNlZZ0jSk-Yyw9qKPwHQlIJd7jsHiZsBVW8GQAJnvMVsmrtgHAx7SY3_Rw09KGy2M964RBBS00jMjH-0iyE99wcO-tFYpe4bvhZ_0nJhwuTGAGmKxslToenmbabvaKLm85Tm0myc58T-lpvlizRHx3VQrlpcp6BkzA757w44PtB7RiwVMeuLMPonc24DFwnkUxldBflZAWaDgH7xrhILXvYzVKa060QI',
};

export const LESSON_NOTES: LessonNote[] = [
  {
    id: 'note-pc-parts',
    title: 'Bilgisayarın Bölümleri',
    grade: '1',
    gradeLabel: '1. Sınıf',
    icon: 'computer',
    iconBg: '#d8e2ff',
    iconColor: '#0058be',
    summary: 'Monitör, klavye, fare ve kasanın ne işe yaradığını öğreniyoruz. Temel donanım birimlerini tanıyalım.',
    readingTime: '5 dk okuma',
    sections: [
      {
        title: '1. Bilgisayar Nedir?',
        text: 'Bilgisayar, bilgileri saklayan, hesaplamalar yapan, oyun oynamamızı ve resim yapmamızı sağlayan akıllı bir elektronik yardımcıdır.',
        bulletPoints: [
          'Bilgileri işler ve ekranda gösterir.',
          'Bizim verdiğimiz komutlarla çalışır.',
          'Öğrenmemize ve eğlenmemize yardım eder.'
        ]
      },
      {
        title: '2. Temel Parçalar',
        text: 'Bir masaüstü bilgisayar 4 ana parçadan oluşur:',
        bulletPoints: [
          '📺 Monitör (Ekran): Bilgisayarda yaptığımız her şeyi görmemizi sağlar.',
          '🧠 Kasa: Bilgisayarın beynidir. İçinde işlemci ve hafıza bulunur.',
          '⌨️ Klavye: Harfleri, sayıları ve sembolleri yazmamıza yarar.',
          '🖱️ Fare (Mouse): Ekrandaki ok işaretini yönetmemizi ve tıklamamızı sağlar.'
        ],
        tips: 'Unutma: Kasa bilgisayarın beyni gibidir, tüm işlemler onun içinde yapılır!'
      },
      {
        title: '3. Ek Donanımlar',
        text: 'Bilgisayarımıza takabileceğimiz diğer faydalı parçalar:',
        bulletPoints: [
          '🎧 Kulaklık & Hoparlör: Sesleri duymamızı sağlar.',
          '🖨️ Yazıcı: Bilgisayardaki resim ve yazıları kağıda basar.',
          '📷 Web Kamerası: Görüntülü konuşma yapmamızı sağlar.'
        ]
      }
    ],
    quiz: [
      {
        question: 'Bilgisayarın "Beyni" olarak adlandırılan ana parça hangisidir?',
        options: ['Monitör', 'Kasa', 'Klavye', 'Fare'],
        correctIndex: 1,
        explanation: 'Kasa, bilgisayarın tüm donanım ve işlem birimlerini içinde barındıran beyin kısmıdır.'
      },
      {
        question: 'Ekranda yazı yazmak için hangi parçayı kullanırız?',
        options: ['Hoparlör', 'Klavye', 'Kamera', 'Fare'],
        correctIndex: 1,
        explanation: 'Klavye üzerinde harfler, rakamlar ve özel işaret tuşları bulunur.'
      }
    ],
    worksheet: {
      instructions: 'Aşağıdaki soruları yanıtlayarak bilgisayarın parçalarını ne kadar iyi öğrendiğini göster!',
      questions: [
        {
          id: 1,
          text: 'Görüntüleri görmemizi sağlayan parçanın adı nedir?',
          answerType: 'choice',
          options: ['Monitör', 'Hoparlör', 'Fare', 'Mikrofon']
        },
        {
          id: 2,
          text: 'Bilgisayarda dinlediğimiz şarkıların sesini dışarı veren aygıt hangisidir?',
          answerType: 'choice',
          options: ['Hoparlör / Kulaklık', 'Klavye', 'Kasa', 'Tarayıcı']
        },
        {
          id: 3,
          text: 'Bilgisayar parçalarından en çok kullandığın ikisini ve görevlerini kısaca yaz:',
          answerType: 'text'
        }
      ]
    },
    spreadsheetData: {
      activityPrompt: 'Donanım Envanter Tablosu: Aşağıdaki parçaların bilgisayarımızdaki adetlerini inceleyin.',
      columns: ['Parça Adı', 'Kullanım Amacı', 'Sınıfımızdaki Adet', 'Çalışır Durumda'],
      rows: [
        ['Monitör', 'Görüntü Gösterme', 24, 'Evet'],
        ['Klavye', 'Yazı Yazma', 24, 'Evet'],
        ['Fare (Mouse)', 'İşaretleme / Tıklama', 24, 'Evet'],
        ['Kasa (İşlemci)', 'Hesaplama / Bellek', 24, 'Evet'],
        ['Kulaklık', 'Ses Dinleme', 24, 'Evet'],
        ['Yazıcı', 'Kağıt Çıktısı', 1, 'Evet']
      ]
    }
  },
  {
    id: 'note-mouse-use',
    title: 'Fare Kullanımı (Mouse)',
    grade: '1',
    gradeLabel: '1. Sınıf',
    icon: 'mouse',
    iconBg: '#6ffbbe',
    iconColor: '#006947',
    summary: 'Faremizi doğru tutmayı, sol ve sağ tıklamayı öğrenip sürükle-bırak çalışmaları yapıyoruz.',
    readingTime: '4 dk okuma',
    sections: [
      {
        title: '1. Fareyi Doğru Tutuş',
        text: 'Fareyi avucumuzun içine rahatça yerleştiririz. İşaret parmağımız sol tuşta, orta parmağımız sağ tuşta durur.',
        bulletPoints: [
          'Bileğimizi masaya rahatça koymalıyız.',
          'Fareyi çok sıkmadan, yumuşakça hareket ettirmeliyiz.',
          'Fare hareket ettikçe ekrandaki ok (imleç) de hareket eder.'
        ]
      },
      {
        title: '2. Temel Fare Hareketleri',
        text: 'Bilgisayarda fare ile 4 temel hareket yaparız:',
        bulletPoints: [
          '👆 Tek Tık (Sol Tık): Bir nesneyi veya butonu seçmek için 1 kez basarız.',
          '✌️ Çift Tık (Hızlıca iki kez sol tık): Bir klasörü veya oyunu açmak için kullanılır.',
          '🖱️ Sağ Tık: Gizli seçenekleri ve menüyü açar.',
          '✋ Sürükle ve Bırak: Sol tuşa basılı tutarak bir nesneyi başka bir yere taşırız.'
        ],
        tips: 'İpucu: Sürükle-bırak yaparken parmağını sol tuştan ancak istediğin yere geldiğinde kaldırmalısın!'
      }
    ],
    quiz: [
      {
        question: 'Bir oyunu veya dosyayı açmak için fare ile ne yaparız?',
        options: ['Sağ tık', 'Hızlıca Çift Tık', 'Fareyi sallarız', 'Sadece üzerine geliriz'],
        correctIndex: 1,
        explanation: 'Çift tıklama, bir programı veya dosyayı başlatmanın en hızlı yoludur.'
      }
    ],
    worksheet: {
      instructions: 'Fare tıklama türlerini eşleştir ve soruları yanıtla.',
      questions: [
        {
          id: 1,
          text: 'Menü ve seçenekler listesini açmak için hangi tuşa basarız?',
          answerType: 'choice',
          options: ['Sağ Tuş', 'Sol Tuş', 'Tekerlek', 'Klavyedeki Boşluk Tuşu']
        },
        {
          id: 2,
          text: 'Bir resmi ekranın bir tarafından diğer tarafına taşımak için hangi fare hareketi yapılır?',
          answerType: 'choice',
          options: ['Sürükle ve Bırak', 'Sağ Tık', 'Tekerleği Döndürme', 'Ekranı Kapatma']
        }
      ]
    },
    spreadsheetData: {
      activityPrompt: 'Öğrenci Fare Becerisi Değerlendirme Çizelgesi',
      columns: ['Öğrenci Adı', 'Sol Tık', 'Çift Tık', 'Sürükle-Bırak', 'Başarı Seviyesi'],
      rows: [
        ['Ali Yılmaz', 'Başarılı', 'Başarılı', 'Gelişiyor', '⭐ ⭐ ⭐'],
        ['Zeynep Kaya', 'Başarılı', 'Başarılı', 'Başarılı', '⭐ ⭐ ⭐ ⭐'],
        ['Emir Demir', 'Başarılı', 'Gelişiyor', 'Gelişiyor', '⭐ ⭐'],
        ['Elif Şahin', 'Başarılı', 'Başarılı', 'Başarılı', '⭐ ⭐ ⭐ ⭐']
      ]
    }
  },
  {
    id: 'note-keyboard-keys',
    title: 'Klavye Tuşlarını Tanıyalım',
    grade: '1',
    gradeLabel: '1. Sınıf',
    icon: 'keyboard',
    iconBg: '#ffdad6',
    iconColor: '#ba1a1a',
    summary: 'Harfleri, sayıları ve Enter, Boşluk (Space), Silme (Backspace) gibi önemli tuşları keşfediyoruz.',
    readingTime: '6 dk okuma',
    sections: [
      {
        title: '1. Özel ve Süper Tuşlar',
        text: 'Klavyemizde harf ve rakamların yanında sihirli görevleri olan tuşlar vardır:',
        bulletPoints: [
          '↵ ENTER (Giriş Tuşu): Alt satıra geçmemizi veya bir komutu onaylamamızı sağlar.',
          '␣ SPACE (Boşluk Tuşu): Kelimeler arasında boşluk bırakmak için kullanılan en uzun tuştur.',
          '⌫ BACKSPACE (Silme Tuşu): Yanlış yazdığımız harfleri soldan siler.',
          '🔠 CAPS LOCK: Tüm harfleri büyük veya küçük yazmaya ayarlar.'
        ]
      },
      {
        title: '2. Yön Tuşları (Oklar)',
        text: 'Yukarı, Aşağı, Sol ve Sağ ok tuşları oyunlarda karakterleri hareket ettirmek veya yazıda gezmek için kullanılır.'
      }
    ],
    quiz: [
      {
        question: 'Klavyedeki en uzun tuş hangisidir?',
        options: ['Enter', 'Boşluk (Space)', 'Silme (Backspace)', 'Caps Lock'],
        correctIndex: 1,
        explanation: 'Space (Boşluk) tuşu klavyenin en altında bulunan en uzun tuştur.'
      }
    ],
    worksheet: {
      instructions: 'Klavye tuşlarının görevlerini test edelim.',
      questions: [
        {
          id: 1,
          text: 'Yazı yazarken alt satıra geçmek için hangi tuşa basarız?',
          answerType: 'choice',
          options: ['Enter', 'Shift', 'Tab', 'Esc']
        },
        {
          id: 2,
          text: 'Harfleri BÜYÜK yazmak istediğimizde sürekli açık bırakabileceğimiz tuş hangisidir?',
          answerType: 'choice',
          options: ['Caps Lock', 'Space', 'Alt Gr', 'F1']
        }
      ]
    }
  },
  {
    id: 'note-algorithms-intro',
    title: 'Algoritma ve Problem Çözme',
    grade: '3',
    gradeLabel: '3. Sınıf',
    icon: 'psychology',
    iconBg: '#ffddb8',
    iconColor: '#855300',
    summary: 'Bir hedefe ulaşmak için izlenecek adım adım mantıklı yolları ve algoritma kurmayı öğreniyoruz.',
    readingTime: '7 dk okuma',
    sections: [
      {
        title: '1. Algoritma Nedir?',
        text: 'Bir problemi çözmek veya bir işi tamamlamak için belirlenen adım adım kurallar dizisine algoritma denir.',
        bulletPoints: [
          'Adımlar sırayla ve anlaşılır olmalıdır.',
          'Her adımda ne yapılacağı net olmalıdır.',
          'Başlangıcı ve bitişi mutlaka olmalıdır.'
        ]
      },
      {
        title: '2. Günlük Hayattan Bir Örnek: Diş Fırçalama Algoritması',
        text: 'Sabah dişlerimizi fırçalarken bile aslında bir algoritma uygularız:',
        bulletPoints: [
          '1. Adım: Diş fırçasını eline al.',
          '2. Adım: Diş macununun kapağını aç.',
          '3. Adım: Fırçaya nohut büyüklüğünde macun sık.',
          '4. Adım: Dişlerini dairesel hareketlerle 2 dakika fırçala.',
          '5. Adım: Ağzını bol su ile çalkala ve fırçayı yıka. (BİTİR)'
        ]
      }
    ],
    quiz: [
      {
        question: 'Algoritmanın en önemli kuralı nedir?',
        options: ['Çok uzun olması', 'Adımların sırayla ve net olması', 'Sadece bilgisayarda yazılması', 'Her zaman yanlış olması'],
        correctIndex: 1,
        explanation: 'Algoritmalar net, sıralı ve eksiksiz adımlardan oluşmalıdır.'
      }
    ],
    worksheet: {
      instructions: 'Kendi sandviç hazırlama veya okula gitme algoritmanı yaz!',
      questions: [
        {
          id: 1,
          text: 'Okula hazırlanma algoritmasının 1. adımı ne olmalıdır?',
          answerType: 'choice',
          options: ['Uyanıp yataktan kalk', 'Okul servisine bin', 'Öğle yemeği ye', 'Ders zili çalınca sınıfa gir']
        },
        {
          id: 2,
          text: 'Limonata yapma algoritmasını 3 adımda kısaca özetle:',
          answerType: 'text'
        }
      ]
    }
  },
  {
    id: 'note-scratch-basics',
    title: 'Scratch ile Blok Tabanlı Kodlama',
    grade: '5',
    gradeLabel: '5. Sınıf',
    icon: 'pets',
    iconBg: '#fef08a',
    iconColor: '#ca8a04',
    summary: 'Rengarenk kod bloklarını birleştirerek kendi çizgi filmlerimizi ve oyunlarımızı tasarlıyoruz.',
    readingTime: '8 dk okuma',
    sections: [
      {
        title: '1. Scratch Arayüzü',
        text: 'Scratch, MIT tarafından geliştirilen dünyanın en popüler görsel kodlama platformudur.',
        bulletPoints: [
          '🐱 Kukla (Sprite): Sahnedeki hareket eden karakterlerimizdir.',
          '🖼️ Sahne (Backdrop): Oyunumuzun arka plan görselidir.',
          '🧱 Blok Paleti: Hareket, Görünüm, Ses, Olaylar, Kontrol gibi blok kategorilerini içerir.',
          '📜 Kod Alanı: Blokları sürükleyip lego gibi birleştirdiğimiz çalışma masamızdır.'
        ]
      },
      {
        title: '2. En Çok Kullanılan Bloklar',
        text: 'Kodlamaya başlarken şu temel blokları kullanırız:',
        bulletPoints: [
          '🟢 Yeşil Bayrağa Tıklandığında: Programı başlatan olay bloğudur.',
          '➡️ 10 Adım Git: Karakteri ileriye doğru yürütür.',
          '🔄 Sürekli Tekrarla: İçindeki kodları oyun bitene kadar durmaksızın çalıştırır.',
          '❓ Eğer ... İse: Şartlı durumları kontrol eder (Örn: Kenara çarptıysa geri dön).'
        ]
      }
    ],
    quiz: [
      {
        question: 'Scratch projesini çalıştırmak için hangi butona tıklarız?',
        options: ['Kırmızı Buton', 'Yeşil Bayrak', 'Mavi Yıldız', 'Sarı Üçgen'],
        correctIndex: 1,
        explanation: 'Yeşil bayrak Scratch projelerinde başlatma (Run) komutudur.'
      }
    ],
    worksheet: {
      instructions: 'Scratch bloklarının görevlerini ve renklerini yaz.',
      questions: [
        {
          id: 1,
          text: 'Karakterin yönünü değiştirmek ve hareket ettirmek için hangi renk kategorisindeki bloklar kullanılır?',
          answerType: 'choice',
          options: ['Mavi (Hareket)', 'Sarı (Olaylar)', 'Mor (Ses)', 'Turuncu (Değişkenler)']
        },
        {
          id: 2,
          text: 'Kuklanın ekranda "Merhaba!" demesi için hangi kategoriye bakmalıyız?',
          answerType: 'choice',
          options: ['Görünüm (Mor)', 'Hareket (Mavi)', 'Algılama (Açık Mavi)', 'Kalem (Yeşil)']
        }
      ]
    }
  },
  {
    id: 'note-ai-future',
    title: 'Yapay Zekâ ve Geleceğin Teknolojileri',
    grade: '6',
    gradeLabel: '6. Sınıf',
    icon: 'smart_toy',
    iconBg: '#6ffbbe',
    iconColor: '#006947',
    summary: 'Yapay zekanın nasıl öğrendiğini, günlük hayatımızdaki kullanım alanlarını ve etik kurallarını keşfediyoruz.',
    readingTime: '9 dk okuma',
    sections: [
      {
        title: '1. Yapay Zekâ (YZ / AI) Nedir?',
        text: 'İnsan beyninin öğrenme, düşünme ve karar verme yeteneklerini taklit eden bilgisayar sistemleridir.',
        bulletPoints: [
          'Görüntüleri tanıyabilir (yüz tanıma, nesne bulma).',
          'Dilleri çevirebilir ve bizimle sohbet edebilir.',
          'Büyük verileri saniyeler içinde analiz edebilir.'
        ]
      },
      {
        title: '2. Makine Öğrenmesi Nasıl Çalışır?',
        text: 'Bir bilgisayara binlerce kedi ve köpek resmi gösteririz. Bilgisayar bu resimlerdeki kulak, burun ve tüy farklarını öğrenerek yeni bir resim gördüğünde onun kedi mi köpek mi olduğunu tahmin eder!'
      }
    ],
    quiz: [
      {
        question: 'Yapay zekanın doğru tahmin yapabilmesi için en çok neye ihtiyacı vardır?',
        options: ['Çok fazla kaliteli veriye (Data)', 'Büyük bir monitöre', 'Sadece fareye', 'Renkli klavyeye'],
        correctIndex: 0,
        explanation: 'Yapay zeka modelleri ne kadar çok ve kaliteli veri ile eğitilirse o kadar doğru sonuçlar üretir.'
      }
    ],
    worksheet: {
      instructions: 'Yapay zekanın hayatımızdaki etkilerini değerlendir.',
      questions: [
        {
          id: 1,
          text: 'Aşağıdakilerden hangisi bir Yapay Zekâ uygulamasıdır?',
          answerType: 'choice',
          options: ['Sesli Asistanlar (Siri, Google Asistan)', 'Hesap Makinesi', 'Masa Lambası', 'Sulu Boya']
        }
      ]
    }
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-01',
    number: '01',
    title: 'Donanım',
    grade: '6',
    icon: 'developer_board',
    iconBg: '#d8e2ff',
    iconColor: '#0058be',
    hasResource: true,
    hasNote: true,
    hasWorksheet: true,
    hasActivity: false,
    details: {
      desc: 'İç ve dış donanım birimleri, giriş-çıkış aygıtları, depolama birimleri (SSD, HDD, RAM).',
      objectives: ['Donanım ve yazılım ayrımını yapabilme', 'Giriş ve çıkış birimlerini sınıflandırabilme', 'Kapasite ölçü birimlerini öğrenme (Byte, KB, MB, GB, TB)'],
      resourceLinks: [
        { title: 'Donanım Birimleri PDF Özeti', url: '#', type: 'pdf' },
        { title: 'Bilgisayarın İçi Nasıl Çalışır? (Video)', url: '#', type: 'video' }
      ]
    }
  },
  {
    id: 'mod-02',
    number: '02',
    title: 'Yazılım',
    grade: '6',
    icon: 'terminal',
    iconBg: '#ffddb8',
    iconColor: '#855300',
    hasResource: true,
    hasNote: true,
    hasWorksheet: false,
    hasActivity: false,
    details: {
      desc: 'İşletim sistemleri (Windows, Linux/Pardus, macOS, Android), uygulama yazılımları ve lisans türleri.',
      objectives: ['İşletim sisteminin görevlerini kavrama', 'Açık kaynak kodlu yerli işletim sistemimiz Pardus\'u tanıma', 'Yazılım telif hakları ve lisans türleri'],
      resourceLinks: [
        { title: 'Pardus İşletim Sistemi Kılavuzu', url: '#', type: 'pdf' },
        { title: 'Yazılım Türleri Şeması', url: '#', type: 'link' }
      ]
    }
  },
  {
    id: 'mod-03',
    number: '03',
    title: 'Algoritma ve Problem Çözme',
    grade: '6',
    icon: 'psychology',
    iconBg: '#6ffbbe',
    iconColor: '#006947',
    hasResource: true,
    hasNote: true,
    hasWorksheet: true,
    hasActivity: true,
    details: {
      desc: 'Problem analiz etme, akış şemaları (Flowchart), karar yapıları ve döngü mantığı.',
      objectives: ['Akış şeması sembollerini doğru kullanma', 'Hata ayıklama (Debugging) becerisi geliştirme', 'Verilen senaryoya uygun algoritma tasarlama'],
      resourceLinks: [
        { title: 'Akış Şemaları Çizim Rehberi', url: '#', type: 'pdf' },
        { title: 'Algoritma Bulmacaları', url: '#', type: 'link' }
      ]
    }
  },
  {
    id: 'mod-04',
    number: '04',
    title: 'Scratch Programlama',
    grade: '6',
    icon: 'pets',
    iconBg: '#fef08a',
    iconColor: '#ca8a04',
    hasResource: true,
    hasNote: true,
    hasWorksheet: false,
    hasActivity: true,
    details: {
      desc: 'Scratch 3.0 ile 2D oyun tasarımı, değişkenler, puanlama sistemi ve fizik blokları.',
      objectives: ['Karakter animasyonu oluşturabilme', 'Klavyeden ve fareden etkileşimli kontrol yazma', 'Skor tablosu ve can sayacı kodlama'],
      resourceLinks: [
        { title: 'Scratch Proje Şablonları', url: '#', type: 'link' },
        { title: 'Labirent Oyunu Yapım Videosu', url: '#', type: 'video' }
      ]
    }
  },
  {
    id: 'mod-05',
    number: '05',
    title: 'Scratch Kodlama Yarışması 🏆',
    grade: '6',
    icon: 'emoji_events',
    iconBg: '#fea619',
    iconColor: '#684000',
    badge: 'Öne Çıkan Yarışma',
    isSpecialCompetition: true,
    competitionDesc: 'Yeteneklerini göster, kendi oyununu tasarla ve madalyayı kazan!',
    hasResource: false,
    hasNote: false,
    hasWorksheet: false,
    hasActivity: false,
    details: {
      desc: 'Hilal Sezer Öğretmen liderliğinde düzenlenen dönem sonu büyük Scratch Kodlama Şampiyonası!',
      objectives: ['Yaratıcı oyun mekanikleri geliştirme', 'Kod optimizasyonu', 'Özgün grafik ve ses tasarımı'],
      resourceLinks: []
    }
  },
  {
    id: 'mod-06',
    number: '06',
    title: 'Robotik',
    grade: '6',
    icon: 'precision_manufacturing',
    iconBg: '#d8e2ff',
    iconColor: '#0058be',
    hasResource: true,
    hasNote: true,
    hasWorksheet: false,
    hasActivity: true,
    details: {
      desc: 'Sensörler (Mesafe, Işık, Çizgi), motorlar ve robotik kodlama kartlarına giriş.',
      objectives: ['Robotun çalışma prensibini anlama', 'Sensör verilerine göre karar verme', 'Engel tanıyan robot mantığı kurma'],
      resourceLinks: [
        { title: 'Robotik Sensörler Rehberi', url: '#', type: 'pdf' },
        { title: 'Tinkercad Devre Simülatörü', url: '#', type: 'link' }
      ]
    }
  },
  {
    id: 'mod-07',
    number: '07',
    title: 'RoboFootball',
    grade: '6',
    icon: 'sports_soccer',
    iconBg: '#6ffbbe',
    iconColor: '#006947',
    hasResource: true,
    hasNote: true,
    hasWorksheet: false,
    hasActivity: true,
    details: {
      desc: 'Bluetooth veya radyo frekans kontrollü robotlarla futbol sahasında takım stratejisi ve kodlama.',
      objectives: ['Robot hareket kontrollerini programlama', 'Takım çalışması ve strateji geliştirme', 'Sensör kalibrasyonu'],
      resourceLinks: [
        { title: 'RoboFootball Saha Kuralları', url: '#', type: 'pdf' }
      ]
    }
  },
  {
    id: 'mod-08',
    number: '08',
    title: 'RoboFootball Yarışması 🏆',
    grade: '6',
    icon: 'emoji_events',
    iconBg: '#fea619',
    iconColor: '#684000',
    badge: 'Takım Turnuvası',
    isSpecialCompetition: true,
    competitionDesc: 'Robotunu sahaya sür, taktiklerini konuştur ve şampiyon ol!',
    hasResource: false,
    hasNote: false,
    hasWorksheet: false,
    hasActivity: false,
    details: {
      desc: 'Sınıflar arası heyecan dolu robotik futbol ligi ve kupa mücadelesi.',
      objectives: ['Hızlı refleks ve kodlama', 'Mekanik dayanıklılık', 'Fair-play kurallarına uyma'],
      resourceLinks: []
    }
  },
  {
    id: 'mod-09',
    number: '09',
    title: 'İnternet ve Dijital Güvenlik',
    grade: '6',
    icon: 'security',
    iconBg: '#ffdad6',
    iconColor: '#ba1a1a',
    hasResource: true,
    hasNote: true,
    hasWorksheet: true,
    hasActivity: true,
    details: {
      desc: 'Güçlü şifre oluşturma, siber zorbalıkla mücadele, phishing (oltalama) tuzakları ve antivirüs kullanımı.',
      objectives: ['Kişisel verileri koruma bilinci', 'Güvenli parola kurallarını uygulama', 'Şüpheli link ve mesajları ayırt etme'],
      resourceLinks: [
        { title: 'Güvenli İnternet Kontrol Listesi', url: '#', type: 'pdf' },
        { title: 'Siber Kahraman Testi', url: '#', type: 'link' }
      ]
    }
  },
  {
    id: 'mod-10',
    number: '10',
    title: 'Dijital Vatandaşlık',
    grade: '6',
    icon: 'public',
    iconBg: '#d8e2ff',
    iconColor: '#0058be',
    hasResource: true,
    hasNote: true,
    hasWorksheet: false,
    hasActivity: false,
    details: {
      desc: 'Dijital ayak izi, telif hakları, netiket (internet nezaket kuralları) ve doğru bilgiye ulaşma (teyit etme).',
      objectives: ['Dijital ortamda saygılı iletişim kurma', 'Sahte haber ve bilgi kirliliğini tespit etme', 'Dijital hak ve sorumlulukları bilme'],
      resourceLinks: [
        { title: 'Dijital Ayak İzin Neleri Söyler?', url: '#', type: 'pdf' }
      ]
    }
  },
  {
    id: 'mod-11',
    number: '11',
    title: 'Veri ve Bilgi',
    grade: '6',
    icon: 'analytics',
    iconBg: '#ffddb8',
    iconColor: '#855300',
    hasResource: true,
    hasNote: true,
    hasWorksheet: true,
    hasActivity: true,
    details: {
      desc: 'E-Tablolar (Excel / Google E-Tablo), veri görselleştirme, sütun grafikleri ve temel formüller (TOPLA, ORTALAMA).',
      objectives: ['Verileri elektronik tablolarda düzenleme', 'Formül kullanarak otomatik hesaplama yapma', 'Grafik oluşturarak veriyi yorumlama'],
      resourceLinks: [
        { title: 'E-Tablo Temel Formül Kartları', url: '#', type: 'pdf' },
        { title: 'Örnek Uygulama Dosyası', url: '#', type: 'link' }
      ]
    }
  },
  {
    id: 'mod-12',
    number: '12',
    title: 'Yapay Zekâ',
    grade: '6',
    icon: 'smart_toy',
    iconBg: '#6ffbbe',
    iconColor: '#006947',
    hasResource: true,
    hasNote: true,
    hasWorksheet: false,
    hasActivity: true,
    details: {
      desc: 'Makine öğrenmesi modelleri, istem mühendisliği (Prompting), görüntü üretme ve yapay zeka etiği.',
      objectives: ['Yapay zekanın öğrenme sürecini kavrama', 'Teachable Machine ile model eğitme', 'Geleceğin mesleklerini tanıma'],
      resourceLinks: [
        { title: 'Teachable Machine Eğitimi', url: '#', type: 'link' },
        { title: 'Yapay Zekâ Sunumu', url: '#', type: 'pdf' }
      ]
    }
  }
];

export const COMPETITIONS: Competition[] = [
  {
    id: 'comp-scratch',
    title: 'Scratch Kodlama Yarışması 🏆',
    category: 'Görsel Blok Kodlama',
    tag: 'Büyük Yarışma Başlıyor!',
    shortDesc: 'Hayal gücünü koda dönüştür, en harika projeyi sen yarat ve ödülleri kazan!',
    heroImg: ASSETS.competitionRobotTrophy,
    robotBubbleText: 'En iyi kodun seninle olsun! Yarışmaya hazır mısın?',
    targetGrades: '3, 4, 5 ve 6. Sınıflar',
    deadline: '15 Mayıs 2026',
    prizes: [
      '🥇 1.lik Ödülü: Programlanabilir Robotik Kodlama Kiti + Altın Madalya',
      '🥈 2.lik Ödülü: Scratch Süper Kodlayıcı Başarı Plaketi + Gümüş Madalya',
      '🥉 3.lük Ödülü: Bilişim Kulübü Özel Seti + Bronz Madalya',
      '🎖️ Tüm Katılımcılara: Kişiye Özel Dijital Başarı Sertifikası'
    ],
    rules: [
      'Proje Scratch platformu (scratch.mit.edu) üzerinde hazırlanmalıdır.',
      'Oyun veya animasyon tamamen öğrencinin kendi emeği olmalıdır.',
      'Şiddet, uygunsuz kelime ve zararlı içerik bulunmamalıdır.',
      'Proje en az 3 farklı sahne veya 2 farklı seviye (level) içermelidir.',
      'Yeşil bayrak ile sorunsuz başlatılabilmelidir.'
    ],
    criteria: [
      'Kodlama Düzeni ve Mantığı (%30)',
      'Özgünlük ve Yaratıcılık (%30)',
      'Grafik, Tasarım ve Ses Uyumu (%20)',
      'Oynanabilirlik ve Kullanıcı Deneyimi (%20)'
    ],
    registeredCount: 48
  },
  {
    id: 'comp-cubetto',
    title: 'Cubetto Minik Kodlayıcılar Turnuvası 🪵',
    category: 'Erken Yaş Robotik',
    tag: 'Minik Kaşifler Görevde!',
    shortDesc: 'Ekransız ahşap kodlama robotu Cubetto ile haritadaki hedeflere en az blokla ilk kim ulaşacak?',
    heroImg: ASSETS.robotMascotSide,
    robotBubbleText: 'Minik dostum, yön bloklarını doğru diz ve hazineye ulaş!',
    targetGrades: 'Anaokulu, 1 ve 2. Sınıflar',
    deadline: '22 Mayıs 2026',
    prizes: [
      '🥇 1.lik Ödülü: Ahşap Akıl Oyunları Seti + Başarı Madalyası',
      '🥈 2.lik Ödülü: Kodlama Masalları Kitaplığı + Başarı Madalyası',
      '🥉 3.lük Ödülü: Renkli Cubetto Boyama ve Çıkartma Albümü',
      '🎖️ Tüm Miniklere: Cesur Kaşif Madalyası'
    ],
    rules: [
      'Yarışma okul bilişim laboratuvarındaki fiziksel Cubetto pistinde düzenlenecektir.',
      'Verilen görev kartındaki haritada başlangıçtan bitişe rota çizilmelidir.',
      'Süre ve kullanılan blok sayısı puanlamada etkilidir.'
    ],
    criteria: [
      'Hedefe Tam İsabetle Ulaşma (%40)',
      'Fonksiyon (Alt Rutin) Bloğu Kullanımı (%30)',
      'Süre ve Problem Çözme Hızı (%30)'
    ],
    registeredCount: 32
  },
  {
    id: 'comp-robofootball',
    title: 'RoboFootball Şampiyonlar Ligi ⚽',
    category: 'Robotik Futbol Turnuvası',
    tag: 'Robotunu Sahaya Sür!',
    shortDesc: 'Kendi kodladığın veya uzaktan kumanda ettiğin robotunla sahaya çık, rakiplerine golleri sırala!',
    heroImg: ASSETS.robotAvatarExcited,
    robotBubbleText: 'Taktiklerini hazırla, robotunu sahaya çıkar ve kupayı kaldır!',
    targetGrades: '5 ve 6. Sınıflar',
    deadline: '30 Mayıs 2026',
    prizes: [
      '🏆 Şampiyonluk Kupası + Şampiyonluk Madalyaları',
      '🥈 İkincilik Kupası + Gümüş Madalyalar',
      '🥉 Üçüncülük Plaketi + Bronz Madalyalar',
      '⚽ Gol Kralı Robot Özel Ödülü'
    ],
    rules: [
      'Maçlar 3\'er dakikalık 2 devre halinde oynanır.',
      'Her takım 2 robottan (Forvet ve Kaleci) oluşur.',
      'Robotların boyutları 20x20 cm sınırını geçmemelidir.',
      'Fair-play ruhuna aykırı çarpışmalara hakem müdahale eder.'
    ],
    criteria: [
      'Takım Uyumu ve Paslaşma (%35)',
      'Robot Manevra Hızı ve Çevikliği (%35)',
      'Atılan ve Yenilen Gol Dengesi (%30)'
    ],
    registeredCount: 16
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Sevgili Öğrenci',
  grade: '5. Sınıf',
  schoolNumber: '1042',
  avatarId: 'robot-1',
  points: 380,
  stars: 14,
  completedNotes: ['note-pc-parts', 'note-mouse-use'],
  completedQuizzes: ['note-pc-parts'],
  completedActivities: ['act-typing-game'],
  joinedCompetitions: ['comp-scratch']
};
