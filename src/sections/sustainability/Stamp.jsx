import { useEffect, useRef, useState } from "react";

function Stamp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-screen py-16 px-6 md:px-20">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Imagem */}
        <div
          className={`
            w-full md:w-1/2 flex justify-center md:justify-start
            transition-all duration-700 ease-out
            ${visible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-10"}
          `}
        >
          <img
            src="/assets/img/verdeverde.png"
            alt="Verde + Verde"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Texto */}
        <div
          className={`
            w-full md:w-1/2 text-[#1f6f3d]
            transition-all duration-700 ease-out
            ${visible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-10"}
          `}
          style={{ transitionDelay: "200ms" }}
        >
          <h3 className="text-lg md:text-xl mb-4 font-semibold">
            Mais que um selo, uma escolha
          </h3>

          <p className="text-sm md:text-base leading-relaxed">
            O Selo Verde representa um compromisso real com o futuro do planeta.
            Ele identifica produtos, processos e iniciativas que seguem práticas
            sustentáveis, desde a escolha de matérias-primas até a redução de
            impactos ambientais ao longo de toda a cadeia produtiva.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Stamp;