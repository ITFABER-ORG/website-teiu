import { useEffect, useState } from "react";

import ProductsHome from "../sections/Home/ProductsHome";
import Hero from "../sections/Home/Hero";
import Footer from "../components/Footer";
import InstitutionalVideo from "../sections/Home/InstitutionalVideo";
import InstagramSection from "../sections/Home/InstagramSection";
import Navbar from "../components/Navbar";
import { useLanguage } from '../contexts/LanguageContext';


function Home() {
  const [pageData, setPageData] = useState(' ');
  const { language, setLanguage, isEnglish } = useLanguage();


  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/pageWebsite/home?language=${language}`
        );
  
        const data = await response.json();
  
        console.log(data);
  
        setPageData(data);
      } catch (error) {
        console.error("Erro ao buscar página:", error);
      }
    };
  
    fetchPage();
  }, [language]);
  useEffect(()=> {
    console.log('page',pageData)
  },[pageData])

  return (
    <>
      <Navbar />

      <main className="w-full">
        <Hero data={pageData} />
        <ProductsHome data={pageData} />
        <InstitutionalVideo data={pageData} />

        <div className="relative w-full bg-unificado-teiu overflow-hidden">
          <InstagramSection data={pageData} />
          <Footer data={pageData} />
        </div>
      </main>
    </>
  );
}

export default Home;