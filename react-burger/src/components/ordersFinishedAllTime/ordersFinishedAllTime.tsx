import styles from "./orders-finished-all-time.module.css";

function OrdersFinishedAllTime(): JSX.Element {
  return (
    <section className={`mt-15 mb-15`}>
      <h1 className="text text_type_main-medium">Выполнено за все время:</h1>
      <p className={`text text_type_digits-large ${styles.total}`}>28752</p>
    </section>
  );
}

export { OrdersFinishedAllTime };