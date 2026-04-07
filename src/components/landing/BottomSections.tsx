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
            <div className="p-8 rounded-2xl border border-white/8" style={{ background: "rgba(28,25,21,0.8)" }}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: "Ваше имя", placeholder: "Алексей Иванов", type: "text" },
                  { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                  { label: "Email", placeholder: "email@example.com", type: "email" },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-sm text-white/50 mb-1 block">{field.label}</label>
                    <input type={field.type} className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-brand-orange/50 transition-colors text-sm" style={{ background: "rgba(255,255,255,0.04)" }} placeholder={field.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="text-sm text-white/50 mb-1 block">Расскажите о проекте</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-brand-orange/50 transition-colors text-sm resize-none" style={{ background: "rgba(255,255,255,0.04)" }} placeholder="Хочу построить дом 200 м² в 2 этажа..." />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
                  Отправить заявку
                </button>
              </form>
            </div>
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
