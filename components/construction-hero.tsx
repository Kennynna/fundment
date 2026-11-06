"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const stages = [
  "Участок",
  "Земляные работы",
  "Основание",
  "Армирование",
  "Бетонирование",
];
const details = [
  "Всё начинается с земли",
  "Готовим место для будущего дома",
  "Формируем подготовленное основание",
  "Собираем арматурный каркас",
  "Устраиваем монолитную плиту",
];

export function ConstructionHero() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = window.setTimeout(() => {
      if (query.matches) setStage(4);
      else setPlaying(true);
    }, 100);
    return () => window.clearTimeout(start);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      if (stage < 4) setStage(stage + 1);
      else setPlaying(false);
    }, 1900);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, stage]);
  const show = (visible: boolean, lift = 0) => ({
    opacity: visible ? 1 : 0,
    y: visible ? 0 : lift,
  });
  const transition = {
    duration: reduced ? 0 : 0.85,
    ease: "easeInOut" as const,
  };

  return (
    <div
      className="construction"
      aria-label="Иллюстративная схема этапов строительства плитного фундамента"
    >
      <div className="scene-top">
        <span>От земли к основанию</span>
        <span className="scene-index">0{stage + 1} / 05</span>
      </div>
      <div className="scene-canvas">
        <svg viewBox="0 35 700 440" role="img" aria-labelledby="scene-title">
          <title id="scene-title">{`${details[stage]}. Условная схема, не строительный проект.`}</title>
          <defs>
            <pattern
              id="soil"
              width="22"
              height="19"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="1.1" fill="#9e7f5f" opacity=".4" />
              <path d="m13 14 3-1" stroke="#b79b7b" />
            </pattern>
            <pattern
              id="gravel"
              width="14"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path d="m1 5 4-3 3 3-4 3z" fill="#b7b3a7" />
              <path d="m9 9 3-2 2 2-3 2z" fill="#d1cec3" />
            </pattern>
            <filter id="shadow">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          <ellipse
            cx="362"
            cy="411"
            rx="245"
            ry="35"
            fill="#544331"
            opacity=".13"
            filter="url(#shadow)"
          />
          <path d="M65 227 350 69 635 227 350 391Z" fill="#d7d2bd" />
          <path d="M65 227 350 391 350 458 65 294Z" fill="#baa082" />
          <path d="M350 391 635 227 635 294 350 458Z" fill="#9c8266" />
          <path d="M65 227 350 391 350 458 65 294Z" fill="url(#soil)" />
          <path d="M350 391 635 227 635 294 350 458Z" fill="url(#soil)" />
          <path
            d="M65 246 350 410 635 246"
            fill="none"
            stroke="#9a8066"
            strokeWidth="2"
            opacity=".4"
          />
          <path
            d="M65 227 350 69 635 227 350 391Z"
            fill="none"
            stroke="#bcb59a"
          />
          <motion.g
            initial={false}
            animate={show(stage === 0, -35)}
            transition={transition}
          >
            <path d="m132 224 218-120 218 120-218 125z" fill="#b8bf91" />
            <path
              d="m132 224 218 125 218-125"
              stroke="#8f9b6d"
              fill="none"
              strokeWidth="5"
            />
            <path
              d="m160 224 190-104 190 104-190 109z"
              stroke="#f7f4df"
              strokeDasharray="7 6"
              fill="none"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.g
            initial={false}
            animate={show(stage >= 1)}
            transition={transition}
          >
            <path d="m132 224 218-120 218 120-218 125z" fill="#8e7359" />
            <path d="m132 224 218-120v40L170 246Z" fill="#9d8265" />
            <path d="m350 104 218 120-38 22-180-102Z" fill="#b89a75" />
            <path d="m170 246 180-102 180 102-180 103z" fill="#a88b68" />
          </motion.g>
          <motion.g
            initial={false}
            animate={show(stage >= 2, -45)}
            transition={transition}
          >
            <path
              d="m160 233 190-105 190 105v15L350 356 160 248Z"
              fill="#b8a480"
            />
            <path d="m160 233 190-105 190 105-190 108Z" fill="#ded0aa" />
            <path
              d="m169 228 181-99 181 99v13L350 344 169 241Z"
              fill="#a8a59b"
            />
            <path d="m169 228 181-99 181 99-181 103Z" fill="#d0cdc2" />
            <path d="m169 228 181-99 181 99-181 103Z" fill="url(#gravel)" />
          </motion.g>
          <motion.g
            initial={false}
            animate={show(stage >= 3, -55)}
            transition={transition}
          >
            <path d="m175 214 175-96 175 96-175 101Z" fill="#c5c1b7" />
            {Array.from({ length: 13 }, (_, i) => {
              const k = (i + 1) / 14;
              return (
                <g key={i} stroke="#5e6866" strokeWidth="1.6">
                  <path d={`M${175 + 175 * k} ${214 - 96 * k} l175 101`} />
                  <path d={`M${175 + 175 * k} ${214 + 101 * k} l175 -96`} />
                </g>
              );
            })}
            <path
              d="m175 214 175-96 175 96-175 101Z"
              fill="none"
              stroke="#4e5956"
              strokeWidth="2"
            />
            <path
              d="m160 212 190 110 190-110v17L350 339 160 229Z"
              fill="#a47c53"
            />
            <path d="m160 212 190 110v17L160 229Z" fill="#bd966b" />
          </motion.g>
          <motion.g
            initial={false}
            animate={show(stage >= 4, -65)}
            transition={transition}
          >
            <path
              d="m166 202 184-101 184 101v25L350 333 166 227Z"
              fill="#b5b9b4"
            />
            <path d="m350 308 184-106v25L350 333Z" fill="#9fa7a2" />
            <path d="m166 202 184-101 184 101-184 106Z" fill="#e1e4dc" />
            <path
              d="m178 202 172-94 172 94-172 99Z"
              fill="none"
              stroke="#c9cfc5"
            />
            <path
              d="m211 195 265 27M263 163l197 52M220 231l200 31"
              stroke="#d1d6cc"
              strokeWidth="1"
              opacity=".55"
            />
          </motion.g>
          <g stroke="#8b7961" strokeWidth="2">
            <path d="M111 241v-29m478 29v-29M350 93V66m0 319v-29" />
          </g>
          <g fill="#e8dfc9">
            <path d="m106 212 5-3 5 3-5 3z" />
            <path d="m584 212 5-3 5 3-5 3z" />
          </g>
          <path
            d="M74 341 275 457m-201-123v15m201 101v15"
            stroke="#a59f8f"
            fill="none"
          />
          <text
            x="116"
            y="390"
            fill="#7b796d"
            fontSize="11"
            transform="rotate(30 116 390)"
            letterSpacing="2"
          >
            ФАВОРИТ — ГРУПП
          </text>
        </svg>
      </div>
      <div className="scene-caption">
        <div>
          <span className="stage-dot" />
          {details[stage]}
        </div>
        {(
          <button
            type="button"
            className="replay"
            onClick={() => {
              if (playing) setPlaying(false);
              else {
                setStage(0);
                setPlaying(true);
              }
            }}
            aria-label={
              playing
                ? "Приостановить анимацию"
                : "Повторить этапы строительства"
            }
          >
            {playing ? "Ⅱ" : "↻"}
          </button>
        )}
      </div>
      <div className="stage-controls" aria-label="Этапы строительства">
        {stages.map((name, index) => (
          <button
            key={name}
            type="button"
            className={
              index === stage ? "active" : index < stage ? "complete" : ""
            }
            aria-pressed={index === stage}
            onClick={() => {
              setPlaying(false);
              setStage(index);
            }}
          >
            <span className="stage-bar" />
            <span className="stage-number">0{index + 1}</span>
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
