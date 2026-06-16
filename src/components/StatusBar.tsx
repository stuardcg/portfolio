import { useClock } from "../hooks/useClock";
import styles from "./StatusBar.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function fmtTime(d: Date, utcOffset: number, timezone: string) {
  const shifted = new Date(d.getTime() + utcOffset * 60 * 60 * 1000);
  return `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}:${pad(shifted.getUTCSeconds())} ${timezone}`;
}

interface Props {
  node: string;
  status: string;
  coords: string;
  timezone: string;
  utcOffset: number;
}

export default function StatusBar({ node, status, coords, timezone, utcOffset }: Props) {
  const now = useClock();
  return (
    <div className={styles.bar}>
      <div className={styles.cell}>
        <span className={styles.dot}></span> {node}
      </div>
      <div className={styles.cell}>SESS / {status}</div>
      <div className={styles.cell}>{coords}</div>
      <div className={`${styles.cell} ${styles.tail}`}>{fmtTime(now, utcOffset, timezone)}</div>
    </div>
  );
}
