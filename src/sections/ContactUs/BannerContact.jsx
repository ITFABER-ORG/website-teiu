import CardContact from "../../components/CardContact";
import Navbar from "../../components/Navbar";

function BannerContactSession({ data }) {
  const API_URL = "http://127.0.0.1:8080";

  const assets = data?.assets || {};
  const texts = data?.texts || {};

  const getAssetUrl = (key) => {
    const asset = assets?.[key];

    if (!asset?.url) return null;

    return `${API_URL}/storage/${asset.url}`;
  };

  const getText = (key) => {
    return texts?.[key]?.content || "";
  };

  return (
    <div className="w-full h-[90vh] relative overflow-hidden">
      <Navbar />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${getAssetUrl(
            "banner_contact"
          )}')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-70">

        {/* Título RichText */}
        <div
          className="text-white text-3xl sm:text-5xl font-semibold max-w-xl leading-tight mt-40 mb-10"
          dangerouslySetInnerHTML={{
            __html:
              getText("subtitle") ||
              `PRECISA FALAR <br/> COM A TEIU?`,
          }}
        />

        <div className="flex flex-col sm:flex-row gap-6">

          <CardContact
            icon={getAssetUrl("email_icon")}
            title={getText("email_title")}
            description={getText("email_value")}
            action="email"
          />

          <CardContact
            icon={getAssetUrl("whatsapp_icon")}
            title={getText("whatsapp_title")}
            description={getText("whatsapp_value")}
            action="whatsapp"
          />

          <CardContact
            icon={getAssetUrl("social_icon")}
            title={getText("social_title")}
            description={getText("social_value")}
            action="instagram"
          />

          <CardContact
            icon={getAssetUrl("phone_icon")}
            title={getText("phone_title")}
            description={getText("phone_value")}
            action="phone"
          />

        </div>
      </div>
    </div>
  );
}

export default BannerContactSession;