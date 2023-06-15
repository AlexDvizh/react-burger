import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState, useMemo } from "react";
import styles from "./burgerConstructor.module.css";

import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails';
import { setOrderId } from '../../services/slices/order';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { RootState } from '../../services/slices';
import { TIngredient, TIngredientWithUniqueId } from '../../utils/types/ingredients-types';
import { countResult } from '../../utils/utils';

function BurgerConstructorOrder({emptyBun}: {emptyBun: boolean}): JSX.Element {
    
    const [popupOpen, setPopupOpen] = useState(false);
    const { ingredients } = useAppSelector((state: RootState) => state.constructorBurger);
    const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    
    const dispatch = useAppDispatch();
    const orderResult = useMemo(() => {
        return countResult(ingredients)
    }, [ingredients]);
    
    const prevIngredientsId = useRef<string[] | null>(null);

    const getIngredientsId = (bun: TIngredient, fillings: TIngredientWithUniqueId[]) => {
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
        if (!emptyBun && prevIngredientsId.current !== ingredientsId && isLoggedIn) {
        dispatch(setOrderId(ingredientsId));
        } else if (!isLoggedIn) {
            navigate("/login", { state: { from: location } });
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
            <div className={styles.info} data-test="confirm-container">
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
                    disabled={emptyBun}
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
                    showId={false}
                    isProfileOrder={false}
                >
                    <OrderDetails />
                </Modal>
            )}
        </>
    )
}

export default BurgerConstructorOrder;