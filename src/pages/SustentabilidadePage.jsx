import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RodaSustentabilidade from '../sections/sustainability/RodaSustentabilidade';
import ExposeItem from '../sections/sustainability/ExposeItem';
import Stamp from '../sections/sustainability/Stamp';
import Features from '../sections/sustainability/Features';

const SustentabilidadePage = () => {
  const API_URL = "http://127.0.0.1:8080";
        const [pageData, setPageData] = useState(' ');
            
              useEffect(() => {
                const fetchPage = async () => {
                  try {
                    const response = await fetch("http://127.0.0.1:8000/api/pageWebsite/sustentabilidade");
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
    <div className="bg-white flex flex-col">
      <Navbar />
      
      <div className="relative w-full h-[80vh] md:h-[100vh] flex flex-col items-center justify-center text-center"> 
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={`${API_URL}/storage/${pageData?.components?.banner_sustainability?.assets?.banner_sustainability?.url}`} 
            alt="Natureza e Sustentabilidade" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <ExposeItem data={pageData?.components?.sustainability_item}/>
      <Features data={pageData?.components?.sustainability_cards}/>
      <Stamp data={pageData?.components?.sustainability_stamp}/>
      
      <RodaSustentabilidade data={pageData?.components?.sustainability_roulette} />

      <div className="w-full bg-gradient-to-r from-[#009FE3] to-[#03479A]">
          <Footer />
      </div>
    </div>
  );
};

export default SustentabilidadePage;