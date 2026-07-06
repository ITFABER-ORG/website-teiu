import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/products/ProductCard";
import SidebarFilters from "../components/products/SidebarFilters";
import Pagination from "../components/Pagination";
import { Filter, ChevronUp } from "lucide-react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { useLanguage } from '../contexts/LanguageContext';

function ProductsPage() {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;

  const { language, setLanguage, isEnglish } = useLanguage();


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    brand: "",
    volume: "",
    fragrance: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // BUSCA PRODUTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/products/${language}`
        );

        const data = await response.json();

        console.log("produtos", data);

        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [language]);

  // TRANSFORMA CADA VARIAÇÃO EM UM CARD
  const productCards = useMemo(() => {
    return products.flatMap((product) =>
      product.variants.map((variant) => ({
        ...product,

        variantId: variant.id,
        variantLabel: variant.label,
        variantColor: variant.color,
        variantImage: `${API_URL}/storage/${variant.image}`,
        featured: variant.featured,

        selectedVariant: variant,
      }))
    );
  }, [products]);

  // OPTIONS FILTROS
  const options = useMemo(() => {
    return {
      brands: [...new Set(productCards.map((p) => p.brand))],

      categories: [
        ...new Set(productCards.map((p) => p.category)),
      ],

      volumes: [...new Set(productCards.map((p) => p.volume))],
    };
  }, [productCards]);
  const normalize = (text = "") =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  // FILTROS
  const filteredProducts = useMemo(() => {
    return productCards.filter((product) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.category ||
        product.category === filters.category;

        const matchesBrand =
        !filters.brand ||
        normalize(product.brand) === normalize(filters.brand);

      const matchesVolume =
        !filters.volume || product.volume === filters.volume;

      const matchesFragrance =
        !filters.fragrance ||
        product.title
          ?.toLowerCase()
          .includes(filters.fragrance.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesVolume &&
        matchesFragrance
      );
    });
  }, [productCards, filters]);

  // RESET PAGINAÇÃO
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // PAGINAÇÃO
  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[45] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-12 max-w-[1400px] flex-grow">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* SIDEBAR */}
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            options={options}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* CONTEÚDO */}
          <main className="flex-1">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-teiu lg:text-3xl font-semibold text-teiu-primary-dark">
                  {t("titles.produtos")}
                </h1>

                <p className="text-gray-400 text-xs mt-1">
                  {filteredProducts.length} itens encontrados
                </p>
              </div>

              {/* BOTÃO MOBILE */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden bg-[#009FE3] p-3 rounded-xl text-white shadow-md active:scale-95"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl h-[320px] animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">

                  {currentProducts.map((product) => (
                    <ProductCard
                      key={`${product.id}-${product.variantId}`}
                      product={product}
                    />
                  ))}

                </div>

                {/* PAGINAÇÃO */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl bg-white">
                <p className="text-gray-400">
                  Nenhum produto encontrado.
                </p>

                <button
                  onClick={() =>
                    setFilters({
                      search: "",
                      category: "",
                      brand: "",
                      volume: "",
                      fragrance: "",
                    })
                  }
                  className="mt-2 text-[#009FE3] text-sm font-bold hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* BOTÃO TOPO */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="fixed bottom-6 right-6 flex flex-col items-center text-[#003366] font-bold text-[10px] hover:scale-110 transition-transform z-40 bg-white/90 p-2 rounded-xl shadow-md border border-gray-100"
      >
        <div className="border-2 border-[#003366] rounded-full p-1 mb-1 bg-white">
          <ChevronUp
            className="h-4 w-4"
            strokeWidth={3}
          />
        </div>

        TOPO
      </button>

      {/* FOOTER */}
      <div className="w-full bg-gradient-to-r from-[#009FE3] to-[#03479A]">
        <Footer />
      </div>
    </div>
  );
}

export default ProductsPage;