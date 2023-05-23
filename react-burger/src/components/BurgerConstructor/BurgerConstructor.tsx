import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react';
import {
    INGREDIENTS_COUNTER_INCREASE, CHANGE_BUN,
} from "../../services/actions/ingredients";
import { ADD_FILLING, ADD_BUN } from "../../services/actions/constructorIngredients";
import styles from "./burgerConstructor.module.css";
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import DragAndDropContainer from './DragAndDropContainer';
import BurgerConstructorOrder from './BurgerOrder';
import { useAppSelector } from '../../services/types';
import { RootState } from '../../services/reducers';
import { TIngredient } from '../../utils/types/ingredients-types';

function BurgerConstructor(): JSX.Element {
    const { ingredients } = useAppSelector((state: RootState) => state.burgerConstructor);

    const dispatch = useDispatch();

    const emptyBun = useMemo(() => {
        if(!ingredients.bun.name) {
            return true;
        }
        return false;
    }, [ingredients])

    const [, dropTarget] = useDrop<any>({
        accept: ['bun', 'main', 'sauce'],
        drop({ingredient}: {ingredient: TIngredient}) {
            if(ingredient.type === 'bun') {
                dispatch({
                    type: CHANGE_BUN,
                    id: ingredient._id
                })
                dispatch({
                    type: ADD_BUN,
                    ingredient: ingredient,
                  });
                dispatch({
                    type: INGREDIENTS_COUNTER_INCREASE,
                    id: ingredient._id,
                });
            } else {
                dispatch({
                  type: ADD_FILLING,
                  ingredient: ingredient,
                });
                dispatch({
                  type: INGREDIENTS_COUNTER_INCREASE,
                  id: ingredient._id,
                });
            }
        }
    })
  
    return (
        // @ts-ignore
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

export default BurgerConstructor;