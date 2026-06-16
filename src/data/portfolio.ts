export type AboutLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string }
  | { type: "kv"; k: string; v: string }
  | { type: "spacer" };

export type ProjectMeta = { k: string; v: string };

export type Project = {
  id: string;
  name: string;
  tags: string;
  year: string;
  corner: string;
  lead: string;
  desc: string;
  meta: ProjectMeta[];
};

export type Command = {
  glyph: string;
  label: string;
  hint: string;
  /** id of a section to scroll to */
  target?: string;
  /** external link to open */
  href?: string;
  /** "palette:<name>" or "toggle:<tweak>" */
  action?: string;
};

export type Location = {
  /** human-readable place, e.g. shown in meta cards */
  label: string;
  /** terminal-style coordinates for the status bar */
  coords: string;
  /** timezone label, e.g. "UTC-6" */
  timezone: string;
  /** offset from UTC in hours, used to render the live clock */
  utcOffset: number;
};

export type Contact = {
  email: string;
  github: string;
  linkedin: string;
  /** path to the downloadable CV, relative to /public */
  cv: string;
};

export type PortfolioData = {
  name: string;
  /** monogram shown in the hero label, e.g. "SCC" */
  initials: string;
  /** shell handle used in terminal prompts, e.g. "stuard" */
  handle: string;
  role: string;
  /** availability tagline shown next to the role */
  availability: string;
  /** machine-readable status shown in the status bar */
  status: string;
  /** human-readable status shown in the hero */
  statusLabel: string;
  /** node id shown in the status bar */
  node: string;
  /** site version shown in the side rail */
  version: string;
  /** primary languages/tools, shown in the hero "FOCUS" cell */
  focus: string;
  /** what the work is, shown in the hero "CRAFT" cell */
  craft: string;
  location: Location;
  contact: Contact;
  roles: string[];
  about: AboutLine[];
  /** technologies shown in the about stack card */
  stack: string[];
  projects: Project[];
  commands: Command[];
};

/** Single source of truth for contact links — referenced by both the
 *  command palette and any component that needs them. */
const CONTACT: Contact = {
  email: "stuard.cg@icloud.com",
  github: "https://github.com/stuardcg",
  linkedin: "https://linkedin.com/in/stuardcg",
  cv: "/stuard-carrillo-gonzalez-cv.pdf",
};

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Stuard Carrillo",
  initials: "SCG",
  handle: "stuard",
  role: "Software Engineer",
  availability: "OPEN TO WORK",
  status: "OPEN_TO_WORK",
  statusLabel: "Open to work",
  node: "NODE.0001",
  version: "V0.26",
  focus: "TypeScript · React · Rust",
  craft: "Web apps, desktop, interfaces",
  location: {
    label: "Costa Rica · Remote",
    coords: "LAT 09°56′N · LON 84°05′W",
    timezone: "UTC-6",
    utcOffset: -6,
  },
  contact: CONTACT,
  roles: [
    "TypeScript / React engineer",
    "Full-stack web developer",
    "Tauri desktop app developer",
    "Rust & web tooling developer",
  ],
  about: [
    { type: "cmd", text: "whoami --verbose" },
    { type: "out", text: "stuard.carrillo // software engineer" },
    { type: "spacer" },
    { type: "cmd", text: "cat ./bio.md" },
    { type: "out", text: "I build performant web apps and developer tools." },
    {
      type: "out",
      text: "I care about details, fast feedback loops, and APIs",
    },
    { type: "out", text: "that disappear into the work. Comfortable across" },
    { type: "out", text: "the web platform, with native desktop via Tauri." },
    { type: "spacer" },
    { type: "cmd", text: "ls ./focus" },
    { type: "kv", k: "• frontend", v: "react, typescript, vanilla web" },
    { type: "kv", k: "• desktop", v: "tauri, rust" },
    { type: "kv", k: "• backend", v: "node, postgres, rest apis" },
    { type: "kv", k: "• tooling", v: "vite, build systems, cli" },
  ],
  stack: [
    "TypeScript",
    "React",
    "JavaScript",
    "Rust",
    "Tauri",
    "Node",
    "Postgres",
  ],
  projects: [],
  commands: [
    { glyph: "▸", label: "goto · hero", hint: "home", target: "hero" },
    { glyph: "▸", label: "goto · about", hint: "about", target: "about" },
    { glyph: "▸", label: "goto · projects", hint: "work", target: "projects" },
    { glyph: "▸", label: "goto · contact", hint: "ping", target: "contact" },
    {
      glyph: "◇",
      label: "theme · midnight",
      hint: "palette",
      action: "palette:midnight",
    },
    {
      glyph: "◇",
      label: "theme · ember",
      hint: "palette",
      action: "palette:ember",
    },
    {
      glyph: "◇",
      label: "theme · slate",
      hint: "palette",
      action: "palette:slate",
    },
    {
      glyph: "◇",
      label: "theme · bone",
      hint: "palette",
      action: "palette:bone",
    },
    {
      glyph: "◈",
      label: "toggle · scanlines",
      hint: "fx",
      action: "toggle:scanlines",
    },
    {
      glyph: "◈",
      label: "toggle · glitch",
      hint: "fx",
      action: "toggle:glitch",
    },
    {
      glyph: "◈",
      label: "toggle · vignette",
      hint: "fx",
      action: "toggle:vignette",
    },
    {
      glyph: "◈",
      label: "toggle · density",
      hint: "layout",
      action: "toggle:density",
    },
    {
      glyph: "↗",
      label: "open · github",
      hint: "external",
      href: CONTACT.github,
    },
    {
      glyph: "↗",
      label: "open · linkedin",
      hint: "external",
      href: CONTACT.linkedin,
    },
    {
      glyph: "↗",
      label: "open · email",
      hint: "external",
      href: `mailto:${CONTACT.email}`,
    },
  ],
};

