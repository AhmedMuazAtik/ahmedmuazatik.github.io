import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

const TechStack = () => {
  // GSAP animasyonu
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#becerilerim",
          start: "top center",
        },
      }
    );
  });

  // Hover event’lerini dispatch et
  const handleHoverIn = () => {
    window.dispatchEvent(new Event("cursor-hover"));
  };
  const handleHoverOut = () => {
    window.dispatchEvent(new Event("cursor-leave"));
  };

  return (
    <section id="becerilerim" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Beni Öne Çıkaran Yönlerim"
          sub="🤝 Katkı alanlarım & Uzmanlıklarım"
        />
        <div className="tech-grid">
          {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
            >
              {/* Hover’da animasyonlu background */}
              <div className="tech-card-animated-bg group-hover:opacity-100 opacity-0 transition-all duration-300" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={techStackIcon} />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
