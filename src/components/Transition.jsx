import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import transitionW from "../transitionw.json";

export default function Transition({ trigger, onComplete }) {
  const lottieRef = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useEffect(() => {
    if (trigger && lottieRef.current) {
      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    }
  }, [trigger]);

  return (
    <div
      className="fixed inset-0 z-[9995] pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={transitionW}
        loop={false}
        autoplay={false}
        style={{
          position: "absolute",
          top: isMobile ? "50%" : 0,
          left: isMobile ? "50%" : 0,
          width: isMobile ? "100vh" : "100%",
          height: isMobile ? "100vw" : "100%",
          transform: isMobile ? "translate(-50%, -50%) rotate(90deg)" : "none",
          transformOrigin: "center",
        }}
        rendererSettings={{
          preserveAspectRatio: "none",
        }}
        onComplete={onComplete}
      />
    </div>
  );
}
