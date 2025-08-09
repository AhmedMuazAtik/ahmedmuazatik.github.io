import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import transitionIn from "../videotransition.json";
import transitionOut from "../videotransitionters.json";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const innerDotRef = useRef(null);
  const popupRef = useRef(null);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Sesler
  const popupSoundRef = useRef(null);
  const holdStartSoundRef = useRef(null);
  const holdLoopPlayedRef = useRef(false); // basılı tutma ses kontrol
  const transitionInSoundRef = useRef(null);
  const transitionOutSoundRef = useRef(null);

  const [phase, setPhase] = useState("idle");
  const [hovering, setHovering] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [videoFadingOut, setVideoFadingOut] = useState(false);
  const [videoKey, setVideoKey] = useState(0); // 🔁 her video tetiklemede DOM yeniden oluşur
  const [showVideoDOM, setShowVideoDOM] = useState(false);

  // Popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupOpacity, setPopupOpacity] = useState(0);

  // Mouse pos
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0, height: 12 });
  const smoothInnerPos = useRef({ x: 0, y: 0 });
  const popupSmoothPos = useRef({ x: 0, y: 0 });
  const targetPopupPos = useRef({ x: 0, y: 0 });

  // Morph
  const holdProgress = useRef(0);
  const holdingRef = useRef(false);

  const holdTimerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const popupTimerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  };

  checkMobile(); // İlk yüklemede kontrol et
  window.addEventListener("resize", checkMobile); // Boyut değişince kontrol et

  return () => window.removeEventListener("resize", checkMobile);
}, []);


  // -------------------- Popup --------------------
  const handleClick = () => {
    if (phase !== "idle") return;
    if (hovering) return; // Hover sırasında popup yok

    clearTimeout(popupTimerRef.current);

    setShowPopup(true);
    setPopupOpacity(1);

    // Popup sesi
    if (popupSoundRef.current) {
      popupSoundRef.current.currentTime = 0;
      popupSoundRef.current.play().catch(() => {});
    }

    popupTimerRef.current = setTimeout(() => {
      setPopupOpacity(0);
      setTimeout(() => setShowPopup(false), 300);
    }, 2500);
  };

  // -------------------- Basılı Tutma --------------------
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Sadece LMB
    if (hovering) return; // Hoverdayken basılı tutma devreye girmesin
    if (phase !== "idle") return;

    setShowPopup(false);
    setPopupOpacity(0);

    holdLoopPlayedRef.current = false; // reset

    setPhase("holding");
    holdingRef.current = true;

    // 0.1 sn sonra sadece 1 kere çal
    setTimeout(() => {
      if (holdingRef.current && !holdLoopPlayedRef.current) {
        holdLoopPlayedRef.current = true;
        if (holdStartSoundRef.current) {
          const sound = holdStartSoundRef.current;
          sound.currentTime = 0;
          sound.loop = false; // 🔹 sürekli dönmesin
          sound.volume = 1;
          sound.play().catch(() => {});
        }
      }
    }, 200);

    // 2.5 sn sonunda transition başlat
    holdTimerRef.current = setTimeout(() => {
      stopHoldSound(); // 🔹 transition başlamadan durdur
      triggerTransitionIn();
    }, 1800);
  };

  const handleMouseUp = () => {
    if (phase === "holding") {
      clearTimeout(holdTimerRef.current);
      holdingRef.current = false;
      stopHoldSound(); // 🔹 erkenden bırakırsa durdur
      setPhase("idle");
    }
  };

  // -------------------- Basılı tutma sesini durdurma fonksiyonu --------------------
  const stopHoldSound = () => {
    if (holdStartSoundRef.current && !holdStartSoundRef.current.paused) {
      fadeVolume(
        holdStartSoundRef.current,
        holdStartSoundRef.current.volume,
        0,
        300
      );
      setTimeout(() => {
        holdStartSoundRef.current.pause();
      }, 350);
    }
  };

  // -------------------- Transition --------------------
  const triggerTransitionIn = () => {
    setPhase("transitionIn");
    lockScroll(true);

    if (transitionInSoundRef.current) {
      transitionInSoundRef.current.currentTime = 0;
      transitionInSoundRef.current.play().catch(() => {});
    }
  };

  const onTransitionInComplete = () => {
    setVideoKey((prev) => prev + 1); // Key değiştir
    setShowVideoDOM(true); // Video DOM’unu görünür yap
    setPhase("video");
    setVideoFadingOut(false); // 👈 videonun tekrar görünmesini sağlar

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          fadeVolume(audioRef.current, 0, 1, 1000);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (phase === "video") {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;

        // DOM tam otursun diye 100ms bekle
        setTimeout(() => {
          const playPromise = video.play();
          if (playPromise && playPromise.then) {
            playPromise
              .then(() => {
                video.muted = false;
              })
              .catch((err) => {
                console.warn("Video play error:", err);
              });
          }
        }, 100);
      }
    }
  }, [phase, videoKey]); // ✅ videoKey'i dependency olarak ekledik

  const closeVideo = () => {
    setVideoFadingOut(true);

    lockScroll(false);
    document.body.classList.remove("cursor-triangle");

    holdProgress.current = 0;
    holdingRef.current = false;

    // Fade animasyonu tamamlanınca DOM'u kaldır
    setTimeout(() => {
      setShowVideoDOM(false); // <== bu önemli
      setPhase("transitionOut");
    }, 800);
  };

  const onTransitionOutComplete = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    holdingRef.current = false;
    holdProgress.current = 0;

    setPhase("idle");

    // Bunlar artık closeVideo'da zaten çalışıyor ama istersen burada yedekte kalabilir
    // lockScroll(false);
    // document.body.classList.remove("cursor-triangle");
  };

  // -------------------- Scroll Lock --------------------
  const lockScroll = (lock) => {
    document.documentElement.style.overflow = lock ? "hidden" : "";
    document.body.style.overflow = lock ? "hidden" : "";
  };

  // CustomCursor.jsx içinde
  useEffect(() => {
    const handleHoldStart = (e) => {
      setPhase("holding");
      // Burada üçgene morph class'ı ekleyeceğiz
      document.body.classList.add("cursor-triangle");
    };

    const handleHoldEnd = () => {
      setPhase("idle");
      document.body.classList.remove("cursor-triangle");
    };

    document.addEventListener("glowcard-holdstart", handleHoldStart);
    document.addEventListener("glowcard-holdend", handleHoldEnd);

    return () => {
      document.removeEventListener("glowcard-holdstart", handleHoldStart);
      document.removeEventListener("glowcard-holdend", handleHoldEnd);
    };
  }, []);

  // -------------------- Popup Smooth --------------------
  useEffect(() => {
    const handleMove = (e) => {
      targetPopupPos.current.x = e.clientX;
      targetPopupPos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    let raf;
    const follow = () => {
      popupSmoothPos.current.x +=
        (targetPopupPos.current.x - popupSmoothPos.current.x) * 0.08;
      popupSmoothPos.current.y +=
        (targetPopupPos.current.y - popupSmoothPos.current.y) * 0.08;

      if (popupRef.current) {
        popupRef.current.style.transform = `translate3d(${
          popupSmoothPos.current.x + 15
        }px, ${popupSmoothPos.current.y + 15}px, 0)`;
      }
      raf = requestAnimationFrame(follow);
    };
    follow();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  // -------------------- Hover Detection (HTML + 3D) --------------------
  useEffect(() => {
    const handleHover = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("cursor-hover", handleHover);
    window.addEventListener("cursor-leave", handleLeave);

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setHovering(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("cursor-hover", handleHover);
      window.removeEventListener("cursor-leave", handleLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // -------------------- Cursor Follow --------------------
  useEffect(() => {
    document.body.style.cursor = "none";

    const handleMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleScrollEvent = () => {
      setScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setScrolling(false), 150);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScrollEvent);

    let raf;
    const follow = () => {
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.15;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.15;
      smoothInnerPos.current.x +=
        (mousePos.current.x - smoothInnerPos.current.x) * 0.08;
      smoothInnerPos.current.y +=
        (mousePos.current.y - smoothInnerPos.current.y) * 0.08;

      // Morph ilerleme
      if (holdingRef.current) {
        holdProgress.current += 1 / (60 * 7);
        if (holdProgress.current > 1) holdProgress.current = 1;
      } else if (phase === "idle") {
        holdProgress.current -= 0.08;
        if (holdProgress.current < 0) holdProgress.current = 0;
      }

      const bigRadius = `${lerp(50, 8, holdProgress.current)}%`;
      const smallRadius = `${lerp(50, 4, holdProgress.current)}%`;

      // Hover scale
      const baseSize = hovering ? 40 : 12;
      const targetHeight = scrolling ? baseSize * 1.4 : baseSize;
      smoothPos.current.height +=
        (targetHeight - smoothPos.current.height) * 0.05;

      // Büyük cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          smoothPos.current.x - baseSize / 2
        }px, ${smoothPos.current.y - smoothPos.current.height / 2}px, 0)`;
        cursorRef.current.style.width = `${baseSize}px`;
        cursorRef.current.style.height = `${smoothPos.current.height}px`;
        cursorRef.current.style.borderRadius = bigRadius;
      }

      // Küçük cursor
      if (innerDotRef.current) {
        innerDotRef.current.style.transform = `translate3d(${
          smoothInnerPos.current.x - 2
        }px, ${smoothInnerPos.current.y - 2}px, 0)`;
        innerDotRef.current.style.borderRadius = smallRadius;
      }

      raf = requestAnimationFrame(follow);
    };
    follow();

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScrollEvent);
      cancelAnimationFrame(raf);
    };
  }, [hovering, scrolling, phase]);

  if (isMobile) return null;

  return (
    <>
      {/* Büyük cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 15000,
          backgroundColor: "white",
          border: hovering ? "none" : "2px solid rgba(255,255,255)",
          mixBlendMode: "difference",
        }}
      />
      {/* Küçük cursor */}
      <div
        ref={innerDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          backgroundColor: "white",
          pointerEvents: "none",
          zIndex: 15000,
          mixBlendMode: "difference",
        }}
      />

      {/* Popup */}
      {showPopup && (
        <div
          ref={popupRef}
          style={{
            position: "fixed",
            padding: "6px 10px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 20000,
            mixBlendMode: "difference",
            opacity: popupOpacity,
            transition: "opacity 0.4s ease",
          }}
        >
          Dinlemek için basılı tutun
        </div>
      )}

      {/* Transition In */}
      {phase === "transitionIn" && (
        <Lottie
          animationData={transitionIn}
          loop={false}
          autoplay
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 14000,
          }}
          rendererSettings={{ preserveAspectRatio: "none" }}
          onComplete={onTransitionInComplete}
        />
      )}
      {/* Video */}
      {showVideoDOM && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            zIndex: 14000,
            transition: "opacity 0.8s ease",
            opacity: videoFadingOut ? 0 : 1,
          }}
          onClick={closeVideo}
        >
          <video
            key={videoKey}
            ref={videoRef}
            src="/images/sinematik2.mp4"
            style={
              window.innerWidth <= 768
                ? { width: "100%", height: "100%", objectFit: "contain" }
                : { width: "100%", height: "100%", objectFit: "cover" }
            }
            onEnded={closeVideo}
            playsInline
            muted={false}
            autoPlay
          />
        </div>
      )}
      {/* Transition Out */}
      {phase === "transitionOut" && (
        <Lottie
          animationData={transitionOut}
          loop={false}
          autoplay
          style={{ position: "fixed", inset: 0, width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "none" }}
          onComplete={onTransitionOutComplete}
        />
      )}

      {/* Ses efektleri */}
      <audio ref={popupSoundRef} src="/images/sfx/clickin.wav" preload="auto" />
      <audio
        ref={holdStartSoundRef}
        src="/images/sfx/buildup.mp3"
        preload="auto"
      />
      <audio
        ref={transitionInSoundRef}
        src="/images/sfx/buildend.mp3"
        preload="auto"
      />
      <audio
        ref={transitionOutSoundRef}
        src="/images/sfx/clickin.wav"
        preload="auto"
      />
    </>
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function fadeVolume(audio, from, to, duration) {
  if (!audio) return;
  const start = performance.now();
  const step = () => {
    const t = Math.min(1, (performance.now() - start) / duration);
    audio.volume = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
