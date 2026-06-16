import { useEffect, useState } from 'react';

type TypingOpts = { speed?: number; hold?: number; eraseSpeed?: number };

export function useTyping(
  strings: string[],
  { speed = 60, hold = 1800, eraseSpeed = 30 }: TypingOpts = {}
) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>('type');

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const current = strings[idx % strings.length];
    if (phase === 'type') {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase('hold'), hold);
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('erase'), hold);
    } else if (phase === 'erase') {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), eraseSpeed);
      } else {
        setIdx((i) => i + 1);
        setPhase('type');
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx, strings, speed, hold, eraseSpeed]);

  return text;
}
