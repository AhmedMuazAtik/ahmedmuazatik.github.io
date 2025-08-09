const navLinks = [
  {
    name: "Çalışmalarım",
    link: "#calismalarim",
  },
  {
    name: "Tecrübelerim",
    link: "#tecrubelerim",
  },
  {
    name: "Becerilerim",
    link: "#becerilerim",
  },
  {
    name: "Referanslarım",
    link: "#referanslarim",
  },
  {
    name: "FAQs",
    link: "#faqs",
  },
];

const words = [
  { text: "Fikirlerinizi", imgPath: "/images/hero/ideas.svg" },
  { text: "Hayallerinizi", imgPath: "/images/hero/concepts.svg" },
  { text: "Tasarımlarınızı", imgPath: "/images/hero/designs.svg" },
  { text: "Kodlarınızı", imgPath: "/images/hero/code.svg" },
  { text: "Fikirlerinizi", imgPath: "/images/hero/ideas.svg" },
  { text: "Hayallerinizi", imgPath: "/images/hero/concepts.svg" },
  { text: "Tasarımlarınızı", imgPath: "/images/hero/designs.svg" },
  { text: "Kodlarınızı", imgPath: "/images/hero/code.svg" },
];

const counterItems = [
  { value: 11, suffix: "+", label: "Yıllık Tecrübe" },
  { value: 63, suffix: "+", label: "Birlikte Çalıştığım Kişi/Kurum" },
  { value: 1313, suffix: "+", label: "Tamamlanan Proje" },
  { value: 95, suffix: "%", label: "Tekrar Tercih Edilme Oranı" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-canva.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-amd.png",
  },
  {
    imgPath: "/images/logos/company-logo-blender.png",
  },
  {
    imgPath: "/images/logos/company-logo-houdini.png",
  },
  {
    imgPath: "/images/logos/company-logo-corsair.png",
  },
  {
    imgPath: "/images/logos/company-logo-msi.png",
  },
  {
    imgPath: "/images/logos/company-logo-razer.png",
  },
  {
    imgPath: "/images/logos/company-logo-itzanemoia.png",
  },
];

const abilities = [
  {
    imgPath: "/images/ozellikkartlari/seo.png",
    title: "Kalite Odaklı",
    desc: "Her detaya özen göstererek yüksek kaliteli sonuçlar sunuyorum.",
  },
  {
    imgPath: "/images/ozellikkartlari/chat.png",
    title: "Güvenilir İletişim",
    desc: "Her aşamada sizi bilgilendiriyor, şeffaf ve anlaşılır bir süreç sağlıyorum.",
  },
  {
    imgPath: "/images/ozellikkartlari/time.png",
    title: "Zamanında Teslimat",
    desc: "Projeleri planlanan sürede, titizlik ve kaliteyle tamamlıyorum.",
  },
];

const techStackImgs = [
  {
    name: "UI & UX Tasarımcı",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "AI Yazılımcı",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Üretken Teknolojist",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Full-Stack Yazılımcı",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Multidisipliner Tasarımcı",
    imgPath: "/images/logos/itzanemoia.svg",
  },
];

const techStackIcons = [
  {
    name: "UI & UX Tasarımcı",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "AI Yazılımcı",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Üretken Teknolojist",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.045,
    rotation: [0, 0, 0],
  },
  {
    name: "Full-Stack Yazılımcı",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Multidisipliner Tasarımcı",
    modelPath: "/models/itzanemoia.glb",
    scale: 1.95,
    rotation: [0, -Math.PI / 2, 0],
  },
];

