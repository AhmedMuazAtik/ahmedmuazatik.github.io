import { useState } from "react";
import { playSound } from "../playSound";

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-3">
      <button
        onClick={() => {
          setOpen(!open);
          playSound("/images/sfx/clickin.wav", 1)
        }}
        onMouseEnter={() => playSound("/images/sfx/hoverin.wav", 1)}
        onMouseLeave={() => playSound("/images/sfx/hoverout.wav", 1)}
        className="flex justify-between items-center w-full text-left transition-colors duration-200 hover:text-blue-300"
      >
        <span className="text-white text-base md:text-lg font-semibold">
          {question}
        </span>
        <span
          className={`transform text-white text-2xl transition-transform duration-200 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-white/70 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
