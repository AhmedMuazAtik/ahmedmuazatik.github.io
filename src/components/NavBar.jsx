import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { navLinks } from "../constants";
import { playSound } from "../playSound";
import { FiMusic } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";

const BREAKPOINT = 1024; // 1024px altı => mobil navbar
const DEBOUNCE_MS = 200; // resize/fullscreen sonrası ölçüm gecikmesi

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [playing, setPlaying] = useState(true);
  const fadeOutRef = useRef(null);
  const fadeInRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Tek kaynak: 'desktop' | 'mobile'
  const [mode, setMode] = useState("desktop");
  const isMobileUI = mode === "mobile";

  // Resize sırasında göz kırpmayı engellemek için kilit
  const [resizeLock, setResizeLock] = useState(false);
  const resizeTimerRef = useRef(null);

  // Ölçüm referansları
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const desktopNavRef = useRef(null);
  const rightRef = useRef(null);

  // Scroll gölgesi
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- MODE HESABI ---
  const computeMode = () => {
    // Lock sırasında ölçüm yapmayalım, kilit kalkınca tek seferde hesaplayacağız
    if (resizeLock) return;

    const widthMobile = window.innerWidth < BREAKPOINT;
    if (widthMobile) {
      if (mode !== "mobile") setMode("mobile");
      return;
    }

    // Masaüstü genişliği ama içerik taşarsa -> mobile
    if (
      containerRef.current &&
      logoRef.current &&
      desktopNavRef.current &&
      rightRef.current
    ) {
      const containerW = containerRef.current.clientWidth || 0;
      const logoW = logoRef.current.offsetWidth || 0;
      const navW = desktopNavRef.current.offsetWidth || 0;
      const rightW = rightRef.current.offsetWidth || 0;
      const padding = 24; // tampon
      const overflow = logoW + navW + rightW + padding > containerW;
      const next = overflow ? "mobile" : "desktop";
      if (mode !== next) setMode(next);
    } else {
      // İlk mount’ta referanslar hazır olmayabilir -> bir sonraki frame’de ölç
      requestAnimationFrame(() => {
        if (!resizeLock) computeMode();
      });
    }
  };

  // İlk render’da layout safhasında hesapla
  useLayoutEffect(() => {
    // Önce genişliğe göre kaba mod
    setMode(window.innerWidth < BREAKPOINT ? "mobile" : "desktop");
    // Sonra bir frame sonra overflow ölç
    requestAnimationFrame(() => computeMode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // İçerik boyutu değişimlerinde yeniden ölç (font yüklemesi vb.)
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!resizeLock) computeMode();
    });

    [containerRef, logoRef, desktopNavRef, rightRef]
      .map((r) => r.current)
      .filter(Boolean)
      .forEach((el) => ro.observe(el));

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeLock]);

  // Resize / Fullscreen: kilit + tek ölçüm
  useEffect(() => {
    const settle = () => {
      setResizeLock(false);
      computeMode(); // refs hazır → tek ölçüm
    };

    const toDesktopThenSettle = () => {
      setResizeLock(true);
      setMode("desktop"); // desktop'ı render et ki overflow ölçülebilsin
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(settle, DEBOUNCE_MS);
    };

    const toMobileThenSettle = () => {
      setResizeLock(true);
      setMode("mobile"); // küçük ekranda direkt mobile
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(settle, DEBOUNCE_MS);
    };

    const onResize = () => {
      if (window.innerWidth >= BREAKPOINT) toDesktopThenSettle();
      else toMobileThenSettle();
    };

    const onFsChange = () => {
      if (document.fullscreenElement) {
        // fullscreen'e GİRİLDİ
        toDesktopThenSettle();
      } else {
        // fullscreen'den ÇIKILDI
        toMobileThenSettle();
      }
    };

    // İlk mount’ta da doğru kaba moda getir
    onResize();

    window.addEventListener("resize", onResize);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("fullscreenchange", onFsChange);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobil menü açıkken body scroll kilidi
  useEffect(() => {
    if (isMobileUI && mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [isMobileUI, mobileOpen]);

  // Müzik
  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    if (fadeOutRef.current) clearInterval(fadeOutRef.current);
    if (fadeInRef.current) clearInterval(fadeInRef.current);

    if (playing) {
      let vol = audio.volume;
      fadeOutRef.current = setInterval(() => {
        vol -= 0.05;
        if (vol <= 0) {
          clearInterval(fadeOutRef.current);
          audio.pause();
        }
        audio.volume = Math.max(vol, 0);
      }, 50);
      setPlaying(false);
    } else {
      audio.play().catch(() => console.warn("Müzik başlatılamadı."));
      let vol = 0;
      audio.volume = 0;
      fadeInRef.current = setInterval(() => {
        vol += 0.05;
        if (vol >= 1) clearInterval(fadeInRef.current);
        audio.volume = Math.min(vol, 1);
      }, 50);
      setPlaying(true);
    }
  };

  // Drawer geçişinde flicker’ı azaltmak için kilitliyken transition kapat
  const drawerTransitionStyle = resizeLock ? { transition: "none" } : undefined;

  return (
    <>
      {/* Overlay: sadece mobile UI + menü açıkken */}
      {isMobileUI && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9997]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobil çekmece (landscape’te de sağdan çekme) */}
      {isMobileUI && (
        <div
          className={`fixed top-0 right-0 h-[100dvh] w-3/5 sm:w-2/5
                      bg-black/85 backdrop-blur-sm z-[9998]
                      transform transition-transform duration-500 ease-in-out
                      ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{
            paddingTop: "max(env(safe-area-inset-top), 16px)",
            paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            ...drawerTransitionStyle,
          }}
        >
          <div className="flex flex-col text-white font-medium text-base sm:text-lg gap-5 sm:gap-7 h-full px-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="opacity-70">Menü</span>
              <button
                className="p-2"
                onClick={() => {
                  playSound("/images/sfx/clickin2.wav", 1);
                  setMobileOpen(false);
                }}
                aria-label="Menüyü Kapat"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col">
              {navLinks.map(({ link, name }) => (
                <a
                  key={name}
                  href={link}
                  onClick={() => {
                    setMobileOpen(false);
                    playSound("/images/sfx/clickin.wav", 1);
                  }}
                  className="py-2 hover:text-orange-100 transition"
                >
                  {name}
                </a>
              ))}
            </nav>

            <div className="mt-2">
              <a
                href="#iletisim"
                onClick={() => {
                  setMobileOpen(false);
                  playSound("/images/sfx/clickin.wav", 1);
                }}
                className="border border-white rounded transition inline-flex items-center justify-center px-4 py-2 hover:bg-white hover:text-black"
              >
                Birlikte çalışalım
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
        <div
          ref={containerRef}
          className="inner w-full flex items-center justify-between"
          style={resizeLock ? { transition: "none" } : undefined}
        >
          {/* Logo */}
          <a
            ref={logoRef}
            href="#ahmedmuazatik"
            className="text-white-50 text-xl md:text-2xl font-semibold transition-all hover:scale-105 duration-500 hover:text-orange-100"
            onMouseEnter={() => playSound("/images/sfx/hoverin.wav", 1)}
            onMouseLeave={() => playSound("/images/sfx/hoverout.wav", 1)}
            onClick={() => playSound("/images/sfx/clickin.wav", 1)}
          >
            Ahmed Muaz Atik
          </a>

          {/* Masaüstü menü — sadece desktop modunda */}
          {mode === "desktop" && (
            <nav
              ref={desktopNavRef}
              className="desktop flex"
              style={resizeLock ? { transition: "none" } : undefined}
            >
              <ul className="flex gap-6">
                {navLinks.map(({ link, name }) => (
                  <li key={name} className="group">
                    <a
                      href={link}
                      onMouseEnter={() =>
                        playSound("/images/sfx/navbarhoverin.wav", 1)
                      }
                      onMouseLeave={() =>
                        playSound("/images/sfx/navbarhoverout.wav", 1)
                      }
                      onClick={() =>
                        playSound("/images/sfx/navbarclickin.wav", 1)
                      }
                    >
                      <span>{name}</span>
                      <span className="underline" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Sağ bölüm */}
          <div
            ref={rightRef}
            className="flex items-center gap-4"
            style={resizeLock ? { transition: "none" } : undefined}
          >
            {/* Müzik butonu */}
            <button
              onClick={() => {
                playSound("/images/sfx/clickin2.wav", 1);
                toggleMusic();
              }}
              onMouseEnter={() => playSound("/images/sfx/hoverin.wav", 1)}
              onMouseLeave={() => playSound("/images/sfx/hoverout.wav", 1)}
              className="group flex items-center gap-2 transition-all duration-500"
            >
              <span
                className={`relative text-xl transition-all duration-500 ${
                  !playing ? "opacity-50 line-through" : "opacity-100"
                }`}
              >
                <FiMusic />
              </span>
            </button>

            {/* CTA — sadece desktop modunda */}
            {mode === "desktop" && (
              <a
                href="#iletisim"
                className="contact-btn group"
                onMouseEnter={() => playSound("/images/sfx/hoverin.wav", 1)}
                onMouseLeave={() => playSound("/images/sfx/hoverout.wav", 1)}
                onClick={() => playSound("/images/sfx/clickin.wav", 1)}
              >
                <div className="inner">
                  <span>Birlikte çalışalım</span>
                </div>
              </a>
            )}

            {/* Mobil menü butonu — sadece mobile modunda */}
            {isMobileUI && (
              <button
                className="p-2 text-white z-[9999]"
                onClick={() => {
                  playSound("/images/sfx/clickin2.wav", 1);
                  setMobileOpen(true);
                }}
                aria-label="Menüyü Aç"
              >
                <HiMenuAlt3 size={24} />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
