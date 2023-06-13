import { useAppSelector } from "../../services/hooks";
import { FeedOrder } from "../feedOrder/feedOrder";
import styles from "./profileOrders.module.css";

export function ProfileOrders(): JSX.Element {
  const { orders } = useAppSelector((store) => store.wsProfile);

  return (
    <section className={`${styles.profile_orders_section}`}>
       <div className={`${styles.scrollable_box}`}>
        {orders.map((el, index) => (
          <FeedOrder order={el} key={index} />
        ))}
      </div>
    </section>
  );
}