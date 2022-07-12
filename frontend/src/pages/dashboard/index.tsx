import { NextPage } from "next";
import { Header } from "../../components/head";
import { MasterHeader } from "../../components/masterHeader";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiRefreshCcw } from "react-icons/fi";
import styles from "./styles.module.scss";

const Dashboard: NextPage = () => {
  return (
    <div>
      <Header title="Painel - Sujeito Pizzaria" />
      <MasterHeader />
      <div>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ultimos pedidos</h1>
            <button>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>
          <article className={styles.listOrder}>
            <section className={styles.orderItem}>
              <button>
                <div className={styles.tag} />
                <span>Mesa 30</span>
              </button>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
