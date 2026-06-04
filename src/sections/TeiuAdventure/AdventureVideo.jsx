import React, { useRef, useEffect, useState} from 'react';

function AdventureVideo({data}) {
  const videoRef = useRef(null);
  const [img, setImg] = useState(null);
  const VITE_CMS_URL = import.meta.env.VITE_CMS_URL;
  
  useEffect(()=> {
      console.log('lepo',data?.assets?.banner_video_home?.url)
    setImg(data?.assets?.banner_video_home?.url)
  },[data])
  useEffect(() => {
    const options = { threshold: 0.5 };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[100vh] overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={`${VITE_CMS_URL}/storage/${img}`} 
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      />
    </section>
  );
}

export default AdventureVideo;