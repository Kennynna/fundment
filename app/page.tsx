import Image from "next/image";
import { DrainageSection } from "@/components/drainage-section";
import { ConstructionHero } from "@/components/construction-hero";
import { SiteHeader } from "@/components/site-header";
import { TrustSection } from "@/components/trust-section";
import { SocialContacts } from "@/components/social-contacts";
import { FoundationCards } from "@/components/foundation-cards";
import { ConcreteScene } from "@/components/concrete-scene";
import { MeasureScene } from "@/components/measure-scene";
import { FoundationCutaway } from "@/components/foundation-cutaway";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="square" /> Фундаменты · Московская область
              </p>
              <h1 id="hero-title">
                Большие планы.
                <br />
                Прочное
                <br />
                <span>основание.</span>
              </h1>
              <p className="hero-description">
                Фундаменты под ключ для частных домов.
                <br className="desktop-break" /> Устраиваем дренаж. Думаем о
                вашем участке.
              </p>
              <a className="btn btn-primary" href="#foundations">
                Выбрать фундамент <span aria-hidden="true">↗</span>
              </a>
              <div className="hero-note">
                <span className="note-line" /> От первого разговора до сдачи
                объекта
              </div>
            </div>
            <ConstructionHero />
          </div>
          <div className="wrap hero-foot">
            <span>Работаем с частными заказчиками в Подмосковье</span>
            <a href="#foundations">
              Узнать больше <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <div className="trust-ribbon">
          <div className="wrap">
            {[
              "Обязательный проект",
              "Строительство по нормам",
              "Подробная смета",
              "Оснащённые бригады",
            ].map((item, index) => (
              <a href="#standards" key={item}>
                <span>0{index + 1}</span>
                {item}
              </a>
            ))}
          </div>
        </div>
        <section id="foundations" className="section foundations">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / Фундаменты</p>
                <h2>
                  У каждого дома —<br />
                  своё основание.
                </h2>
              </div>
              <p className="section-intro">
                Четыре типа фундаментов.
                <br />
                Выбор зависит от грунта, нагрузок
                <br />и проекта будущего здания.
              </p>
            </div>
            <FoundationCards />
          </div>
        </section>
        <FoundationCutaway />
        <ConcreteScene />
        <DrainageSection />
        <TrustSection />
        <section id="approach" className="section approach">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">04 / Путь к результату</p>
                <h2>
                  Фундамент под ключ.
                  <br />От участка до сдачи.
                </h2>
              </div>
            </div>
            <div className="approach-grid">
              <div className="photo-frame foundation-photo">
                <Image
                  src="/images/planning.webp"
                  alt="Иллюстрация плана дома, карандаша и рулетки на рабочем столе"
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  data-source="illustration"
                  data-subject="construction-planning"
                />
              </div>
              <div className="process-list">
                {[
                  [
                    "Обсуждение и планирование",
                    "Знакомимся с вашим проектом и участком. Определяем решение, состав работ и сроки строительства.",
                  ],
                  [
                    "Подготовка участка",
                    "Выполняем планировку участка и разрабатываем котлован. Готовим основание под фундамент.",
                  ],
                  [
                    "Коммуникации и конструкция",
                    "Устанавливаем закладные, подводим коммуникации. Выполняем армирование и монтаж опалубки.",
                  ],
                  [
                    "Бетонирование и сдача",
                    "Заливаем фундамент и доводим работы до сдачи объекта. Сопровождаем вас на каждом этапе.",
                  ],
                ].map(([title, text], i) => (
                  <article key={title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <MeasureScene />
          </div>
        </section>
        <section id="project" className="project-section">
          <div className="wrap project-conversion">
            <div className="project-conversion-copy">
              <p className="eyebrow">05 / Ваш следующий шаг</p>
              <h2>
                Дом начинается
                <br />с вашего участка.
              </h2>
              <p>
                Напишите нам в удобном мессенджере. Обсудим будущий дом, условия
                участка в Московской области, состав работ и сроки строительства
                фундамента или устройства дренажа.
              </p>
              <div className="project-tags">
                <span>Расположение участка</span>
                <span>Размеры здания</span>
                <span>Проект или эскиз</span>
              </div>
              <div className="project-reassurance">
                <span aria-hidden="true">+</span>
                <p>
                  Нет готового проекта?
                  <br />
                  <span>Это тоже можно обсудить на старте.</span>
                </p>
              </div>
            </div>
            <SocialContacts />
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap footer-row">
          <a href="#" className="wordmark">
            Фаворит<span>—</span>групп<span className="brand-dot">.</span>
          </a>
          <p>Фундаменты и дренаж · Московская область</p>
          <a href="#main">Наверх ↑</a>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Фаворит-групп</span>
          <span>Изображения — тематические визуализации</span>
        </div>
      </footer>
    </>
  );
}
