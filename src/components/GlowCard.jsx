import { useRef, useEffect, useState } from "react";

const GlowCard = ({ card, children }) => {
  const cardRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const isPlayingRef = useRef(false);
  const lineRefs = useRef([]);
  const timeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);
  const rafRef = useRef(null);

  // Ses fade helper
  const fadeVolume = (audio, from, to, duration, onComplete) => {
    if (!audio) return;
    const start = performance.now();
    const step = () => {
      const now = performance.now();
      const t = Math.min(1, (now - start) / duration);
      audio.volume = from + (to - from) * t;
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };
    requestAnimationFrame(step);
  };

  // Mouse hareketi ile popup pozisyonu
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const percentX = (mouseX / rect.width) * 100;
      const percentY = (mouseY / rect.height) * 100;
      el.style.setProperty("--x", `${percentX}%`);
      el.style.setProperty("--y", `${percentY}%`);

      setPopupPos({ x: e.clientX + 15, y: e.clientY + 15 });
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPopup(true);
    requestAnimationFrame(() => setPopupVisible(true));
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Başka kartların sesini durdurmak için global event
  useEffect(() => {
    const stopHandler = () => {
      if (isPlaying) stopAudio();
    };
    window.addEventListener("stop-all-audio", stopHandler);
    return () => window.removeEventListener("stop-all-audio", stopHandler);
  }, [isPlaying]);

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      stopAudio();
    } else {
      window.dispatchEvent(new Event("stop-all-audio"));
      startAudio();
    }
  };

  const startAudio = async () => {
    window.dispatchEvent(new Event("stop-all-audio")); // 🔹 Önce diğerlerini durdur
    stopAudio(true); // 🔹 Kendi sesini kapat

    setProgress(0);

    if (!card.ttsPath) return;

    cancelAnimationFrame(rafRef.current);

    const audio = new Audio(card.ttsPath);
    audioRef.current = audio;
    audio.volume = 0;

    isPlayingRef.current = true;
    setIsPlaying(true);
    setProgress(0);

    await new Promise((resolve) => {
      audio.onloadedmetadata = resolve;
    });

    const duration = audio.duration * 1000;
    let reversing = false;
    let animationStart = performance.now();

    const animate = (now) => {
      if (!isPlayingRef.current) return;

      const elapsed = now - animationStart;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // 🔄 Highlight sonuna geldi, şimdi geri sarma başlasın
        reversing = true;
        animationStart = performance.now();
        rafRef.current = requestAnimationFrame(reverseAnimate);
      }
    };

    const reverseAnimate = (now) => {
      if (!isPlayingRef.current) return;

      const elapsed = now - animationStart;
      const pct = Math.max(1 - elapsed / 800, 0); // 🔁 0.8 saniyede geri sar
      setProgress(pct);

      if (pct > 0) {
        rafRef.current = requestAnimationFrame(reverseAnimate);
      } else {
        stopAudio(true); // 🔚 Geri sarma bittiğinde durdur
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    fadeVolume(audio, 0, 1, 800); // 🔊 Fade-in

    try {
      await audio.play();
    } catch (err) {
      console.warn("Ses başlatılamadı:", err);
      stopAudio(true);
      return;
    }

    // ⏹ Ses bittiğinde fade-out başlat
    audio.onended = () => {
      fadeVolume(audio, 1, 0, 500); // 🔇 Fade-out
    };
  };

  const stopAudio = (immediate = false) => {
    cancelAnimationFrame(rafRef.current);

    setProgress(0); // ✅ Hemen sıfırla, satır bug’ı kalkar

    if (audioRef.current) {
      const currentAudio = audioRef.current;
      fadeVolume(currentAudio, currentAudio.volume, 0, 400, () => {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          currentAudio.src = "";
          currentAudio.load();
        } catch (e) {
          console.warn("Ses kapatma hatası:", e);
        }
      });
    }

    audioRef.current = null; // 🔹 Nesneyi sıfırla
    isPlayingRef.current = false;
    setIsPlaying(false);
    setProgress(0);
  };

  // Dışarı tıklayınca durdur
  useEffect(() => {
    const stopOnOutsideClick = () => {
      if (isPlaying) stopAudio();
    };
    document.addEventListener("click", stopOnOutsideClick);
    return () => document.removeEventListener("click", stopOnOutsideClick);
  }, [isPlaying]);

  return (
    <>
      <div
        ref={cardRef}
        className="relative glow-card hover-target card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column transition-colors duration-500 hover:bg-white/10 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <div className="glow-border"></div>

        {/* Yıldızlar */}
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src="/images/musteriyorumlari/star.png"
              alt="star"
              className="size-5"
            />
          ))}
        </div>

        {/* Review + Highlight */}
        <div className="relative mb-5 overflow-hidden">
          <div className="relative inline-block">
            {/* Highlight bar */}
            <div
              className="absolute top-0 left-0 h-full bg-white mix-blend-difference transition-all ease-linear"
              style={{
                width: `${progress * 100}%`,
                opacity: isPlaying ? 1 : 0,
              }}
            ></div>
            <p className="text-white-50 text-lg relative z-10">
              {(Array.isArray(card.review)
                ? card.review
                : card.review.split("\n")
              ).map((line, i, arr) => {
                const totalLines = arr.length;
                const lineStart = i / totalLines;
                const lineEnd = (i + 1) / totalLines;

                let lineProgress = 0;
                if (progress >= lineStart) {
                  lineProgress = Math.min(
                    (progress - lineStart) / (lineEnd - lineStart),
                    1
                  );
                }

                // ✅ Her satır için ref
                if (!lineRefs.current) lineRefs.current = [];
                const setRef = (el) => {
                  if (el) lineRefs.current[i] = el;
                };

                const maxWidth = lineRefs.current[i]?.offsetWidth || 0;

                return (
                  <span
                    key={i}
                    className="relative block overflow-hidden w-fit"
                    ref={(el) => {
                      if (el) {
                        const textSpan = el.querySelector(".line-text");
                        if (textSpan) {
                          lineRefs.current[i] = textSpan.offsetWidth; // sadece yazı genişliği
                        }
                      }
                    }}
                  >
                    {/* Highlight */}
                    <span
                      className="absolute top-0 left-0 h-full bg-white mix-blend-difference"
                      style={{
                        width: `${lineProgress * (lineRefs.current[i] || 0)}px`,
                        opacity: isPlayingRef.current ? 1 : 0,
                      }}
                    ></span>

                    {/* Metin */}
                    <span className="line-text">{line}</span>
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {children}
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            top: popupPos.y,
            left: popupPos.x,
          }}
          className={`fixed z-[999] px-3 py-2 rounded-lg text-sm pointer-events-none 
            bg-white/5 text-white 
            transition-opacity duration-300 
            ${popupVisible ? "opacity-100" : "opacity-0"}`}
        >
          {card.popupText || "Dinlemek için tıkla"}
        </div>
      )}
    </>
  );
};

export default GlowCard;
