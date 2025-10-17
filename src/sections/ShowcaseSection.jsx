import { useRef, useState, useMemo, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ProjectPopup from "./ProjectPopup"; // popup component'in varsa kullan
import TitleHeader from "../components/TitleHeader"; // veya doğru path
import { playSound } from "../playSound";

gsap.registerPlugin();

const projectData = [
  //--------------------------------------------------------------
  {
    id: "sosyalmedya",
    refKey: "sosyalmedya",
    title: "Sosyal Medya Yönetimi",
    subtitle: "Geçmiş ve güncel yönetimlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sosyalmedyayonetimi.mp4",
    imgAlt: "Sosyal Medya Yönetimi",
    popupProjects: [
      {
        icon: "",
        title: "Inovatech Sencell",
        description: "Freelance grafik tasarımcı olarak çalışıyorum.",
        thumbnail: "/images/projelerim/Sosyal Medya/inovatech.png",
        link: "https://www.canva.com/design/DAGtJDYdch4/UKbc1QCROxo5KBdnUi-shw/edit?utm_content=DAGtJDYdch4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        dateRange: "2025 Haziran – Günümüz"
      },
      {
        icon: "",
        title: "Safa Vakfı",
        description: "Safa Vakfında geçirdiğim 4 yılın sade bir özeti.",
        thumbnail: "/images/projelerim/Sosyal Medya/safavakfi.png",
        link: "https://www.canva.com/design/DAGtHx0tP3Y/tb-0DmR265jKtVQBKuqDTQ/edit?utm_content=DAGtHx0tP3Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        dateRange: "2021 Eylül – 2025 Haziran"
      },
    ],
  },
  //--------------------------------------------------------------
  {
    id: "Proje Dosyaları",
    refKey: "sosyalmedya",
    title: "Alınabilen Projelerim",
    subtitle: "Satılık proje dosyalarım.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/alınabilenprojelerim.mp4",
    imgAlt: "Proje Dosyaları",
    directLink: ""
  },
  //--------------------------------------------------------------
  {
    id: "code",
    refKey: "code",
    title: "Yazılım Projelerim",
    subtitle: "Farklı dillerde yazdığım yazılım projeleri.",
    bg: "#FFEFDB",
    video: "/images/projelerim/videos/yazılımprojelerim.mp4",
    imgAlt: "Yazılım Projeleri",
    directLink: "https://github.com/AhmedMuazAtik"
  },
  //--------------------------------------------------------------
  {
    id: "Main Hesabım",
    refKey: "mainhesabim",
    title: "Itzanemoia",
    subtitle: "👁️ Mograph & AI",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/mainhesabım.mp4",
    imgAlt: "Main Hesabım",
    directLink: "https://www.instagram.com/itzanemoia/"
  },
  //--------------------------------------------------------------
  {
    id: "Sinematik Felsefe",
    refKey: "sosyalmedya",
    title: "Somniviant",
    subtitle: "🪶 Philosophy, Religion, Poetry, Art",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sinematikfelsefe.mp4",
    imgAlt: "Sinematik Felsefe",
    directLink: "https://www.instagram.com/somniviant/"
  },
  //--------------------------------------------------------------
  {
    id: "dini",
    refKey: "dini",
    title: "Vigilark",
    subtitle: "🪶 Felsefe, Din, Şiir, Sanat",
    bg: "#FFEFDB",
    video: "/images/projelerim/videos/dinivideolarım.mp4",
    imgAlt: "Vigilark",
    directLink: "https://www.instagram.com/vigilark/"
  },
  //--------------------------------------------------------------
  {
    id: "Tutorial Kurslarım",
    refKey: "sosyalmedya",
    title: "Vanivornn",
    subtitle: "✨ Simple Tutorial Videos",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/tutorialkurslarım.mp4",
    imgAlt: "Tutorial Kurslarım",
    directLink: "https://www.instagram.com/vanivornn/"
  },
  //--------------------------------------------------------------
  /*{
    id: "Materyal Paketlerim",
    refKey: "sosyalmedya",
    title: "Materyal Paketlerim",
    subtitle: "Satılık materyal paketlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/materyalpaketlerim.mp4",
    imgAlt: "Materyal Paketlerim",
    popupProjects: [

    ],
  },*/
  //--------------------------------------------------------------
  /*{
    id: "logo",
    refKey: "logo",
    title: "Logo Animasyonları",
    subtitle: "Tasarladığım mograph logo animasyonları.",
    bg: "#FFE7EB",
    video: "/images/projelerim/videos/logoanimasyonlari.mp4",
    imgAlt: "Logo Animasyonları",
    directLink: "https://www.instagram.com/obliqrium/"
  },*/
  //--------------------------------------------------------------
  {
    id: "Yapay Zeka Projelerim",
    refKey: "sosyalmedya",
    title: "Querrial",
    subtitle: "💡 Trend Artificial Intelligence Technologies",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/yapayzekaprojelerim.mp4",
    imgAlt: "Yapay Zeka Projelerim",
    directLink: "https://www.instagram.com/querrial/"
  },
  //--------------------------------------------------------------
  {
    id: "Logo Tasarımları",
    refKey: "sosyalmedya",
    title: "Obliqrium",
    subtitle: "✨ Logo Design, Logo Animation, Mograph",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/logotasarımları.mp4",
    imgAlt: "Logo Tasarımları",
    directLink: "https://www.instagram.com/obliqrium/"
  },
  //--------------------------------------------------------------
  {
    id: "Anime Motion Video",
    refKey: "sosyalmedya",
    title: "Kxllone",
    subtitle: "💫 I think i love editing a bit",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/amvv.mp4",
    imgAlt: "Anime Motion Video",
    directLink: "https://www.instagram.com/kxllone/"
  },
  //--------------------------------------------------------------
  {
    id: "Poster Tasarımları",
    refKey: "sosyalmedya",
    title: "Nullavore",
    subtitle: "💎 Poster Design Specialist",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/postertasarımları.mp4",
    imgAlt: "Poster Tasarımları",
    directLink: "https://www.instagram.com/nullavore/"
  },
  //--------------------------------------------------------------
  {
    id: "Car Motion Video",
    refKey: "sosyalmedya",
    title: "Dxllone",
    subtitle: "🏁 Passionate About Cars",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/carmotionvideo.mp4",
    imgAlt: "Car Motion Video",
    directLink: "https://www.instagram.com/dxllone/"
  },
  //--------------------------------------------------------------
  {
    id: "Sinematik Mograph",
    refKey: "sosyalmedya",
    title: "Axiomeia",
    subtitle: "✨ Doğrunun Estetiği",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sinematikmograph.mp4",
    imgAlt: "Sinematik Mograph",
    directLink: "https://www.instagram.com/axiomeia/"
  },
  //--------------------------------------------------------------
  {
    id: "3D Animasyonlar",
    refKey: "sosyalmedya",
    title: "Voxelith",
    subtitle: "💎 3D Animation, Modelling and Sculpting",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/3danimasyonlar.mp4",
    imgAlt: "3D Animasyonlar",
    directLink: "https://www.instagram.com/voxelith/"
  },
  //--------------------------------------------------------------
  /*{
    id: "Motion Grafikler",
    refKey: "sosyalmedya",
    title: "Motion Grafikler",
    subtitle: "Oluşturduğum farklı tarzlarda motion grafikler.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/motiongrafikler.mp4",
    imgAlt: "Motion Grafikler",
    popupProjects: [

    ],
  },*/
  //--------------------------------------------------------------
  {
    id: "Müzik Prodüksiyonu",
    refKey: "sosyalmedya",
    title: "Noctimane",
    subtitle: "🎧 Phonk and Dark Ambient",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/muzikproduksiyonu.mp4",
    imgAlt: "Müzik Prodüksiyonu",
    directLink: "https://www.instagram.com/noctimane/"
  },
  //--------------------------------------------------------------
  {
    id: "2D Animasyonlar",
    refKey: "sosyalmedya",
    title: "Inthoriart",
    subtitle: "🖌️ 2D Animation, Modelling and Drawing",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/2danimasyonlar.mp4",
    imgAlt: "2D Animasyonlar",
    directLink: "https://www.instagram.com/inthoriart/"
  },
  //--------------------------------------------------------------
  /*{
    id: "3D Modeller",
    refKey: "sosyalmedya",
    title: "3D Modeller",
    subtitle: "Oluşturduğum farklı tarzlarda 3D modeller.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/3dmodeller.mp4",
    imgAlt: "3D Modeller",
    popupProjects: [

    ],
  },*/
  //--------------------------------------------------------------
  {
    id: "Oyun Kesitlerim",
    refKey: "sosyalmedya",
    title: "Callmekenopsia",
    subtitle: "🎮 Just chilling, at most.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/oyunkesitlerim.mp4",
    imgAlt: "Oyun Kesitlerim",
    directLink: "https://www.instagram.com/callmekenopsia/"
  },
  //--------------------------------------------------------------
  /*{
    id: "3D Sculptlar",
    refKey: "sosyalmedya",
    title: "3D Sculptlar",
    subtitle: "Oluşturduğum farklı tarzlarda 3D sculptlar.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/3dsculptlar.mp4",
    imgAlt: "3D Modeller",
    popupProjects: [

    ],
  },*/
  //--------------------------------------------------------------
  {
    id: "Sinematik Projelerim",
    refKey: "sosyalmedya",
    title: "Nxllone",
    subtitle: "🍿 Cinematography",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sinematikprojelerim.mp4",
    imgAlt: "Sinematik Projelerim",
    directLink: "https://www.instagram.com/nxllone/"
  },
];

const AppShowcase = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const itemRefs = useRef([]); // grid item referansları
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
  }, []);

  const safePlay = async (video) => {
    if (!video) return;

    // Video hâlâ yüklenmemişse play yapma
    if (video.readyState < 2) return;

    try {
      if (video.paused) {
        await video.play();
      }
    } catch (error) {
      console.warn("Play error:", error);
    }
  };


  useEffect(() => {
    if (window.innerWidth > 1024) return; // sadece mobil

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          const index = Number(entry.target.dataset.index);
          const vid = videoRefs.current[index];
          if (!vid) return;

          if (entry.isIntersecting) {
            // Diğer videoları durdur
            videoRefs.current.forEach((v, i) => {
              if (i !== index && v && !v.paused) {
                v.pause();
                v.currentTime = 0;
              }
            });

            vid.currentTime = 0;
            await safePlay(vid); // ✅ güvenli play fonksiyonu
            setActiveIndex(index);
          } else if (activeIndex === index) {
            vid.pause();
            vid.currentTime = 0;
            setActiveIndex(null);
          }
        });
      },
      { threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIndex]);


  const getLoopedColSpan = (index) => {
    const mod = index % 6;
    if (mod === 0) return "col-span-1";
    if (mod === 1) return "col-span-1";
    return "col-span-1";
  };

  const handleProjectClick = (project) => {
    if (!project.popupProjects || project.popupProjects.length === 0) return;
    setPopupContent({
      title: project.title,
      projects: project.popupProjects,
    });
    setShowPopup(true);
  };

  return (
    <section
      id="calismalarim"
      className="w-full py-40 bg-black text-white min-h-screen"
    >
      {/* 📌 Title ve Subtitle */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 mb-12">
        <TitleHeader
          title="Üretken Yolculuğum"
          sub="💡 Seçili projelerime göz atın"
        />
      </div>

      <div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-dense gap-0 auto-rows-[400px] max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8"
      >
        {projectData.map((project, index) => {
          const colSpan = getLoopedColSpan(index);
          const isActiveMobile =
            window.innerWidth <= 1024 && activeIndex === index;

          const handleClick = () => {
            playSound("/images/sfx/clickin.wav", 1);

            // Eğer directLink varsa popup yerine doğrudan yönlendir
            if (project.directLink) {
              window.open(project.directLink, "_blank");
            } else {
              handleProjectClick(project);
            }
          };

          return (
            <div
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              key={project.id}
              onMouseEnter={() => {
                if (videoRefs.current[index]) {
                  videoRefs.current[index].currentTime = 0;
                  videoRefs.current[index].play();
                  playSound("/images/sfx/hoverin.wav", 1);
                }
              }}
              onMouseLeave={() => {
                if (videoRefs.current[index]) {
                  videoRefs.current[index].pause();
                  videoRefs.current[index].currentTime = 0;
                  playSound("/images/sfx/hoverout.wav", 1);
                }
              }}
              onClick={handleClick}
              className={`hover-target relative overflow-hidden cursor-pointer group
              border border-white/20 
              backdrop-blur-sm transition-all duration-300
              ${colSpan} row-span-1
              ${isActiveMobile ? "mobile-active" : ""}`}
            >
              {/* Eğer video varsa MP4 oynat, yoksa resim göster */}
              {project.video ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  muted
                  playsInline
                  loop
                  className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500
                  group-hover:opacity-100 ${isActiveMobile ? "opacity-100" : ""}`}
                  preload="auto"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={project.img}
                  alt={project.imgAlt}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}

              {/* Hover efekti siyah overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Üstteki küçük nokta */}
              <div className="absolute top-4 left-4 w-3 h-3 border border-white rounded-full group-hover:bg-white transition-colors duration-300" />

              {/* Başlık & Alt başlık */}
              <div
                className={`absolute bottom-4 left-4 right-4 z-10 transition-transform duration-500
                group-hover:-translate-y-1 ${isActiveMobile ? "-translate-y-1" : ""}`}
              >
                <h2 className="text-xl font-semibold text-white mb-1">
                  {project.title}
                </h2>
                <div
                  className={`opacity-0 transition-opacity duration-500
                  group-hover:opacity-100 ${isActiveMobile ? "opacity-100" : ""}`}
                >
                  {project.subtitle && (
                    <p className="text-sm text-white/80 line-clamp-2">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Sağ alt köşe ikonu */}
              <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition duration-500">
                <span className="text-white text-lg">↗</span>
              </div>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <ProjectPopup
          content={popupContent}
          onClose={() => {
            setShowPopup(false);
            playSound("/images/sfx/clickout.wav", 1);
          }}
        />
      )}
    </section>
  );
};

export default AppShowcase;
