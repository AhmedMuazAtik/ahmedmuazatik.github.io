import { useState, useEffect, useRef } from "react";
import './index.css';
import TermsModal from "./components/TermsModal";
import AnimatedCounter from "./components/AnimatedCounter";
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import ScrollSpy from "./sections/ScrollSpy";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import FaqSection from "./sections/FaqSection";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import { navLinks } from "./constants";
import Transition from "./components/Transition";

const App = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transitionTrigger, setTransitionTrigger] = useState(false);
  const [interactionLocked, setInteractionLocked] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  const fadeIntervalRef = useRef(null); // Fade işlemi çakışmasın diye

  // Fade fonksiyonu - hem açma hem kapama
  const fadeAudio = (audio, targetVolume) => {
    if (!audio) return;
    clearInterval(fadeIntervalRef.current); // Önceki fade iptal

    let step = targetVolume > audio.volume ? 0.05 : -0.05;
    fadeIntervalRef.current = setInterval(() => {
      let newVol = audio.volume + step;

      if ((step > 0 && newVol >= targetVolume) || (step < 0 && newVol <= targetVolume)) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current);
        return;
      }

      audio.volume = Math.min(Math.max(newVol, 0), 1);
    }, 50);
  };

  const handleStart = () => {
    setInteractionLocked(true);
    setTransitionTrigger(true);
    
    // Arka plan müziği başlat
    setTimeout(() => {
      const bgMusic = document.getElementById("bg-music");
      if (bgMusic) {
        bgMusic.src = "/images/themes.mp3";
        bgMusic.loop = true;
        bgMusic.volume = 0;
        bgMusic.play().catch(() => {});
        fadeAudio(bgMusic, 1); // Smooth aç
      }
    }, 300);
  };

  const handleTransitionComplete = () => {
    setLoading(false);
    setInteractionLocked(false);
    setTransitionTrigger(false);
  };

  // Sekme değişiminde smooth fade-in/fade-out
  useEffect(() => {
    const bgMusic = document.getElementById("bg-music");

    const handleVisibilityChange = () => {
      if (!bgMusic) return;

      if (document.hidden) {
        setIsSleeping(true);
        fadeAudio(bgMusic, 0); // Smooth kapan
      } else {
        setIsSleeping(false);
        fadeAudio(bgMusic, 1); // Smooth aç
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <>
      <audio id="bg-music" src="/images/theme.mp3" loop preload="auto" />
      <div className="animated-gradient" />
      <CustomCursor />

      {/* Uyku modu bildirimi */}
      {isSleeping && (
        <div className="fixed bottom-5 right-5 bg-black/80 text-white px-3 py-1 rounded text-sm z-[99999]">
          🔇 Site şu anda uykuda
        </div>
      )}

      {loading && (
        <Preloader
          onClickStart={handleStart}
          transitionActive={transitionTrigger}
        />
      )}

      {transitionTrigger && (
        <Transition
          trigger={transitionTrigger}
          onComplete={handleTransitionComplete}
        />
      )}

      {interactionLocked && (
        <div className="fixed inset-0 z-[9995] bg-transparent pointer-events-auto" />
      )}

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      <Navbar />
      <ScrollSpy navLinks={navLinks} />

      <section id="ahmedmuazatik">
        <Hero />
      </section>

      <AnimatedCounter />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <FaqSection />

      <section id="iletisim">
        <Contact />
      </section>
      <Footer onTermsClick={() => setShowTerms(true)} />
    </>
  );
};

export default App;
