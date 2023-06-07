import styles from "./feed-status.module.css";
import { OrdersStatus } from "../ordersStatus/ordersStatus";
import { OrdersFinishedAllTime } from "../ordersFinishedAllTime/ordersFinishedAllTime";
import { OrdersFinishedToday } from "../ordersFinishedToday/ordersFinishedToday";

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