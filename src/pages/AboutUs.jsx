import { useEffect, useState } from "react";

import Navbar from "../components/Navbar.jsx";
import BannerMaster from "../sections/AboutUs/BannerMaster.jsx";
import FounderSection from "../sections/AboutUs/FounderSection.jsx";
import OurFacilities from "../sections/AboutUs/OurFacilities.jsx";
import OurHistory from "../sections/AboutUs/OurHistory.jsx";
import OurMission from "../sections/AboutUs/OurMission.jsx";
import SocialProof from "../sections/AboutUs/SocialProof.jsx";
import Footer from "../components/Footer.jsx";

function AboutUs() {
  const [pageData, setPageData] = useState(' ');
    
      useEffect(() => {
        const fetchPage = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/api/pageWebsite/empresa");
            const data = await response.json();
            console.log(data)
            setPageData(data);
          } catch (error) {
            console.error("Erro ao buscar página:", error);
          }
        };
    
        fetchPage();
      }, []);
      useEffect(()=> {
        console.log('aaaaaaaaaaaaaaaaaa',pageData)
      },[pageData])
    return ( 
    <>
        <Navbar/>
        <BannerMaster
        title={'Lorem Impsum Dolor'}
        text={' Lorem ipsum dolor sit, amet consectetur adipisicing elit.  At repellendus beatae distinctio suscipit esse, eveniet, animi laboriosam dolorum, sit repudiandae obcaecati accusamus rerum soluta nam perspiciatis quas voluptatem. Tempora, veniam!'}
        />
        <OurFacilities data={pageData}/>
        <OurHistory data={pageData}/>
        <FounderSection data={pageData}/>
        <div className="bg-gradient-to-br from-[#02D1FF] to-[#074B9A] pt-20 rounded-t-4xl">
           <SocialProof data={pageData?.components?.social_proof}/>
           <OurMission data={pageData?.components?.our_missions}/>

           <Footer/>
        </div>
    </>
    );
}

export default AboutUs;