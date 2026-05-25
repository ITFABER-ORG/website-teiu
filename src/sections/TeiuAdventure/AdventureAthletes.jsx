import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://127.0.0.1:8080";

const getAssetUrl = (path) => {
  if (!path) return "/img/icon.svg";
  if (path.startsWith("http")) return path;

  return `${API_URL}/storage/${path}`;
};

function AdventureAthletes({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);


  const atletas = [1, 2, 3, 4, 5].map((i) => {
    const name = data?.texts?.[`athlete_${i}_name`]?.content;
    const role = data?.texts?.[`athlete_${i}_role`]?.content;
    const asset = data?.assets?.[`asset_${i}`];

    return {
      id: i,
      nome: name || "Atleta",
      texto: "Atleta Teiú Adventure",
      esporte: role || "Esporte",
      img: getAssetUrl(asset?.url),
    };
  });

  useEffect(() => {
    if (atletas.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % atletas.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [atletas.length]);

  const getVisibleAthletes = () => {
    if (atletas.length <= 3) return atletas;

    return [
      atletas[currentIndex % atletas.length],
      atletas[(currentIndex + 1) % atletas.length],
      atletas[(currentIndex + 2) % atletas.length],
    ];
  };

  const visibleAthletes = getVisibleAthletes();

  return (
    <section className="w-full pt-16 pb-12 px-6 lg:px-20 container mx-auto max-w-[1400px]">
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-8">
        {data?.texts?.title?.content || "Nossos Atletas"}
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {visibleAthletes.map((atleta) => (
            <div
              key={atleta.id}
              className="flex flex-col h-full group cursor-pointer shadow-lg"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-sm bg-[#003366]">
                <img
                  src={atleta.img}
                  alt={atleta.nome}
                  onError={(e) => {
                    e.target.src = "/img/icon.svg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-6 left-6 text-white drop-shadow-md">
                  <h3 className="text-3xl lg:text-4xl font-bold leading-none tracking-tight mb-1 w-2/3">
                    {atleta.nome}
                  </h3>
                  <p className="text-sm font-medium opacity-90 leading-tight w-2/3">
                    {atleta.texto}
                  </p>
                </div>
              </div>

              <div className="bg-[#009FE3] py-2 px-4 flex justify-end rounded-b-sm">
                <span className="text-white font-bold text-xs tracking-wider">
                  {atleta.esporte}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default AdventureAthletes;