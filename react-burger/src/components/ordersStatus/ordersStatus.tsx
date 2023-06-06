import styles from "./orders-status.module.css";
import { OrdersReady } from "../orders-ready/orders-ready";
import { OrdersInProgress } from "../orders-in-progress/orders-in-progress";

function OrdersStatus(): JSX.Element {
  return (
    <section className={`${styles.order_status_section}`}>
      <OrdersReady />
      <OrdersInProgress />
    </section>
  );
}

export { OrdersStatus };