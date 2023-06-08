import styles from "./feedStatus.module.css";
import { OrdersStatus } from "../ordersStatus/ordersStatus";
import { OrdersFinishedAllTime } from "../ordersFinishedAllTime/ordersFinishedAllTime";
import { OrdersFinishedToday } from "../ordersFinishedToday/ordersFinishedToday";

function FeedStatus(): JSX.Element {
  return (
    <div className={`${styles.feed_status_section}`}>
      <OrdersStatus />
      <OrdersFinishedAllTime />
      <OrdersFinishedToday />
    </div>
  );
}

export { FeedStatus };