import { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { ingredientPropTypes } from "../../utils/prop-types";
import styles from "./burgerIngredient.module.css";
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { FILL_MODAL, CLEAR_MODAL } from '../../services/actions/currentIngredient';
import { INGREDIENT_MODAL_TITLE } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const BurgerIngredient = ({ingredient}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    const item = useSelector((state) => {
      return  state.ingredients.ingredients.filter((item) => item._id === ingredient._id)
    });
    const dispatch = useDispatch();

    // const handlerIngredientClick = () => {
    //     navigate(`/ingredients/${ingredient._id}`, {state: {background: location}})
    // }
    
    const [, dragRef] = useDrag({
      type: ingredient.type,
      item: { ingredient },
    });
    
    function handlePopupClose() {
        setOpenPopup(false);
        dispatch({ type: CLEAR_MODAL });
    }

    function handlePopupOpen() {
        setOpenPopup(true);
        dispatch({ type: FILL_MODAL, ingredient });
    }
    
    return (
        <>
            <div className={`${styles.burgerItem} mr-10`} onClick={handlePopupOpen} ref={dragRef}>
                {item[0].count > 0 && (
                    <Counter count={item[0].count} size="default" extraClass="m-1" />
                )}
                <img className="ml-4 mr-4" src={ingredient.image} alt="Изображение булки бургера" />
                <div className={styles.burgerPrice}>
                    <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='text text_type_main-default'>{ingredient.name}</p>
            </div>
            {
            openPopup 
                ?
                    <Modal  
                        closePopup={handlePopupClose}
                        title={INGREDIENT_MODAL_TITLE}
                    >
                        <IngredientDetails ingredient={ingredient}/>
                    </Modal>
                :
                    null
            }
        </>
    )
}

BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
};

export default BurgerIngredient;