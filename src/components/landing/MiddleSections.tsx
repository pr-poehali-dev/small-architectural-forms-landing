import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MATERIALS, REVIEWS, GALLERY, RevealSection } from "./shared";
import { PrivacyModal } from "./PrivacyModal";

const SEND_URL = "https://functions.poehali.dev/dfef0415-2ba0-42ac-8e11-16c1b798aba8";

interface CalcModalProps {
  open: boolean;
  onClose: () => void;
  area: number;
  floors: number;
  material: string;
  total: number;
}

function CalcModal({ open, onClose, area, floors, material, total }: CalcModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  if (!open) return null;

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
      await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, area, floors, material, total: total.toLocaleString() }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setName(""); setPhone(""); setEmail(""); setAgreed(false); setErrors({}); setSent(false); }, 300);
  };

  return (
    <>
    <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 overflow-hidden"
        style={{ background: "rgba(28,25,21,0.98)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-white/5" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.08), rgba(232,35,26,0.04))" }}>
          <button className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors" onClick={handleClose}>
            <Icon name="X" size={20} />
          </button>
          <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-1">Точный расчёт</p>
          <h3 className="font-oswald text-2xl font-bold text-white">Оставить заявку</h3>
          <p className="text-white/40 text-sm mt-1">Перезвоним и рассчитаем стоимость под ваш проект</p>
        </div>

        {sent ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
              <Icon name="Check" size={28} className="text-white" />
            </div>
            <h4 className="font-oswald text-xl font-bold mb-2">Заявка отправлена!</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-8">Мы получили ваш запрос и свяжемся с вами в ближайшее время.</p>
            <button onClick={handleClose} className="px-8 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}>
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
                Имя <span className="text-brand-orange">*</span>
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
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">
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
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-brand-orange/50 text-white placeholder-white/25 focus:outline-none transition-colors text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>

            {/* Calc summary */}
            <div className="rounded-xl p-4 space-y-1.5" style={{ background: "rgba(255,107,26,0.06)", border: "1px solid rgba(255,107,26,0.12)" }}>
              <p className="text-xs text-brand-orange uppercase tracking-widest font-semibold mb-2">Ваш расчёт</p>
              {[
                ["Площадь", `${area} м²`],
                ["Этажей", `${floors}`],
                ["Материал", material],
                ["Сумма от", `${total.toLocaleString()} ₽`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-white/40">{k}:</span>
                  <span className="text-white/80 font-medium">{v}</span>
                </div>
              ))}
            </div>

            {/* Checkbox */}
            <div>
              <label className={`flex items-start gap-3 cursor-pointer group`}>
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
                  <button type="button" onClick={() => setPrivacyOpen(true)} className="text-brand-orange hover:underline transition-colors">обработкой персональных данных</button>
                  {" "}<span className="text-brand-orange">*</span>
                </span>
              </label>
              {errors.agreed && <p className="text-red-400 text-xs mt-1 ml-8">{errors.agreed}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
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
        )}
      </div>
    </div>
    </>
  );
}

interface CalculatorSectionProps {
  area: number;
  setArea: (v: number) => void;
  floors: number;
  setFloors: (v: number) => void;
  material: string;
  setMaterial: (v: string) => void;
}

export function CalculatorSection({ area, setArea, floors, setFloors, material, setMaterial }: CalculatorSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const selectedMat = MATERIALS.find((m) => m.id === material)!;
  const basePrice = selectedMat.price * area * floors;
  const designCost = Math.round(basePrice * 0.08);
  const total = basePrice + designCost;

  return (
    <>
      <CalcModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        area={area}
        floors={floors}
        material={selectedMat.name}
        total={total}
      />

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

                  <button
                    onClick={() => setModalOpen(true)}
                    className="mt-8 w-full py-4 rounded-2xl font-semibold text-white text-base transition-transform hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}
                  >
                    Получить точный расчёт
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}

export function ReviewsSection() {
  return (
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
  );
}

interface GallerySectionProps {
  galleryIdx: number | null;
  setGalleryIdx: (v: number | null) => void;
}

export function GallerySection({ galleryIdx, setGalleryIdx }: GallerySectionProps) {
  return (
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
  );
}