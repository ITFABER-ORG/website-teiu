import React from 'react';

const API_URL = "http://127.0.0.1:8080";

const getAssetUrl = (path) => {
  if (!path) return "/img/icon.svg";
  if (path.startsWith("http")) return path;

  return `${API_URL}/storage/${path}`;
};

function AdventureHero({ data }) {

  const imgPath = data?.assets?.banner_adventures?.url;
  const imageUrl = getAssetUrl(imgPath);

  return (
    <section className="relative w-full md:min-h-[100vh]  min-h-[50vh] flex flex-col items-center justify-center bg-[#003366] overflow-hidden pt-24 pb-12">
      
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt="Banner Teiú Adventure"
          onError={(e) => {
            e.target.src = "/img/icon.svg";
          }}
          className="w-full h-full object-cover"
        />

      </div>

    </section>
  );
}

export default AdventureHero;