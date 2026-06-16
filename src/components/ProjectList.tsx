import { useState } from "react";
import { type Project } from "../data/portfolio";
import styles from "./ProjectList.module.css";

function ProjectRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const detailId = `project-detail-${project.id}`;
  return (
    <>
      <button
        type="button"
        className={`${styles.row} ${open ? styles.expanded : ""}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={open ? detailId : undefined}
      >
        <span className={styles.idx}>{project.id}</span>
        <span className={`${styles.name} glitch`} data-text={project.name}>
          {project.name}
        </span>
        <span className={styles.tags}>{project.tags}</span>
        <span className={styles.year}>{project.year}</span>
        <span className={styles.arrow} aria-hidden="true">
          {open ? "─" : "+"}
        </span>
      </button>
      {open && (
        <div className={styles.detail} id={detailId}>
          <div></div>
          <div className={styles.thumb}>
            <div className={styles.corner}>{project.corner}</div>
            <div className={styles.thumbLabel}>[ screenshot · {project.id} ]</div>
          </div>
          <div className={styles.desc}>
            <div className={styles.lead}>{project.lead}</div>
            <div>{project.desc}</div>
            <div className={styles.metaGrid}>
              {project.meta.map((m) => (
                <div key={m.k}>
                  <div className={styles.metaKey}>// {m.k}</div>
                  <div className={styles.metaValue}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  const [openId, setOpenId] = useState<string | null>("01");

  return (
    <div className={styles.list}>
      {projects.map((p) => (
        <ProjectRow
          key={p.id}
          project={p}
          open={openId === p.id}
          onToggle={() => setOpenId(openId === p.id ? null : p.id)}
        />
      ))}
    </div>
  );
}
