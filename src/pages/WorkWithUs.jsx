import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

function TrabalheConosco() {
    const API_URL = "http://127.0.0.1:8080";
      const [pageData, setPageData] = useState(' ');
          
            useEffect(() => {
              const fetchPage = async () => {
                try {
                  const response = await fetch("http://127.0.0.1:8000/api/pageWebsite/trabalhe-conosco");
                  const data = await response.json();
                  console.log(' todos conteudos' , data?.components)
                  setPageData(data);
                } catch (error) {
                  console.error("Erro ao buscar página:", error);
                }
              };
          
              fetchPage();
            }, []);
    
    return (
        <div className="min-h-screen bg-[#009FE3] flex flex-col font-sans overflow-x-hidden">
            <Navbar />
            <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] overflow-hidden bg-white">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={`${API_URL}/storage/${pageData?.components?.work_with_us?.assets?.banner?.url}`}
                        alt="Trabalhe Conosco Teiú"
                        className="w-full h-full object-cover object-[80%_center] md:object-right"
                    />
                    
                </div>

                
            </section>

            <div className="bg-gradient-to-br from-[#02D1FF] to-[#074B9A] rounded-t-[40px] -mt-10 relative z-30">
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-6 lg:px-20 max-w-[1400px]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                            <div className="lg:col-span-7">
                            <h2 className="text-white text-3xl lg:text-5xl font-bold mb-6 leading-tight"
                             dangerouslySetInnerHTML={{
                                __html:
                                pageData?.components?.call_to_work?.texts?.title?.content|| "",
                            }}

                                />

                                <p className="text-white text-base lg:text-lg leading-relaxed opacity-90 max-w-xl"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                        pageData?.components?.call_to_work?.texts?.description?.content|| "",
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
                                                pageData?.components?.call_to_work?.texts?.card_title?.content || "",
                                            }}
                                            ></span>
                                            <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </h3>
                                    <p className="text-sm lg:text-base leading-relaxed opacity-80">
                                        Clique no link acima para conferir nossas oportunidades no portal de vagas 
                                        e venha fazer parte da nossa história.
                                    </p>
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