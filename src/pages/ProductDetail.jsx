import React, { useState, useEffect, useRef } from "react"; 
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { productsMock } from "../mocks/Products";
import Navbar from "../components/Navbar";

function clamp01(t) {
  return Math.max(0, Math.min(1, t));
}

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const produto = productsMock.find((p) => p.id === Number(id));

  const [activeVariantId, setActiveVariantId] = useState(
    location.state?.variantId || produto?.variants[0]?.id
  );

  const progressMV = useMotionValue(0);
  const progressRef = useRef(0);

  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // ou "instant"
    });
  }, [id]);
  // trava scroll só durante animação
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

  // reset ao trocar produto
  useEffect(() => {
    progressRef.current = 0;
    progressMV.set(0);
    setIsAnimationDone(false);
    setIsReversing(false);
  }, [id]);

  // 🔥 detectar quando usuário voltou pro topo
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
      // 🔥 BLOQUEIA SCROLL quando está animando (ida ou volta)
      if (!isAnimationDone || isReversing) {
        e.preventDefault();

        const direction = e.deltaY > 0 ? 1 : -1;

        let next = progressRef.current + direction * Math.abs(e.deltaY) * SPEED;

        next = clamp01(next);

        progressRef.current = next;

        animate(progressMV, next, {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        });

        // terminou descendo
        if (next >= 0.99 && !isReversing) {
          setIsAnimationDone(true);
        }

        // terminou voltando
        if (next <= 0.01 && isReversing) {
          setIsReversing(false);
        }
      }
    };

    let touchY = 0;

    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isAnimationDone || isReversing) {
        e.preventDefault();

        const delta = touchY - e.touches[0].clientY;
        touchY = e.touches[0].clientY;

        let next = progressRef.current + delta * SPEED * 2;

        next = clamp01(next);

        progressRef.current = next;

        animate(progressMV, next, {
          duration: 0.3,
          ease: "easeOut",
        });

        if (next >= 0.99 && !isReversing) {
          setIsAnimationDone(true);
        }

        if (next <= 0.01 && isReversing) {
          setIsReversing(false);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isAnimationDone, isReversing, progressMV]);

  // animações
  const scaleImg = useTransform(
    progressMV,
    [0, 0.2, 0.42, 1],
    [1.25, 1, 0.5, 0.7]
  );

  const xImg = useTransform(progressMV, [0.28, 0.2], ["20vw", "-25vw"]);
  const yImg = useTransform(
    progressMV,
    [0, 0.3, 1],
    [150, 80, 80] // ajusta aqui
  );
  const opacityHeroText = useTransform(progressMV, [0, 0.28], [1, 0]);
  const yHeroText = useTransform(progressMV, [0, 0.28], [0, -20]);

  const opacityUsage = useTransform(
    progressMV,
    [0.38, 0.6, 0.9, 0.92],
    [0, 1, 1, 1]
  );

  const opacityScrollHint = useTransform(progressMV, [0, 0.08], [1, 0]);

  if (!produto) return <div>Produto não encontrado</div>;

  const activeVariant =
    produto.variants.find((v) => v.id === activeVariantId) ||
    produto.variants[0];

  return (
    <>
      {/* HERO */}
      <div className="relative w-screen h-screen  overflow-hidden bg-white">
        <Navbar />
        <div className="absolute top-0 right-0 h-full w-34 flex z-30 drop-shadow-xl">
          {produto.variants?.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariantId(variant.id)}
              className={`h-full flex-1 relative group transition-all duration-500 cursor-pointer
                shadow-[inset_0_0_25px_rgba(0,0,0,0.25)]
                ${activeVariantId === variant.id ? "flex-[2]" : "hover:flex-[1.5]"}`}
            >
              <div
                  className={`h-full w-full transition-opacity
                    ${activeVariantId === variant.id
                      ? "opacity-100"
                      : "opacity-75 group-hover:opacity-100"}`}
                  style={{ backgroundColor: variant.color }}
                />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  animate={{
                    opacity: activeVariantId === variant.id ? 1 : 0,
                    x: activeVariantId === variant.id ? 0 : 10,
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

        {/* imagem */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.img
            src={activeVariant.image}
              style={{ scale: scaleImg, x: xImg, y: yImg}}
            className="h-[804px]"
          />
        </div>

        {/* texto */}
        <motion.div
          className="absolute right-10 lg:right-32 top-1/2 -translate-y-1/2
                    w-5/12 font-teiu text-teiu-deep-blue z-10 pt-20 pr-4"
          style={{ opacity: opacityHeroText, y: yHeroText }}
        >
          <span className="font-medium text-md mb-4 block uppercase tracking-tighter">
            {produto.category}
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 leading-none">
            {produto.title}
          </h1>
          <p className="text-5xl font-bold leading-tight">{produto.tagline}</p>
        </motion.div>

        {/* descrição */}
        <motion.div
        className="absolute left-50 lg:left-50 top-1/2 -translate-y-1/2
                   w-5/12 font-teiu text-teiu-deep-blue z-10 pt-20 pr-4"
        style={{ opacity: opacityUsage }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Descrição
        </h2>
        <p className="text-xl leading-relaxed opacity-75">{produto.usage}</p>
      </motion.div>

        {/* scroll hint */}
           <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col
                   items-center gap-2 font-teiu text-teiu-deep-blue text-xs
                   tracking-widest uppercase z-30"
        style={{ opacity: opacityScrollHint }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-px h-8 bg-current opacity-50"
        />
      </motion.div>
      </div>
      <div
        className="w-screen p-50 font-teiu text-teiu-deep-blue z-10 pt-20 pr-4 max-w-[50%]"
        style={{ opacity: opacityUsage }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Modo de uso
        </h2>
        <p className="text-xl leading-relaxed opacity-75">{produto.usage}</p>
      </div>
      <div
        className="w-screen p-50 flex flex-col gap-10"
      >
        {produto.specs.map((item, i) => (
          <div key={i} className="flex flex-row items-start gap-5">
            <span 
              className="text-7xl md:text-8xl font-black leading-[0.8] tracking-tighter"
              style={{ color: activeVariant.color }}
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