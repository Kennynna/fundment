"use client";

import { useState } from "react";

const links = [
  ["#foundations", "Фундаменты"],
  ["#drainage", "Дренаж"],
  ["#standards", "Принципы"],
  ["#approach", "Подход"],
  ["#faq", "Вопросы"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        К содержимому
      </a>
      <div className="wrap header-row">
        <a href="#main" className="wordmark" onClick={() => setOpen(false)}>
          Фаворит<span>—</span>групп<span className="brand-dot">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map(([href, title]) => (
            <a key={href} href={href}>
              {title}
            </a>
          ))}
        </nav>
        <a
          className="header-project"
          href="#project"
          onClick={() => setOpen(false)}
        >
          Обсудить проект <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            "✕"
          ) : (
            <>
              <span />
              <span />
            </>
          )}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Мобильная навигация"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-button")
                ?.focus();
            }
          }}
        >
          {links.map(([href, title], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {title}
              <span>↗</span>
            </a>
          ))}
          <a href="#project" onClick={() => setOpen(false)}>
            <span>06</span>Ваш проект<span>↗</span>
          </a>
        </nav>
      )}
    </header>
  );
}
