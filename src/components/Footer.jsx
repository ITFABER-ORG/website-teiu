import React, { useEffect, useState } from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

function Footer() {
  const [pageData, setPageData] = useState(null);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/pageWebsite/contato?language=${language}`
        );

        const data = await response.json();

        console.log('footer', data);

        setPageData(data);
      } catch (error) {
        console.error('Erro ao buscar página:', error);
      }
    };

    fetchPage();
  }, [language, API_URL]);

  const getText = (key) => {
    return (
      pageData?.components?.banner_talk_to_us?.texts?.[key]?.content
        ?.replace(/<[^>]*>/g, '')
        ?.trim() || ''
    );
  };

  return (
    <footer className="relative w-full text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 items-start">
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start mb-2 lg:mb-0">
            <img
              src="/assets/img/Logomarca.png"
              alt="Logo Teiú"
              className="h-30 md:h-34 w-auto object-contain"
            />
          </div>

          <div className="text-left">
            <h4 className="font-bold text-base mb-5 uppercase tracking-wider font-teiu">
              {t('footer.empresa', 'Empresa')}
            </h4>

            <ul className="flex flex-col gap-3 text-white/80 font-light font-teiu">
              <li>
                <a
                  href="/produtos"
                  className="hover:text-white hover:underline transition-all"
                >
                  {t('menu.produtos', 'Nossos Produtos')}
                </a>
              </li>

              <li>
                <a
                  href="/trabalheconosco"
                  className="hover:text-white hover:underline transition-all"
                >
                  {t('menu.trabalheConosco', 'Trabalhe Conosco')}
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-bold text-base mb-5 uppercase tracking-wider font-teiu">
              {t('footer.contato', 'Contato')}
            </h4>
            

            <ul className="flex flex-col gap-3 text-white/80 font-light font-teiu">
            <a
                href="https://ouvidoria.teiu.com.br/"
                target="_blank"
                rel="noreferrer"
              >
              Canal de Ouvidoria
                </a>
              {getText('phone_value') && (
                <li className="hover:text-white transition-colors cursor-default">
                  {getText('phone_value')}
                </li>
              )}

              {getText('whatsapp_value') && (
                <li className="hover:text-white transition-colors cursor-default">
                  {getText('whatsapp_value')}
                </li>
              )}

              {getText('email_value') && (
                <li className="hover:text-white transition-colors cursor-default">
                  {getText('email_value')}
                </li>
              )}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start mt-4 lg:mt-0">
            <h4 className="font-bold text-base mb-5 uppercase tracking-wider font-teiu">
              {t('footer.siganos', 'Siga-nos')}
            </h4>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/teiuoficial/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 border border-white/40 rounded-full hover:bg-white hover:text-blue-900 transition-all transform hover:-translate-y-1"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/@teiuoficial"
                className="p-2.5 border border-white/40 rounded-full hover:bg-white hover:text-blue-900 transition-all transform hover:-translate-y-1"
              >
                <Youtube size={18} />
              </a>

              <a
                href="https://www.facebook.com/share/18iQnUHBXR/"
                className="p-2.5 border border-white/40 rounded-full hover:bg-white hover:text-blue-900 transition-all transform hover:-translate-y-1"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* DIREITOS AUTORAIS */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-teiu leading-relaxed">
            © {new Date().getFullYear()} Teiú Indústria e Comércio.
            <br className="sm:hidden" />
            {t('footer.direitos', 'Todos os direitos reservados.')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;