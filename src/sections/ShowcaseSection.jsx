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
    subtitle: "Yönetmiş olduğum sosyal medya hesaplarıyla ilgili dokümantasyonlar.",
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
    id: "Tutorial Kurslarım",
    refKey: "sosyalmedya",
    title: "Tutorial Kurslarım",
    subtitle: "Farklı alanlarda oluşturduğum kurslar.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/tutorialkurslarım.mp4",
    imgAlt: "Tutorial Kurslarım",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "code",
    refKey: "code",
    title: "Yazılım Projelerim",
    subtitle: "Öne çıkan projelerimi derledim, devamı GitHub sayfamda yer alıyor.",
    bg: "#FFEFDB",
    video: "/images/projelerim/videos/yazılımprojelerim.mp4",
    imgAlt: "Yazılım Projeleri",
    popupProjects: [
      {
        icon: "",
        title: "Car Brand Predictor",
        description: "Araçları sınıflandırmak için geliştirdiğimiz yapay zeka modeli.",
        thumbnail: "/images/projelerim/Yazılım/carbrandpredictor.png",
        link: "https://github.com/AhmedMuazAtik/Derin-Ogrenme-Tabanli-Marka-Siniflandirma-ve-Gorsel-Oneri-Sistemi/tree/main/Derin%20%C3%96%C4%9Frenme%20Tabanl%C4%B1%20Marka%20S%C4%B1n%C4%B1fland%C4%B1rma%20ve%20G%C3%B6rsel%20%C3%96neri%20Sistemi",
        dateRange: "Eylül 2024 - Haziran 2025"
      },
      {
        icon: "",
        title: "Promise12MSBench",
        description: "Göğüs kanseri tespiti için geliştirdiğim yapay zeka modeli.",
        thumbnail: "/images/projelerim/Yazılım/promise12msbench.png",
        link: "https://github.com/AhmedMuazAtik/Promise12MSBench",
        dateRange: "Şubat 2025 – Mart 2025"
      },
      {
        icon: "",
        title: "ChestxRay",
        description: "Zatürre tespiti için geliştirdiğim yapay zeka modeli.",
        thumbnail: "/images/projelerim/Yazılım/chestxray.png",
        link: "https://github.com/AhmedMuazAtik/chestxray_classification",
        dateRange: "Mart 2025 – Nisan 2025"
      },
      {
        icon: "",
        title: "BCI Classification",
        description: "Meme kanseri tespitini HER2 skorları üstünden sınıflandıran yapay zeka modeli.",
        thumbnail: "/images/projelerim/Yazılım/bci.png",
        link: "https://github.com/AhmedMuazAtik/BCIClassification",
        dateRange: "Ocak 2025 – Şubat 2025"
      },
      {
        icon: "",
        title: "16 Bit Datapath Design",
        description: "16 bit sistem için Logisim ile datapath devresi tasarımı.",
        thumbnail: "/images/projelerim/Yazılım/16bitdatapath.png",
        link: "https://github.com/AhmedMuazAtik/16-Bit-Veri-Yolu-Islemcisi-Tasarimi",
        dateRange: "Mayıs 2025 – Haziran 2025"
      },
      {
        icon: "",
        title: "Socket Programming",
        description: "Server ve kullanıcılar senkron proje oluşturup grup konuşması yapabildiği bir yazılım.",
        thumbnail: "/images/projelerim/Yazılım/socketprogramming.png",
        link: "https://github.com/AhmedMuazAtik/SocketProgramming",
        dateRange: "Mart 2023 – Nisan 2024"
      },
    ],
  },
  //--------------------------------------------------------------
  {
    id: "Materyal Paketlerim",
    refKey: "sosyalmedya",
    title: "Materyal Paketlerim",
    subtitle: "Satılık materyal paketlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/materyalpaketlerim.mp4",
    imgAlt: "Materyal Paketlerim",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "logo",
    refKey: "logo",
    title: "Logo Animasyonları",
    subtitle: "Tasarladığım mograph logo animasyonları.",
    bg: "#FFE7EB",
    video: "/images/projelerim/videos/logoanimasyonlari.mp4",
    imgAlt: "Logo Animasyonları",
    popupProjects: [
      {
        icon: "",
        title: "Arion GR Travel",
        description: "Arion GR Travel'e tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/arion.png",
        link: "https://youtube.com/shorts/21NZfI79OCQ?feature=share",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "Çoban Mustafa Paşa Vakfı",
        description: "Çoban Mustafa Paşa Vakfı'na tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/coban.png",
        link: "https://www.youtube.com/shorts/I5gP15U9iFc",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "Hayat Üniversitesi",
        description: "Hayat Üniversitesi'ne tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/hayat.png",
        link: "https://www.youtube.com/watch?v=dCZLSrufsX0",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "İznik Olive Peak",
        description: "İznik Olive Peak'e tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/iznik.png",
        link: "https://youtube.com/shorts/di58hQV5I4Q",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "Meyeka Medya",
        description: "Meyeka Medya'ya tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/meyeka.png",
        link: "https://youtube.com/shorts/KttohMWIHAQ",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "Seyr Dijital",
        description: "Seyr Dijital'e tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/seyrdijital.png",
        link: "https://youtube.com/shorts/ifInWCht1Mo",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "Servet Süt",
        description: "Servet Süt'e tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/servetsut.png",
        link: "https://youtube.com/shorts/UBkfxO_78OU",
        dateRange: "Kasım 2024 – Kasım 2024"
      },
      {
        icon: "",
        title: "Signature",
        description: "İmza olarak tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/sign.png",
        link: "https://youtube.com/shorts/1SjuBxkU3Ks",
        dateRange: "Eylül 2024 – Eylül 2024"
      },
      {
        icon: "",
        title: "Clone",
        description: "Clone kelimesine tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/clone.png",
        link: "https://www.youtube.com/watch?v=LR4yrLp10a4",
        dateRange: "Eylül 2024 – Eylül 2024"
      },
      {
        icon: "",
        title: "itzanemoia",
        description: "itzanemoia'ya tasarladığım mograph logo animasyonu.",
        thumbnail: "/images/projelerim/Logo Tasarımları/itzanemoia.png",
        link: "https://www.youtube.com/shorts/RDNAM0n_hIs",
        dateRange: "Mayıs 2025 – Mayıs 2025"
      },
    ],
  },
  //--------------------------------------------------------------
  {
    id: "Yapay Zeka Projelerim",
    refKey: "sosyalmedya",
    title: "Yapay Zeka Projelerim",
    subtitle: "Yapay zeka ile ilgili tüm projelerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/yapayzekaprojelerim.mp4",
    imgAlt: "Yapay Zeka Projelerim",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Logo Tasarımları",
    refKey: "sosyalmedya",
    title: "Logo Tasarımları",
    subtitle: "Tasarladığım illustration logo tasarımları.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/logotasarımları.mp4",
    imgAlt: "Logo Tasarımları",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Anime Motion Video",
    refKey: "sosyalmedya",
    title: "Anime Motion Video",
    subtitle: "AMV editlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/amvv.mp4",
    imgAlt: "Anime Motion Video",
    popupProjects: [
      {
        icon: "",
        title: "Draft",
        description: "Jujutsu Kaisen editim.",
        thumbnail: "/images/projelerim/AMV/Jujutsu Kaisen.png",
        link: "https://www.instagram.com/p/Cyp1vmiNBF3/",
        dateRange: "Ekim 2023 – Ekim 2023"
      },
      {
        icon: "",
        title: "Levi",
        description: "Attack on Titan editim.",
        thumbnail: "/images/projelerim/AMV/Attack on Titan.png",
        link: "https://www.instagram.com/p/Cyqh40INTwe/",
        dateRange: "Ekim 2023 – Ekim 2023"
      },
      {
        icon: "",
        title: "Itadori",
        description: "Jujutsu Kaisen editim.",
        thumbnail: "/images/projelerim/AMV/Jujutsu Kaisen (2).png",
        link: "https://www.instagram.com/p/CytVK3Dt2od/",
        dateRange: "Ekim 2023 – Ekim 2023"
      },
      {
        icon: "",
        title: "Gogeta vs Broly",
        description: "Dragon Ball editim.",
        thumbnail: "/images/projelerim/AMV/Dragon Ball.png",
        link: "https://www.instagram.com/p/Cy30ncqtE5U/",
        dateRange: "Ekim 2023 – Ekim 2023"
      },
      {
        icon: "",
        title: "Tanjiro",
        description: "Demon Slayer editim.",
        thumbnail: "/images/projelerim/AMV/Demon Slayer.png",
        link: "https://www.instagram.com/p/Cy502RCtvgi/",
        dateRange: "Ekim 2023 – Ekim 2023"
      },
      {
        icon: "",
        title: "Rengoku",
        description: "Demon Slayer editim.",
        thumbnail: "/images/projelerim/AMV/Demon Slayer (2).png",
        link: "https://www.instagram.com/p/Cy_PI45NeJQ/",
        dateRange: "Ekim 2023 – Ekim 2023"
      },
      {
        icon: "",
        title: "Smooth",
        description: "Jujutsu Kaisen editim.",
        thumbnail: "/images/projelerim/AMV/Jujutsu Kaisen (3).png",
        link: "https://www.instagram.com/p/C3Kh_U_NXje/",
        dateRange: "Şubat 2024 – Şubat 2024"
      },
      {
        icon: "",
        title: "Collab",
        description: "Jujutsu Kaisen editim.",
        thumbnail: "/images/projelerim/AMV/Jujutsu Kaisen (4).png",
        link: "https://www.instagram.com/p/C5CvRhMoD_r/",
        dateRange: "Mart 2024 – Mart 2024"
      },
      {
        icon: "",
        title: "Metal",
        description: "Attack on Titan editim.",
        thumbnail: "/images/projelerim/AMV/Attack on Titan (2).png",
        link: "https://www.instagram.com/p/C7USrGaNCO8/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Collab",
        description: "Kakegurui editim.",
        thumbnail: "/images/projelerim/AMV/Kakegurui.png",
        link: "https://www.instagram.com/p/C9LOEmxMvmp/",
        dateRange: "Temmuz 2024 – Temmuz 2024"
      },
      {
        icon: "",
        title: "Trash",
        description: "Hunter x Hunter editim.",
        thumbnail: "/images/projelerim/AMV/Hunter x Hunter.png",
        link: "https://www.instagram.com/p/C9mk5EttFpe/",
        dateRange: "Temmuz 2024 – Temmuz 2024"
      },
    ],
  },
  //--------------------------------------------------------------
  {
    id: "Poster Tasarımları",
    refKey: "sosyalmedya",
    title: "Poster Tasarımları",
    subtitle: "Tasarladığım farklı tarzlarda poster tasarımları.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/postertasarımları.mp4",
    imgAlt: "Poster Tasarımları",
    popupProjects: [
      {
        icon: "",
        title: "Attack on Titan",
        description: "Attack on Titan brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/AoT.jpg",
        link: "https://www.instagram.com/p/DBTlCgDghtv/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Lie",
        description: "Lie brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Lie.jpg",
        link: "https://www.instagram.com/p/DBTlQj2AzX4/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Samurai",
        description: "Samurai brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Samurai.jpg",
        link: "https://www.instagram.com/p/DBTlcAngJ-E/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Statue",
        description: "Statue brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Statue.jpg",
        link: "https://www.instagram.com/p/DBTlYbHgUie/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "WaytoDie",
        description: "WaytoDie brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/WaytoDie.jpg",
        link: "https://www.instagram.com/p/DBTlKu-g6-2/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Liminal",
        description: "Liminal brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Liminal.jpg",
        link: "https://www.instagram.com/p/DBTlgeygmH9/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Dororo",
        description: "Dororo brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Dororo.jpg",
        link: "https://www.instagram.com/p/DBTlGOvAcQd/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Muazprod",
        description: "Muazprod brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Muazprod.jpg",
        link: "https://www.instagram.com/p/C3LH5BgMN1C/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Signature",
        description: "Signature brutal style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Signature.jpg",
        link: "https://www.instagram.com/p/C1G-IjTA2De/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
      {
        icon: "",
        title: "Eminem",
        description: "Eminem album cover style poster tasarımı.",
        thumbnail: "/images/projelerim/Poster/Eminem.jpg",
        link: "https://www.instagram.com/p/DBVzG1qs8EQ/",
        dateRange: "Mayıs 2024 – Mayıs 2024"
      },
    ],
  },
  //--------------------------------------------------------------
  {
    id: "Car Motion Video",
    refKey: "sosyalmedya",
    title: "Car Motion Video",
    subtitle: "CMV editlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/carmotionvideo.mp4",
    imgAlt: "Car Motion Video",
    popupProjects: [
      {
        icon: "",
        title: "Nissan GTR",
        description: "Nissan GTR editim.",
        thumbnail: "/images/projelerim/CMV/Nissan GTR.png",
        link: "https://www.instagram.com/p/CvQQwy0tIIK/",
        dateRange: "Temmuz 2023 – Temmuz 2023"
      },
      {
        icon: "",
        title: "Nissan GTR",
        description: "Nissan GTR editim.",
        thumbnail: "/images/CMV/Nissan GTR (2).png",
        link: "https://www.instagram.com/p/CuhHaHTuAdZ/",
        dateRange: "Temmuz 2023 – Temmuz 2023"
      },
      {
        icon: "",
        title: "Supra MK4",
        description: "Supra MK4 editim.",
        thumbnail: "/images/projelerim/CMV/Supra MK4.png",
        link: "https://www.instagram.com/p/CvegRmhNrP3/",
        dateRange: "Ağustos 2023 – Ağustos 2023"
      },
      {
        icon: "",
        title: "Ferrari F40",
        description: "Ferrari F40 editim.",
        thumbnail: "/images/projelerim/CMV/Ferrari F40.png",
        link: "https://www.instagram.com/p/CvktxmXttAr/",
        dateRange: "Ağustos 2023 – Ağustos 2023"
      },
      {
        icon: "",
        title: "BMW M4",
        description: "BMW M4 editim.",
        thumbnail: "/images/projelerim/CMV/BMW M4.png",
        link: "https://www.instagram.com/p/Cvm8zCDtDL1/",
        dateRange: "Ağustos 2023 – Ağustos 2023"
      },
      {
        icon: "",
        title: "Honda NSX",
        description: "Honda NSX editim.",
        thumbnail: "/images/projelerim/CMV/Honda NSX.png",
        link: "https://www.instagram.com/p/CvpPU7ntd16/",
        dateRange: "Ağustos 2023 – Ağustos 2023"
      },
      {
        icon: "",
        title: "Mercedes AMG GTR",
        description: "Mercedes AMG GTR editim.",
        thumbnail: "/images/projelerim/CMV/Mercedes AMG GTR.png",
        link: "https://www.instagram.com/p/Cvznjp3NAqA/",
        dateRange: "Ağustos 2023 – Ağustos 2023"
      },
    ],
  },
  //--------------------------------------------------------------
  {
    id: "2D Animasyonlar",
    refKey: "sosyalmedya",
    title: "2D Animasyonlar",
    subtitle: "Oluşturduğum farklı tarzlarda 2D animasyonlar.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/2danimasyonlar.mp4",
    imgAlt: "2D Animasyonlar",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Sinematik Felsefe",
    refKey: "sosyalmedya",
    title: "Sinematik Felsefe",
    subtitle: "Oluşturduğum sinematik felsefe editlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sinematikfelsefe.mp4",
    imgAlt: "Sinematik Felsefe",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Çizim Projelerim",
    refKey: "sosyalmedya",
    title: "Çizim Projelerim",
    subtitle: "Karaladığım şeyler.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/çizimprojelerim.mp4",
    imgAlt: "Çizim Projelerim",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Sinematik Mograph",
    refKey: "sosyalmedya",
    title: "Sinematik Mograph",
    subtitle: "Oluşturduğum sinematik mographlarım.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sinematikmograph.mp4",
    imgAlt: "Sinematik Mograph",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "3D Animasyonlar",
    refKey: "sosyalmedya",
    title: "3D Animasyonlar",
    subtitle: "Oluşturduğum farklı tarzlarda 3D animasyonlar.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/3danimasyonlar.mp4",
    imgAlt: "3D Animasyonlar",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Motion Grafikler",
    refKey: "sosyalmedya",
    title: "Motion Grafikler",
    subtitle: "Oluşturduğum farklı tarzlarda motion grafikler.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/motiongrafikler.mp4",
    imgAlt: "Motion Grafikler",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "3D Modeller",
    refKey: "sosyalmedya",
    title: "3D Modeller",
    subtitle: "Oluşturduğum farklı tarzlarda 3D modeller.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/3dmodeller.mp4",
    imgAlt: "3D Modeller",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Oyun Kesitlerim",
    refKey: "sosyalmedya",
    title: "Oyun Kesitlerim",
    subtitle: "En iyi oyun kesitlerim.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/oyunkesitlerim.mp4",
    imgAlt: "Oyun Kesitlerim",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "3D Sculptlar",
    refKey: "sosyalmedya",
    title: "3D Sculptlar",
    subtitle: "Oluşturduğum farklı tarzlarda 3D sculptlar.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/3dsculptlar.mp4",
    imgAlt: "3D Modeller",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Sinematik Projelerim",
    refKey: "sosyalmedya",
    title: "Sinematik Projelerim",
    subtitle: "Sinemaya dair oluşturduğum her şey.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/sinematikprojelerim.mp4",
    imgAlt: "Sinematik Projelerim",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Proje Dosyaları",
    refKey: "sosyalmedya",
    title: "Proje Dosyaları",
    subtitle: "Satılık proje dosyalarım.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/projedosyalarım.mp4",
    imgAlt: "Proje Dosyaları",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------
  {
    id: "Müzik Prodüksiyonu",
    refKey: "sosyalmedya",
    title: "Müzik Prodüksiyonu",
    subtitle: "Oluşturduğum farklı tarzda müzikler.",
    bg: "#E6F1FF",
    video: "/images/projelerim/videos/muzikproduksiyonu.mp4",
    imgAlt: "Müzik Prodüksiyonu",
    popupProjects: [

    ],
  },
  //--------------------------------------------------------------

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

          const isActiveMobile = window.innerWidth <= 1024 && activeIndex === index;

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
              className={`hover-target relative overflow-hidden cursor-pointer group
  border border-white/20 
  backdrop-blur-sm transition-all duration-300
  ${colSpan} row-span-1
  ${isActiveMobile ? "mobile-active" : ""}`}
              onClick={() => {
                handleProjectClick(project);
                playSound("/images/sfx/clickin.wav", 1);
              }}
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
