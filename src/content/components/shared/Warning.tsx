import { ReactNode } from 'react';
import styles from './Warning.module.scss';

interface WarningProps {
  children?: ReactNode
}

export default function Warning({ children }: WarningProps) {
  return (
    <span className={styles['warning']}>
      <strong className={styles['warning-label']}>Warning:</strong>
      {children}
    </span>
  );
}