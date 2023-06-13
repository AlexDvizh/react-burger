import styles from "./ordersInProgress.module.css";
import { IWSOrder } from "../../services/types/web-socket";

function OrdersInProgress({ pending }: { pending: Array<IWSOrder> }): JSX.Element {

  return (
    <div className={`${styles.status} ${styles.inProgress}`}>
      <p className="mb-6 text text_type_main-medium">В работе:</p>
      <div className={`${styles.ordersId}`}>
        {pending.map((el, index) => (
          <p className="mb-2 text text_type_digits-default" key={index}>
            {el.number}
          </p>
        ))}
      </div>
    </div>
  );
}

export { OrdersInProgress };