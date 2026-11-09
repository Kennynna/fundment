import { SiteHeader } from "@/components/site-header";
import { SocialContacts } from "@/components/social-contacts";

const foundations = [
  ["Плитный", "Монолитная плита под всей площадью здания."],
  ["Свайный", "Опоры, передающие нагрузку на нижние слои грунта."],
  ["Ленточный", "Непрерывное основание под несущими стенами."],
  ["Столбчатый", "Отдельные опоры в расчётных точках здания."],
];
const drainage = [
  ["Точечный", "Локальный сбор воды", "Собирает дождевую и талую воду под водостоками и в отдельных точках участка."],
  ["Линейный", "Вдоль дорожек и площадок", "Отводит поверхностную воду с помощью лотков вдоль дорожек, террас и мощения."],
  ["Глубинный", "Подземная система", "Отводит грунтовую воду через систему дренажных труб. Схема зависит от условий участка."],
];

const questions = [
  ["Сколько стоит фундамент?", "Стоимость зависит от размеров здания, выбранной конструкции и условий участка. Для расчёта обсудим задачу и подготовим смету с материалами и работами."],
  ["Можно обратиться без готового проекта?", "Да. Расскажите, какой дом планируете построить, и пришлите эскиз, если он есть. Обсудим исходные данные и дальнейшие шаги."],
  ["Что нужно отправить для обсуждения?", "Расположение участка, размеры и материалы будущего дома. Если есть проект, сведения о грунте или фотографии участка — приложите их к сообщению."],
  ["Сколько времени занимают работы?", "Срок зависит от объёма, конструкции и условий на участке. Порядок и сроки работ обсуждаем после уточнения задачи."],
  ["Можно обсудить только дренаж?", "Да, можно обратиться отдельно по водоотведению. Расскажите, где скапливается вода, и пришлите фотографии участка."],
];

