import styles from "./feedOrders.module.css";
import { FeedOrder } from "../feedOrder/feedOrder";
import { useAppSelector } from "../../services/hooks";
import { useMemo } from "react";


function FeedOrders(): JSX.Element {
  const { orders } = useAppSelector((store) => store.wsFeed);
  const checkedOrders = useMemo(
    () =>
      orders.filter((el) =>
        el.ingredients.every((id) => typeof id === "string")
      ),
    [orders]
  );

  return (
    <section className={`mt-10 ${styles.feed_orders_section}`}>
      <h1 className="text text_type_main-large mb-6">Лента заказов</h1>
      <div className={`${styles.scrollable_box}`}>
        {checkedOrders.map((el, index) => (
          <FeedOrder order={el} key={index} />
        ))} 
      </div>
    </section>
  );
}

export { FeedOrders };