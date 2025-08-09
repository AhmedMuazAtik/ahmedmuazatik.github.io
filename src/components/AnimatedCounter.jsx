import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { playSound } from "../playSound";
import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];
      let lastValue = 0;
      let lastSoundTime = 0; // Son ses çalma zamanı
      const soundDelay = 40; // ms cinsinden (örn. 80ms = saniyede ~12 kere)

      gsap.set(numberElement, { innerText: "0" });

      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onUpdate: function () {
          const currentValue = Math.round(this.targets()[0].innerText);
          const now = Date.now();

          // Yeni değer geldiğinde ve belirlenen gecikme süresi geçtiğinde ses çal
          if (currentValue !== lastValue && now - lastSoundTime > soundDelay) {
            lastValue = currentValue;
            lastSoundTime = now;
            playSound("/images/sfx/hoverin.wav", 0.15);
          }
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    }, counterRef);
  }, []);

  return (
    <div id="counter" ref={counterRef} className="w-full padding-x-lg">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="rounded-xl p-8 flex flex-col gap-4 
            backdrop-blur-md bg-white/5 border border-white/10 shadow-lg
            transition-all duration-500 hover:scale-105 hover:bg-white/10"
          >
            <div className="counter-number text-white text-5xl font-bold mb-2">
              0 {item.suffix}
            </div>
            <div className="text-white/80 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