/**
 * ASCII husky shown in the hero "portrait" terminal (displayed via `cat ./me`).
 * Swap in your own ASCII art any time — keep it within ~26 columns so it fits
 * the hero terminal at the current font size. String.raw keeps backslashes
 * literal, so `\` in the art survives without escaping.
 */
export const ASCII_HUSKY = String.raw`
                                                 ▓▒▒▒▒
               ░░░░▓▓                         █░░     ░
                     ░▒▓▓                  ▓▒░░        ░
               ░      ░░▒██▓              ▓▒░░          ▓
                        ░ ░▒▓██████████▓▓▒░ ░           ▒▒
               ▓         ▒▓▓▓▓▓██████▓▓▓▒▒▒░            ▓█
                ▒       ▒▓▓█████████▓▓▓▓▓▒▒▒▒           ▒▓
                ▓    ░▒▓▓▓▓▓▓▓▓▓██▓▓▓▒▒▒▒▒▒▒▒▒▒░       ░▓█
                ▓░ ░▒▓▓▓▓▓▓▓▓▒▒▒▒▓▒▒▒▒▒▒▒░▒▒▒▒▒▒░░░   ░▒███
               █▓▒▒▒▒▒▓▒    ▒▓▓▓█▓▒▒     ░  ▒▒░░░░░░░▒▒▒▒███
               ██▒▒▓▓▓▓▓▒ ░▓▓██████▓░    ░▒▒▒▒▒▒▒▒░ ░░░▒▓███
               ████▒░ ░▓█████████████▓▓▓▓▓▓▓▒▒░   ░░░░░▒▓███
               ███▓▒░  ░███████████████▓▒▒▒        ░░▒▒▒▓███
                 ██▓▒░ ▓█░░░░░░▒▓█▓▓██▓▓▒░         ░░░▒▓▓▓██
                  ███▓▒▒         ▒▓▓▓▓▓▓          ░░░░░░▒▓██
                   ███▓▓         ░░▒▒▒▒   ░       ░░░░░▒▒▓██
                    █▓▓▓▒▒             ░      ░░░░░░ ░▒▒▒▓██
                      ░██▓░           ░         ░ ░░░░░░▒▓██
                       █▓█           ░           ░░░░░▒▒▒▒▓█
                         ▒                       ░ ░░░░▒░▓▓▒
                            ▒▓▓▒░░              ░░▒░░▒▒▒▒▓▒▒
                               ▓██▒▒░ ░░        ░░░▒░░  ░░ ░
                                 ██▓▓▒▒          ░     ░░░░░`;
