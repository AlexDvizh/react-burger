import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import styles from "./burgerConstructor.module.css";

import {
    DELETE_FILLING,
    MOVE_FILLING,
} from "../../services/actions/constructorIngredients";
import { INGREDIENTS_COUNTER_DECREASE } from "../../services/actions/ingredients";
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails';

const BurgerConstructorOrder = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const { ingredients } = useSelector((store) => store.constructorBurger);
    const memoizedTotal = useMemo(() => countTotal(ingredients), [ingredients]);
    const dispatch = useDispatch();

    // Сюда сохраняем старый список айди ингредиентов, чтобы сравнивать при нажатии на кнопку "Оформить заказ"
    // Если список не изменился, то новый запрос не делается
    const prevIngredientsId = useRef(null);

    // Получаем id всех ингредиентов, находящихся в конструкторе
    const ingredientsId = useMemo(
        () => getIngredientsId(ingredients.bun, ingredients.fillings),
        [ingredients.bun, ingredients.fillings]
    );

    const makeOrder = () => {
        if (!isEmptyBun && prevIngredientsId.current !== ingredientsId) {
        // Если есть булка и список ингредиентов обновился,
        // то делаем запрос к api, получаем orderId и записываем его в глобальное состояние store.order.orderId
        dispatch(setOrderId(ingredientsId));
        }
        prevIngredientsId.current = ingredientsId;
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    const handlePopupOpen = () => {
        setPopupOpen(true);
    };

    return (
        <>
          <div className={styles.info}>
                <p className="text text_type_digits-medium mr-2">100500</p>
                <div className={styles.image}>
                    <CurrencyIcon type="primary"/>
                </div>
                <div onClick={handlePopupOpen}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {popupOpen &&
                <Modal
                    closePopup={handlePopupClose}
                >
                    <OrderDetails />
                </Modal>
            }
        </>
    )
}

export default BurgerConstructorOrder;