"use client";

import { useId, useState } from "react";
import styles from "./foundation-cutaway.module.css";

const layers = [
  {
    id: "soil", name: "Грунт", subtitle: "Основа под конструкцией", color: "#8b9175",
    purpose: "Принимает нагрузку от фундамента. Свойства грунта и уровень подземных вод определяют решения для основания.",
    quality: "Исследование участка, подготовка основания и проверка его состояния до устройства следующих слоёв.",
    risk: "Неоднородное или неподготовленное основание может привести к неравномерной осадке.",
    check: "Сначала — данные об участке и расчёт основания.",
  },
  {
    id: "base", name: "Подушка", subtitle: "Подготовленное основание", color: "#c5ab7e",
    purpose: "Подготовительный слой под плитой. Его состав и толщина зависят от грунтовых условий и проектного решения.",
    quality: "Подходящий материал, послойная укладка и контроль уплотнения по проекту.",
    risk: "Недостаточно уплотнённая засыпка может просесть под нагрузкой.",
    check: "Проверяем материал, отметки и уплотнение.",
  },
  {
    id: "waterproofing", name: "Гидроизоляция", subtitle: "Защита от влаги", color: "#537b76",
    purpose: "Защищает конструкцию от влаги. Тип защиты, расположение и узлы примыканий выбирают по условиям увлажнения.",
    quality: "Непрерывный защитный контур с проработанными стыками, примыканиями и проходами коммуникаций.",
    risk: "Разрывы и негерметичные соединения оставляют пути для проникновения влаги.",
    check: "Осматриваем стыки и целостность перед закрытием слоя.",
  },
  {
    id: "reinforcement", name: "Армирование", subtitle: "Каркас внутри бетона", color: "#977153",
    purpose: "Работает совместно с бетоном в железобетонной плите. Схема армирования определяется расчётом нагрузок.",
    quality: "Арматура по проекту, надёжная фиксация и предусмотренный защитный слой бетона.",
    risk: "Смещение стержней и недостаточный защитный слой могут снизить надёжность и долговечность конструкции.",
    check: "Проверяем положение каркаса до бетонирования.",
  },
  {
    id: "concrete", name: "Бетон", subtitle: "Монолитная плита", color: "#a7ada2",
    purpose: "Вместе с арматурой образует несущую плиту. Толщину и характеристики бетона назначают по проекту.",
    quality: "Контроль поставки и укладки, уплотнение смеси и уход за бетоном при наборе прочности.",
    risk: "Ошибки укладки и отсутствие ухода повышают риск дефектов и трещинообразования.",
    check: "Контроль продолжается после завершения заливки.",
  },
] as const;

type LayerId = (typeof layers)[number]["id"];
type Variant = "project" | "errors";
const elevations: Record<LayerId, number> = { soil: 460, base: 372, waterproofing: 308, reinforcement: 231, concrete: 152 };
const thicknesses: Record<LayerId, number> = { soil: 48, base: 35, waterproofing: 7, reinforcement: 0, concrete: 45 };
const top = "105,0 410,-110 715,20 410,130";

function point(u: number, v: number) {
  return { x: 105 + 305 * u + 305 * v, y: -110 * u + 130 * v };
}

