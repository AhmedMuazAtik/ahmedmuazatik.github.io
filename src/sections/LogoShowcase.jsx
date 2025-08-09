import { useState, useRef, useEffect } from "react";
import { logoIconsList } from "../constants";

const LogoIcon = ({ icon, isSelected, onClick }) => {
  return (
    <div
      className={`flex-none flex-center marquee-item transition-transform duration-300 cursor-pointer ${
        isSelected ? "scale-105" : "scale-100"
      }`}
      onClick={onClick}
    >
      <img
        src={icon.imgPath}
        alt={icon.name}
        className="pointer-events-none select-none"
        draggable="false"
      />
    </div>
  );
};

const LogoShowcase = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const translateX = useRef(0);

  const animationFrame = useRef(null);
  const baseSpeed = -0.4; // otomatik sola kayma
  const icons = [...logoIconsList, ...logoIconsList]; // sonsuz için iki kez kopya

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    lastX.current = e.pageX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.pageX - lastX.current;
    velocity.current = dx;
    lastX.current = e.pageX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleClickLogo = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setIsPaused(false);
    } else {
      setSelectedIndex(index);
      setIsPaused(true);
    }
  };

  const animate = () => {
    if (!isPaused) {
      if (isDragging.current) {
        translateX.current += velocity.current;
      } else if (Math.abs(velocity.current) > 0.05) {
        translateX.current += velocity.current;
        velocity.current *= 0.95; // momentum yavaşlatma
      } else {
        translateX.current += baseSpeed; // otomatik kayma
      }

      // Sonsuz döngü için
      const totalWidth =
        containerRef.current.scrollWidth / 2; // yarısı tek döngü
      if (translateX.current <= -totalWidth) {
        translateX.current += totalWidth;
      }
      if (translateX.current >= 0) {
        translateX.current -= totalWidth;
      }

      containerRef.current.style.transform = `translateX(${translateX.current}px)`;
    }

    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const container = containerRef.current;

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div className="relative" onClick={() => setSelectedIndex(null)}>
      <div className="marquee-container overflow-hidden select-none cursor-grab">
        <div
          ref={containerRef}
          className="marquee-box md:gap-12 gap-5"
          style={{ willChange: "transform" }}
        >
          {icons.map((icon, index) => (
            <LogoIcon
              key={index}
              icon={icon}
              isSelected={selectedIndex === index}
              onClick={(e) => {
                e.stopPropagation();
                handleClickLogo(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
