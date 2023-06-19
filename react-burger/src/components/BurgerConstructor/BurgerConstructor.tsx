import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react';
import styles from "./burgerConstructor.module.css";
import { useDrop } from 'react-dnd';
import DragAndDropContainer from './DragAndDropContainer';
import BurgerConstructorOrder from './BurgerOrder';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { RootState } from '../../services/slices';
import { TIngredient } from '../../utils/types/ingredients-types';
import { changeBun, counterIncrease } from '../../services/slices/ingredients';
import { addBun, addFilling } from '../../services/slices/constructor';
import { uuid } from 'uuidv4';


function BurgerConstructor(): JSX.Element {
    const { ingredients } = useAppSelector((state: RootState) => state.constructorBurger);

    const dispatch = useAppDispatch();

    const emptyBun = useMemo(() => {
        if(!ingredients.bun.name) {
            return true;
        }
        return false;
    }, [ingredients])
   
    const [, dropTarget] = useDrop({
        accept: ["bun", "main", "sauce"],
        drop({ ingredient }: { ingredient: TIngredient }) {
          if (ingredient.type === "bun") {
            dispatch(changeBun());
            dispatch(addBun(ingredient));
            dispatch(counterIncrease(ingredient._id));
          } else {
            dispatch(addFilling({ ingredient, uuid: uuid() }));
            dispatch(counterIncrease(ingredient._id));
          }
        },
      });
  
    return (
        // @ts-ignore
        <section className={styles.constructor}>
            <div className={styles.constructorWrap} ref={dropTarget} data-test="drop-area">
                { emptyBun 
                    ?
                    <div className={`${styles.emptyConstructorItem} ${styles.bunTop}`}>
                        Выберите булку
                    </div>
                    :
                    <div className={`${styles.itemWrap} ${styles.constructorItemBun}`} data-test="top-bun">
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
                    <div className={`${styles.itemWrap} ${styles.constructorItemBun}`} data-test="bottom-bun">
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