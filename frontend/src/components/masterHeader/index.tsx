import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
export const MasterHeader = () => {
  const { signOut } = useAuth();
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src="/logo.svg" alt="logo" width={190} height={60} />
        </Link>

        <nav>
          <Link href="/category">
            <a>Categoria</a>
          </Link>
          <Link href="/product">
            <a>Cardápio</a>
          </Link>
          <button onClick={signOut}>
            <FiLogOut color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};
