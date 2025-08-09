import { abilities } from "../constants";

const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div className="mx-auto grid-3-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="rounded-xl p-8 flex flex-col gap-4 
          backdrop-blur-md bg-white/5 border border-white/10 shadow-lg
          transition-all duration-500 hover:scale-105 hover:bg-white/10"
        >
          <div className="size-14 flex items-center justify-center rounded-full 
          transition-all duration-500 hover:scale-110">
            <img src={imgPath} alt={title} />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-white/70 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
