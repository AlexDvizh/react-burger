import styles from "./pages.module.css";

import { FeedOrders } from "../components/feed-orders/feed-orders";
import { FeedStatus } from "../components/feed-status/feed-status";

function FeedPage(): JSX.Element {
  return (
    <main className={`${styles.mainConstructor}`}>
      <FeedOrders />
      <FeedStatus />
    </main>
  );
}

export { FeedPage };