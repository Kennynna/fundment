function ProjectDrawing() {
  return (
    <svg viewBox="0 0 440 220" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M64 54h288v132H64zM80 70h256v100H80zM198 70v100M214 70v100M80 118h118M214 130h122" />
        <path
          d="M50 34h316M64 27v15M352 27v15M30 54v132M23 54h14M23 186h14"
          opacity=".45"
        />
        <path
          d="M64 46v148M352 46v148M56 54h304M56 186h304"
          strokeDasharray="3 5"
          opacity=".35"
        />
        <path
          d="M101 101h48v46h-48zM251 87h60v28h-60zM251 145h60"
          opacity=".55"
        />
        <path
          d="M64 206h134m16 0h138M64 200v12m134-12v12m16-12v12m138-12v12"
          opacity=".45"
        />
      </g>
      <g fill="currentColor">
        <circle cx="64" cy="54" r="3" />
        <circle cx="352" cy="54" r="3" />
        <circle cx="64" cy="186" r="3" />
        <circle cx="352" cy="186" r="3" />
      </g>
      <path
        d="m363 145 17-17 17 17-17 17z"
        stroke="currentColor"
        opacity=".6"
      />
      <path d="M380 120v50m-25-25h50" stroke="currentColor" opacity=".35" />
    </svg>
  );
}

export function TrustSection() {
  return (
    <section
      id="standards"
      className="section standards"
      aria-labelledby="standards-title"
    >
      <div className="wrap">
        <div className="section-heading standards-heading">
          <div>
            <p className="eyebrow">03 / Основания для доверия</p>
            <h2 id="standards-title">
              Прочность —<br />в каждом решении.
            </h2>
          </div>
          <p className="section-intro">
            От первого чертежа до работ на участке.
            <br />
            Четыре принципа, на которых строится
            <br />
            наш подход к вашему фундаменту.
          </p>
        </div>
        <div className="trust-grid">
          <article className="trust-card trust-project">
            <div className="trust-card-top">
              <span>01 / Проект</span>
              <span className="trust-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="trust-project-content">
              <h3>
                Сначала — проект.
                <br />
                Потом — стройка.
              </h3>
              <p>
                Обязательный проект — основа всех строительных работ. Строим в
                соответствии с проектными решениями.
              </p>
            </div>
            <div className="project-drawing">
              <ProjectDrawing />
            </div>
            <div className="drawing-stamp" aria-hidden="true">
              <span>ФГ / Конструктивные решения</span>
              <span>Фундамент</span>
            </div>
          </article>
          <article className="trust-card trust-norms">
            <div className="trust-card-top">
              <span>02 / Нормативы</span>
              <span className="trust-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="norms-visual" aria-hidden="true">
              <span>ГОСТ</span>
              <span>СП</span>
              <span>СНиП</span>
              <svg viewBox="0 0 52 60" fill="none">
                <path
                  d="M26 3 47 11v18c0 13-21 27-21 27S5 42 5 29V11Z"
                  stroke="currentColor"
                />
                <path
                  d="m16 28 7 7 14-16"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3>Строим по нормам.</h3>
            <p>
              Выполняем фундаменты по ГОСТам, сводам правил, строительным нормам
              и правилам.
            </p>
          </article>
          <article className="trust-card trust-estimate">
            <div className="trust-card-top">
              <span>03 / Смета</span>
              <span className="trust-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="estimate-visual" aria-hidden="true">
              <div>
                <span>Материалы</span>
                <i />
              </div>
              <div>
                <span>Работы</span>
                <i />
              </div>
              <div>
                <span>Техника</span>
                <i />
              </div>
              <div className="estimate-total">
                <span>Каждая позиция имеет значение</span>
                <span>↗</span>
              </div>
            </div>
            <h3>Стоимость — в деталях.</h3>
            <p>
              Рассчитываем подробную, оптимизированную смету. Объёмы и состав
              работ становятся понятны до начала строительства.
            </p>
          </article>
          <article className="trust-card trust-team">
            <div className="trust-card-top">
              <span>04 / Исполнение</span>
              <span className="trust-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="team-visual" aria-hidden="true">
              <svg viewBox="0 0 300 120" fill="none">
                <path
                  d="M42 93h210M53 92V52h30v40M60 52V32h16v20M115 92V47h33v45M124 47V24h15v23M180 92V62h46v30M203 62V30m-15 0h30"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M32 103h230M95 17v90M168 17v90M22 75h256"
                  stroke="currentColor"
                  strokeDasharray="3 6"
                  opacity=".25"
                />
                <circle cx="203" cy="30" r="12" stroke="currentColor" />
                <path d="m197 30 4 4 8-9" stroke="currentColor" />
              </svg>
              <span>Люди. Инструмент. Оборудование.</span>
            </div>
            <h3>Бригада, готовая к работе.</h3>
            <p>
              Опытные бригады, оснащённые всем необходимым инструментом и
              оборудованием для выполнения строительных работ.
            </p>
          </article>
        </div>
        <div className="trust-next">
          <p>
            У вашего участка — свои условия.
            <br />
            <span>Начнём с них, чтобы обсудить решение.</span>
          </p>
          <a className="btn btn-primary" href="#project">
            Перейти к моему проекту <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
