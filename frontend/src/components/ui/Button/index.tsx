import { ReactNode, ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

import styles from "./styles.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  textError?: string;
}

export function Button({
  children,
  loading,
  textError,
  ...rest
}: IButtonProps) {
  return (
    <div className={styles.containerButton}>
      <button className={styles.button} {...rest} disabled={loading}>
        {loading ? (
          <FaSpinner color="#fff" size={16} />
        ) : (
          <a className={styles.buttonText}>{children}</a>
        )}
      </button>
      <span className={styles.textError}>{textError}</span>
    </div>
  );
}
