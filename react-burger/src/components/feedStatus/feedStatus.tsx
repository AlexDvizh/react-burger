import styles from "./feed-status.module.css";
import { OrdersStatus } from "../orders-status/orders-status";
import { OrdersFinishedAllTime } from "../orders-finished-all-time/orders-finished-all-time";
import { OrdersFinishedToday } from "../orders-finished-today/orders-finished-today";

function FeedStatus(): JSX.Element {
  return (
    <section className={`${styles.feed_status_section}`}>
      <OrdersStatus />
      <OrdersFinishedAllTime />
      <OrdersFinishedToday />
    </section>
  );
}

export { FeedStatus };