import { NextPage } from "next";
import { Header } from "../../components/head";
import { MasterHeader } from "../../components/masterHeader";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiRefreshCcw } from "react-icons/fi";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { finishOrder, getOrderItenById, getOrders } from "../../services/order";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "react-modal";
import { ModalOrder } from "../../components/ModalOrder";
import { AppAlert } from "../../components/appAlert";

export interface IOrder {
  id: string;
  name: string | null;
  status: boolean;
  draft: boolean;
  table: number;
}

export type TOrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    banner: string;
    description: string;
  };
  order: IOrder;
};

const initialStateOrderItem = {
  id: "",
  name: "",
  status: false,
  draft: false,
  table: 0,
};

const Dashboard: NextPage = () => {
  const { loading, setLoading } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder>(initialStateOrderItem);
  const [modalItem, setModalItem] = useState<TOrderItemProps[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const handleModal = async (id: string, order: IOrder) => {
    await getOrderItenById(id)
      .then((resp) => {
        setModalItem(resp.data);
        setShowModal(true);
        setOrder(order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFinishOrder = async (order_id: string) => {
    await finishOrder(order_id)
      .then((resp) => {
        refreshOrders();
        setShowModal(false);
      })
      .catch((err) => AppAlert({ type: "error", message: "Error" }));
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  Modal.setAppElement("#__next");

  return (
    <div id="containerDashboad">
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
                    <button onClick={() => handleModal(order.id, order)}>
                      <div className={styles.tag} />
                      <span>{order.name || `Mesa ${order.table}`}</span>
                    </button>
                  </section>
                );
              })}
          </article>
        </main>

        <ModalOrder
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          order={order}
          itensOrder={modalItem}
          handleFinishOrder={handleFinishOrder}
        />
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