const expCards = [
  {
    popupText: "itzanemoia'yı dinlemek için tıkla",
    review: [
      "Tasarım zevkiyle mühendis kafasını bir araya getirmeyi",
      "seviyorum. Bazen bir site tasarımı, bazen bir etkileşimli",
      "deneyim, bazen de sade bir animasyon… Her projede",
      "hem estetiği hem işlevi birlikte düşünürüm. Çünkü bir iş",
      "sadece güzel görünmekle yetinmemeli; aynı zamanda",
      "çalışmalı, hissettirmeli ve akılda kalmalı.",
    ],
    imgPath: "/images/tecrubelerim/itzanemoia1.png",
    logoPath: "/images/tecrubelerim/itzanemoia.png",
    title: "Multidisipliner Tasarımcı",
    date: "Temmuz 2025 - Günümüz",
    ttsPath: "/images/sirketyorumlari/itzanemoia.mp3",
    responsibilities: [
      "Adobe Premiere Pro, After Effects, Audition ve DaVinci Resolve gibi araçlarla video kurgu, ses düzenleme ve görsel efektler üretiyorum. Sosyal medya videolarından intro–outro içeriklere, logo animasyonlarından kinetic typography'e kadar geniş bir yelpazede yaratıcı çözümler sunuyorum. Aynı zamanda AMV, CMV ve oyun temelli video içerikleri de hazırlıyorum.",
      "Blender, Houdini ve AI destekli platformlarla ürün, mimari ve obje modellemeleri yapıyor; fotogerçekçi ya da stilize render’lar oluşturuyorum. 2D–3D illüstrasyonlar, Arcane ve Brutalist gibi özgün tarzlarda sahneler ve animasyonlar geliştiriyorum.",
      "Midjourney, Runway, Sora gibi platformlarla AI tabanlı içerikler üretiyor; bu içerikleri Gumroad, Etsy gibi dijital mağazalarda ürünleştiriyorum. Aynı zamanda markalara özel stil geliştirme, paket tasarımı, overlay ve editing pack üretimi yapıyorum. Trend takibiyle çağdaş, dikkat çekici görsel diller oluşturuyorum.",
    ],
  },
  {
    popupText: "Inovatech Sencell'i dinlemek için tıkla",
    review: [
      "Muaz, teknik donanımı ve görsel anlatım gücüyle",
      "İnovatech Sencell’in sosyal medya iletişimini güçlendirdi.",
      "Hazırladığı içeriklerin profesyonel görünümü ve markaya",
      "kattığı tutarlılık, dijital varlığımızı belirgin şekilde yükseltti.",
    ],
    imgPath: "/images/tecrubelerim/inovatechlogo.png",
    logoPath: "/images/tecrubelerim/inovatechsencell.png",
    title: "Sosyal Medya Yöneticisi",
    date: "Temmuz 2025 - Günümüz",
    ttsPath: "/images/sirketyorumlari/inovatech.mp3",
    responsibilities: [
      "İnovatech Sencell’in sosyal medya stratejisini oluşturuyor, içerik takvimini yönetiyorum.",
      "Ürün tanıtımları, hizmet bilgilendirme postları ve kampanya duyuruları için görsel ve video içerikler üretiyorum.",
      "Çekim, video montajı, görsel düzenleme ve post prodüksiyon süreçlerini üstleniyorum.",
      "Adobe Premiere Pro, After Effects, Photoshop ve Illustrator ile yüksek kaliteli sosyal medya videoları, animasyonlar ve görsel setleri hazırlıyorum.",
      "Marka kimliğine uygun, dikkat çekici ve etkileşim odaklı tasarım dili geliştiriyorum.",
      "Güncel trendleri takip ederek markanın dijital görünürlüğünü artıran içerikler üretiyorum.",
    ],
  },
  {
    popupText: "Safa Vakfı'nı dinlemek için tıkla",
    review: [
"Muaz ile çalışmak gerçekten ilham vericiydi. Hem",
"tasarım gözü hem de teknik bilgisi sayesinde neye",
"dokunsa bir üst seviyeye taşıdı. Zorluklar karşısındaki",
"sakinliği ve çözüm bulma hızıyla ekibe hep güven verdi.",
"Onunla yollarımız kesiştiği için çok mutluyuz.",
    ],
    imgPath: "/images/tecrubelerim/safavakfi.png",
    logoPath: "/images/tecrubelerim/safavakfi.svg",
    title: "Art Direktör",
    date: "Eylül 2021 - Temmuz 2025",
    ttsPath: "/images/sirketyorumlari/safavakfi.mp3",
    responsibilities: [
      "14 farklı markanın sosyal medya hesaplarını A’dan Z’ye yönettim: içerik planlama, tasarım, reklam yönetimi, raporlama ve strateji geliştirme.",
      "Facebook Ads, Instagram Reklamları, Google Ads ve TikTok Business Manager gibi platformlarda hedefe yönelik kampanyalar yürüttüm.",
      "Markalara özel analiz odaklı stratejiler geliştirerek büyüme ve etkileşim oranlarını artırdım.",
      "2024 yılında birlikte çalıştığım bir markaya profesyonel video prodüksiyon stüdyosu kurdum; içerik çekimi, ışıklandırma, ses yalıtımı ve kurgu sistemleriyle tam donanımlı bir alan oluşturdum.",
      "Bu stüdyoda çeşitli markalar için reels, tanıtım filmi, kurumsal çekim ve ürün reklam videoları çektim.",
      "Aynı dönemde profesyonel olarak kameramanlık yaptım; video kompozisyonu, ışık–renk dengesi ve sinematik bakış açısı kazandım.",
      "Tüm bu çalışmalarda Adobe Suite ve DaVinci Resolve gibi yazılımlar ile post-prodüksiyon süreçlerini yönettim.",
    ],
  },
  {
    popupText: "Hanedan Reklam Ajans'ını dinlemek için tıkla",
    review: [
      "Muaz, üretkenliği ve teknik uzmanlığıyla projelere önemli",
      "katkılar sağladı. Özellikle içerik üretim süreçlerinde",
      "sağladığı hız ve kalite, işlerimizin verimini gözle görülür",
      "şekilde artırdı.",
    ],
    imgPath: "/images/tecrubelerim/hanedan.png",
    logoPath: "/images/tecrubelerim/hanedan.svg",
    title: "Freelance Grafik Tasarımcı",
    date: "Eylül 2021 - Haziran 2023",
    ttsPath: "/images/sirketyorumlari/hanedan.mp3",
    responsibilities: [
      "Kurumsal markalar ve matbaalarla doğrudan çalışarak afiş, etiket, broşür, menü gibi baskıya hazır çalışmalar tasarladım.",
      "CMYK renk profili, kesim payı, DPI değerleri gibi baskı standartlarına eksiksiz uygun işler ürettim.",
      "Adobe Illustrator, InDesign ve Photoshop kullanarak sıfır hatalı teslimler gerçekleştirdim.",
      "Geri bildirimlere göre hızlı düzenleme yaparak yüksek memnuniyet sağladım.",
    ],
  },
];

