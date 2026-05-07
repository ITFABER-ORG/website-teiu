import React from "react";

function AdventureContent({ data, mediaFiles }) {

  const texts = data?.texts || {};
  const assets = data?.assets || {};

  // 🔥 pegar texto direto
  const getText = (key) => texts?.[key]?.content || "";

  // 🔥 pegar imagem (com suporte a preview local)
  const getAssetUrl = (key) => {
    const asset = assets?.[key];

    const localFile = mediaFiles?.[key];
    if (localFile) return URL.createObjectURL(localFile);

    if (asset?.url) {
      return `http://localhost:8080/storage/${asset.url}`;
    }

    return null;
  };

  const imageUrl = getAssetUrl("image-about");

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* 🖼️ IMAGEM */}
          <div className="w-full md:w-1/2">
            {imageUrl ? (
              <img 
                src={imageUrl}
                alt="Imagem sobre"
                className="w-full h-auto rounded-xl shadow-2xl object-cover"
              />
            ) : (
              <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                Sem imagem
              </div>
            )}
          </div>

          {/* 📝 TEXTO */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            
            {/* subtitle */}
            {getText("subtitle") && (
              <h3
                className="text-[#003366] text-2xl lg:text-3xl font-bold mb-6 uppercase tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: getText("subtitle"),
                }}
              />
            )}

            {/* description */}
            {getText("description") && (
              <p
                className="text-gray-600 text-lg leading-relaxed text-justify font-teiu"
                dangerouslySetInnerHTML={{
                  __html: getText("description"),
                }}
              />
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

export default AdventureContent;