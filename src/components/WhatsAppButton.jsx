import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  // Country code ke saath WhatsApp number
  const phoneNumber = "919322119463";

  // Pre-filled message
  const message =
    "Hi Vijay! I visited your portfolio and would like to connect with you.";

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with me on WhatsApp"
    >
      <span className="whatsapp-icon"><FaWhatsapp /></span>

      <span className="whatsapp-text">
        WhatsApp
      </span>
    </a>
  );
}

export default WhatsAppButton;