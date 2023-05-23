import {} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css";
//@ts-ignore
import done from "../../images/done.svg";
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

function OrderDetails(): JSX.Element {
    const { orderId } = useSelector((state: RootState) => state.order)
    
    return (
        <div className={styles.contentWrap}>
            <p className={`text text_type_digits-large ${styles.orderId}`}>
                {orderId}
            </p>
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