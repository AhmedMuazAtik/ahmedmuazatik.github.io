import { useGSAP } from "@gsap/react";

import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";


const Hero = ({ setPdfPath }) => {
  useGSAP(() => {
  });

  return (
    <section id="ahmedmuazatik" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center w-full md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Sizin
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>Somut ve Etkili</h1>
              <h1>Projelere Dönüştürüyorum</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              <strong>Merhaba, ben Muaz!</strong><br></br>Tasarımda büyüdüm, mühendislikte derinleştim. <br></br>Şimdi, hayalleri üretkenlikle gerçeğe dönüştürüyorum.
            </p>

            <Button
              text="Çalışmalarım"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience setPdfPath={setPdfPath} />
          </div>
        </figure>
      </div>


    </section>
  );
};

export default Hero;
