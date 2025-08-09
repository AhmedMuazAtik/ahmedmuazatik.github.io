import { useEffect, useRef, useState } from "react";
import { playSound } from "../playSound";

const ProjectPopup = ({ content, onClose }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePos, setMousePos] = useState(null);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const previewRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  // Mevcut smoothMove effect'in aynen kalacak
  useEffect(() => {
    let animationFrame;
    const smoothMove = () => {
      if (previewRef.current && mousePos) {
        previewRef.current.style.top = `${mousePos.y + 20}px`;
        previewRef.current.style.left = `${mousePos.x + 20}px`;
      }
      animationFrame = requestAnimationFrame(smoothMove);
    };
    animationFrame = requestAnimationFrame(smoothMove);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  // Ek olarak yeni cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.cursor = "default"; // cursor'u sıfırla
      document.body.classList.remove(
        "cursor-pointer",
        "cursor-custom",
        "cursor-hovered"
      ); // olası Tailwind cursor class'larını temizle
    };
  }, []);


  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-wrapper") {
      handleClose(); // burada da cursor reset çalışsın
    }
  };

  const handleClose = () => {
    setHoveredImage(null);
    setShowPreview(false);

    // Cursor'u anında küçült
    window.dispatchEvent(new Event("force-cursor-reset"));

    document.body.style.cursor = "default";
    onClose();
  };



  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      id="popup-wrapper"
      onClick={handleOutsideClick}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black/50  text-white p-6 rounded-lg w-11/12 max-w-6xl max-h-[85vh] shadow-lg animate-popup mt-8 mb-4"
      >
        {/* Üst Başlık */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{content.title}</h3>
          <button
            onMouseEnter={() => setIsCloseHovered(true)}
            onMouseLeave={() => setIsCloseHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              setIsCloseHovered(false); // büyümeyi kapat
              setHoveredImage(null);
              setShowPreview(false);
              document.body.style.cursor = "default";
              handleClose();
            }}
            className={`text-gray-400 text-sm transition-transform duration-200 ${isCloseHovered ? "scale-110 text-white" : ""
              }`}
          >
            ✕ Kapat
          </button>

        </div>

        {/* Projeler Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 scrollbar"
          style={{
            maxHeight: "calc((10rem + 1.5rem) * 3)", // her kart yaklaşık 10rem yüksekliğinde + gap
          }}
        >
          {content.projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white/5 p-4 rounded-md hover:bg-white/10 transition"
              onMouseEnter={() => {
                playSound("/images/sfx/hoverin.wav", 1);
                setHoveredImage(project.thumbnail);
                setShowPreview(true);
              }}
              onMouseLeave={() => {
                playSound("/images/sfx/hoverout.wav", 1);
                setHoveredImage(null);
                setShowPreview(false);
                document.body.style.cursor = "default";
                document.body.classList.remove("cursor-pointer", "cursor-custom", "cursor-hovered");
              }}


              onMouseMove={(e) => {
                setMousePos({ x: e.clientX, y: e.clientY });
              }}
            >
              {/* Hover ile beliren "View Project" butonu */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center gap-2 bg-white/90 text-black px-3 py-1 rounded-lg shadow-md border border-gray-300 text-xs font-medium backdrop-blur-sm">
                  Görüntüle ↗
                </span>
              </div>

              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-md mb-3 border border-white/10"
                />
              )}

              <h4 className="text-lg font-medium mb-1">
                {project.icon} {project.title}
              </h4>

              {project.dateRange && (
                <p className="text-xs text-gray-500 mb-1">{project.dateRange}</p>
              )}

              <p className="text-sm text-gray-400 break-words line-clamp-2">
                {project.description}
              </p>
            </a>

          ))}
        </div>
      </div>

      {/* Hover Preview */}
      {showPreview && hoveredImage && mousePos && (
        <img
          ref={previewRef}
          src={hoveredImage}
          alt="preview"
          className="fixed z-50 pointer-events-none transition-opacity duration-300 ease-in-out"
          style={{
            top: mousePos.y + 20,
            left: mousePos.x + 20,
            position: "fixed",
            width: "220px",
            opacity: 1,
            transform: "scale(1)",
            borderRadius: "8px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          }}
        />
      )}
    </div>
  );
};

export default ProjectPopup;
