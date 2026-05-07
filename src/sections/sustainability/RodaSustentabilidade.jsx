import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sustentabilidadeItems } from '../../mocks/sustentabilidadeDados';

const RodaSustentabilidade = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const n = sustentabilidadeItems.length;
  const sliceAngle = 360 / n;

  // 👇 DETECTA ENTRADA E SAÍDA
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting); // 🔥 agora alterna true/false
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // autoplay
  useEffect(() => {
    if (n <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % n);
    }, 4000);

    return () => clearInterval(interval);
  }, [n]);

  const corInativa = "#076033";

  const wheelGradient = `conic-gradient(${sustentabilidadeItems
    .map((item, index) => {
      const isAtivo = activeIndex === index;
      const colorToUse = isAtivo ? '#549b0d' : corInativa;
      return `${colorToUse} ${index * sliceAngle}deg ${(index + 1) * sliceAngle}deg`;
    })
    .join(', ')})`;

  const currentRotation = -(activeIndex * sliceAngle);

  return (
    <section
      ref={ref}
      className="relative bg-white font-teiu w-full py-16 md:py-20 overflow-hidden"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 0.9 }} 
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full flex flex-col items-center max-w-[1400px] mx-auto"
          >

            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ delay: 0.1 }}
              className="text-center px-6 mb-10 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl text-[#003366] font-extrabold mb-4">
                Sustentabilidade na Teiú
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                At vero eos et accusamus et iusto odio dignissimos ducimus.
              </p>
            </motion.div>

            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6">
              
              {/* RODA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 20 }} // 🔥 saída girando
                transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
                className="relative flex items-center justify-center
                  w-[260px] h-[260px] md:w-[360px] md:h-[360px]"
              >
                <motion.div
                  animate={{ rotate: currentRotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-full"
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: wheelGradient }}
                  />

                  {sustentabilidadeItems.map((item, index) => {
                    const Icon = item.icon;
                    const angleDeg = -90 + (index * sliceAngle) + (sliceAngle / 2);
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const r = 36;

                    const isAtivo = activeIndex === index;

                    return (
                      <div
                        key={item.id}
                        className="absolute"
                        style={{
                          left: `${50 + r * Math.cos(angleRad)}%`,
                          top: `${50 + r * Math.sin(angleRad)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <motion.div animate={{ rotate: -currentRotation }}>
                          <Icon
                            className={`${isAtivo ? 'text-white' : 'text-gray-400'} w-8 h-8`}
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>

                <div className="absolute bg-white rounded-full inset-[80px]" />
              </motion.div>

              {/* TEXTO */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }} 
                transition={{ delay: 0.2 }}
                className="max-w-md"
              >
                <AnimatePresence mode="wait">
                  {sustentabilidadeItems.map((item, index) =>
                    activeIndex === index ? (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <h3
                          className="text-3xl font-bold"
                          style={{ color: '#076033'}}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RodaSustentabilidade;