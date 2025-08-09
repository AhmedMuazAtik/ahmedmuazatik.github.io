const TitleHeader = ({ title, sub }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 relative z-10">
      {/* Subtitle */}
      <div
        className="inline-flex px-4 py-1 rounded-full
        backdrop-blur-md bg-black/30 shadow-lg 
        transition-transform duration-300 hover:scale-105 text-center"
      >
        <p className="text-white text-xs sm:text-sm md:text-base">
          {sub}
        </p>
      </div>

      {/* Title */}
      <h1
        className="font-semibold text-white text-center whitespace-nowrap leading-snug"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)"
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default TitleHeader;
