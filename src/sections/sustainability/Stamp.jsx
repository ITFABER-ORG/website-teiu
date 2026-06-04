import { useEffect, useRef, useState } from "react";

function Stamp({ data }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const title =
    data?.texts?.stamp_title?.content || "";

  const description =
    data?.texts?.stamp_description?.content || "";

  const imageUrl =
    data?.assets?.stamp_image?.url
      ? `${VITE_CMS_URL}/storage/${data.assets.stamp_image.url}`
      : null;

  return (
    <section
      ref={ref}
      className="w-screen py-16 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Imagem */}
        <div
          className={`
            w-full
            md:w-1/2
            flex
            justify-center
            md:justify-start
            transition-all
            duration-700
            ease-out
            ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }
          `}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="
                w-full
                max-w-md
                object-contain
              "
            />
          ) : (
            <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center">
              Sem imagem
            </div>
          )}
        </div>

        {/* Texto */}
        <div
          className={`
            w-full
            md:w-1/2
            text-[#1f6f3d]
            transition-all
            duration-700
            ease-out
            ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }
          `}
          style={{
            transitionDelay: "200ms"
          }}
        >
          <h3 className="text-lg md:text-xl mb-4 font-semibold">
            {title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

      </div>
    </section>
  );
}

export default Stamp;