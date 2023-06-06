import styles from "./orders-finished-today.module.css";

function OrdersFinishedToday(): JSX.Element {
  return (
    <section className={`mt-15 mb-15`}>
      <h1 className="text text_type_main-medium">Выполнено за сегодня:</h1>
      <p className={`text text_type_digits-large ${styles.total}`}>138</p>
    </section>
  );
}

export { OrdersFinishedToday };