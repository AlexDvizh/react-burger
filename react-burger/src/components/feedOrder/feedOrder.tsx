import { Link, useLocation } from "react-router-dom";
import styles from "./feedOrder.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IWSOrder, OrderStatusEn, OrderStatusRu } from "../../services/types/web-socket";
import { useAppSelector } from "../../services/hooks";
import { countTotalById, getImgUrlList } from "../../utils/utils";

function FeedOrder({ order }: { order: IWSOrder }): JSX.Element {
  
  const { ingredients } = useAppSelector((store) => store.ingredients);
  const { imgList, notDisplayedImgsQty } = getImgUrlList(
    order.ingredients,
    ingredients
  );
  const total = countTotalById(order.ingredients, ingredients);
  const location = useLocation();
  const status =
    order && order.status === OrderStatusEn.DONE ? (
      <p className={`mt-2 text text_type_main-small ${styles.status_colored}`}>
        {OrderStatusRu.DONE}
      </p>
    ) : order && order.status === OrderStatusEn.CREATED ? (
      <p className="mt-2 text text_type_main-small">{OrderStatusRu.CREATED}</p>
    ) : (
      <p className="mt-2 text text_type_main-small">{OrderStatusRu.PENDING}</p>
    );
      
  return (
    <div className={`mb-6 mr-2 ${styles.feed_order_card}`}>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`${location.pathname}/${order._id}`}
        state={{ background: location }}
      >
        <div className="mr-6 ml-6 card_content">
          <div className={`pt-6 ${styles.card_header}`}>
            <p className="order_id text text_type_digits-default">
              #{order.number}
            </p>
            <p className="order_date text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
          </div>
          <p className="text text_type_main-medium pt-6">{order.name}</p>
          {status && status}
          <div className={`${styles.card_footer}`}>
            <div className={`pt-6 pb-6 mr-6 ${styles.ingredients_img_box}`}>
              {imgList.map((img, index) => (
                <div
                  className={`${styles.img_wrapper}`}
                  style={{ zIndex: 100 - index }}
                  key={index}
                >
                  <img
                    src={img}
                    alt="test"
                    className={`${styles.ingredients_img}`}
                  />
                  {index + 1 === imgList.length && notDisplayedImgsQty > 0 && (
                    <div
                      className={`${styles.img_wrapper_empty}`}
                      style={{ zIndex: 100 }}
                    >
                      +{notDisplayedImgsQty}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={`${styles.total_box}`}>
              <p className="order_total text text_type_digits-default">
                {total}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export { FeedOrder };