import styles from "./orders-ready.module.css";
import { IWSOrder } from "../../services/types/web-socket";

function OrdersReady({ done }: { done: Array<IWSOrder> }): JSX.Element {

  return (
    <div className={`mr-9 ${styles.status} ${styles.ready}`}>
      <p className="mb-6 text text_type_main-medium">Готовы:</p>
      <div className={`${styles.ordersId}`}>
        {done.map((el, index) => (
          <p className="mb-2 text text_type_digits-default" key={index}>
            {el.number}
          </p>
        ))}
      </div>
    </div>
  );
}

export { OrdersReady };