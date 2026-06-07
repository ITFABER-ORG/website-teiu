import { X, Check } from "lucide-react";
import { useTranslation } from 'react-i18next';


const brandLogos = {
  Teiú: "/assets/img/teiulogo.png",
  Átila: "/assets/img/atilalogo.png",
  Vatz: "/assets/img/vatzlogo.png",
  Maran: "/assets/img/maranlogo.png",
};

const SidebarFilters = ({ filters, setFilters, options, isOpen, onClose }) => {
  const { t } = useTranslation();
  const handleSelect = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: prev[name] === value ? "" : value
    }));
  };

  const fragrancias = ["Lavanda", "Capim-Limão", "Marine", "Maçã", "Original", "Floral", "Amor"];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-[#F9FBFC] transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto
      lg:relative lg:translate-x-0 lg:z-0 lg:block lg:border-r lg:border-gray-100 lg:bg-transparent
      ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
    `}>
      <div className="flex justify-between items-center lg:hidden mb-6">
        <h2 className="text-xl font-teiu font-bold text-[#003366]">Filtros</h2>
        <button onClick={onClose}><X size={24} /></button>
      </div>

      <div className="space-y-8">
        {/* BUSCA RÁPIDA */}
        <div>
          <span className="text-[10px] font-bold font-teiu text-gray-400 uppercase tracking-widest mb-3 block">{t('titles.pesquisar')}</span>
          <input
            type="text"
            placeholder="Nome do produto..."
            value={filters.search}
            onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#009FE3]"
          />
        </div>

        {/* MARCAS COM LOGO */}
        <div>
          <span className="text-[10px] font-teiu font-bold text-gray-400 uppercase tracking-widest mb-4 block">
            {t('titles.marcas')}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(brandLogos).map((brand) => (
              <button
              key={brand}
              onClick={() => handleSelect("brand", brand)}
              className={`relative flex items-center justify-center p-2 h-16 rounded-xl border-2 cursor-pointer transition-all ${
                filters.brand === brand
                  ? "border-[#009FE3] bg-white shadow-md ring-1 ring-[#009FE3] scale-[1.02]"
                  : "border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200"
              }`}
            >
              {filters.brand === brand && (
                <div className="absolute top-1 right-1 bg-[#009FE3] rounded-full p-0.5">
                  <Check size={12} className="text-white" />
                </div>
              )}
            
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={brandLogos[brand]}
                alt={brand}
                className="max-w-full max-h-12 max-w-5 object-contain"
              />
            </div>
            </button>
            ))}
          </div>
        </div>

        {/* CATEGORIAS */}
        <div>
          <span className="text-[10px] font-bold font-teiu text-gray-400 uppercase tracking-widest mb-3 block"> {t('titles.categoria')} </span>
          <div className="flex flex-col gap-1">
            {options.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelect("category", cat)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-teiu transition-all ${filters.category === cat ? "bg-[#003366] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* VOLUMES */}
        <div>
          <span className="text-[10px] font-teiu font-bold text-gray-400 uppercase tracking-widest mb-3 block">Volume</span>
          <div className="flex flex-wrap gap-2">
            {["500ml", "1L", "2L", "3L", "5L"].map((v) => (
              <button
                key={v}
                onClick={() => handleSelect("volume", v)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${filters.volume === v ? "bg-[#009FE3] border-[#009FE3] text-white" : "bg-white text-gray-400 border-gray-200"
                  }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setFilters({ search: '', category: '', brand: '', volume: '', fragrance: '' })}
          className="w-full py-3 text-xs font-teiu  font-bold text-gray-400 hover:text-red-500 transition-colors border-t border-dashed mt-4"
        >
          {t('titles.apagar')} 
        </button>
      </div>
    </aside>
  );
};

export default SidebarFilters;