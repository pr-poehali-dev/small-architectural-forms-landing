import Icon from "@/components/ui/icon";

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 flex flex-col"
        style={{ background: "rgba(22,19,15,0.99)", maxHeight: "88vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-white/5 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.07), rgba(232,35,26,0.03))" }}
        >
          <div>
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-1">АРХ·СТУДИЯ</p>
            <h2 className="font-oswald text-xl font-bold text-white leading-tight">
              Политика обработки персональных данных
            </h2>
            <p className="text-white/35 text-xs mt-1">В соответствии с Федеральным законом № 152-ФЗ от 27.07.2006</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-white/30 hover:text-white transition-colors mt-0.5"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-8 py-6 space-y-6 text-sm text-white/60 leading-relaxed" style={{ scrollbarWidth: "thin" }}>

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">1. Общие положения</h3>
            <p>Настоящая Политика обработки персональных данных (далее — Политика) составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, принимаемые АРХ·СТУДИЕЙ (далее — Оператор).</p>
            <p className="mt-2">Политика применяется ко всей информации, которую Оператор может получить о пользователях сайта. Использование сервисов сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональных данных.</p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">2. Основные понятия</h3>
            <p className="mb-2">В настоящей Политике используются следующие понятия:</p>
            <ul className="space-y-2 pl-4">
              <li><span className="text-white/80 font-medium">Персональные данные</span> — любая информация, относящаяся к прямо или косвенно определённому физическому лицу (субъекту персональных данных).</li>
              <li><span className="text-white/80 font-medium">Оператор</span> — государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующее и/или осуществляющее обработку персональных данных.</li>
              <li><span className="text-white/80 font-medium">Обработка персональных данных</span> — любое действие (операция) или совокупность действий (операций) с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу, обезличивание, блокирование, удаление, уничтожение персональных данных.</li>
              <li><span className="text-white/80 font-medium">Конфиденциальность персональных данных</span> — обязательное требование для Оператора не допускать их распространение без согласия субъекта или иного законного основания.</li>
              <li><span className="text-white/80 font-medium">Cookies</span> — небольшой фрагмент данных, отправленный веб-сервером и хранимый на компьютере пользователя.</li>
            </ul>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">3. Состав обрабатываемых персональных данных</h3>
            <p className="mb-2">Оператор обрабатывает следующие категории персональных данных пользователей, добровольно предоставленных ими через формы обратной связи на сайте:</p>
            <ul className="space-y-1 pl-4 list-disc list-outside">
              <li>Фамилия, имя, отчество;</li>
              <li>Номер телефона;</li>
              <li>Адрес электронной почты;</li>
              <li>Иные сведения, самостоятельно предоставленные пользователем в форме сообщения.</li>
            </ul>
            <p className="mt-2">Оператор не собирает специальные категории персональных данных, касающиеся расовой и национальной принадлежности, политических взглядов, религиозных убеждений, состояния здоровья и интимной жизни.</p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">4. Цели обработки персональных данных</h3>
            <p className="mb-2">Оператор обрабатывает персональные данные в следующих целях:</p>
            <ul className="space-y-1 pl-4 list-disc list-outside">
              <li>Обработка входящих запросов от пользователей с целью консультирования;</li>
              <li>Связь с пользователем, в том числе направление уведомлений и запросов;</li>
              <li>Улучшение качества работы сайта и его сервисов;</li>
              <li>Проведение статистических и аналитических исследований на основе обезличенных данных.</li>
            </ul>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">5. Правовые основания обработки</h3>
            <p>Обработка персональных данных осуществляется на следующих правовых основаниях:</p>
            <ul className="space-y-1 pl-4 list-disc list-outside mt-2">
              <li>Согласие субъекта персональных данных (ст. 9 Федерального закона № 152-ФЗ);</li>
              <li>Необходимость исполнения договора, стороной которого является субъект персональных данных (п. 5 ч. 1 ст. 6 Федерального закона № 152-ФЗ);</li>
              <li>Необходимость для осуществления прав и законных интересов Оператора (п. 7 ч. 1 ст. 6 Федерального закона № 152-ФЗ).</li>
            </ul>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">6. Порядок и условия обработки</h3>
            <p>Обработка персональных данных осуществляется с соблюдением принципов и правил, установленных Федеральным законом № 152-ФЗ. Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий в отношении персональных данных.</p>
            <p className="mt-2">Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.</p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">7. Хранение и срок обработки</h3>
            <p>Персональные данные субъекта хранятся не дольше, чем этого требуют цели обработки. Обработка персональных данных прекращается при достижении целей обработки, истечении срока согласия, отзыве согласия субъектом персональных данных, а также в иных случаях, предусмотренных законодательством.</p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">8. Права субъектов персональных данных</h3>
            <p className="mb-2">Субъект персональных данных имеет право (ст. 14–17 Федерального закона № 152-ФЗ):</p>
            <ul className="space-y-1 pl-4 list-disc list-outside">
              <li>Получать информацию, касающуюся обработки его персональных данных;</li>
              <li>Требовать уточнения, блокирования или уничтожения своих персональных данных в случае, если они являются неполными, устаревшими, неточными, незаконно полученными;</li>
              <li>Отозвать согласие на обработку персональных данных;</li>
              <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор) или в судебном порядке.</li>
            </ul>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">9. Использование файлов Cookie</h3>
            <p>Сайт использует файлы cookie для корректной работы сервисов и сбора аналитической информации. Cookie не содержат конфиденциальной информации. Пользователь вправе в любое время отказаться от обработки cookie, изменив настройки браузера, однако это может повлиять на функциональность сайта.</p>
            <p className="mt-2">На сайте используется сервис Яндекс.Метрика, осуществляющий сбор, обработку и хранение статистической информации о посещаемости сайта. Обработка данных Яндекс.Метрикой осуществляется в соответствии с Политикой конфиденциальности Яндекса.</p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h3 className="font-oswald text-base font-semibold text-white mb-2">10. Заключительные положения</h3>
            <p>Оператор вправе вносить изменения в настоящую Политику без уведомления пользователей. Актуальная версия Политики всегда размещена на данной странице.</p>
            <p className="mt-2">По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться по адресу электронной почты: <span className="text-brand-orange">Artkov87@mail.ru</span></p>
          </section>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/5 flex-shrink-0 flex items-center justify-between gap-4" style={{ background: "rgba(255,107,26,0.04)" }}>
          <p className="text-white/30 text-xs">Федеральный закон № 152-ФЗ от 27.07.2006 «О персональных данных»</p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm flex-shrink-0 transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FF6B1A, #E8231A)" }}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
