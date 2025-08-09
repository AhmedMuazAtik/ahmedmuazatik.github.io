import FaqItem from "../components/FaqItem";
import TitleHeader from "../components/TitleHeader";

const FaqSection = () => {
  const faqs = [
    {
      question: "Sizinle nasıl iletişime geçebilirim?",
      answer:
        "Aşağıda yer alan iletişim sekmesi aracılığıyla tarafıma mail gönderebilirsiniz.",
    },
    {
      question: "Web siteni hangi teknolojilerle yaptın?",
      answer:
        "React, Three.js, Tailwind CSS, GSAP ve Framer Motion gibi modern teknolojileri kullandım. Arayüz ve deneyim odaklı geliştirdim.",
    },
    {
      question: "Bu tasarımları tamamen sen mi yaptın?",
      answer:
        "Evet. Hem tasarım hem de geliştirme bana ait.",
    },
    {
      question: "CV’ne nasıl ulaşabilirim?",
      answer:
        "En yukarıda yer alan heykelin üzerindeki kitaplara tıklayarak ulaşabilirsiniz.",
    },
    {
      question: "Bu portfolyoyu geliştiriyor musun?",
      answer:
        "Evet. Sürekli güncel tutuyorum. Gelen geri bildirimlere göre hem içerik hem performans yönünde düzenlemeler yapıyorum.",
    },
  ];

  return (
    <section id="faqs" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 max-w-3xl mx-auto z-1">
        <TitleHeader
          title="Sıkça Sorulan Sorular"
          sub="🔍 Hakkımda en çok merak edilenler"
        />
        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
