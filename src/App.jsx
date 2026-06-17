import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n';
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import WorkWithUs from "./pages/WorkWithUs";
import ProductDetail from "./pages/ProductDetail";
import ConatctUs from "./pages/ContactUs";
import SustentabilidadePage from "./pages/SustentabilidadePage";
import TeiuAdventure from "./pages/TeiuAdventure";
import AcessibilidadeBar from "./components/acessibilidade/AcessibilidadeBar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AcessibilidadeBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aempresa" element={<AboutUs />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/produto/:id" element={<ProductDetail />} />
        <Route path="/trabalheconosco" element={<WorkWithUs />} />
        <Route path="/contato" element={<ConatctUs />} />
        <Route path="/sustentabilidade" element={<SustentabilidadePage />} />
        <Route path="/teiu-adventure" element={<TeiuAdventure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;