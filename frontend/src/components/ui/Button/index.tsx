import { ReactNode, ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

import styles from "./styles.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  textError?: string;
  classNameButton?: string;
  colorSpiner?: string;
}

export function Button({
  children,
  loading,
  textError,
  classNameButton,
  colorSpiner,
  ...rest
}: IButtonProps) {
  return (
    <div className={`${styles.containerButton} ${classNameButton}`}>
      <button className={`${styles.button}`} {...rest} disabled={loading}>
        {loading ? (
          <FaSpinner color={colorSpiner || "#fff"} size={16} />
        ) : (
          <a className={styles.buttonText}>{children}</a>
        )}
      </button>
      <span className={styles.textError}>{textError}</span>
    </div>
  );
}
