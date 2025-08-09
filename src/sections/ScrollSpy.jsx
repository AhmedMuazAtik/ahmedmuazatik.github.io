import { useEffect } from "react";

export default function ScrollSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    let activeId = "";
    let debounceTimer = null;

    const updateHash = (id) => {
      if (id !== activeId) {
        activeId = id;
        history.replaceState(null, "", `#${id}`);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target;
          }
        });

        if (mostVisible) {
          // Debounce ile hızlı değişimi engelle
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            updateHash(mostVisible.id);
          }, 120); // 120ms bekleme süresi
        }
      },
      {
        root: null,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: "-20% 0px -50% 0px", // biraz gecikmeli algılasın
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      clearTimeout(debounceTimer);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return null;
}
