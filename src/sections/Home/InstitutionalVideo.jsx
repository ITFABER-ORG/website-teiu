import React, { useRef, useEffect, useState } from 'react';

function InstitutionalVideo({ data }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [img, setImg] = useState('');
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px", 
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(true); 
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const imageUrl =
      data?.components?.banner_video?.assets?.banner_video_home?.url;
  
    if (imageUrl) {
      setImg(imageUrl);
    }
  }, [data]);

  return (
    <section className="w-full flex justify-center">
      <div className="w-full">
        <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <video
            ref={videoRef}
            src={
              isLoaded && img
                ? `${VITE_CMS_URL}/storage/${img}`
                : ""
            }
            muted
            loop
            playsInline
            disablePictureInPicture
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default InstitutionalVideo;