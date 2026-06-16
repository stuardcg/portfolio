import { useTyping } from "../hooks/useTyping";
import styles from "./TypedRole.module.css";

interface Props {
  roles: string[];
}

export default function TypedRole({ roles }: Props) {
  const typed = useTyping(roles, { speed: 55, hold: 1600, eraseSpeed: 25 });

  return (
    <div className={styles.role}>
      <span className={styles.prompt}>$&nbsp;</span>
      <span className={styles.text}>{typed}</span>
      <span className="cursor" aria-hidden="true"></span>
    </div>
  );
}
