import Modal from "react-modal";

import { FiX } from "react-icons/fi";
import { IOrder, TOrderItemProps } from "../../pages/dashboard";
import styles from "./styles.module.scss";

interface IModalOrderProps {
  isOpen: boolean;
  onClose: () => void;
  handleFinishOrder: (id: string) => void;
  order: IOrder;
  itensOrder: TOrderItemProps[];
}

const customStyles = {
  content: {
    top: "50%",
    bottom: "auto",
    left: "50%",
    right: "auto",
    padding: "30px",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#1d1d2e",
  },
};

export const ModalOrder = ({
  order,
  itensOrder,
  isOpen,
  onClose,
  handleFinishOrder,
}: IModalOrderProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button
        onClick={onClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}>
        <FiX color="var(--red-900)" size={45} />
      </button>

      <div className={styles.modalContainer}>
        <h2>Detalhe do pedido</h2>
        <span className={styles.table}>
          {order.name || <strong>Mesa {order.table}</strong>}
        </span>

        {itensOrder &&
          itensOrder.map((item) => (
            <section key={item.id} className={styles.containerItem}>
              <span>
                {item.amount} - <strong>{item.product.name}</strong>
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

        <button
          className={styles.btnFinish}
          onClick={() => handleFinishOrder(order.id)}>
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
};
