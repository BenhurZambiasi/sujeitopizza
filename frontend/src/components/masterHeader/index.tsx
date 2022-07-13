import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

export const MasterHeader = () => {
  const { signOut } = useAuth();
  const [active, setActive] = useState<string | null>("");

  const handleActive = (section: string) => {
    sessionStorage.setItem("active", section);
    setActive(section);
  };

  const handleClickLogo = () => {
    sessionStorage.removeItem("active");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActive(sessionStorage.getItem("active"));
    }
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            src="/logo.svg"
            alt="logo"
            width={190}
            height={60}
            onClick={handleClickLogo}
          />
        </Link>

        <nav>
          <Link href="/category">
            <a
              className={active === "category" ? styles.active : ""}
              onClick={() => handleActive("category")}>
              Categoria
            </a>
          </Link>
          <Link href="/product">
            <a
              className={active === "product" ? styles.active : ""}
              onClick={() => handleActive("product")}>
              Cardápio
            </a>
          </Link>
          <button onClick={signOut}>
            <FiLogOut color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};
