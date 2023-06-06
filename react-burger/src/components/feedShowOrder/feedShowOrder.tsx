import styles from "./feed-show-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function FeedShowOrder(): JSX.Element {
  return (
    <>
      <h1 className="mt-10 mb-10 text text_type_digits-default">#3303030</h1>
      <p className="mb-3 text text_type_main-medium">My Burger</p>
      <p className="mb-15 text text_type_main-small">
        <span>Выполнен</span>
      </p>
      <h2 className="mb-6 text text_type_main-medium">Состав:</h2>
      <div className={`mb-10 ${styles.ingredients_box}`}>
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </div>
      <div className={`${styles.footer}`}>
        <p className="text text_type_main-small text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={`${styles.flex_wrapper}`}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
}

function Ingredient(): JSX.Element {
  return (
    <div className={`mr-6 ${styles.ingredient}`}>
      <div className={`${styles.flex_wrapper}`}>
        <div className={`${styles.img_wrapper}`}>
          <img
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            alt="test"
            className={`${styles.ingredients_img}`}
          />
        </div>
        <p className="text text_type_main-small">
          Соус традиционный галактический
        </p>
      </div>
      <div className={`${styles.flex_wrapper}`}>
        <p className="text text_type_digits-default">1 x 30</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export { FeedShowOrder };