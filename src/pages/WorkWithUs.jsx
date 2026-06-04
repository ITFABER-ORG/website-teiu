import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function TrabalheConosco() {
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;
  const API_URL = import.meta.env.VITE_API_URL;
  const { language } = useLanguage();

  const [pageData, setPageData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    pageData?.components?.work_with_us?.assets?.banner_image_1,
    pageData?.components?.work_with_us?.assets?.banner_image_2,
    pageData?.components?.work_with_us?.assets?.banner_image_3,
    pageData?.components?.work_with_us?.assets?.banner_image_4,
  ]
    .filter(Boolean)
    .map((img) => `${VITE_CMS_URL}/storage/${img.url}`);
    useEffect(() => {
        console.log(
          "assets",
          pageData?.components?.work_with_us?.assets
        );
      }, [pageData]);
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/pageWebsite/trabalhe-conosco?language=${language}`
        );

        const data = await response.json();

        console.log("todos conteudos", data?.components);

        setPageData(data);
      } catch (error) {
        console.error("Erro ao buscar página:", error);
      }
    };

    fetchPage();
  }, [language]);

  useEffect(() => {
    if (bannerImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % bannerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="min-h-screen bg-[#009FE3] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* BANNER */}
      <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] overflow-hidden bg-white">
        <div className="absolute inset-0 w-full h-full">
          {bannerImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Banner ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Indicadores */}
        {bannerImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* CONTEÚDO */}
      <div className="bg-gradient-to-br from-[#02D1FF] to-[#074B9A] rounded-t-[40px] -mt-10 relative z-30">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-20 max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <h2
                  className="text-white text-3xl lg:text-5xl font-bold mb-6 leading-tight"
                  dangerouslySetInnerHTML={{
                    __html:
                      pageData?.components?.call_to_work?.texts?.title
                        ?.content || "",
                  }}
                />

                <p
                  className="text-white text-base lg:text-lg leading-relaxed opacity-90 max-w-xl"
                  dangerouslySetInnerHTML={{
                    __html:
                      pageData?.components?.call_to_work?.texts?.description
                        ?.content || "",
                  }}
                />
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="bg-[#003366] p-8 lg:p-12 rounded-[30px] md:rounded-[45px] shadow-2xl text-white w-full max-w-[500px]">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-5">
                    <a
                      href="https://grupomarinhodeandrade.vagas.solides.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-[#009FE3] transition-colors group w-fit"
                    >
                      <span
                        className="underline decoration-2 underline-offset-4 group-hover:decoration-[#009FE3]"
                        dangerouslySetInnerHTML={{
                          __html:
                            pageData?.components?.call_to_work?.texts
                              ?.card_title?.content || "",
                        }}
                      />

                      <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h3>

                  <p
                    className="text-white text-base lg:text-lg leading-relaxed opacity-90 max-w-xl"
                    dangerouslySetInnerHTML={{
                      __html:
                        pageData?.components?.call_to_work?.texts
                          ?.card_description?.content || "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default TrabalheConosco;