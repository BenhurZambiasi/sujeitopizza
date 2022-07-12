import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import styles from "./styles.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  textError?: string;
  showOrHidePassword?: boolean;
}

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textError?: string;
}

export function Input({ textError, showOrHidePassword, ...rest }: IInputProps) {
  const [show, setShow] = useState<boolean>(false);
  const showPassword = () => {
    setShow(!show);
  };
  const IconEYe = !show ? AiOutlineEyeInvisible : AiOutlineEye;

  return (
    <div className={styles.containerInput}>
      {showOrHidePassword ? (
        <div className={styles.inputPassword}>
          <input {...rest} type={show ? "text" : "password"} />
          <IconEYe onClick={showPassword} />
        </div>
      ) : (
        <input className={styles.input} {...rest} />
      )}

      <span className={styles.textError}>{textError}</span>
    </div>
  );
}

export function TextArea({ textError, ...rest }: ITextAreaProps) {
  return (
    <div className={styles.containerTextArea}>
      <textarea className={styles.input} {...rest}></textarea>
      <span className={styles.textError}>{textError}</span>
    </div>
  );
}
