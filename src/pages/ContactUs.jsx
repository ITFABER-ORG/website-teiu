import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BannerContactSession from "../sections/ContactUs/BannerContact";
import ContactForm from "../sections/ContactUs/ContactForm";

function ConatctUs() {
    const [pageData, setPageData] = useState(' ');
        useEffect(() => {
              const fetchPage = async () => {
                try {
                  const response = await fetch("http://127.0.0.1:8000/api/pageWebsite/contato");
                  const data = await response.json();
                  console.log('gerral', data.components)
                  setPageData(data);
                } catch (error) {
                  console.error("Erro ao buscar página:", error);
                }
              };
          
              fetchPage();
            }, []);
    
    

   
    return (
    <>
    <Navbar/>
    <BannerContactSession data={pageData?.components?.banner_talk_to_us}  />
    <ContactForm  data={pageData?.components?.talk_to_us_form}  />
    <div className="bg-gradient-to-br from-[#02D1FF] to-[#074B9A] pt-20 rounded-t-4xl">
        <Footer/>
    </div>

    </>
    );
}

export default ConatctUs;