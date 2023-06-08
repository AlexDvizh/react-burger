import styles from "./pages.module.css";

import { FeedOrders } from "../components/feedOrders/feedOrders";
import { FeedStatus } from "../components/feedStatus/feedStatus";
import { useAppSelector } from "../services/hooks";

function FeedPage(): JSX.Element {
  const { ordersFeedLoaded } = useAppSelector((store) => store.wsFeed);

  return (
    <>
      {ordersFeedLoaded && (
        <main className={`${styles.mainConstructor}`}>
          <FeedOrders />
          <FeedStatus />
        </main>
      )}
    </>
  );
}

export { FeedPage };