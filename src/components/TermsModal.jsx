import { useState, useEffect } from "react";
import { playSound } from "../playSound";

const TermsModal = ({ onClose }) => {
  const [checked, setChecked] = useState(false);

  // Sayfa scroll'unu engelle
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white text-black p-8 pt-10 rounded-xl max-w-3xl w-[90%] max-h-[80vh] shadow-2xl flex flex-col overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-center mt-2 pt-2">
          🧾 Şartlar, Koşullar ve Gizlilik Politikası
        </h2>

        <div className="overflow-y-auto max-h-[35vh] md:max-h-[80vh] pr-2 mb-4 text-sm leading-relaxed space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <p><strong>Son Güncelleme:</strong> 14 Temmuz 2025</p>
          <p><strong>Sahibi:</strong> Ahmed Muaz Atik</p>
          <p>
            Bu web sitesi, Ahmed Muaz Atik tarafından kurulmuş ve yönetilen bir portfolyo ve hizmet platformudur.
            Siteye erişerek, aşağıda belirtilen tüm şartları ve politikaları kabul etmiş sayılırsınız.
            Her içerik, her satır, her proje bilinçle ve titizlikle oluşturulmuştur.
          </p>

          <h3 className="font-semibold">1. Web Sitesinin Amacı</h3>
          <p>
            Bu site; yazılım geliştirme, tasarım, animasyon, AMV düzenleme ve yaratıcı üretim süreçlerinin profesyonel olarak sunulduğu bir vitrin niteliğindedir.
            Portfolyo gerçek projelerle, hizmet anlayışı ise ilke ile şekillenmiştir.
          </p>

          <h3 className="font-semibold">2. Fikri Mülkiyet Hakları</h3>
          <p>
            Bu sitede yer alan tüm içerikler (metinler, projeler, grafikler, videolar, animasyonlar, kod yapıları ve diğer medya öğeleri) Ahmed Muaz Atik’e aittir.
            İçeriklerin izinsiz olarak kopyalanması, çoğaltılması, yeniden paylaşılması veya ticari amaçla kullanılması kesinlikle yasaktır.
          </p>
          <p className="italic text-center">"İlham alınabilir, ama emek kopyalanamaz."</p>

          <h3 className="font-semibold">3. Hizmet Koşulları</h3>
          <p>
            Bu site üzerinden sunulan hizmetler; özel projeler, danışmanlıklar, tasarım çalışmaları ve teknik üretimleri kapsamaktadır.
            Her hizmet, gelen talepler doğrultusunda özelleştirilerek planlanır.
            Yalnızca ciddi, saygılı ve iş odaklı talepler değerlendirmeye alınır.
          </p>

          <h3 className="font-semibold">4. Üçüncü Taraf Bağlantılar</h3>
          <p>
            Site içinde GitHub, Behance, YouTube gibi üçüncü taraf platformlara yönlendirmeler yapılabilir.
            Bu dış platformlardaki içeriklerin güvenliğinden veya doğruluğundan Ahmed Muaz Atik sorumlu değildir.
            Ancak tüm yönlendirmeler güvenilirlik ilkesiyle yapılır.
          </p>

          <h3 className="font-semibold">5. Gizlilik Politikası</h3>
          <p><strong>a) Hangi Veriler Toplanır?</strong></p>
          <p>
            Bu site, hiçbir kullanıcıdan aktif olarak kişisel veri toplamaz.
            Ancak iletişim formları, e-posta üzerinden gelen mesajlar veya bağlantılar aracılığıyla sizin tarafınızdan sağlanan bilgiler alınabilir.
          </p>
          <p><strong>b) Verilerin Kullanımı</strong></p>
          <p>
            Toplanan bilgiler yalnızca sizinle iletişime geçmek, proje detaylarını konuşmak veya geri dönüş sağlamak amacıyla kullanılır.
            Üçüncü kişilerle paylaşılmaz, satılmaz, reklam amaçlı kullanılmaz.
          </p>
          <p><strong>c) Güvenlik</strong></p>
          <p>
            Sitenin altyapısı güvenli bağlantılarla korunmakta olup, iletişim bilgileri üçüncü şahısların erişimine karşı korunur.
            Veri güvenliği ciddiye alınır ve sorumluluk çerçevesinde saklanır.
          </p>

          <h3 className="font-semibold">6. Teknik Sorunlar ve Sorumluluk Reddi</h3>
          <p>
            Bu site modern tarayıcılarla tam uyumlu çalışacak şekilde optimize edilmiştir.
            Ancak donanımsal veya bağlantı kaynaklı aksaklıklardan dolayı yaşanabilecek deneyim farklılıkları konusunda sorumluluk kabul edilmez.
            İşlevsellik odaklı, sadelik öncelikli bir yapı esas alınmıştır.
          </p>

          <h3 className="font-semibold">7. Güncellemeler</h3>
          <p>
            Bu doküman, hizmetlere ve yasal düzenlemelere göre zamanla güncellenebilir.
            Değişiklikler sitede yayınlandığı anda yürürlüğe girer.
          </p>

          <h3 className="font-semibold">8. İletişim</h3>
          <p>
            Her türlü iş birliği, proje teklifi ya da geri bildirim için:
            <br />📧 <a href="mailto:itzanemoia@gmail.com" className="text-blue-600 underline">itzanemoia@gmail.com</a>
            <br />📍 Türkiye merkezli, uzaktan çalışan bağımsız üretici.
          </p>
        </div>

        <label className="hover-target flex items-center gap-2 text-sm mb-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            onClick={() => playSound("/images/sfx/clickin.wav", 1)}
          />
          Şartları okudum ve kabul ediyorum.
        </label>

        <button
          onClick={() => {
            // Modal kapatmadan önce cursor'u eski haline getir
            playSound("/images/sfx/clickin2.wav", 1)
            window.dispatchEvent(new Event("cursor-leave"));
            onClose();
          }}
          disabled={!checked}
          className={`py-2 w-full rounded-md font-medium transition-all duration-300 ${checked
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Kabul Ediyorum
        </button>

      </div>
    </div>
  );
};

export default TermsModal;
