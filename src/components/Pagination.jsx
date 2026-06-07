import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
    
        const pages = [1];
    
        if (currentPage > 3) {
            pages.push("start-ellipsis");
        }
    
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
    
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
    
        if (currentPage < totalPages - 2) {
            pages.push("end-ellipsis");
        }
    
        pages.push(totalPages);
    
        return pages;
    };
    return (
        <div className="flex justify-center mt-10 w-full">
            <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-3 py-1">
                
                {/* Botão Anterior */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full text-[#003366] hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent transition-all duration-300 ease-in-out cursor-pointer"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Números das Páginas */}
                <div className="flex gap-1 sm:gap-2">
                    {getVisiblePages().map((item, index) =>
                        typeof item === "number" ? (
                            <button
                                key={item}
                                onClick={() => onPageChange(item)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold transition-all duration-300 ease-in-out cursor-pointer ${
                                    currentPage === item
                                        ? "bg-gradient-to-r from-[#009FE3] to-[#03479A] text-white shadow-md scale-110"
                                        : "text-[#003366] hover:bg-white/60 hover:scale-105"
                                }`}
                            >
                                {item}
                            </button>
                        ) : (
                            <span
                                key={`${item}-${index}`}
                                className="w-8 h-8 flex items-center justify-center text-[#003366]"
                            >
                                ...
                            </span>
                        )
                    )}
                </div>

                {/* Botão Próximo */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full text-[#003366] hover:bg-white/60 disabled:opacity-40 disabled:hover:bg-transparent transition-all duration-300 ease-in-out cursor-pointer"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;