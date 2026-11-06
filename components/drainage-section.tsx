import Image from "next/image";

const drainageTypes = [
  {
    id: "point",
    number: "01",
    label: "Локальный сбор воды",
    title: "Точечный дренаж",
    description:
      "Собирает дождевую и талую воду там, где она скапливается: под водосточными трубами, у входа в дом и в отдельных местах на участке.",
    detail: "Вода попадает в дождеприёмник и дальше отводится по системе труб.",
    tags: ["Под водостоками", "У входной группы"],
    image: "/images/drainage-point.webp",
    alt: "Иллюстрация точечного дождеприёмника под водосточной трубой у дома",
  },
  {
    id: "linear",
    number: "02",
    label: "Вода под контролем по всей линии",
    title: "Линейный дренаж",
    description:
      "Перехватывает поверхностную воду вдоль дорожек, террас и мощёных площадок, чтобы она не скапливалась на покрытии.",
    detail:
      "Лотки с решётками образуют непрерывную линию водосбора и направляют воду к месту отвода.",
    tags: ["Вдоль дорожек", "На террасах и площадках"],
    image: "/images/drainage-linear.webp",
    alt: "Иллюстрация линейного водоотводного лотка вдоль мощёной террасы",
  },
  {
    id: "deep",
    number: "03",
    label: "Решение под поверхностью",
    title: "Глубинный дренаж",
    description:
      "Отводит грунтовую воду с помощью подземной системы дренажных труб. Решение для участков, где задача не ограничивается дождём на поверхности.",
    detail:
      "Глубину, трассу и состав системы подбираем по условиям участка и расположению строений.",
    tags: ["Грунтовые воды", "Подземная система"],
    image: "/images/drainage.webp",
    alt: "Иллюстрация глубинного дренажа: труба в щебёночной обсыпке и геотекстиле",
  },
];

export function DrainageSection() {
  return (
    <section
      id="drainage"
      className="section drainage"
      aria-labelledby="drainage-title"
    >
      <div className="wrap">
        <div className="section-heading drainage-heading">
          <div>
            <p className="eyebrow">02 / Дренаж участка</p>
            <h2 id="drainage-title">
              Вода должна
              <br />
              знать своё место.
            </h2>
          </div>
          <p className="section-intro">
            Три типа дренажа — три разных задачи.
            <br />
            Подбираем решение под рельеф,
            <br />
            грунт и особенности вашего участка.
          </p>
        </div>
        <div className="drainage-stories">
          {drainageTypes.map((type, index) => (
            <article
              key={type.id}
              id={`drainage-${type.id}`}
              className={`drainage-story ${index % 2 ? "drainage-story--reverse" : ""}`}
              aria-labelledby={`drainage-${type.id}-title`}
            >
              <div className="drainage-story-copy">
                <p className="drainage-story-label">
                  <span>{type.number}</span>
                  {type.label}
                </p>
                <h3 id={`drainage-${type.id}-title`}>{type.title}</h3>
                <p className="drainage-story-description">{type.description}</p>
                <p className="drainage-story-detail">{type.detail}</p>
                <ul
                  className="drainage-story-tags"
                  aria-label="Область применения"
                >
                  {type.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a
                  className="drainage-story-link"
                  href="#project"
                  aria-label={`Обсудить ${type.title.toLowerCase()}`}
                >
                  Обсудить решение <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="photo-frame drainage-story-photo">
                <Image
                  src={type.image}
                  alt={type.alt}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 46vw, 44vw"
                  data-source="illustration"
                  data-subject={`${type.id}-drainage`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
