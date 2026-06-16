import { useEffect, useMemo, useRef, useState } from "react";
import { type Command } from "../data/portfolio";
import styles from "./CommandPalette.module.css";

interface Props {
  open: boolean;
  commands: Command[];
  onClose: () => void;
  onAction: (item: Command) => void;
}

export default function CommandPalette({ open, commands, onClose, onAction }: Props) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(s));
  }, [q, commands]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    }
    if (e.key === "Enter") {
      if (items[active]) onAction(items[active]);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <span className={styles.headGlyph} aria-hidden="true">
            ▸
          </span>
          <span>COMMAND // type to filter</span>
        </div>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="goto, theme, toggle..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKey}
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={items[active] ? `cmdk-item-${active}` : undefined}
          aria-autocomplete="list"
        />
        <div className={styles.list} role="listbox" id="cmdk-list">
          {items.length === 0 && (
            <div className={`${styles.item} ${styles.empty}`}>
              <span className={styles.glyph}>·</span>
              <span className={styles.label}>no results</span>
            </div>
          )}
          {items.map((it, i) => (
            <div
              key={it.label}
              id={`cmdk-item-${i}`}
              role="option"
              aria-selected={i === active}
              className={`${styles.item} ${i === active ? styles.active : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => onAction(it)}
            >
              <span className={styles.glyph} aria-hidden="true">
                {it.glyph}
              </span>
              <span className={styles.label}>{it.label}</span>
              <span className={styles.hint}>{it.hint}</span>
            </div>
          ))}
        </div>
        <div className={styles.foot}>
          <span>↑↓ navigate · ↵ select · esc close</span>
          <span>{items.length} results</span>
        </div>
      </div>
    </div>
  );
}
