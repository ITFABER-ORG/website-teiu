import { Lightbulb, Rocket, Box } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const iconMap = {
  1: Lightbulb,
  2: Rocket,
  3: Box,
};

function SocialProof({ data }) {
  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const ref = useRef(null);

  const texts = data?.texts || {};

  useEffect(()=> {
    console.log('asdsadqwraesdfh rtghyrt5y ',data)
  },[data])

  const cards = [1, 2, 3].map((i) => ({
    title: texts[`card${i}_title`]?.content || "",
    desc: texts[`card${i}_desc`]?.content || "",
    Icon: iconMap[i],
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const isOut = rect.top > window.innerHeight * 0.7;
      setIsLeaving(isOut);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAnimation = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      visible && !isLeaving
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-10 scale-95"
    }`;

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-20 px-6 sm:px-10 flex justify-center overflow-hidden"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 items-center justify-items-center">
        
        {cards.map((card, index) => {
          const Icon = card.Icon;
          const delay =
            index === 1 ? "md:delay-200" : index === 2 ? "md:delay-500" : "";

          return (
            <div
              key={index}
              className={`w-full max-w-[400px] md:max-w-none aspect-square md:aspect-[5/4.6] bg-[rgba(255,255,255,0.31)] backdrop-blur-md rounded-2xl shadow-md border border-white/30 p-8 text-center relative flex flex-col justify-center items-center ${getAnimation(
                delay
              )}`}
            >
              <div className="absolute -top-5 bg-white rounded-full p-3 shadow-md border border-white/30">
                {Icon && (
                  <Icon className="w-8 h-8 md:w-9 md:h-9 text-gray-700" />
                )}
              </div>

              {/* TÍTULO (HTML) */}
              <h3
                className="mt-4 font-bold text-blue-900 uppercase text-xl md:text-2xl tracking-tight"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />

              {/* DESCRIÇÃO (HTML) */}
              <div
                className="mt-2 text-lg md:text-xl text-gray-600 leading-tight"
                dangerouslySetInnerHTML={{ __html: card.desc }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SocialProof;