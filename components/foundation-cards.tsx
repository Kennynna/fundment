"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const foundations = [
  ["01", "Плитный", "Монолитная плита под всей площадью здания.", "slab"],
  [
    "02",
    "Свайный",
    "Опоры, передающие нагрузку на нижние слои грунта.",
    "piles",
  ],
  ["03", "Ленточный", "Непрерывная опора под несущими стенами.", "strip"],
  ["04", "Столбчатый", "Отдельные опоры в расчётных точках здания.", "columns"],
];

function FoundationCard({ item, index }: { item: string[]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const [number, name, description, type] = item;
  return (
    <motion.article
      ref={ref}
      className="foundation-card foundation-reveal"
      initial={false}
      animate={
        seen && !reduced
          ? { opacity: [0.18, 1], y: [32, 0] }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      onFocusCapture={() => ref.current?.style.setProperty("opacity", "1")}
    >
      <div className="card-top">
        <span>{number}</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className={`foundation-icon ${type}`} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <a
        className="foundation-cta"
        href="#project"
        aria-label={`Обсудить ${name.toLowerCase()} фундамент`}
      >
        Обсудить вариант <span aria-hidden="true">↗</span>
      </a>
    </motion.article>
  );
}

export function FoundationCards() {
  return (
    <div className="foundation-grid">
      {foundations.map((item, index) => (
        <FoundationCard key={item[3]} item={item} index={index} />
      ))}
    </div>
  );
}
