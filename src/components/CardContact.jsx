function CardContact({ icon, title, description, action }) {

  // Remove HTML para usar nos links
  const plainDescription = description
    ?.replace(/<[^>]*>/g, "")
    ?.trim();

  const handleClick = () => {
    let url = "#";

    switch (action) {
      case "instagram":
        url = `https://instagram.com/${plainDescription.replace("@", "")}`;
        break;

      case "whatsapp": {
        let phone = plainDescription.replace(/\D/g, "");

        if (!phone.startsWith("55")) {
          phone = `55${phone}`;
        }

        url = `https://wa.me/${phone}`;
        break;
      }

      case "email":
        url = `https://mail.google.com/mail/?view=cm&to=${plainDescription}`;
        break;

      case "phone":
        url = `tel:${plainDescription.replace(/\D/g, "")}`;
        break;

      default:
        return;
    }

    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-black/10 backdrop-blur-md p-5 rounded-xl w-full sm:w-64 text-white border border-white/20 hover:scale-105 transition"
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-8 h-8"
        />
      )}

      <h3
        className="font-semibold mt-6"
        dangerouslySetInnerHTML={{
          __html: title || "Título"
        }}
      />

      <div
        className="text-sm opacity-80"
        dangerouslySetInnerHTML={{
          __html: description || "Descrição"
        }}
      />
    </div>
  );
}

export default CardContact;