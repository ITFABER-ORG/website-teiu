import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdventureContent from '../sections/TeiuAdventure/AdventureContent';
import AdventureHero from '../sections/TeiuAdventure/AdventureHero';
import AdventureImpactText from '../sections/TeiuAdventure/AdventureImpactText';
import AdventureVideo from '../sections/TeiuAdventure/AdventureVideo';
import AdventureAthletes from '../sections/TeiuAdventure/AdventureAthletes';
import AdventureEvents from '../sections/TeiuAdventure/AdventureEvents';

import { useEffect, useState } from 'react';

function TeiuAdventure() {
  const [pageData, setPageData] = useState(' ');
      
        useEffect(() => {
          const fetchPage = async () => {
            try {
              const response = await fetch("http://127.0.0.1:8000/api/pageWebsite/teiu-adventure");
              const data = await response.json();
              console.log(' todos conteudos' , data)
              setPageData(data);
            } catch (error) {
              console.error("Erro ao buscar página:", error);
            }
          };
      
          fetchPage();
        }, []);


  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow w-full">
        <AdventureHero data={pageData?.components?.banner_adventures} />
        <AdventureImpactText data={pageData?.components?.about_teiu_adventure}/>
        <AdventureContent data={pageData?.components?.about_teiu_adventure} />
        <AdventureVideo data={pageData?.components?.teiu_adventure_video}  />

        <div className="relative w-full bg-gradient-to-b  from-[#009FE3] to-[#03479A] overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url('/assets/img/coracao.png')", 
              backgroundSize: '150%', 
              backgroundPosition: 'center ', 
              backgroundRepeat: 'no-repeat'
            }}
          />

          <div className="relative z-10">
            <AdventureAthletes data={pageData?.components?.our_athletes}/>
            <AdventureEvents data={pageData?.components?.teiu_events} />
            <Footer />
          </div>

        </div>
      </main>
    </div>
  );
}

export default TeiuAdventure;