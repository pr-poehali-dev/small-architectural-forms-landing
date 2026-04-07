import Icon from "@/components/ui/icon";
import { IMG1, IMG2, IMG3, SERVICES, PROCESS, RevealSection } from "./shared";

const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#process", label: "Процесс" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#contacts", label: "Контакты" },
];

export function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{ background: "rgba(10,9,6,0.85)" }}>
      <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-oswald text-xl tracking-widest gradient-text font-semibold">АРХ·СТУДИЯ</a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium tracking-wide uppercase">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contacts" className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
          Связаться
        </a>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4" style={{ background: "rgba(10,9,6,0.97)" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-white/70 hover:text-white transition-colors py-1" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-lines">
      <div className="absolute inset-0 z-0">
        <img src={IMG1} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,9,6,0.3) 0%, rgba(10,9,6,0.6) 60%, rgba(10,9,6,1) 100%)" }} />
      </div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-glow" style={{ background: "radial-gradient(circle, #FF6B1A, transparent)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl animate-glow" style={{ background: "radial-gradient(circle, #E8231A, transparent)", animationDelay: "1.5s" }} />

      <div className="relative z-10 container max-w-7xl mx-auto px-6 pt-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-8 backdrop-blur-sm" style={{ background: "rgba(255,107,26,0.08)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse inline-block" />
          Архитектурная студия с 2008 года
        </div>
        <h1 className="font-oswald font-bold leading-none mb-6 animate-slide-up" style={{ fontSize: "clamp(3rem, 10vw, 8rem)", letterSpacing: "-0.02em" }}>
          АРХИТЕКТУРА,<br />
          <span className="gradient-text">КОТОРАЯ</span><br />
          ВДОХНОВЛЯЕТ
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Проектируем и строим дома, офисы и общественные пространства, которые живут вместе с людьми
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <a href="#portfolio" className="px-8 py-4 rounded-full font-semibold text-white text-base transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
            Смотреть работы
          </a>
          <a href="#calculator" className="px-8 py-4 rounded-full font-semibold text-white/80 text-base border border-white/15 hover:border-white/30 transition-colors backdrop-blur-sm">
            Рассчитать стоимость
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { val: "250+", label: "Объектов сдано" },
            { val: "15", label: "Лет опыта" },
            { val: "98%", label: "Довольных клиентов" },
            { val: "12", label: "Наград отрасли" },
          ].map((s, i) => (
            <div key={i} className="gradient-border rounded-xl p-4" style={{ background: "rgba(28,25,21,0.6)", backdropFilter: "blur(10px)" }}>
              <div className="font-oswald text-3xl font-bold gradient-text">{s.val}</div>
              <div className="text-white/40 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/30 text-xs uppercase tracking-widest">Прокрутить</span>
        <Icon name="ChevronDown" size={20} className="text-brand-orange" />
      </div>
    </section>
  );
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container max-w-7xl mx-auto px-6">
        <RevealSection>
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Наши работы</span>
              <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">ПОРТФОЛИО</h2>
            </div>
            <a href="#gallery" className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
              Вся галерея <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { img: IMG1, title: "Вилла «Горизонт»", tag: "Жилой дом", year: "2023" },
            { img: IMG2, title: "Офис TechSpace", tag: "Коммерческий", year: "2023" },
            { img: IMG3, title: "ЖК «Арка»", tag: "Многоквартирный", year: "2024" },
          ].map((p, i) => (
            <RevealSection key={i} className={i === 1 ? "md:mt-8" : ""}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,9,6,0.9) 0%, transparent 50%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.2), rgba(232,35,26,0.1))" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="px-3 py-1 rounded-full text-xs text-brand-orange border border-brand-orange/30 mb-3 inline-block" style={{ background: "rgba(255,107,26,0.1)" }}>{p.tag}</span>
                  <h3 className="font-oswald text-xl font-bold">{p.title}</h3>
                  <span className="text-white/40 text-sm">{p.year}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative" style={{ background: "rgba(20,18,16,0.5)" }}>
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <RevealSection className="text-center mb-16">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Что мы делаем</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">УСЛУГИ</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <RevealSection key={i}>
              <div className="group p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300 cursor-pointer h-full" style={{ background: "rgba(28,25,21,0.8)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.2), rgba(232,35,26,0.1))" }}>
                  <Icon name={s.icon} size={22} className="text-brand-orange" fallback="Star" />
                </div>
                <h3 className="font-oswald text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-brand-orange text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="py-24">
      <div className="container max-w-7xl mx-auto px-6">
        <RevealSection className="text-center mb-16">
          <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Как мы работаем</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">ПРОЦЕСС</h2>
        </RevealSection>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,26,0.4), transparent)" }} />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS.map((p, i) => (
              <RevealSection key={i}>
                <div className="flex flex-col items-start md:items-center text-left md:text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-oswald text-xl font-bold border-2 border-brand-orange/40 mb-6 relative z-10" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.15), rgba(232,35,26,0.1))", color: "#FF6B1A" }}>
                    {p.num}
                  </div>
                  <h3 className="font-oswald text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}