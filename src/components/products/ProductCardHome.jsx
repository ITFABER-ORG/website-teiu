import React from 'react';
import { Link } from 'react-router-dom';

function ProductCardHome({ title, image, parentId, variantId }) {
  return (
    <Link 
      to={`/produto/${parentId}`} 
      state={{ variantId }} 
      className="relative w-full max-w-[280px] aspect-[2.8/4] rounded-[20px] bg-white shadow-sm 
                 hover:shadow-xl transition-shadow duration-500 flex flex-col items-center p-8 
                 cursor-pointer overflow-hidden border border-gray-100 group block"
    >
      
      <div className="z-10 text-center mb-6">
      <h3
  className="
    font-teiu
    font-bold
    text-2xl
    leading-tight
    text-teiu-primary-dark
    line-clamp-2
    capitalize
  "
>
  {title?.toLowerCase()}
</h3>
      </div>

      <div className="relative flex-grow w-full flex items-center justify-center">
        {image ? (
          <img 
            className="h-full w-auto object-contain transition-all duration-500 ease-in-out 
                       group-hover:scale-[1.06] 
                       group-hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]" 
            src={image} 
            alt={title} 
          />
        ) : (
          <div className="w-full h-32 bg-gray-50 flex items-center justify-center text-gray-400 rounded-xl">
            Sem imagem
          </div>
        )}
      </div>

      <div className="mt-4 text-teiu-primary font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        Saiba mais
      </div>
    </Link>
  );
}

export default ProductCardHome;