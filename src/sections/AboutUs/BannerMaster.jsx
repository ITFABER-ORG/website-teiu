import { useEffect, useRef, useState } from "react";

function BannerMaster({ data }) {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef(null);

  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;

  const title = data?.texts?.title?.content || "";
  const subtitle = data?.texts?.subtitle?.content || "";

  const imageUrl = data?.assets?.banner_empresa?.url
    ? `${VITE_CMS_URL}/storage/${data.assets.banner_empresa.url}`
    : "/assets/img/capa-aboutus.jpg";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="
        relative
        bg-cover
        bg-center
        h-[70vh]
        md:h-[90vh]
        w-full
        flex
        items-center
        justify-start
        text-white
        px-6
        sm:px-12
        md:px-[100px]
        lg:px-[150px]
      "
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:hidden" />

      {title && subtitle && (
        <div
          className={`
            relative
            z-10
            w-[85%]
            sm:w-[70%]
            max-w-xl
            bg-black/60
            md:bg-black/50
            p-6
            md:p-8
            rounded-lg
            backdrop-blur-sm
            transition-all
            duration-1000
            ease-out
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}
        >
          <div
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight [&_p]:m-0"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />

          <div
            className="
              text-sm
              md:text-lg
              text-gray-200
              leading-relaxed
              [&_p]:mb-2
              [&_p:last-child]:mb-0
            "
            dangerouslySetInnerHTML={{
              __html: subtitle,
            }}
          />
        </div>
      )}
    </section>
  );
}

export default BannerMaster;