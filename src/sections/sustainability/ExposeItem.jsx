import { useEffect, useRef, useState } from "react";

function ExposeItem({ data }) {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        setVisible(true);
      }

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setOffset(rect.top);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const title =
    data?.texts?.sustainability_title?.content || "";

  const subtitle1 =
    data?.texts?.sustainability_subtitle_1?.content || "";

  const subtitle2 =
    data?.texts?.sustainability_subtitle_2?.content || "";

  const image =
    data?.assets?.sustainability_image;

  const imageUrl = image?.url
    ? `http://localhost:8080/storage/${image.url}`
    : null;

  return (
    <section
      ref={ref}
      className="
        w-screen
        min-h-screen
        flex
        flex-col
        items-center
        justify-start
        pt-10
        overflow-hidden
        text-[#012C57]
      "
    >

      {/* título */}
      <h1
        className={`
          text-4xl
          md:text-6xl
          font-bold
          text-center
          transition-all
          duration-1000
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
        dangerouslySetInnerHTML={{
          __html: title
        }}
      />

      {/* subtítulo 1 */}
      <p
        className={`
          mt-3
          text-center
          text-lg
          md:text-2xl
          transition-all
          duration-1000
          delay-200
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        {subtitle1}
      </p>

      {/* subtítulo 2 */}
      <p
        className={`
          text-center
          text-lg
          md:text-2xl
          transition-all
          duration-1000
          delay-300
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        {subtitle2}
      </p>

      {/* imagem */}
      <div className="w-screen overflow-hidden mt-10 flex justify-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="
              w-full
              object-cover
              transition-all
              duration-1000
              ease-out
            "
            style={{
              transform: `
                translateY(${offset * -0.08}px)
                scale(${visible ? 1 : 0.9})
              `,
              opacity: visible ? 1 : 0
            }}
          />
        )}
      </div>

    </section>
  );
}

export default ExposeItem;