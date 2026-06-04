import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

function clamp01(t) {
  return Math.max(0, Math.min(1, t));
}

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL;


  const [product, setProduct] = useState(null);
  const [activeVariantId, setActiveVariantId] =
    useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        const data =
          await response.json();

        setProduct(data);
      } catch (error) {
        console.error(
          "Erro ao buscar produto:",
          error
        );
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveVariantId(
        location.state?.variantId ||
          product.defaultVariantId ||
          product.variants?.[0]?.id
      );
    }
  }, [product, location.state]);

  const progressMV =
    useMotionValue(0);

  const progressRef =
    useRef(0);

  const [
    isAnimationDone,
    setIsAnimationDone,
  ] = useState(false);

  const [
    isReversing,
    setIsReversing,
  ] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [id]);

  useEffect(() => {
    if (
      !isAnimationDone ||
      isReversing
    ) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    isAnimationDone,
    isReversing,
  ]);

  useEffect(() => {
    progressRef.current = 0;

    progressMV.set(0);

    setIsAnimationDone(false);

    setIsReversing(false);
  }, [id]);

  useEffect(() => {
    const onWheelReverse = (
      e
    ) => {
      if (
        isAnimationDone &&
        e.deltaY < 0 &&
        window.scrollY <= 10
      ) {
        e.preventDefault();

        setIsReversing(true);

        setIsAnimationDone(false);
      }
    };

    window.addEventListener(
      "wheel",
      onWheelReverse,
      { passive: false }
    );

    return () =>
      window.removeEventListener(
        "wheel",
        onWheelReverse
      );
  }, [isAnimationDone]);

  useEffect(() => {
    const SPEED = 0.0012;

    const onWheel = (e) => {
      if (
        !isAnimationDone ||
        isReversing
      ) {
        e.preventDefault();

        const direction =
          e.deltaY > 0
            ? 1
            : -1;

        let next =
          progressRef.current +
          direction *
            Math.abs(
              e.deltaY
            ) *
            SPEED;

        next =
          clamp01(next);

        progressRef.current =
          next;

        animate(
          progressMV,
          next,
          {
            duration: 0.5,
            ease: [
              0.25,
              0.1,
              0.25,
              1,
            ],
          }
        );

        if (
          next >= 0.99 &&
          !isReversing
        ) {
          setIsAnimationDone(
            true
          );
        }

        if (
          next <= 0.01 &&
          isReversing
        ) {
          setIsReversing(
            false
          );
        }
      }
    };

    window.addEventListener(
      "wheel",
      onWheel,
      {
        passive: false,
      }
    );

    return () =>
      window.removeEventListener(
        "wheel",
        onWheel
      );
  }, [
    isAnimationDone,
    isReversing,
    progressMV,
  ]);

  const scaleImg =
    useTransform(
      progressMV,
      [0, 0.2, 0.42, 1],
      [1.25, 1, 0.5, 1]
    );

  const xImg =
    useTransform(
      progressMV,
      [0.28, 0.2],
      ["20vw", "-25vw"]
    );

  const yImg =
    useTransform(
      progressMV,
      [0, 0.3, 1],
      [150, 80, 80]
    );

  const opacityHeroText =
    useTransform(
      progressMV,
      [0, 0.28],
      [1, 0]
    );

  const yHeroText =
    useTransform(
      progressMV,
      [0, 0.28],
      [0, -20]
    );

  const opacityDescription =
    useTransform(
      progressMV,
      [
        0.30,
        0.40,
        0.55,
        0.60,
      ],
      [0, 1, 1, 0]
    );

  const opacityUsage =
    useTransform(
      progressMV,
      [
        0.55,
        0.65,
        0.80,
        0.85,
      ],
      [0, 1, 1, 0]
    );

  const opacityDetails =
    useTransform(
      progressMV,
      [0.80, 0.90, 1],
      [0, 1, 1]
    );

  if (!product)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Carregando...
      </div>
    );

  const activeVariant =
    product?.variants?.find(
      (v) =>
        v.id ===
        activeVariantId
    ) ||
    product?.variants?.[0];

  return (
    <>
    
    <div className="relative w-screen min-h-screen overflow-hidden bg-white">
      <Navbar />
      {/*teste */}
      <div className="md:hidden min-h-screen pb-28">
      {/* Hero */}

      <div className="relative flex flex-col items-center px-6 pt-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <motion.img
            src={`${API_URL}/storage/${activeVariant?.image}`}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="h-[320px] object-contain"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .2,
          }}
          className="text-center mt-6"
        >
          <span className="uppercase text-sm text-teiu-deep-blue">
            {product.category}
          </span>

          <h1 className="text-4xl font-extrabold text-teiu-deep-blue mt-2">
            {product.title}
          </h1>

          <p className="text-lg font-semibold mt-3 text-teiu-deep-blue">
            {product.tagline}
          </p>
        </motion.div>
      </div>

      {/* Conteúdo */}

      <div className="px-5 mt-10 flex flex-col gap-6">

        {/* descrição */}

        <motion.div
          initial={{
            opacity:0,
            y:50
          }}
          whileInView={{
            opacity:1,
            y:0
          }}
          viewport={{
            once:true
          }}
          className="rounded-3xl p-6 shadow-lg bg-white"
        >
          <h2 className="text-2xl font-bold text-teiu-deep-blue mb-3">
            Descrição
          </h2>

          <p className="opacity-70">
            {product.description}
          </p>
        </motion.div>

        {/* modo uso */}

        <motion.div
          initial={{
            opacity:0,
            y:50
          }}
          whileInView={{
            opacity:1,
            y:0
          }}
          viewport={{
            once:true
          }}
          transition={{
            delay:.15
          }}
          className="rounded-3xl p-6 shadow-lg bg-white"
        >
          <h2 className="text-2xl font-bold text-teiu-deep-blue mb-3">
            Modo de uso
          </h2>

          <p className="opacity-70">
            {product.usage}
          </p>
        </motion.div>

        {/* specs */}

        <motion.div
          initial={{
            opacity:0,
            y:50
          }}
          whileInView={{
            opacity:1,
            y:0
          }}
          viewport={{
            once:true
          }}
          transition={{
            delay:.25
          }}
          className="rounded-3xl p-6 shadow-lg bg-white"
        >
          <h2 className="text-2xl font-bold text-teiu-deep-blue mb-6">
            Detalhes
          </h2>

          <div className="flex flex-col gap-6">
            {product.specs?.map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                >
                  <span
                    className="text-5xl font-black"
                    style={{
                      color:
                        activeVariant?.color,
                    }}
                  >
                    {item.value}
                  </span>

                  <span className="font-bold uppercase text-sm">
                    {item.label}
                  </span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Variantes */}

      <div className="fixed bottom-0 left-0 w-full h-20 flex z-50 shadow-xl">
        {product.variants?.map(
          (variant) => (
            <button
              key={variant.id}
              onClick={() =>
                setActiveVariantId(
                  variant.id
                )
              }
              className={`flex-1 relative transition-all
              ${
                activeVariantId ===
                variant.id
                  ? "flex-[1.5]"
                  : ""
              }`}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundColor:
                    variant.color
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {variant.label}
                </span>
              </div>
            </button>
          )
        )}
      </div>
    </div>

      
      
      {/* Variantes */}
      

      <div className="hidden md:block">
        <div
          className="
        absolute
        bottom-0
        md:bottom-auto
        md:top-0
        right-0
        w-full
        md:w-32
        h-20
        md:h-full
        flex
        flex-row
        md:flex-col
        z-30
        hidden md:block
        "
        >
          {product?.variants?.map(
            (
              variant
            ) => (
              <button
                key={
                  variant.id
                }
                onClick={() =>
                  setActiveVariantId(
                    variant.id
                  )
                }
                className={`flex-1 relative ${
                  activeVariantId ===
                  variant.id
                    ? "flex-[2]"
                    : ""
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor:
                      variant.color,
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />

                  <span
                    className="
                text-xs
                md:text-sm
                text-white
                md:[writing-mode:vertical-lr]
                md:rotate-180
                "
                  >
                    {
                      variant.label
                    }
                  </span>
                </div>
              </button>
            )
          )}
        </div>

        {/* Imagem */}

        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.img
            src={`${API_URL}/storage/${activeVariant?.image}`}
            style={{
              scale:
                scaleImg,
              x: xImg,
              y: yImg,
            }}
            className="
            h-[250px]
            sm:h-[350px]
            md:h-[500px]
            lg:h-[700px]
            xl:h-[800px]
            object-contain
            "
          />
        </div>

        {/* Hero */}

        <motion.div
          className="
          absolute
          top-[15%]
          md:top-1/2
          right-4
          md:right-10
          lg:right-32
          md:-translate-y-1/2
          w-[90%]
          md:w-5/12
          px-4
          z-10
          "
          style={{
            opacity:
              opacityHeroText,
            y: yHeroText,
          }}
        >
          <span className="uppercase text-sm md:text-base text-teiu-deep-blue">
            {
              product.category
            }
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-teiu-deep-blue">
            {product.title}
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-teiu-deep-blue">
            {product.tagline}
          </p>
        </motion.div>

        {/* Conteúdo */}

        {[
          {
            title:
              "Descrição",
            text:
              product.description,
            opacity:
              opacityDescription,
          },
          {
            title:
              "Modo de uso",
            text:
              product.usage,
            opacity:
              opacityUsage,
          },
        ].map(
          (
            section,
            i
          ) => (
            <motion.div
              key={i}
              className="
              absolute
              left-4
              sm:left-8
              lg:left-24
              top-[55%]
              md:top-1/2
              md:-translate-y-1/2
              w-[90%]
              md:w-5/12
              z-10
              "
              style={{
                opacity:
                  section.opacity,
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-teiu-deep-blue">
                {
                  section.title
                }
              </h2>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-teiu-deep-blue opacity-75">
                {
                  section.text
                }
              </p>
            </motion.div>
          )
        )}

        {/* Specs */}

        <motion.div
          className="
          absolute
          left-4
          sm:left-8
          lg:left-24
          top-[55%]
          md:top-1/2
          md:-translate-y-1/2
          w-[90%]
          md:w-5/12
          z-10
          "
          style={{
            opacity:
              opacityDetails,
          }}
        >
          <div className="flex flex-col gap-6">
            {product?.specs?.map(
              (
                item,
                i
              ) => (
                <div
                  key={
                    i
                  }
                  className="flex gap-3 items-center"
                >
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black"
                    style={{
                      color:
                        activeVariant?.color,
                    }}
                  >
                    {
                      item.value
                    }
                  </span>

                  <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold uppercase text-teiu-deep-blue">
                    {
                      item.label
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </motion.div>
        </div>
    </div>
    </>
  );
}