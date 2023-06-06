import styles from "./feed-orders.module.css";
import { FeedOrder } from "../feedOrder/feedOrder";

export interface ITestData {
  name: string;
  orderId: string;
  imgs: Array<string>;
  timestamp: string;
  price: number;
}
const testData: ITestData[] = [
  {
    name: "My Burger",
    orderId: "#3303030",
    imgs: [
      "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    ],
    timestamp: "Сегодня, 16:20",
    price: 2333,
  },
  {
    name: "My Burger",
    orderId: "#3303030",
    imgs: [
      "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    ],
    timestamp: "Сегодня, 17:30",
    price: 1606,
  },
  {
    name: "My Burger",
    orderId: "#3303030",
    imgs: [
      "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    ],
    timestamp: "Сегодня, 18:59",
    price: 1613,
  },
];


function FeedOrders(): JSX.Element {
  return (
    <section className={`mt-10 ${styles.feed_orders_section}`}>
      <h1 className="text text_type_main-large mb-6">Лента заказов</h1>
      <div className={`${styles.scrollable_box}`}>
        {testData.map((el, index) => (
          <FeedOrder order={el} key={index} />
        ))}
      </div>
    </section>
  );
}

export { FeedOrders };