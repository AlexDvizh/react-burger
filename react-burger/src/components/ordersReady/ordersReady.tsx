import styles from "./orders-ready.module.css";

function OrdersReady(): JSX.Element {
  return (
    <div className={`mr-9 ${styles.status} ${styles.ready}`}>
      <p className="mb-6 text text_type_main-medium">Готовы:</p>
      <div className={`${styles.ordersId}`}>
        <p className="mb-2 text text_type_digits-default">034533</p>
        <p className="mb-2 text text_type_digits-default">034533</p>
        <p className="mb-2 text text_type_digits-default">034533</p>
        <p className="mb-2 text text_type_digits-default">034533</p>
        <p className="mb-2 text text_type_digits-default">034533</p>
        <p className="mb-2 text text_type_digits-default">034533</p>
      </div>
    </div>
  );
}

export { OrdersReady };