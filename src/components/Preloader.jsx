import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import introAnim from "../introanimasyon.json";

export default function Preloader({ onClickStart, transitionActive }) {
  const fonts = [
    `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`,
    `"Press Start 2P", monospace`,
    `"Times New Roman", Times, serif`,
    `"Comic Sans MS", cursive`,
    `"Courier New", Courier, monospace`,
    `"Impact", Charcoal, sans-serif`,
    `"Lucida Console", Monaco, monospace`,
    `"Palatino Linotype", "Book Antiqua", Palatino, serif`,
    `"Garamond", serif`,
    `"Verdana", Geneva, sans-serif`,
    `"Futura", sans-serif`,
    `"Georgia", serif`,
    `"Trebuchet MS", sans-serif`,
    `"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif`,
  ];
  const names = ["Ahmed Muaz Atik", "itzanemoia"];

  const [progress, setProgress] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [nameIndex, setNameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorFade, setCursorFade] = useState(false);
  const [finalFadeOut, setFinalFadeOut] = useState(false);
  const smoothInnerPos = useRef({ x: 0, y: 0 });
  const playedOnceRef = useRef(false); // 🔹 Tek sefer çalma kontrolü
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const [scaleFactor, setScaleFactor] = useState(1);

  const audioRef = useRef(null);

  useEffect(() => {
  const updateScale = () => {
    // 1080px yüksekliği referans alıyoruz (senin tasarım ölçün)
    setScaleFactor(window.innerHeight / 1080);
  };

  updateScale();
  window.addEventListener("resize", updateScale);
  return () => window.removeEventListener("resize", updateScale);
}, []);

  // Preloader açıkken scroll kapat
  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // <html>
    document.body.style.overflow = "hidden"; // <body>
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, []);

  useEffect(() => {
    const increment = 1;
    const frameSpeed = 15;
    let frameCounter = 0;

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const next = prev + increment;
          frameCounter++;
          if (frameCounter % 15 === 0) {
            setFontIndex((f) => (f + 1) % fonts.length);
            setNameIndex((n) => (n + 1) % names.length);
          }
          return Math.min(next, 100);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setCursorFade(true);
            setTimeout(() => {
              setIsLoaded(true);
              setCursorFade(false);
            }, 700);
          }, 300);
          return 100;
        }
      });
    }, frameSpeed);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/images/intro.wav");
    audioRef.current.preload = "auto";
  }, []);

  useEffect(() => {
    const moveHandler = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  const handleClick = async () => {
    if (playedOnceRef.current) return;
    playedOnceRef.current = true;

    try {
      if (audioRef.current && audioRef.current.paused) {
        // 🔸 2 saniye gecikmeli başlat
        setTimeout(() => {
          audioRef.current.play();

          // 🔸 Örnek olarak 7 saniye sonra durdur
          setTimeout(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }, 6000);
        }, 750);
      }
    } catch (err) {
      console.warn("Ses çalma hatası:", err);
    }

    setCursorFade(true);
    setFinalFadeOut(true);

    setTimeout(() => {
      document.body.style.overflow = "auto";
      onClickStart?.();
    }, 600);
  };

  useEffect(() => {
    const targetPos = { x: 0, y: 0 };

    const handleMove = (e) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
    };

    let raf;
    const follow = () => {
      smoothInnerPos.current.x +=
        (targetPos.x - smoothInnerPos.current.x) * 0.08;
      smoothInnerPos.current.y +=
        (targetPos.y - smoothInnerPos.current.y) * 0.08;

      // state ile bağla
      setCursorPos({
        x: smoothInnerPos.current.x,
        y: smoothInnerPos.current.y,
      });

      raf = requestAnimationFrame(follow);
    };
    follow();

    window.addEventListener("mousemove", handleMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center text-black transition-colors duration-500 ${
        transitionActive ? "bg-transparent" : "bg-white"
      }`}
    >
      {/* Grid */}
      <div
        className={`page-grid ${isLoaded && !finalFadeOut ? "visible" : ""}`}
      />

      {/* Cursor yazısı */}
      {/* Cursor yazısı */}
{!isMobile && (
  <div
    style={{
      position: "fixed",
      left: cursorPos.x + 10,
      top: cursorPos.y + 10,
      pointerEvents: "none",
      fontSize: "12px",
      opacity: cursorFade ? 0 : 0.8,
      transition: "opacity 0.5s ease",
    }}
  >
    {!isLoaded ? "Yükleniyor..." : "Başlamak için bir yere tıklayın"}
  </div>
)}


      {/* Loading ekranı */}
      {!isLoaded && (
        <div
          className={`flex flex-col items-center justify-center transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute top-14 text-sm opacity-70">
            {progress.toFixed(0)}%
          </div>
          <div
            style={{
              fontFamily: fonts[fontIndex],
              transition: "font-family 0.3s ease",
            }}
            className="text-4xl font-medium tracking-tight text-center"
          >
            {names[nameIndex]}
          </div>
          <div className="absolute bottom-14 text-sm opacity-70">
            {progress.toFixed(0)}%
          </div>
        </div>
      )}

      {/* Final ekran */}
      {isLoaded && (
        <div
          className={`flex flex-col items-center justify-center gap-6 text-center transition-opacity duration-700 ${
            finalFadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Lottie
            animationData={introAnim}
            loop
            autoplay
            className="w-150 h-150"
            style={{
              transform: isMobile
                ? "translateY(-70px) scale(0.75)" // 📱 mobil
                : "translateY(0px) scale(1)", // 🖥️ pc
              transformOrigin: "center",
            }}
          />

          {/* Buradaki stilleri tamamen kendin değiştirebilirsin */}
          <div
            style={{
              fontFamily: "'Futura', sans-serif", // bizim eklediğimiz font ailesi
            }}
          >
           <div
  style={{
    position: "absolute",
    bottom: 1000 * scaleFactor + "px", // masaüstündeki mesafeyi ölçekle
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    fontSize: `${13 * scaleFactor}px`, // yazı boyutu da orantılı olsun
    fontWeight: 600,
    opacity: 0.9,
    marginTop: "8px",
    color: "#000",
    letterSpacing: "1px",
  }}
>
  SAYFA YÜKLENDİ
</div>

<div
  style={{
    position: "absolute",
    bottom: 300 * scaleFactor + "px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    fontSize: `${12 * scaleFactor}px`,
    fontWeight: 50,
    animation: "blinkFade 2s ease-in-out infinite",
    color: "#000",
    letterSpacing: "1px",
  }}
>
  BAŞLAMAK İÇİN BİR YERE TIKLAYIN
</div>

<div
  style={{
    position: "absolute",
    bottom: 78 * scaleFactor + "px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    fontSize: `${13 * scaleFactor}px`,
    fontWeight: 600,
    opacity: 1,
    marginTop: "8px",
    color: "#000",
    letterSpacing: "1px",
  }}
>
  KULAKLIK ÖNERİLİR
</div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes blinkFade {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
