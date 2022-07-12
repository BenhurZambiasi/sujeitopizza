import { SelectHTMLAttributes, useState } from "react";

import styles from "./styles.module.scss";

interface IInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  textError?: string;
}

export function Select({ textError, ...rest }: IInputProps) {
  return (
    <div className={styles.containerInput}>
      <select className={styles.input} {...rest}></select>

      <span className={styles.textError}>{textError}</span>
    </div>
  );
}
