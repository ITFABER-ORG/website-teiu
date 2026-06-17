import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function UsageModesTabs({ modes, variant = "card", isActive = true }) {
  const [activeId, setActiveId] = useState(modes?.[0]?.id);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);

  const pointerClass = isActive ? "pointer-events-auto" : "pointer-events-none";

  const wrapperClass =
    variant === "card"
      ? `rounded-3xl p-6 shadow-lg bg-white relative ${pointerClass}`
      : `relative ${pointerClass}`;

  const titleClass =
    variant === "card"
      ? "text-2xl font-bold text-teiu-deep-blue mb-3"
      : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-teiu-deep-blue";

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();

    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);

    return () => observer.disconnect();
  }, [modes]);

  if (!modes || modes.length === 0) {
    return (
      <div className={wrapperClass}>
        <h2 className={titleClass}>Modo de uso</h2>
        <p className="opacity-70">Modo de uso não disponível.</p>
      </div>
    );
  }

  const activeMode = modes.find((m) => m.id === activeId) || modes[0];

  const scrollByAmount = (e, direction) => {
    e.stopPropagation();
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.7, 140);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const handleTabClick = (e, modeId) => {
    e.stopPropagation();
    setActiveId(modeId);
  };

  const arrowClass =
    "flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-teiu-deep-blue text-white flex items-center justify-center shadow-md";

  return (
    <div className={wrapperClass} onWheel={(e) => e.stopPropagation()}>
      <h2 className={titleClass}>Modo de uso</h2>

      <div className="flex items-center gap-2 sm:gap-3 mb-6">
        {canScrollLeft && (
          <button
            type="button"
            onClick={(e) => scrollByAmount(e, -1)}
            aria-label="Voltar"
            className={arrowClass}
          >
            <ArrowLeft className="w-4 h-4 sm:w-[22px] sm:h-[22px]" />
          </button>
        )}

        <div className="flex-1 min-w-0 bg-gray-100 rounded-full p-1 sm:p-1.5 overflow-hidden">
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide"
            onWheel={(e) => e.stopPropagation()}
          >
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={(e) => handleTabClick(e, mode.id)}
                className={`flex-shrink-0 max-w-[11rem] sm:max-w-[16rem] text-center text-balance leading-tight whitespace-normal px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase transition-colors
                  ${
                    activeId === mode.id
                      ? "bg-teiu-deep-blue text-white"
                      : "text-teiu-deep-blue hover:bg-white"
                  }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={(e) => scrollByAmount(e, 1)}
            aria-label="Avançar"
            className={arrowClass}
          >
            <ArrowRight className="w-4 h-4 sm:w-[22px] sm:h-[22px]" />
          </button>
        )}
      </div>

      <div
        className="text-sm sm:text-base md:text-lg lg:text-xl text-teiu-deep-blue opacity-75 [&_p]:mb-3 [&_strong]:font-bold [&_strong]:text-teiu-deep-blue [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: activeMode.content }}
      />
    </div>
  );
}

export default UsageModesTabs;