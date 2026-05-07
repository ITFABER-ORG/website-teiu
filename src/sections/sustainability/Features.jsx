import { useEffect, useRef, useState } from "react";

function Features() {
  const cards = [
    {
      img: "/assets/img/card1.jpeg",
      title: "Pureza que vem da natureza",
      desc: "Uma limpeza eficiente com inspiração natural, pensada para reduzir impactos e cuidar do seu dia a dia.",
    },
    {
      img: "/assets/img/card2.jpeg",
      title: "Pureza que vem da natureza",
      desc: "Uma limpeza eficiente com inspiração natural, pensada para reduzir impactos e cuidar do seu dia a dia.",
    },
    {
      img: "/assets/img/card3.jpeg",
      title: "Pureza que vem da natureza",
      desc: "Uma limpeza eficiente com inspiração natural, pensada para reduzir impactos e cuidar do seu dia a dia.",
    },
  ];

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-screen py-30 px-6 md:px-20">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              bg-white rounded-2xl overflow-hidden shadow-md 
              transition-all duration-700 ease-out
              ${visible 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-10 scale-95"}
            `}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            
            {/* Imagem */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={card.img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-5 text-[#012C57]">
              <h3 className="font-bold text-sm md:text-base mb-2">
                {card.title}
              </h3>

              <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                {card.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;