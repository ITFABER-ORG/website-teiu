import React, { useEffect, useState } from "react";

function Hero({ data }) {
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;
  const [asset, setAsset] = useState("");

  useEffect(() => {
    setAsset(
      data?.components?.banner?.assets?.banner_home?.url || ""
    );
  }, [data]);

  const assetUrl = asset
    ? `${VITE_CMS_URL}/storage/${asset}`
    : "";

  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(asset);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-teiu-primary-dark">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-transparent h-1/3" />

      {asset && (
        isVideo ? (
          <video
            src={assetUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <img
            src={assetUrl}
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )
      )}
    </section>
  );
}

export default Hero;