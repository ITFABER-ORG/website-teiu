import { useState, useEffect } from "react";

function ContactForm({ data }) {
  const API_URL = "http://127.0.0.1:8080";

  const [dataSection, setDataSection] = useState({
    img: "",
    buttonText: "",
    tag: "",
    title: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setDataSection({
      img: data?.assets?.image?.url || null,
      buttonText: data?.texts?.button_text?.content || "ENVIAR MENSAGEM",
      tag: data?.texts?.tag?.content || "",
      title: data?.texts?.title?.content || "",
    });
  }, [data]);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numbers
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let interval;

    if (loading) {
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 100);
    } else {
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch(`${API_URL}/api/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        setResponseMsg(" Mensagem enviada com sucesso!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setResponseMsg(" Erro ao enviar mensagem.");
      }
    } catch (error) {
      console.error(error);
      setResponseMsg(" Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 px-6 sm:px-10 lg:px-32 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Imagem */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-[500px] aspect-[653/687]">
            <img
              src={`${API_URL}/storage/${dataSection.img}`}
              alt={dataSection.title}
              className="w-full h-full object-cover rounded-3xl shadow-md"
            />
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 max-w-[520px]">

        <span className="text-xs border px-4 py-1 rounded-full text-gray-600 inline-block">
          {dataSection.tag.replace(/<[^>]*>/g, "")}
        </span>
          <h2
            className="text-3xl sm:text-4xl font-semibold mt-4 leading-tight text-gray-900"
            dangerouslySetInnerHTML={{
              __html: dataSection.title,
            }}
          />
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className="w-full px-5 py-3 rounded-full border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className="w-full px-5 py-3 rounded-full border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(99) 99999-9999"
              maxLength={15}
              className="w-full px-5 py-3 rounded-full border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-green-400 transition"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Em que podemos te ajudar?"
              rows="4"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white outline-none resize-none focus:ring-2 focus:ring-green-400 transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex items-center justify-between bg-[#E0F896] px-6 py-3 rounded-full font-medium text-gray-900 shadow-sm disabled:opacity-50"
            >
              {loading ? "Enviando..." : dataSection.buttonText}

              <span className="relative bg-white rounded-full w-8 h-8 flex items-center justify-center shadow overflow-hidden">

                {loading && (
                  <div
                    className="absolute bottom-0 left-0 w-full overflow-hidden"
                    style={{ height: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-green-400" />

                    <div
                      className="absolute w-[200%] h-[120%] bg-green-500/70 rounded-[40%]"
                      style={{
                        top: "-10%",
                        left: "-50%",
                        animation: "wave 2s linear infinite",
                      }}
                    />
                  </div>
                )}

                <img
                  src="/assets/img/arrow.svg"
                  alt="Arrow"
                  className="relative z-10"
                />
              </span>
            </button>

            {responseMsg && (
              <div className="mt-4 p-3 rounded-lg bg-white border shadow text-sm">
                {responseMsg}
              </div>
            )}
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes wave {
            0% {
              transform: translateX(0) translateY(0);
            }

            50% {
              transform: translateX(-25%) translateY(6%);
            }

            100% {
              transform: translateX(-50%) translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}

export default ContactForm;