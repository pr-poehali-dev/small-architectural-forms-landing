import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG1 = "https://cdn.poehali.dev/projects/13821436-757b-4f51-93e1-7c619be8ddc4/files/9a750bca-98ec-427e-83c3-bff6f0bfe821.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/13821436-757b-4f51-93e1-7c619be8ddc4/files/fc873dd5-abf6-4758-af49-8abae940a396.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/13821436-757b-4f51-93e1-7c619be8ddc4/files/26b60f78-3c00-477f-ac0f-7dbcf0aff20e.jpg";

const MATERIALS = [
  { id: "concrete", name: "Бетон / Монолит", price: 45000, desc: "Надёжно и долговечно" },
  { id: "brick", name: "Кирпич", price: 55000, desc: "Классика и тепло" },
  { id: "panel", name: "Панели SIP", price: 32000, desc: "Быстро и экономично" },
  { id: "wood", name: "Клееный брус", price: 68000, desc: "Экология и уют" },
  { id: "steel", name: "Металлокаркас", price: 58000, desc: "Современность и точность" },
];

const SERVICES = [
  { icon: "Building2", title: "Проектирование", desc: "Архитектурные концепции, рабочая документация, 3D-визуализация любой сложности" },
  { icon: "Home", title: "Дизайн интерьера", desc: "От концепта до чистовой отделки — создаём пространства, в которых хочется жить" },
  { icon: "Hammer", title: "Строительство", desc: "Полный цикл возведения от фундамента до кровли с контролем качества" },
  { icon: "TreePine", title: "Ландшафт", desc: "Проектирование и озеленение территории, создание гармоничной среды вокруг" },
  { icon: "Ruler", title: "Авторский надзор", desc: "Контроль соответствия проекту на всех этапах строительства" },
  { icon: "FileText", title: "Согласования", desc: "Полное сопровождение получения разрешений и технических условий" },
];

const PROCESS = [
  { num: "01", title: "Консультация", desc: "Изучаем ваши пожелания, бюджет и особенности участка. Без обязательств." },
  { num: "02", title: "Концепция", desc: "Создаём несколько вариантов решений, выбираем лучший вместе с вами." },
  { num: "03", title: "Проект", desc: "Разрабатываем полную документацию: архитектуру, конструктив, инженерию." },
  { num: "04", title: "Строительство", desc: "Реализуем проект в срок с еженедельными отчётами и фотофиксацией." },
  { num: "05", title: "Сдача", desc: "Финальная приёмка, устранение замечаний, передача ключей и документов." },
];

const REVIEWS = [
  { name: "Алексей Громов", role: "Частный клиент", text: "Заказали дом 280 м². Студия справилась блестяще — сроки, качество, бюджет. Теперь живём в доме мечты.", rating: 5 },
  { name: "Марина Светлова", role: "Владелец ресторана", text: "Доверили реконструкцию ресторана. Результат превзошёл ожидания — посещаемость выросла на 40%.", rating: 5 },
  { name: "Дмитрий Козлов", role: "Девелопер", text: "Работаем с АРХ-СТУДИЕЙ уже 4 года. Профессионалы с большой буквы. Три комплекса — и ни одной претензии.", rating: 5 },
];

const FAQ_ITEMS = [
  { q: "Сколько стоит разработка проекта?", a: "Стоимость проектирования зависит от площади и сложности объекта. В среднем — от 800 до 2500 ₽/м². Точную цифру назовём после консультации." },
  { q: "Как долго разрабатывается проект?", a: "Типовой жилой дом — 4–8 недель. Нестандартные объекты и коммерческая недвижимость — от 3 месяцев. Сроки фиксируем в договоре." },
  { q: "Работаете ли вы в других городах?", a: "Да, мы работаем по всей России. Выезд специалиста, дистанционное согласование, цифровая документация — всё это доступно для клиентов из любого региона." },
  { q: "Можно ли изменить проект в процессе строительства?", a: "Корректировки возможны. Небольшие изменения — бесплатно. Значительные корректировки оформляем дополнительным соглашением с фиксацией стоимости и сроков." },
  { q: "Предоставляете ли гарантию на выполненные работы?", a: "Гарантия на конструктивные работы — 5 лет, на отделочные — 3 года. Все условия прописаны в договоре." },
];

