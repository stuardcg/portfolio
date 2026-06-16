import { useEffect, useState } from "react";
import { type Command } from "../data/portfolio";
import CommandPalette from "./CommandPalette";
import styles from "./Chrome.module.css";

type Palette = "midnight" | "ember" | "slate" | "bone";
type Density = "cozy" | "compact";

type Tweaks = {
  palette: Palette;
  density: Density;
  scanlines: boolean;
  vignette: boolean;
  glitch: boolean;
};

const TWEAK_DEFAULTS: Tweaks = {
  palette: "midnight",
  density: "cozy",
  scanlines: true,
  vignette: true,
  glitch: true,
};

function BottomBar({ name, onCmd }: { name: string; onCmd: () => void }) {
  return (
    <div className={styles.bar}>
      <div className={styles.cell}>READY</div>
      <div className={styles.cell}>© 2026 / {name.toUpperCase()}</div>
      <div className={`${styles.cell} ${styles.tail}`}>
        <span>press</span>
        <button type="button" className={styles.kbd} onClick={onCmd}>
          ⌘ K
        </button>
        <span>for command palette</span>
      </div>
    </div>
  );
}

interface Props {
  name: string;
  commands: Command[];
}

export default function Chrome({ name, commands }: Props) {
  const [tweaks, setTweaks] = useState<Tweaks>(TWEAK_DEFAULTS);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (
        e.key === "/" &&
        document.activeElement &&
        (document.activeElement as HTMLElement).tagName !== "INPUT"
      ) {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", tweaks.palette);
    document.documentElement.setAttribute("data-density", tweaks.density);
  }, [tweaks.palette, tweaks.density]);

  useEffect(() => {
    document.body.classList.toggle("no-glitch", !tweaks.glitch);
  }, [tweaks.glitch]);

  const handleAction = (item: Command) => {
    setCmdOpen(false);
    if (item.target) {
      document
        .getElementById(item.target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (item.href) {
      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
      } else {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
    }
    if (item.action) {
      const [kind, val] = item.action.split(":");
      if (kind === "palette") {
        setTweaks((t) => ({ ...t, palette: val as Palette }));
      }
      if (kind === "toggle") {
        if (val === "density") {
          setTweaks((t) => ({
            ...t,
            density: t.density === "cozy" ? "compact" : "cozy",
          }));
        } else {
          const key = val as "scanlines" | "vignette" | "glitch";
          setTweaks((t) => ({ ...t, [key]: !t[key] }));
        }
      }
    }
  };

  const fxClassName = [
    styles.fx,
    tweaks.scanlines && styles.scanlines,
    tweaks.vignette && styles.vignette,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <BottomBar name={name} onCmd={() => setCmdOpen(true)} />
      <div className={fxClassName} aria-hidden="true"></div>
      <CommandPalette
        open={cmdOpen}
        commands={commands}
        onClose={() => setCmdOpen(false)}
        onAction={handleAction}
      />
    </>
  );
}
