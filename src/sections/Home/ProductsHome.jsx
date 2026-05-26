import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductCardHome from '../../components/products/ProductCardHome';

function ProductsSession() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [products, setProducts] = useState([]);

  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/api/productsEmphasis'
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(
          'Erro ao carregar produtos em destaque:',
          error
        );
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const exitStart = windowHeight * 0.85;

      setIsLeaving(rect.top > exitStart);
    };

    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', onScroll);

    handleScroll();

    return () =>
      window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-24 z-30 bg-teiu-gray pt-10 pb-12 px-0 rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] overflow-hidden"
    >
      <div className="max-w-full mx-auto">

        <div
          className={`flex justify-between items-center mb-10 px-4 transition-all duration-1000 ${
            visible && !isLeaving
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-bold tracking-tight text-teiu-primary-dark font-teiu">
            {t('titles.produtos')}
          </h2>

          <button
            onClick={() => navigate('/produtos')}
            className="flex items-center gap-2 text-sm font-medium border border-gray-300 rounded-full px-5 py-2 text-gray-700 hover:bg-white transition-all cursor-pointer shadow-sm font-teiu"
          >
            {t('titles.verTodos')}
            <ChevronRight size={16} />
          </button>
        </div>

        <div
          className={`relative group/carousel px-4 transition-all duration-1000 delay-200 ${
            visible && !isLeaving
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              nextEl: '.btn-next',
              prevEl: '.btn-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 5.2 },
              1024: { slidesPerView: 5.2 },
            }}
            className="pb-16 !static"
          >
            {products.map((item) => (
              <SwiperSlide
                key={item.id}
                className="h-full py-4 flex justify-center"
              >
                <ProductCardHome
                  title={`${item.product?.title} ${item?.label}`}
                  image={`http://127.0.0.1:8080/storage/${item.url_image}`}
                  parentId={item.product?.id}
                  variantId={item.id}
                  allVariants={[item]}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="btn-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-gray-50 cursor-pointer border border-gray-100">
            <ChevronLeft size={24} />
          </button>

          <button className="btn-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-gray-50 cursor-pointer border border-gray-100">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        .swiper-pagination-bullet-active {
          background: #009FE3 !important;
        }
      `}</style>
    </section>
  );
}

export default ProductsSession;