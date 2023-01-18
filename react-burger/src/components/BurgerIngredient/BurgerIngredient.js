import { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { ingredientPropTypes } from "../../utils/prop-types";
import styles from "./burgerIngredient.module.css";
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails';

const BurgerIngredient = (props) => {
    const ingredientModalTitle = "Детали ингредиента";
    const [openPopup, setOpenPopup] = useState(false);

    function handlePopupClose() {
        setOpenPopup(false);
    }

    function handlePopupOpen() {
        setOpenPopup(true);
    }
    
    return (
        <>
            <div className={`${styles.burgerItem} mr-10`} onClick={handlePopupOpen}>
                <Counter count={1} size="default"  />
                <img className="ml-4 mr-4" src={props.ingredient.image} alt="Изображение булки бургера"/>
                <div className={styles.burgerPrice}>
                    <p className='text text_type_digits-default mr-2'>{props.ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='text text_type_main-default'>{props.ingredient.name}</p>
            </div>
            {
            openPopup ?
                    <Modal  
                        closePopup={handlePopupClose}
                        title={ingredientModalTitle}
                    >
                        <IngredientDetails ingredient={props.ingredient}/>
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