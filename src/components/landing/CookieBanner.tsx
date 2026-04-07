import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const COOKIE_KEY = "arh_cookie_consent";
const COOKIE_DAYS = 10;

function getCookieAccepted(): boolean {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw);
    const expiry = ts + COOKIE_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

function setCookieAccepted() {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({ ts: Date.now() }));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieAccepted()) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    setCookieAccepted();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: "rgba(22,19,15,0.97)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,26,0.08)",
          pointerEvents: "all",
          animation: "slide-up 0.4s ease-out forwards",
        }}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.2), rgba(232,35,26,0.1))" }}
        >
          <Icon name="Cookie" size={18} className="text-brand-orange" fallback="Info" />
        </div>

        {/* Text */}
        <p className="text-white/55 text-sm leading-relaxed flex-1">
          Мы используем{" "}
          <span className="text-white/80 font-medium">cookies</span> и{" "}
          <span className="text-white/80 font-medium">Яндекс.Метрику</span> для анализа посещаемости и улучшения сайта.
          Продолжая использование сайта, вы соглашаетесь с{" "}
          <a
            href="#"
            className="text-brand-orange hover:underline transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            политикой конфиденциальности
          </a>
          .
        </p>

        {/* Button */}
        <button
          onClick={handleAccept}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}
        >
          Согласен
        </button>
      </div>
    </div>
  );
}
