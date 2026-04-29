import React, { useEffect, useRef, useState } from "react";

function OurMission({ data }) {
  const [activeTab, setActiveTab] = useState("mission");
  const [displayedTab, setDisplayedTab] = useState("mission");
  const [pulse, setPulse] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const ref = useRef(null);

  // =============================
  // HELPERS
  // =============================

  const getText = (key) => {
    return data?.texts?.[key]?.content?.replace(/<[^>]+>/g, "") || "";
  };

  const getAssetUrl = (asset) => {
    if (!asset?.url) return null;
    return `http://localhost:8080/storage/${asset.url}`;
  };

  const getHeartImageByTab = (tab) => {
    const map = {
      mission: data?.assets?.heart1_img,
      vision: data?.assets?.heart2_img,
      values: data?.assets?.heart3_img,
    };

    return getAssetUrl(map[tab]);
  };

  const getCards = (type) => {
    if (!data?.texts) return [];

    return Object.keys(data.texts)
      .filter(
        (key) =>
          key.includes(type) &&
          key.includes("card") &&
          !key.includes("_icon")
      )
      .sort()
      .map((key) => {
        const iconKey = `${key}_icon`;

        return {
          text: getText(key),
          icon: getAssetUrl(data?.assets?.[iconKey]),
        };
      });
  };

  const isImageUrl = (value) => {
    if (typeof value !== "string") return false;

    return (
      value.startsWith("http") ||
      value.startsWith("/") ||
      value.endsWith(".png") ||
      value.endsWith(".jpg") ||
      value.endsWith(".jpeg") ||
      value.endsWith(".svg") ||
      value.endsWith(".webp")
    );
  };

  // =============================
  // TAB DATA DINÂMICO
  // =============================

  const current = {
    title: getText(`${activeTab}_title`),
    items: getCards(activeTab),
  };

  const displayed = {
    image: getHeartImageByTab(displayedTab),
  };

  // =============================
  // HANDLERS
  // =============================

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    setActiveTab(tab);
    setPulse(true);

    setTimeout(() => {
      setDisplayedTab(tab);
      setPulse(false);
    }, 400);
  };

  // =============================
  // ANIMAÇÕES
  // =============================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const exitStart = windowHeight * 0.55;

      if (rect.top > exitStart) {
        setIsLeaving(true);
      } else {
        setIsLeaving(false);
      }
    };

    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", onScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // =============================
  // RENDER
  // =============================

  return (
    <section
      ref={ref}
      className={`w-full py-20 text-white mb-40 transition-all duration-1000 ${
        visible && !isLeaving
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {/* TABS */}
      <div className="flex justify-center mb-15">
        <div className="flex bg-white rounded-full p-1 shadow-md">
          {["mission", "vision", "values"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#0088F6] text-white shadow"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab === "mission"
                ? "Missão"
                : tab === "vision"
                ? "Visão"
                : "Valores"}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6">
        
        {/* IMAGE */}
        <div
          className={`w-[300px] h-[200px] relative transition-all duration-700 ${
            visible && !isLeaving
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <img
            src={displayed.image}
            alt="tab"
            className={`w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]
              ${pulse ? "animate-heartbeat" : ""}
            `}
          />
        </div>

        {/* TEXT */}
        <div
          className={`max-w-xl w-full transition-all duration-1000 delay-200 ${
            visible && !isLeaving
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6">
            {current.title}
          </h2>

          <div className="flex flex-col gap-4">
            {current.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-[#01459A] p-4 rounded-xl shadow-md"
              >
                <span className="flex items-center justify-center w-12 h-12">
                  {isImageUrl(item.icon) ? (
                    <img
                      src={item.icon}
                      alt="icon"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xl">✨</span>
                  )}
                </span>

                <p className="text-sm leading-relaxed text-white/90">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.15); }
            40% { transform: scale(0.95); }
            60% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          .animate-heartbeat {
            animation: heartbeat 1s ease;
          }
        `}
      </style>
    </section>
  );
}

export default OurMission;