function CutawayDiagram({ selected, variant, onSelect }: {
  selected: LayerId;
  variant: Variant;
  onSelect: (id: LayerId) => void;
}) {
  const id = useId();
  const errors = variant === "errors";
  return (
    <svg className={styles.diagram} viewBox="0 0 820 665" role="group" aria-label={`Разрез плитного фундамента: ${errors ? "условный пример нарушений" : "выполнение по проекту"}. Выберите слой для пояснения.`}>
      <defs>
        <pattern id={`${id}-soil`} width="32" height="24" patternUnits="userSpaceOnUse">
          <path d="m5 7 4 2m12 7 3-2" stroke="#4a5740" strokeWidth="1" opacity=".35" />
        </pattern>
        <pattern id={`${id}-sand`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.2" fill="#7e693f" opacity=".35" />
          <circle cx="13" cy="12" r="1" fill="#fff7df" opacity=".7" />
        </pattern>
      </defs>
      <path d="M410 45v580" stroke="#b6bdae" strokeDasharray="3 8" opacity=".5" />
      {layers.map((layer, index) => {
        const active = selected === layer.id;
        const y = elevations[layer.id];
        const h = thicknesses[layer.id];
        const mesh = layer.id === "reinforcement";
        const intervals = errors ? 4 : 10;
        return (
          <g
            key={layer.id}
            transform={`translate(0 ${y})`}
            className={`${styles.diagramLayer} ${active ? styles.activeLayer : ""}`}
            style={{ opacity: active ? 1 : .46 }}
            role="button"
            tabIndex={0}
            aria-label={layer.name}
            aria-pressed={active}
            onClick={() => onSelect(layer.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(layer.id);
              }
            }}
          >
            <title>{`${layer.name} — ${layer.subtitle}`}</title>
            {!mesh ? (
              <>
                <path d={`M105 0 410 130v${h}L105 ${h}Z`} fill={layer.color} />
                <path d={`m410 130 305-110v${h}L410 ${130 + h}Z`} fill={layer.color} />
                <path d={`M105 0 410 130v${h}L105 ${h}Z`} fill="#17251b" opacity=".18" />
                <path d={`m410 130 305-110v${h}L410 ${130 + h}Z`} fill="#17251b" opacity=".32" />
                <polygon points={top} fill={layer.color} stroke={active ? "#344736" : layer.color} strokeWidth={active ? 2 : 1} />
                {layer.id === "soil" && <polygon points={top} fill={`url(#${id}-soil)`} />}
                {layer.id === "base" && <polygon points={top} fill={`url(#${id}-sand)`} />}
                {errors && layer.id === "soil" && <path d="m210 47 55 24 40 7 46 37-46-13-40-12-55-24z" fill="#423f32" />}
                {errors && layer.id === "base" && <path d="m105 0 90 42 38-3 44 35 50 11 83 45v15l-83-29-50-11-44-25-38-7-90-53z" fill="#8f7754" />}
                {errors && layer.id === "waterproofing" && <path d="m335-38 26 31-12 19 39 13-7 39 23-6-8-42-27-17 15-12-31-37z" fill="#e8e9de" stroke="#ab563b" strokeWidth="2" />}
                {errors && layer.id === "concrete" && <path d="m385-68-13 28 26 10-10 29 41 15-10 22 32 19m-63-56-48 14-12 26m101-25 37-16 21 11" fill="none" stroke="#6b4938" strokeWidth="3" strokeLinejoin="round" />}
              </>
            ) : (
              <>
                <polygon points={top} fill="transparent" stroke={active ? "#946e4c" : "#767d6c"} strokeDasharray="4 5" />
                {Array.from({ length: intervals + 1 }, (_, n) => {
                  const a = point(n / intervals, 0);
                  const b = point(n / intervals, 1);
                  const c = point(0, n / intervals);
                  const d = point(1, n / intervals);
                  return <g key={n} stroke={errors ? "#996347" : "#645442"} strokeWidth={active ? 4 : 3} strokeLinecap="round">
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                    <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
                  </g>;
                })}
                {!errors && [point(.18, .18), point(.82, .18), point(.18, .82), point(.82, .82)].map((p, n) => <path key={n} d={`m${p.x - 7} ${p.y + 16} 7-16 7 16`} fill="none" stroke="#59654e" strokeWidth="3" />)}
              </>
            )}
            <path d="m720 20h28" stroke={active ? "#344736" : "#8b9482"} strokeWidth="1" />
            <circle cx="765" cy="20" r="15" fill={active ? "#344736" : "#f4f3ed"} stroke={active ? "#344736" : "#a3ac99"} />
            <text x="765" y="25" textAnchor="middle" fontSize="13" fill={active ? "#fff" : "#53604c"} fontFamily="inherit">{index + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function FoundationCutaway() {
  const [selected, setSelected] = useState<LayerId>("concrete");
  const [variant, setVariant] = useState<Variant>("project");
  const detailId = useId();
  const layer = layers.find((item) => item.id === selected)!;
  const errors = variant === "errors";

  return (
    <section id="foundation-cutaway" className={`section ${styles.section}`} aria-labelledby="cutaway-title">
      <div className="wrap">
        <div className="section-heading">
          <div><p className="eyebrow">Конструкция изнутри</p><h2 id="cutaway-title">Пять составляющих<br />надёжного основания.</h2></div>
          <p className="section-intro">Рассмотрите плитный фундамент по слоям. Узнайте, что скрывается под бетоном и почему важен каждый этап.</p>
        </div>
        <div className={styles.workbench}>
          <div className={styles.sidebar}>
            <p className={styles.label}>Выберите слой <span>01 — 05</span></p>
            <div className={styles.layerList} role="group" aria-label="Слои плитного фундамента">
              {layers.map((item, i) => (
                <button key={item.id} type="button" className={`${styles.layerButton} ${selected === item.id ? styles.selected : ""}`} aria-pressed={selected === item.id} aria-controls={detailId} onClick={() => setSelected(item.id)}>
                  <span className={styles.layerIndex}>0{i + 1}</span>
                  <span><strong>{item.name}</strong><small>{item.subtitle}</small></span>
                  <span className={styles.layerArrow} aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <p className={styles.sidebarNote}>В готовой плите арматура находится внутри бетона. Здесь элементы разнесены для наглядности.</p>
          </div>
          <div className={`${styles.stage} ${errors ? styles.errorStage : ""}`}>
            <div className={styles.stageToolbar}>
              <span className={styles.stageLabel}>Плитный фундамент / разрез</span>
              <div className={styles.variantControl} role="group" aria-label="Сравнение качества исполнения">
                <button type="button" aria-pressed={!errors} onClick={() => setVariant("project")}>По проекту</button>
                <button type="button" aria-pressed={errors} onClick={() => setVariant("errors")}>С нарушениями</button>
              </div>
            </div>
            <CutawayDiagram selected={selected} variant={variant} onSelect={setSelected} />
            <div className={styles.stageFooter}><span className={styles.materialKey}><i style={{ background: layer.color }} />{layer.name}</span><span>{errors ? "Условный пример ошибок" : "Проектный подход"}</span></div>
          </div>
        </div>
        <div id={detailId} className={styles.details} aria-live="polite" aria-atomic="true">
          <div className={styles.purpose}><p className={styles.label}>Назначение слоя</p><h3>{layer.name}</h3><p>{layer.purpose}</p></div>
          <div className={`${styles.comparisonCard} ${!errors ? styles.highlightQuality : ""}`}><p className={styles.label}><span aria-hidden="true">+</span> Подход Фаворит-групп</p><p>{layer.quality}</p><strong>{layer.check}</strong></div>
          <div className={`${styles.comparisonCard} ${styles.riskCard} ${errors ? styles.highlightRisk : ""}`}><p className={styles.label}><span aria-hidden="true">!</span> При нарушении технологии</p><p>{layer.risk}</p></div>
        </div>
        <div className={styles.footnote}>
          <p>Учебная схема и условное сравнение, а не оценка других подрядчиков. Состав слоёв, утепление, дренаж и параметры плиты определяются проектом под конкретный участок.</p>
          <a href="#project">Обсудить мой фундамент <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
