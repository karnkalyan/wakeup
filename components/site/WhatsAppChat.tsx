"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "9779864033256";
  const defaultMessage = encodeURIComponent(
    "Namaste WakeUp Nepal Builders, I would like to inquire about your construction services and materials supply."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="whatsapp-floating-widget" aria-label="WhatsApp Contact">
      {/* Interactive Tooltip Card */}
      <div className={`whatsapp-tooltip ${isOpen ? "open" : ""}`}>
        <div className="whatsapp-tooltip-header">
          <div className="whatsapp-avatar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.452.746.969 1.206.666.592 1.228.775 1.402.862.173.087.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
            </svg>
          </div>
          <div className="whatsapp-header-text">
            <strong className="whatsapp-title">WakeUp Nepal Builders</strong>
            <span className="whatsapp-status">
              <span className="online-dot" /> Online • Quick Response
            </span>
          </div>
          <button
            type="button"
            className="whatsapp-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close message bubble"
          >
            <X size={14} />
          </button>
        </div>

        <div className="whatsapp-body">
          <div className="whatsapp-bubble font-nepali">
            <span className="nepali-bold-highlight">नमस्ते!</span> WakeUp Nepal Builders मा स्वागत छ। घर निर्माण वा निर्माण सामग्री सम्बन्धी जानकारीको लागि हामीसँग सिधै कुराकानी गर्नुहोस्।
          </div>
          <div className="whatsapp-bubble en">
            Need a site visit, BOQ estimation, or building materials quotation?
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-action-btn"
          id="whatsapp-direct-chat-btn"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.452.746.969 1.206.666.592 1.228.775 1.402.862.173.087.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          </svg>
          Start WhatsApp Chat (+977 9864033256)
        </a>
      </div>

      {/* Floating Button with Pulsing Radar Effect */}
      <div className="whatsapp-btn-container">
        <span className="whatsapp-pulse-ring" />
        <span className="whatsapp-pulse-ring delay" />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
          id="floating-whatsapp-icon"
          title="Chat with WakeUp Nepal Builders on WhatsApp (+977 9864033256)"
          onMouseEnter={() => setIsOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="#ffffff">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.452.746.969 1.206.666.592 1.228.775 1.402.862.173.087.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          </svg>
          <span className="whatsapp-badge-count">1</span>
        </a>
      </div>
    </div>
  );
}
