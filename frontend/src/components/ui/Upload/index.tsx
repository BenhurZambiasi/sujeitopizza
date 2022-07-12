import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { FiPlus } from "react-icons/fi";

interface IUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  fileUrl: string;
  textError?: string;
}

export const Upload = ({ textError, fileUrl, ...rest }: IUploadProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.uploadContainer}>
        {!fileUrl && (
          <span>
            <FiPlus color="#fff" size={25} />
          </span>
        )}

        <input {...rest} />
        {fileUrl && (
          <img
            className={styles.preview}
            src={fileUrl}
            alt="Foto do produto"
            width={250}
            height={250}
          />
        )}
      </label>
      <span className={styles.textError}>{textError}</span>
    </div>
  );
};
