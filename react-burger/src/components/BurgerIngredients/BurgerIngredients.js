import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/prop-types";
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from "./burgerIngredients.module.css";
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    
    const bunArr = ingredients.filter((item) => item.type === "bun");
    const sauceArr = ingredients.filter((item) => item.type === "sauce");
    const meatArr = ingredients.filter((item) => item.type === "main");

    const [current, setCurrent] = useState('one');
    
    return (
        <section className={styles.burgerIngredients}>
            <h1 className={`text text_type_main-large ${styles.burgerIngredientsTitle}`}>Соберите бургер</h1>
            <nav className={styles.ingredientsList}>
                <Tab value="one" active={current === "one"} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === "two"} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === "three"} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <div className={`${styles.scrollableBox} mt-10`}>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Булки</h2>
                <div className={styles.burgerIngredientList}>
                    {bunArr.map((bun) => {
                       return <BurgerIngredient ingredient={bun} key={bun._id}/>
                    })}
                </div>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Соусы</h2>
                <div className={styles.burgerIngredientList}>
                    {sauceArr.map((sauce) => {
                        return <BurgerIngredient ingredient={sauce} key={sauce._id}/>
                    })}
                </div>
                <h2 className={`text text_type_main-medium ${styles.title}`}>Начинки</h2>
                <div className={styles.burgerIngredientList}>
                    {meatArr.map((meat) => {
                        return <BurgerIngredient ingredient={meat} key={meat._id}/>
                    })}
                </div>
            </div>
        </section>
    )
}

// BurgerIngredients.propTypes = {
//     burgersInfo: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
// };

export default BurgerIngredients;