function PhotoPlaceholder({ label, tone }: { label: string; tone: number }) {
  return (
    <div
      className={`photo-placeholder tone-${tone}`}
      role="img"
      aria-label={`Место для фото: ${label}`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8" cy="9" r="1.5" />
        <path d="m3 17 5-5 4 4 4-6 5 7" strokeLinejoin="round" />
      </svg>
      <span aria-hidden="true">Место для фото</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Фаворит-групп · Строительные работы</p>
              <h1 id="hero-title">Фундаменты и дренаж для вашего дома</h1>
              <p className="hero-description">Устраиваем основание дома и отводим воду с участка. Подбираем решение с учётом грунта, нагрузок и проекта здания.</p>
              <div className="button-row">
                <a className="btn btn-primary" href="#project">Обсудить проект <span aria-hidden="true">↗</span></a>
                <a className="btn btn-secondary" href="#foundations">Посмотреть услуги</a>
              </div>
            </div>
            <div className="hero-services" aria-label="Наши направления">
              <a className="service-summary" href="#foundations"><span className="summary-top">01 / Строительство <span aria-hidden="true">↗</span></span><h2>Фундаменты</h2><p>4 типа основания под разные задачи</p></a>
              <a className="service-summary" href="#drainage"><span className="summary-top">02 / Обустройство участка <span aria-hidden="true">↗</span></span><h2>Дренаж</h2><p>Поверхностный и глубинный водоотвод</p></a>
            </div>
          </div>
        </section>
        <section id="foundations" className="section" aria-labelledby="foundations-title">
          <div className="wrap">
            <div className="section-heading"><div><p className="eyebrow">Наши услуги</p><h2 id="foundations-title">Виды фундаментов</h2></div><p>Выбор основания зависит от грунта,<br className="desktop-break" /> нагрузок и конструкции будущего дома.</p></div>
            <div className="foundation-grid">
              {foundations.map(([title, description], i) => (
                <article className="service-card" key={title}><PhotoPlaceholder label={`${title} фундамент`} tone={i + 1} /><h3>{title}</h3><p>{description}</p><a className="text-link" href="#project" aria-label={`Обсудить ${title.toLowerCase()} фундамент`}>Обсудить вариант <span aria-hidden="true">↗</span></a></article>
              ))}
            </div>
          </div>
        </section>
        <section id="drainage" className="section section-tinted" aria-labelledby="drainage-title">
          <div className="wrap">
            <div className="section-heading"><div><p className="eyebrow">Водоотведение</p><h2 id="drainage-title">Дренаж участка</h2></div><p>Для дождевой, талой и грунтовой воды.<br className="desktop-break" /> Учитываем рельеф и расположение строений.</p></div>
            <div className="three-grid">
              {drainage.map(([title, label, description], i) => (
                <article className="service-card" key={title}><PhotoPlaceholder label={`${title} дренаж`} tone={i + 1} /><p className={`card-label tone-${i + 1}`}>{label}</p><h3>{title}</h3><p>{description}</p><a className="text-link" href="#project" aria-label={`Обсудить ${title.toLowerCase()} дренаж`}>Обсудить вариант <span aria-hidden="true">↗</span></a></article>
              ))}
            </div>
          </div>
        </section>
        <section id="standards" className="section" aria-labelledby="standards-title">
          <div className="wrap">
            <div className="section-heading"><div><p className="eyebrow">Принципы работы</p><h2 id="standards-title">Что важно при строительстве</h2></div></div>
            <div className="principles-grid">
              {[
                ["Обязательный проект", "Строим по проекту с учётом условий участка и нагрузок на основание."],
                ["Строительство по нормам", "Выполняем работы по строительным нормам и правилам."],
                ["Подробная смета", "Заранее рассчитываем объёмы, материалы и состав строительных работ."],
                ["Оснащённые бригады", "Используем необходимый инструмент и оборудование на каждом этапе."],
              ].map(([title, text], i) => <article className="principle" key={title}><span className="principle-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </section>
        <section id="approach" className="section section-tinted" aria-labelledby="approach-title">
          <div className="wrap">
            <div className="section-heading"><div><p className="eyebrow">Порядок работы</p><h2 id="approach-title">От участка до основания</h2></div></div>
            <ol className="three-grid process-list">
              {[
                ["Обсуждаем задачу", "Уточняем расположение участка, размеры дома и наличие проекта."],
                ["Подбираем решение", "Рассматриваем грунт, рельеф и воду. Определяем тип основания и состав работ."],
                ["Выполняем работы", "Готовим участок, устраиваем фундамент и систему водоотведения по проекту."],
              ].map(([title, text], i) => <li key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}
            </ol>
          </div>
        </section>
        <section id="faq" className="section faq-section" aria-labelledby="faq-title">
          <div className="wrap">
            <div className="section-heading">
              <div><p className="eyebrow">Перед обращением</p><h2 id="faq-title">Частые вопросы</h2></div>
            </div>
            <div className="faq-list">
              {questions.map(([question, answer]) => (
                <article className="faq-item" key={question}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="project" className="section" aria-labelledby="project-title">
          <div className="wrap project-grid">
            <div className="project-copy"><p className="eyebrow">Ваш проект</p><h2 id="project-title">Обсудим ваш участок</h2><p>Расскажите, какой дом планируете построить. Разберём задачу и обсудим фундамент или дренаж.</p><h3>Что подготовить для разговора</h3><ul><li>Расположение и особенности участка</li><li>Размеры и материалы будущего дома</li><li>Проект или эскиз, если он уже есть</li></ul><p className="project-note">Нет готового проекта? Начнём с того, что уже известно.</p></div>
            <SocialContacts />
          </div>
        </section>
      </main>
      <footer><div className="wrap footer-row"><a href="#main" className="wordmark">Фаворит<span>—</span>групп<span className="brand-dot">.</span></a><p>© 2026 · Фундаменты и дренаж</p><a className="text-link" href="#main">Наверх ↑</a></div></footer>
    </>
  );
}
