"use client";

import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ConcreteScene() {
  const ref = useRef<HTMLElement>(null);
  const clipId = useId().replaceAll(":", "");
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const leftX = useTransform(progress, [0, 0.34], [-270, 0]);
  const rightX = useTransform(progress, [0, 0.34], [270, 0]);
  const fillHeight = useTransform(progress, [0.38, 0.86], [0, 300]);
  const streamOpacity = useTransform(
    progress,
    [0.32, 0.38, 0.79, 0.88],
    [0, 1, 1, 0],
  );
  const finishOpacity = useTransform(progress, [0.84, 1], [0, 1]);
  const firstOpacity = useTransform(progress, [0.27, 0.37], [1, 0]);
  const secondOpacity = useTransform(
    progress,
    [0.28, 0.38, 0.78, 0.88],
    [0, 1, 1, 0],
  );
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="concrete"
      className="pour-section"
      aria-labelledby="pour-title"
    >
      <div className="pour-sticky">
        <div className="wrap pour-wrap">
          <div className="pour-heading">
            <div>
              <p className="eyebrow">Из проекта — в конструкцию</p>
              <h2 id="pour-title">
                Две части.
                <br />
                <span>Одна прочная основа.</span>
              </h2>
            </div>
            <p>
              Точность соединяет детали.{" "}
              <br />
              Бетон превращает их в целое.
            </p>
          </div>
          <div className="pour-visual">
            <svg
              viewBox="0 0 1000 520"
              role="img"
              aria-labelledby={`${clipId}-title`}
            >
              <title id={`${clipId}-title`}>
                Иллюстрация: части опалубки сходятся в центре, затем бетон
                заполняет фундамент.
              </title>
              <defs>
                <clipPath id={clipId}>
                  <motion.rect
                    className="pour-fill-window"
                    x="240"
                    y="75"
                    width="520"
                    height={fillHeight}
                  />
                </clipPath>
                <pattern
                  id={`${clipId}-ground`}
                  width="28"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="5" cy="6" r="1" fill="#a8b09a" opacity=".22" />
                </pattern>
              </defs>
              <path d="m100 280 400-200 400 200-400 210z" fill="#354238" />
              <path
                d="m100 280 400 210 400-210v28L500 518 100 308z"
                fill="#2c382f"
              />
              <path
                d="m100 280 400-200 400 200-400 210z"
                fill={`url(#${clipId}-ground)`}
              />
              <path
                d="m190 245 310-155 310 155-310 163z"
                fill="none"
                stroke="#91a17f"
                strokeWidth="1"
                strokeDasharray="4 7"
                opacity=".3"
              />
              <path d="m260 230 240-120 240 120-240 127z" fill="#78836e" />
              <g
                className="pour-rebar"
                stroke="#a4ae96"
                strokeWidth="1.2"
                opacity=".6"
              >
                {Array.from({ length: 15 }, (_, i) => {
                  const t = (i + 1) / 16;
                  return (
                    <g key={i}>
                      <path d={`M${260 + 240 * t} ${230 - 120 * t} l240 127`} />
                      <path
                        d={`M${260 + 240 * t} ${230 + 127 * t} l240 -120`}
                      />
                    </g>
                  );
                })}
              </g>
              <motion.g className="pour-half" style={{ x: leftX }}>
                <path
                  d="M220 215 500 75v23L252 222 500 346v26L220 232Z"
                  fill="#b89b73"
                />
                <path d="m220 215 280 140v28L220 243Z" fill="#8b7152" />
                <path
                  d="m220 215 280-140v12L236 219 500 353v12Z"
                  fill="#d4ba91"
                />
                <g stroke="#a28a65" strokeWidth="2">
                  <path d="m270 240v26m70 9v26m70 10v26M285 187v-16m90-29v-16m90-29V81" />
                </g>
                <path d="m270 234 230 117" stroke="#e2cfaa" opacity=".5" />
              </motion.g>
              <motion.g className="pour-half" style={{ x: rightX }}>
                <path
                  d="m500 75 280 140v17L500 372v-26l248-124L500 98Z"
                  fill="#a48a66"
                />
                <path d="m500 355 280-140v28L500 383Z" fill="#79664d" />
                <path d="m500 75 280 140-16 8L500 87Z" fill="#c9ae83" />
                <path d="m500 355 280-140v12L500 367Z" fill="#c3a67b" />
                <g stroke="#8a775a" strokeWidth="2">
                  <path d="m550 330v28m70-64v28m70-63v28M555 102V86m90 61v-16m90 61v-16" />
                </g>
              </motion.g>
              <g className="pour-concrete" clipPath={`url(#${clipId})`}>
                <path
                  d="m258 216 242 121 242-121v18L500 355 258 234Z"
                  fill="#a9b1a3"
                />
                <path d="m500 337 242-121v18L500 355Z" fill="#909d8b" />
                <path d="m258 216 242-121 242 121-242 121Z" fill="#d8dccc" />
                <path
                  d="m276 216 224-112 224 112-224 112z"
                  stroke="#c1c9b6"
                  fill="none"
                />
                <path
                  d="m331 220 190 94m-120-143 215 107m-50-120 87 43"
                  stroke="#c6cebb"
                  strokeWidth="1"
                />
              </g>
              <motion.g
                className="pour-stream"
                style={{ opacity: streamOpacity }}
              >
                <path
                  d="M660 0v30q0 28-40 45l-70 35"
                  stroke="#161f19"
                  strokeWidth="24"
                  fill="none"
                />
                <path
                  d="m550 110-35 73"
                  stroke="#c4cbbb"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="9 5"
                />
                <ellipse
                  cx="515"
                  cy="190"
                  rx="25"
                  ry="10"
                  fill="#c2cbb6"
                  opacity=".7"
                />
              </motion.g>
              <motion.g
                className="pour-finish-mark"
                style={{ opacity: finishOpacity }}
                fill="none"
                stroke="#b6c4a3"
              >
                <circle cx="810" cy="365" r="26" />
                <path d="m799 365 8 8 15-17" strokeWidth="2" />
              </motion.g>
              <g fill="none" stroke="#7c8e70" opacity=".45">
                <path d="m180 339 283 145m-283-153v16m283 129v16M825 324l60-30m-60 22v16m60-46v16" />
              </g>
            </svg>
          </div>
          <div className="pour-bottom">
            <div className="pour-caption">
              <motion.p style={{ opacity: firstOpacity }}>
                Собираем опалубку.
                <br />
                <span>Каждая часть занимает своё место.</span>
              </motion.p>
              <motion.p style={{ opacity: secondOpacity }}>
                Заполняем форму бетоном.
                <br />
                <span>Основание обретает прочность.</span>
              </motion.p>
              <motion.p
                className="pour-finished-copy"
                style={{ opacity: finishOpacity }}
              >
                Единая монолитная плита.
                <br />
                <span>Основа для будущего дома.</span>
              </motion.p>
            </div>
            <span className="pour-scroll-hint">
              Продолжайте прокрутку <span aria-hidden="true">↓</span>
            </span>
          </div>
          <div className="pour-timeline">
            <div>
              <motion.span
                className="pour-timeline-fill"
                style={{ width: progressWidth }}
              />
            </div>
            <ol>
              <li>01 / Соединение</li>
              <li>02 / Бетонирование</li>
              <li>03 / Основание</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
