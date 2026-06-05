import { useEffect, useRef, useState } from "react";

function Features({ data }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;

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

  const cards = [1, 2, 3].map((card) => ({
    img: data?.assets?.[`card${card}_image`]?.url
      ? `${VITE_CMS_URL}/storage/${data.assets[`card${card}_image`].url}`
      : null,

    title: data?.texts?.[`card${card}_title`]?.content || "",

    desc: data?.texts?.[`card${card}_description`]?.content || "",
  }));

  return (
    <section
      ref={ref}
      className="w-screen py-30 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-md
              transition-all
              duration-700
              ease-out
              ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }
            `}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* Imagem */}
            <div className="w-full h-64 overflow-hidden">
              {card.img ? (
                <img
                  src={card.img}
                  alt="Feature"
                  className="
                    w-full
                    h-full
                    object-cover
                    hover:scale-105
                    transition-transform
                    duration-500
                  "
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  Sem imagem
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="p-5 text-[#012C57]">
              <div
                className="
                  font-bold
                  text-sm
                  md:text-base
                  mb-2
                  [&_p]:m-0
                "
                dangerouslySetInnerHTML={{
                  __html: card.title,
                }}
              />

              <div
                className="
                  text-xs
                  md:text-sm
                  opacity-80
                  leading-relaxed
                  [&_p]:mb-2
                  [&_p:last-child]:mb-0
                  [&_ul]:list-disc
                  [&_ul]:pl-5
                  [&_ol]:list-decimal
                  [&_ol]:pl-5
                "
                dangerouslySetInnerHTML={{
                  __html: card.desc,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;