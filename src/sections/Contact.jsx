import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { playSound } from "../playSound";
import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_USER,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ADMIN,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="iletisim" className="flex flex-col items-center justify-center section-padding">
      <div className="w-full max-w-2xl px-5">
        <TitleHeader
          title="İletişime Geçin – Bağlantı Kuralım"
          sub="💬 Sorularınız veya fikirleriniz mi var? Hadi konuşalım"
        />

        <div className="mt-10 flex justify-center">
          <div className="flex-center card-border rounded-xl p-10 w-full">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7"
            >
              <div>
                <label htmlFor="name">İsminiz</label>
                <input
                  className="backdrop-blur-md bg-black/30"
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="İsminiz nedir?"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Mailiniz</label>
                <input
                  className="backdrop-blur-md bg-black/30"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Mail adresiniz nedir?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Mesajınız</label>
                <textarea
                  className="backdrop-blur-md bg-black/30"
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Size nasıl yardımcı olabilirim?"
                  rows="5"
                  required
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => playSound("/images/sfx/hoverin.wav", 1)}
                onMouseLeave={() => playSound("/images/sfx/hoverout.wav", 1)}
                onMouseDown={() => playSound("/images/sfx/clickin.wav", 1)}
                onMouseUp={() => playSound("/images/sfx/clickout.wav", 1)}
              >
                <div className="cta-button group">
                  <div className="bg-circle" />
                  <p className="text">
                    {loading ? "GÖNDERİLİYOR..." : "Gönder"}
                  </p>
                  <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
