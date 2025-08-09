import { useState } from "react";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section id="referanslarim" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Hakkımda Ne Söylüyorlar?"
          sub="⭐️ Müşterilerimin yorumlarından öne çıkanlar"
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-16">
  {testimonials.map((testimonial, index) => (
    <GlowCard key={index} card={testimonial}>
      <div className="flex items-center gap-3">
        <div>
          <img src={testimonial.imgPath} alt="" />
        </div>
        <div>
          <p className="font-bold">{testimonial.name}</p>
          <p className="text-white-50">{testimonial.mentions}</p>
        </div>
      </div>
    </GlowCard>
  ))}
</div>


        {/* Modal */}
        {selectedCard && (
          <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </div>
    </section>
  );
};

export default Testimonials;
