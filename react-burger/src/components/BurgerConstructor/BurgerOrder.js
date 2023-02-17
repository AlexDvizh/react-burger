import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./burgerConstructor.module.css";

import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails';
import { countResult } from '../../utils/utils';
import { setOrderId } from '../../services/actions/orderNumber';

const BurgerConstructorOrder = (props) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const { ingredients } = useSelector(state => state.burgerConstructor);
    
    const dispatch = useDispatch();
    const orderResult = useMemo(() => {
        return countResult(ingredients)
    }, [ingredients]);
    
    const prevIngredientsId = useRef(null);

    const getIngredientsId = (bun, fillings) => {
        const ingredientsId = [];
        ingredientsId.push(bun._id);
        fillings.forEach((el) => {
          ingredientsId.push(el._id);
        });
        return ingredientsId;
    }

    const ingredientsId = useMemo(() => {
    return getIngredientsId(ingredients.bun, ingredients.fillings)
    }, [ingredients.bun, ingredients.fillings]);

    const makeOrder = () => {
        if (!props.emptyBun && prevIngredientsId.current !== ingredientsId) {
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
                <p className="text text_type_digits-medium mr-2">
                    {orderResult}
                </p>
                <div className={styles.image}>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="large"
                    disabled={props.emptyBun ? true : false}
                    onClick={() => {
                        makeOrder();
                        handlePopupOpen();
                    }}
                >
                    Оформить заказ
                </Button>
            </div>
            {popupOpen && (
                <Modal
                    handleModalClose={handlePopupClose}
                >
                    <OrderDetails />
                </Modal>
            )}
        </>
    )
}

export default BurgerConstructorOrder;