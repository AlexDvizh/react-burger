import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo, useState } from 'react';
import {
    INGREDIENTS_COUNTER_INCREASE, CHANGE_BUN,
} from "../../services/actions/ingredients";
import { ADD_FILLING, ADD_BUN } from "../../services/actions/constructorIngredients";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/prop-types";
import styles from "./burgerConstructor.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import DragAndDropContainer from './DragAndDropContainer';
import BurgerConstructorOrder from './BurgerOrder';

const BurgerConstructor = (props) => {
    const { ingredients } = useSelector(state => state.burgerConstructor);

    const dispatch = useDispatch();

    const emptyBun = useMemo(() => {
        if(!ingredients.bun.name) {
            return true;
        }
        return false;
    }, [ingredients])

    const [, dropTarget] = useDrop({
        accept: ['bun', 'main', 'sauce'],
        drop(data) {
            if(data.ingredient.type === 'bun') {
                dispatch({
                    type: CHANGE_BUN,
                    id: data.ingredient._id
                })
                dispatch({
                    type: ADD_BUN,
                    ingredient: data.ingredient,
                  });
                dispatch({
                    type: INGREDIENTS_COUNTER_INCREASE,
                    id: data.ingredient._id,
                });
            } else {
                dispatch({
                  type: ADD_FILLING,
                  ingredient: data.ingredient,
                });
                dispatch({
                  type: INGREDIENTS_COUNTER_INCREASE,
                  id: data.ingredient._id,
                });
            }
        }
    })
  
    return (
        <section className={styles.constructor}>
            <div className={styles.constructorWrap} ref={dropTarget}>
                { emptyBun 
                    ?
                    <div className={`${styles.emptyConstructorItem} ${styles.bunTop}`}>
                        Выберите булку
                    </div>
                    :
                    <div className={`${styles.itemWrap} ${styles.constructorItemBun}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${ingredients.bun.name} (верх)`}
                            price={ingredients.bun.price}
                            thumbnail={ingredients.bun.image}
                            
                        />
                    </div>
                }
                
                <DragAndDropContainer />
                
                { emptyBun 
                    ?
                    <div className={`${styles.emptyConstructorItem} ${styles.bunBottom}`}>
                        Выберите булку
                    </div>
                    :
                    <div className={`${styles.itemWrap} ${styles.constructorItemBun}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${ingredients.bun.name} (низ)`}
                            price={ingredients.bun.price}
                            thumbnail={ingredients.bun.image}
                            
                        />
                    </div>
                }
            </div> 
            <BurgerConstructorOrder emptyBun={emptyBun}/>
        </section>
    )
}

// BurgerConstructor.propTypes = {
//     burgersInfo: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
// };

export default BurgerConstructor;