import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Wrench } from "lucide-react";

function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 max-w-[1400px] flex-grow flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#009FE3]/10 mb-6">
            <Wrench className="h-10 w-10 text-[#009FE3]" />
          </div>
          <h1 className="text-2xl font-teiu lg:text-3xl font-semibold text-teiu-primary-dark mb-3">
            Página em manutenção
          </h1>
          <p className="text-gray-400 text-sm">
            Estamos atualizando nosso catálogo de produtos. Volte em breve.
          </p>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-[#009FE3] to-[#03479A]">
        <Footer />
      </div>
    </div>
  );
}

export default ProductsPage;