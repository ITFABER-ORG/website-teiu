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
    const API_URL = "http://127.0.0.1:8080";
  

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${id}`
        );

        const data = await response.json();

        console.log(data);

        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    }

    fetchProduct();
  }, [id]);

  const [activeVariantId, setActiveVariantId] = useState(null);
 

  // define variante inicial quando produto carregar
  useEffect(() => {
    if (product) {
      setActiveVariantId(
        location.state?.variantId ||
          product.defaultVariantId ||
          product.variants?.[0]?.id
      );
    }
  }, [product, location.state]);

  const progressMV = useMotionValue(0);
  const progressRef = useRef(0);

  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [id]);

  useEffect(() => {
    if (!isAnimationDone || isReversing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAnimationDone, isReversing]);

  useEffect(() => {
    progressRef.current = 0;
    progressMV.set(0);
    setIsAnimationDone(false);
    setIsReversing(false);
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === 0 && isAnimationDone) {
        setIsReversing(true);
        setIsAnimationDone(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isAnimationDone]);

  useEffect(() => {
    const SPEED = 0.0012;

    const onWheel = (e) => {
      if (!isAnimationDone || isReversing) {
        e.preventDefault();

        const direction = e.deltaY > 0 ? 1 : -1;

        let next =
          progressRef.current +
          direction * Math.abs(e.deltaY) * SPEED;

        next = clamp01(next);

        progressRef.current = next;

        animate(progressMV, next, {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        });

        if (next >= 0.99 && !isReversing) {
          setIsAnimationDone(true);
        }

        if (next <= 0.01 && isReversing) {
          setIsReversing(false);
        }
      }
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [isAnimationDone, isReversing, progressMV]);

  // animações
  const scaleImg = useTransform(
    progressMV,
    [0, 0.2, 0.42, 1],
    [1.25, 1, 0.5, 0.7]
  );

  const xImg = useTransform(
    progressMV,
    [0.28, 0.2],
    ["20vw", "-25vw"]
  );

  const yImg = useTransform(
    progressMV,
    [0, 0.3, 1],
    [150, 80, 80]
  );

  const opacityHeroText = useTransform(
    progressMV,
    [0, 0.28],
    [1, 0]
  );

  const yHeroText = useTransform(
    progressMV,
    [0, 0.28],
    [0, -20]
  );

  const opacityUsage = useTransform(
    progressMV,
    [0.38, 0.6, 0.9, 0.92],
    [0, 1, 1, 1]
  );

  const opacityScrollHint = useTransform(
    progressMV,
    [0, 0.08],
    [1, 0]
  );

  // loading
  if (!product) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  const activeVariant =
    product.variants.find(
      (v) => v.id === activeVariantId
    ) || product.variants[0];


  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-white">
        <Navbar />

        {/* VARIANTES */}
        <div className="absolute top-0 right-0 h-full w-34 flex z-30 drop-shadow-xl">
          {product.variants?.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariantId(variant.id)}
              className={`h-full flex-1 relative group transition-all duration-500 cursor-pointer
                shadow-[inset_0_0_25px_rgba(0,0,0,0.25)]
                ${
                  activeVariantId === variant.id
                    ? "flex-[2]"
                    : "hover:flex-[1.5]"
                }`}
            >
              <div
                className={`h-full w-full transition-opacity
                  ${
                    activeVariantId === variant.id
                      ? "opacity-100"
                      : "opacity-75 group-hover:opacity-100"
                  }`}
                style={{
                  backgroundColor: variant.color,
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  animate={{
                    opacity:
                      activeVariantId === variant.id
                        ? 1
                        : 0,
                    x:
                      activeVariantId === variant.id
                        ? 0
                        : 10,
                  }}
                  className="mb-3"
                >
                  <ChevronRight className="text-white w-6 h-6 animate-bounce" />
                </motion.div>

                <span className="whitespace-nowrap [writing-mode:vertical-lr] rotate-180 text-white font-semibold uppercase tracking-wider text-sm">
                  {variant.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.img
            src={`http://localhost:8080/storage/${activeVariant.image}`}
            style={{
              scale: scaleImg,
              x: xImg,
              y: yImg,
            }}
            className="h-[804px]"
          />
        </div>

        {/* HERO */}
        <motion.div
          className="absolute right-10 lg:right-32 top-1/2 -translate-y-1/2
          w-5/12 font-teiu text-teiu-deep-blue z-10 pt-20 pr-4"
          style={{
            opacity: opacityHeroText,
            y: yHeroText,
          }}
        >
          <span className="font-medium text-md mb-4 block uppercase tracking-tighter">
            {product.category}
          </span>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 leading-none">
            {product.title}
          </h1>

          <p className="text-5xl font-bold leading-tight">
            {product.tagline}
          </p>
        </motion.div>

        {/* DESCRIÇÃO */}
        <motion.div
          className="absolute left-50 lg:left-50 top-1/2 -translate-y-1/2
          w-5/12 font-teiu text-teiu-deep-blue z-10 pt-20 pr-4"
          style={{ opacity: opacityUsage }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Descrição
          </h2>

          <p className="text-xl leading-relaxed opacity-75">
            {product.usage}
          </p>
        </motion.div>
      </div>

      {/* MODO DE USO */}
      <div className="w-screen p-50 font-teiu text-teiu-deep-blue max-w-[50%]">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Modo de uso
        </h2>

        <p className="text-xl leading-relaxed opacity-75">
          {product.usage}
        </p>
      </div>

      {/* SPECS */}
      <div className="w-screen p-50 flex flex-col gap-10">
        {product.specs?.map((item, i) => (
          <div
            key={i}
            className="flex flex-row items-start gap-5"
          >
            <span
              className="text-7xl md:text-8xl font-black leading-[0.8] tracking-tighter"
              style={{
                color: activeVariant.color,
              }}
            >
              {item.value}
            </span>

            <div className="flex flex-col pt-1">
              <span className="text-xl md:text-2xl font-bold uppercase leading-[1.1] max-w-[180px] text-teiu-deep-blue text-left">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}