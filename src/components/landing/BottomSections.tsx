import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_ITEMS, RevealSection } from "./shared";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="container max-w-3xl mx-auto px-6">
        <RevealSection className="text-center mb-14">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Часто спрашивают</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">FAQ</h2>
        </RevealSection>
        <div className="space-y-3">
          {FAQ_ITEMS.map((f, i) => (
            <RevealSection key={i}>
              <div className="rounded-xl border border-white/8 overflow-hidden hover:border-brand-orange/20 transition-colors" style={{ background: "rgba(28,25,21,0.7)" }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-oswald font-semibold text-base pr-4">{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className={`flex-shrink-0 transition-colors ${openFaq === i ? "text-brand-orange" : "text-white/30"}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-white/5 mb-4" />
                    <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONTACT_FORM_URL = "https://functions.poehali.dev/e0d24dd7-5e5e-4fa6-a40c-36383d1685e3";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Введите имя";
    if (!phone.trim()) e.phone = "Введите телефон";
    if (!agreed) e.agreed = "Необходимо согласие";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await fetch(CONTACT_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="p-8 rounded-2xl border border-white/8 flex flex-col items-center justify-center text-center min-h-[320px]" style={{ background: "rgba(28,25,21,0.8)" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
          <Icon name="Check" size={28} className="text-white" />
        </div>
        <h4 className="font-oswald text-xl font-bold mb-2">Заявка отправлена!</h4>
        <p className="text-white/45 text-sm leading-relaxed max-w-xs">Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl border border-white/8" style={{ background: "rgba(28,25,21,0.8)" }}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="text-sm text-white/50 mb-1 block">
            Ваше имя <span className="text-brand-orange">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Алексей Иванов"
            className={`w-full px-4 py-3 rounded-xl border text-white placeholder-white/25 focus:outline-none transition-colors text-sm ${errors.name ? "border-red-500/60" : "border-white/10 focus:border-brand-orange/50"}`}
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-white/50 mb-1 block">
            Телефон <span className="text-brand-orange">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={`w-full px-4 py-3 rounded-xl border text-white placeholder-white/25 focus:outline-none transition-colors text-sm ${errors.phone ? "border-red-500/60" : "border-white/10 focus:border-brand-orange/50"}`}
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-white/50 mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-brand-orange/50 text-white placeholder-white/25 focus:outline-none transition-colors text-sm"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-white/50 mb-1 block">Расскажите о проекте</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Хочу построить дом 200 м² в 2 этажа..."
            className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-brand-orange/50 text-white placeholder-white/25 focus:outline-none transition-colors text-sm resize-none"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>

        {/* Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${agreed ? "border-brand-orange" : errors.agreed ? "border-red-500/60" : "border-white/20 group-hover:border-white/40"}`}
              style={agreed ? { background: "linear-gradient(135deg, #FF6B1A, #E8231A)" } : { background: "rgba(255,255,255,0.03)" }}
            >
              {agreed && <Icon name="Check" size={12} className="text-white" />}
            </button>
            <span className="text-xs text-white/45 leading-relaxed pt-0.5">
              Я согласен с{" "}
              <a href="#" className="text-brand-orange hover:underline">обработкой персональных данных</a>
              {" "}<span className="text-brand-orange">*</span>
            </span>
          </label>
          {errors.agreed && <p className="text-red-400 text-xs mt-1 ml-8">{errors.agreed}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Icon name="Loader" size={16} className="animate-spin" />
              Отправка...
            </span>
          ) : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
}

export function ContactsSection() {
  return (
    <section id="contacts" className="py-24 relative overflow-hidden" style={{ background: "rgba(20,18,16,0.8)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #FF6B1A, transparent)" }} />
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <RevealSection className="text-center mb-14">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Напишите нам</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">КОНТАКТЫ</h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <RevealSection>
            <ContactForm />
          </RevealSection>

          <RevealSection>
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", val: "info@arh-studio.ru" },
                { icon: "MapPin", label: "Адрес", val: "Москва, ул. Тверская, 12, оф. 301" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00–19:00, Сб: 10:00–16:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.2), rgba(232,35,26,0.1))" }}>
                    <Icon name={c.icon} size={18} className="text-brand-orange" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="text-white font-medium">{c.val}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <div className="text-white/40 text-xs uppercase tracking-wider mb-4">Мы в соцсетях</div>
                <div className="flex gap-3">
                  {["Instagram", "Youtube", "Send"].map((icon, i) => (
                    <button key={i} className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center hover:border-brand-orange/40 transition-colors" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <Icon name={icon} size={18} className="text-white/50" fallback="Share2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-oswald text-lg font-bold tracking-widest gradient-text">АРХ·СТУДИЯ</span>
        <span className="text-white/25 text-sm">© 2024 АРХ-СТУДИЯ. Все права защищены.</span>
        <div className="flex gap-6 text-xs text-white/30">
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
        </div>
      </div>
    </footer>
  );
}