import { useState, useEffect, useRef } from "react";

function OurFacilities({ data }) {
  const [facilities, setFacilities] = useState(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    if (data?.components?.our_dependencies) {
      setFacilities(data.components.our_dependencies);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const exitStart = windowHeight * 0.75;

      setIsLeaving(rect.top > exitStart);
    };

    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", onScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imageUrl = facilities?.assets?.thumbnail?.url
    ? `https://cms.teiu.com.br/public/storage/${facilities.assets.thumbnail.url}`
    : "/assets/img/facilities.jpg";

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-4 sm:px-8 lg:px-[150px] bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-around items-center gap-10">
        {/* TEXTO */}
        <div
          className={`w-full max-w-[400px] transition-all duration-1000 ${
            visible && !isLeaving
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
        >
          <div
            className="text-2xl sm:text-3xl font-bold text-teiu-primary-dark mb-4 leading-tight"
            dangerouslySetInnerHTML={{
              __html: facilities?.texts?.title?.content || "",
            }}
          />

          <div
            className="text-sm sm:text-base text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: facilities?.texts?.description?.content || "",
            }}
          />
        </div>

        {/* IMAGEM */}
        <div
          onClick={() => setOpen(true)}
          className={`w-full lg:w-1/2 relative group cursor-pointer transition-all duration-1000 delay-200 ${
            visible && !isLeaving
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-20"
          }`}
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt="Facilities"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition rounded-lg" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className={`bg-red-600 hover:bg-red-700 transition rounded-full p-5 shadow-lg hover:scale-110 duration-300 ${
                open ? "" : "animate-pulse"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] max-w-3xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden"
          >
            <iframe
              className="w-full h-full"
              src={facilities?.texts?.link?.content || ""}
              title="Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl hover:scale-110 transition"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

export default OurFacilities;