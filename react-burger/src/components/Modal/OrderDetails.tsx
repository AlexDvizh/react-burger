import {} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css";
//@ts-ignore
import done from "../../images/done.svg";
import { RootState } from '../../services/reducers';
import { useAppSelector } from '../../services/hooks';

function OrderDetails(): JSX.Element {
    const { orderId, status } = useAppSelector((state: RootState) => state.order)
    
    return (
        <div className={styles.contentWrap}>
            {status === "loading" ? (
                <p className={`text text_type_main-medium ${styles.order_id}`}>
                Подождите, скоро появится номер заказа
                </p>
            ) : (
                <p className={`text text_type_digits-large ${styles.order_id}`}>
                {orderId}
                </p>
            )}
            <p  className={`text text_type_main-medium mt-8 ${styles.orderText}`}>
                Идентификатор заказа
            </p>
            <img className={`mt-15 mb-15 ${styles.iconChecked}`} src={done} alt="Изображение завершенного статуса"/>
            <p className="mb-2 text text_type_main-default">
                Ваш заказ начали готовить
            </p>
            <p className="mb-30 text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

export default OrderDetails;