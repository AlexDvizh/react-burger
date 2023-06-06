import styles from "./orders-in-progress.module.css";

function OrdersInProgress(): JSX.Element {
  return (
    <div className={`${styles.status} ${styles.inProgress}`}>
      <p className="mb-6 text text_type_main-medium">В работе:</p>
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

export { OrdersInProgress };