const testimonials = [
  {
    popupText: "Nouredeen Hammad'ı dinlemek için tıkla",
    name: "Nouredeen Hammad",
    mentions: "@nouredeenhammad",
    review: [
      "Muaz hem tasarımcı hem mühendis kafasıyla düşünüyor.",
      "Biz kafamızdakini anlatıyoruz, o hem görsel olarak",
      "güzelleştiriyor hem de teknik olarak sorunsuz yapıyor."
    ],
    imgPath: "/images/musteriyorumlari/nouredeen.png",
    ttsPath: "/images/musteriyorumlari/nouredeen.mp3",
  },
  {
    popupText: "Abdulkadir Cihangir'i dinlemek için tıkla",
    name: "Abdulkadir Cihangir",
    mentions: "@abdulkadircihangir",
    review: [
      "Muaz’ı çok severim. Hem işte hem normal hayatta enerjisi",
      "yüksek biri. Onunla proje konuşmak bile keyifli. Ayrıca site",
      "de çok güzel olmuş."
    ],
    imgPath: "/images/musteriyorumlari/abdulkadir.png",
    ttsPath: "/images/musteriyorumlari/abdulkadir.mp3",
  },
  {
    popupText: "Kerem Toprak'ı dinlemek için tıkla",
    name: "Kerem Toprak",
    mentions: "@keremtoprak",
    review: [
      "Muaz candır. Hem sohbeti güzel hem işi. Ne zaman bir",
      "proje konuşsak hem eğleniyoruz hem de ortaya çok şık",
      "işler çıkıyor. Bu site de tam ona yakışır şekilde olmuş."
    ],
    imgPath: "/images/musteriyorumlari/kerem.png",
    ttsPath: "/images/musteriyorumlari/kerem.mp3",
  },
  {
    popupText: "Selahattin Miraç Arslan'ı dinlemek için tıkla",
    name: "Selahattin Miraç Arslan",
    mentions: "@selahattinmiracarslan",
    review: [
      "Muaz’ın eli değince her şey daha güzel oluyor. Tasarımda",
      "da kodda da kafası çalışıyor ama en güzeli kafa yapımızın",
      "uyması. Kendine site yapman da çok yerinde olmuş."
    ],
    imgPath: "/images/musteriyorumlari/selahattin.png",
    ttsPath: "/images/musteriyorumlari/selahattin.mp3",
  },
  {
    popupText: "Anıl Akcan'ı dinlemek için tıkla",
    name: "Anıl Akcan",
    mentions: "@anılakcan",
    review: [
      "Muaz’la çalışmak ayrı keyif. Arkadaş olarak zaten severim,",
      "yaptığı tasarımlar da her zaman göze hoş geliyor. Bu site",
      "de yine elinden çıkma olduğu belli, çok beğendim."
    ],
    imgPath: "/images/musteriyorumlari/anıl.png",
    ttsPath: "/images/musteriyorumlari/anıl.mp3",
  },
  {
    popupText: "Yasin Türkarslan'ı dinlemek için tıkla",
    name: "Yasin Türkarslan",
    mentions: "@yasinturkarslan",
    review: [
      "Muaz’ı tanımak güzel bir şans. Hem sohbetimiz iyi hem de",
      "işte beklentiyi fazlasıyla karşılıyor. Tasarladığı bu siteye",
      "bayıldım, gerçekten çok güzel olmuş."
    ],
    imgPath: "/images/musteriyorumlari/yasin.png",
    ttsPath: "/images/musteriyorumlari/yasin.mp3",
  },
];

const socialImgs = [
  {
    name: "Instagram",
    imgPath: "/images/footer/instagram.svg",
    url: "https://www.instagram.com/itzanemoia"
  },
  {
    name: "Youtube",
    imgPath: "/images/footer/youtube.svg",
    url: "https://www.youtube.com/@itzanemoia"
  },
  {
    name: "Github",
    imgPath: "/images/footer/github.svg",
    url: "https://github.com/AhmedMuazAtik"
  },
  {
    name: "Linktree",
    imgPath: "/images/footer/linktree.svg",
    url: "https://linktr.ee/ahmedmuazatik"
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
