import { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import './BurgerIngredient.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails';

const BurgerIngredient = (props) => {
    const ingredientType = "ingredientType";
    const [openPopup, setOpenPopup] = useState(false);



    function handlePopupClose() {
        setOpenPopup(false);
    }

    function handlePopupOpen() {
        setOpenPopup(true);
    }
    
    return (
        <section className='burger-ingredient scrollableBox mt-10'>
            <div className='burger-item mr-10' onClick={handlePopupOpen}>
                <Counter count={1} size="default"  />
                <img src={props.ingredient.image} alt="Изображение булки бургера"/>
                <div className='burger-price'>
                    <p className='text text_type_digits-default mr-2'>{props.ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='text text_type_main-default'>{props.ingredient.name}</p>
            </div>
            {
            openPopup ?
                
                    <Modal  
                        closePopup={handlePopupClose}
                        popupType={ingredientType}
                        ingredient={props.ingredient}
                    >
                        <IngredientDetails ingredient={props.ingredient}/>
                    </Modal>
                
            :
                null
            }
        </section>
    )
}

export default BurgerIngredient;