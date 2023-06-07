import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from "./burgerIngredient.module.css";
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { TIngredient } from "../../utils/types/ingredients-types";
import { RootState } from '../../services/reducers';

function BurgerIngredient({
    ingredient,
  }: {
    ingredient: TIngredient;
  }): JSX.Element {
    const location = useLocation();
    const item = useAppSelector((state: RootState) => {
        //@ts-ignore
      return  state.ingredients.ingredients.filter((item) => item._id === ingredient._id)
    });
    
    const [, dragRef] = useDrag({
      type: ingredient.type,
      item: { ingredient },
    });
    
    return (
        <>
            <div className={`${styles.burgerItem} mr-10`} ref={dragRef}>
                {item[0].count > 0 && (
                    <Counter count={item[0].count} size="default" extraClass="m-1" />
                )}
                <Link
                    to={`/ingredients/${ingredient._id}`}
                    state={{ background: location }}
                >
                    <img className="ml-4 mr-4" src={ingredient.image} alt="Изображение булки бургера" />
                </Link>
                <div className={styles.burgerPrice}>
                    <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='text text_type_main-default'>{ingredient.name}</p>
            </div>
        </>
    )
}

export default BurgerIngredient;