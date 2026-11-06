"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function MeasureScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 1],
    ["inset(0 0 0 96%)", "inset(0 0 0 0%)"],
  );
  return (
    <div
      ref={ref}
      className="measure-scene"
      role="img"
      aria-label="Рулетка плавно раскрывается при прокрутке страницы"
    >
      <div className="measure-caption">
        <span>От замысла — к точному решению</span>
        <span aria-hidden="true">Масштаб имеет значение</span>
      </div>
      <div className="measure-object">
        <div className="measure-track">
          <motion.div className="measure-tape" style={{ clipPath }}>
            <div className="measure-ticks" />
            {Array.from({ length: 10 }, (_, index) => (
              <span
                className="measure-digit"
                style={{ left: `${index * 10 + 3}%` }}
                key={index}
              >
                {(10 - index) * 10}
              </span>
            ))}
            <span className="measure-hook" />
          </motion.div>
        </div>
        <div className="measure-housing">
          <span className="measure-reel" />
          <span className="measure-lock" />
          <span className="measure-label">
            ФГ<span>ТОЧНОСТЬ В ОСНОВЕ</span>
          </span>
        </div>
      </div>
    </div>
  );
}
