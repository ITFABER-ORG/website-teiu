import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RodaSustentabilidade = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;
  const items = [1, 2, 3, 4].map((item) => ({
    id: item,

    title:
      data?.texts?.[`item_${item}_title`]?.content || "",

    description:
      data?.texts?.[`item_${item}_description`]?.content || "",

    image:
      data?.assets?.[`roulette_img_${item}`]?.url
        ? `${VITE_CMS_URL}/storage/${
            data.assets[`roulette_img_${item}`].url
          }`
        : null
  }));

  const title =
    data?.texts?.title?.content || "";

  const description =
    data?.texts?.description?.content || "";

  const n = items.length;
  const sliceAngle = 360 / n;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (n <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % n);
    }, 4000);

    return () => clearInterval(interval);
  }, [n]);

  const corInativa = "#076033";

  const wheelGradient = `conic-gradient(
    ${items
      .map((item, index) => {
        const ativo = activeIndex === index;

        return `${
          ativo ? "#549b0d" : corInativa
        } ${index * sliceAngle}deg ${
          (index + 1) * sliceAngle
        }deg`;
      })
      .join(",")}
  )`;

  const currentRotation = -(activeIndex * sliceAngle);

  return (
    <section
      ref={ref}
      className="
      relative
      bg-white
      font-teiu
      w-full
      py-16
      md:py-20
      overflow-hidden
    "
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="content"
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -80,
              scale: 0.9
            }}
            transition={{
              duration: 0.6
            }}
            className="
              w-full
              flex
              flex-col
              items-center
              max-w-[1400px]
              mx-auto
            "
          >

            {/* Header */}
            <div className="text-center px-6 mb-10 md:mb-16">

            <div
              className="
                text-3xl
                md:text-4xl
                text-[#003366]
                font-extrabold
                mb-4
                [&_p]:m-0
              "
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />

            <div
              className="
                text-base
                md:text-lg
                text-gray-700
                max-w-2xl
                mx-auto
                [&_p]:mb-3
                [&_p:last-child]:mb-0
                [&_ul]:list-disc
                [&_ul]:pl-5
                [&_ol]:list-decimal
                [&_ol]:pl-5
              "
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6">

              {/* Roda */}
              <motion.div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-[260px]
                  h-[260px]
                  md:w-[360px]
                  md:h-[360px]
                "
              >
                <motion.div
                  animate={{
                    rotate: currentRotation
                  }}
                  transition={{
                    duration: 0.8
                  }}
                  className="absolute inset-0 rounded-full"
                >

                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: wheelGradient
                    }}
                  />

                  {items.map((item, index) => {

                    const angleDeg =
                      -90 +
                      index * sliceAngle +
                      sliceAngle / 2;

                    const angleRad =
                      (angleDeg * Math.PI) / 180;

                    const r = 36;

                    return (
                      <div
                        key={item.id}
                        className="absolute"
                        style={{
                          left: `${
                            50 +
                            r *
                              Math.cos(angleRad)
                          }%`,
                          top: `${
                            50 +
                            r *
                              Math.sin(angleRad)
                          }%`,
                          transform:
                            "translate(-50%, -50%)"
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate:
                              -currentRotation
                          }}
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt=""
                              className="
                                w-8
                                h-8
                                object-contain
                              "
                            />
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>

                <div className="absolute bg-white rounded-full inset-[80px]" />
              </motion.div>

              {/* Texto */}
              <div className="max-w-md">

                <AnimatePresence mode="wait">

                  {items.map((item, index) =>
                    activeIndex === index ? (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          y: 20
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        exit={{
                          opacity: 0,
                          y: -20
                        }}
                      >

<div
  className="
    text-3xl
    font-bold
    mb-4
    [&_p]:m-0
  "
  style={{
    color: "#076033",
  }}
  dangerouslySetInnerHTML={{
    __html: item.title,
  }}
/>

        <div
          className="
            text-gray-600
            [&_p]:mb-3
            [&_p:last-child]:mb-0
            [&_ul]:list-disc
            [&_ul]:pl-5
            [&_ol]:list-decimal
            [&_ol]:pl-5
            [&_strong]:font-bold
          "
          dangerouslySetInnerHTML={{
            __html: item.description,
          }}
        />
                      </motion.div>
                    ) : null
                  )}

                </AnimatePresence>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RodaSustentabilidade;