const GALLERY = [IMG1, IMG2, IMG3, IMG1, IMG2, IMG3];

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [area, setArea] = useState(150);
  const [floors, setFloors] = useState(1);
  const [material, setMaterial] = useState("concrete");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null);

  const selectedMat = MATERIALS.find((m) => m.id === material)!;
  const basePrice = selectedMat.price * area * floors;
  const designCost = Math.round(basePrice * 0.08);
  const total = basePrice + designCost;

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#process", label: "Процесс" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#calculator", label: "Калькулятор" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white font-golos overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{ background: "rgba(10,9,6,0.85)" }}>
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-oswald text-xl font-bold tracking-widest gradient-text">АРХ·СТУДИЯ</a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
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
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-white/70 hover:text-white transition-colors py-1" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
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

      {/* PORTFOLIO */}
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

      {/* SERVICES */}
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

      {/* PROCESS */}
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

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 relative" style={{ background: "rgba(20,18,16,0.7)" }}>
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <RevealSection className="text-center mb-14">
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Предварительный расчёт</span>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">КАЛЬКУЛЯТОР</h2>
            <p className="text-white/40 mt-3 text-sm max-w-md mx-auto">Получите ориентировочную стоимость за 30 секунд. Точную цену назовём после консультации</p>
          </RevealSection>

          <RevealSection>
            <div className="rounded-3xl border border-white/8 overflow-hidden" style={{ background: "rgba(28,25,21,0.9)", backdropFilter: "blur(20px)" }}>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Controls */}
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5">
                  {/* Area slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <label className="font-oswald text-base font-semibold">Площадь</label>
                      <span className="gradient-text font-oswald text-2xl font-bold">{area} м²</span>
                    </div>
                    <input
                      type="range" min={50} max={1000} step={10} value={area}
                      onChange={(e) => setArea(+e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(to right, #FF6B1A ${((area - 50) / 950) * 100}%, rgba(255,255,255,0.1) ${((area - 50) / 950) * 100}%)` }}
                    />
                    <div className="flex justify-between text-white/30 text-xs mt-2">
                      <span>50 м²</span>
                      <span>1000 м²</span>
                    </div>
                  </div>

                  {/* Floors */}
                  <div className="mb-8">
                    <label className="font-oswald text-base font-semibold mb-3 block">Этажность</label>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFloors(f)}
                          className={`flex-1 py-3 rounded-xl font-oswald font-bold text-lg transition-all duration-200 border ${floors === f ? "border-brand-orange text-white" : "border-white/10 text-white/40 hover:border-white/25"}`}
                          style={floors === f ? { background: "linear-gradient(135deg, rgba(255,107,26,0.25), rgba(232,35,26,0.15))" } : { background: "rgba(255,255,255,0.03)" }}
                        >
                          {f} {f === 1 ? "этаж" : "этажа"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="font-oswald text-base font-semibold mb-3 block">Материал</label>
                    <div className="flex flex-col gap-2">
                      {MATERIALS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMaterial(m.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${material === m.id ? "border-brand-orange" : "border-white/8 hover:border-white/20"}`}
                          style={material === m.id ? { background: "linear-gradient(135deg, rgba(255,107,26,0.15), rgba(232,35,26,0.08))" } : { background: "rgba(255,255,255,0.02)" }}
                        >
                          <div>
                            <div className={`text-sm font-semibold ${material === m.id ? "text-white" : "text-white/60"}`}>{m.name}</div>
                            <div className="text-xs text-white/35 mt-0.5">{m.desc}</div>
                          </div>
                          <div className={`text-sm font-oswald font-bold ${material === m.id ? "text-brand-orange" : "text-white/30"}`}>
                            {m.price.toLocaleString()} ₽/м²
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="mb-8">
                      <span className="text-white/40 text-sm uppercase tracking-widest">Ваш объект</span>
                      <div className="mt-3 space-y-2">
                        {[
                          ["Площадь:", `${area} м²`],
                          ["Этажей:", `${floors}`],
                          ["Материал:", selectedMat.name],
                          ["Полная площадь:", `${area * floors} м²`],
                        ].map(([label, val], i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-white/50">{label}</span>
                            <span className="font-semibold">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/8 my-6" />

                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Строительство:</span>
                        <span>{basePrice.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Проектирование:</span>
                        <span>{designCost.toLocaleString()} ₽</span>
                      </div>
                      <div className="h-px bg-white/8" />
                      <div className="flex justify-between items-end">
                        <span className="text-white/60 text-sm">Итого от:</span>
                        <div className="text-right">
                          <span className="gradient-text font-oswald text-4xl font-bold">{total.toLocaleString()}</span>
                          <span className="text-brand-orange text-lg ml-1">₽</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl text-xs text-white/35 leading-relaxed" style={{ background: "rgba(255,107,26,0.05)", border: "1px solid rgba(255,107,26,0.1)" }}>
                      Расчёт ориентировочный. Финальная стоимость зависит от особенностей участка, отделки и инженерных систем.
                    </div>
                  </div>

                  <button className="mt-8 w-full py-4 rounded-2xl font-semibold text-white text-base transition-transform hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
                    Получить точный расчёт
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Что говорят клиенты</span>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">ОТЗЫВЫ</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <RevealSection key={i}>
                <div className="p-8 rounded-2xl border border-white/5 h-full flex flex-col" style={{ background: "rgba(28,25,21,0.8)" }}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-brand-orange text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed flex-1 mb-6">«{r.text}»</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-oswald font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-white/35 text-xs">{r.role}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 relative" style={{ background: "rgba(20,18,16,0.5)" }}>
        <div className="container max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-14">
            <span className="text-brand-orange text-sm font-semibold uppercase tracking-widest">Наши объекты</span>
            <h2 className="font-oswald text-5xl md:text-6xl font-bold mt-2">ГАЛЕРЕЯ</h2>
          </RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((img, i) => (
              <RevealSection key={i}>
                <div className="relative overflow-hidden rounded-xl aspect-square cursor-zoom-in group" onClick={() => setGalleryIdx(i)}>
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(255,107,26,0.2)" }}>
                    <Icon name="ZoomIn" size={28} className="text-white" />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>

        {galleryIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setGalleryIdx(null)}>
            <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setGalleryIdx(null)}>
              <Icon name="X" size={28} />
            </button>
            <img src={GALLERY[galleryIdx]} alt="" className="max-w-full max-h-[85vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" onClick={(e) => { e.stopPropagation(); setGalleryIdx((galleryIdx - 1 + GALLERY.length) % GALLERY.length); }}>
              <Icon name="ChevronLeft" size={36} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" onClick={(e) => { e.stopPropagation(); setGalleryIdx((galleryIdx + 1) % GALLERY.length); }}>
              <Icon name="ChevronRight" size={36} />
            </button>
          </div>
        )}
      </section>

      {/* FAQ */}
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

      {/* CONTACTS */}
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

      {/* FOOTER */}
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
    </div>
  );
}