"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-answer-${i}`;

        return (
          <div key={item.q}>
            {/* aria-controls links the button to its panel (WCAG 4.1.2) */}
            <button
              type="button"
              id={`faq-trigger-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-medium text-[var(--ink)]">
                {item.q}
              </span>
              <ChevronDown
                className={
                  "h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform " +
                  (isOpen ? "rotate-180" : "")
                }
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
