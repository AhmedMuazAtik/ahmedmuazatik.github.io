import { socialImgs } from "../constants";
import { playSound } from "../playSound";

const Footer = ({ onTermsClick }) => {
  return (
    <footer className="footer">
      <div className="footer-container z-1">
        <div className="flex flex-col justify-center">
          {/* Tıklanabilir hale getirildi */}
          <p
            onClick={(e) => {
              new Audio("/images/sfx/clickin.wav").play();
              onTermsClick(e);
            }}
            className="cursor-pointer hover:underline transition duration-200 inline-flex items-center gap-1 w-fit
             mx-auto md:mx-0 md:ml-0 md:mr-auto text-center"
            onMouseEnter={() => {
              playSound("/images/sfx/hoverin.wav", 1);
              window.dispatchEvent(new Event("cursor-hover"));
            }}
            onMouseLeave={() => {
              playSound("/images/sfx/hoverout.wav", 1);
              window.dispatchEvent(new Event("cursor-leave"));
            }}
          >
            📃 Şartlar & Koşullar
          </p>
        </div>

        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <a
              onMouseEnter={() => playSound("/images/sfx/hoverin.wav", 1)}
              onMouseLeave={() => playSound("/images/sfx/hoverout.wav", 1)}
              onClick={() => playSound("/images/sfx/clickin.wav", 1)}
              key={index}
              href={socialImg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <img src={socialImg.imgPath} alt={`${socialImg.name} icon`} />
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Ahmed Muaz Atik. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
