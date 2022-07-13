import { NextPage } from "next";
import { Header } from "../../components/head";
import { MasterHeader } from "../../components/masterHeader";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiRefreshCcw } from "react-icons/fi";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/order";
import { useAuth } from "../../contexts/AuthContext";

interface IOrder {
  id: string;
  name: string | null;
  status: boolean;
  draft: boolean;
  table: number;
}

const Dashboard: NextPage = () => {
  const { loading, setLoading } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);

  const refreshOrders = async () => {
    setLoading(true);
    getOrders()
      .then((resp) => {
        setOrders(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshOrders();
  }, []);
  return (
    <div>
      <Header title="Painel - Sujeito Pizzaria" />
      <MasterHeader />
      <div>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ultimos pedidos</h1>
            <button onClick={refreshOrders}>
              <FiRefreshCcw
                color="#3fffa3"
                size={25}
                className={loading ? styles.spinner : ""}
              />
            </button>
          </div>
          <article className={styles.listOrder}>
            {orders &&
              orders.map((order) => {
                return (
                  <section key={order.id} className={styles.orderItem}>
                    <button>
                      <div className={styles.tag} />
                      <span>{order.name || `Mesa ${order.table}`}</span>
                    </button>
                  </section>
                );
              })}
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
