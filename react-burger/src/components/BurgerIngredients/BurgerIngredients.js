import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/prop-types";
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from "./burgerIngredients.module.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BurgerIngredients = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    const [current, setCurrent] = useState('one');
    const [activeTab, setActiveTab] = useState({active: 'one'});
    
    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            for (let i = 0; i < entries.length; i++) {
              if (entries[i].target.id === "bun_tab_header") {
                setActiveTab({active: 'one'});
              } else if (entries[i].target.id === "sauce_tab_header") {
                setActiveTab({active: 'two'});
              } else if (entries[i].target.id === "main_tab_header") {
                setActiveTab({active: 'three'});
              }
            }
          },
          { root: document.getElementById("scrollable_box") }
        );
        observer.observe(document.getElementById("bun_tab_header"));
        observer.observe(document.getElementById("sauce_tab_header"));
        observer.observe(document.getElementById("main_tab_header"));
    }, []);
    
    const bunArr = ingredients.filter((item) => item.type === "bun");
    const sauceArr = ingredients.filter((item) => item.type === "sauce");
    const meatArr = ingredients.filter((item) => item.type === "main");

    useEffect(() => {
        setCurrent(activeTab.active);
    }, [activeTab.active]);

    const clickHandler = (id) => {
        const hiddenElement = document.getElementById(id);
        hiddenElement.scrollIntoView({ behavior: "smooth" });
    };
   
    return (
        <section className={styles.burgerIngredients}>
            <h1 className={`text text_type_main-large ${styles.burgerIngredientsTitle}`}>Соберите бургер</h1>
            <nav className={styles.ingredientsList}>
                <Tab 
                    value="one" 
                    active={current === "one"} 
                    onClick={() => {
                        setCurrent("one");
                        clickHandler("bun_tab")
                    }}
                >
                    Булки
                </Tab>
                <Tab 
                    value="two" 
                    active={current === "two"} 
                    onClick={() => {
                        setCurrent("two");
                        clickHandler("sauce_tab")
                    }}
                >
                    Соусы
                </Tab>
                <Tab 
                    value="three" 
                    active={current === "three"} 
                    onClick={() => {
                        setCurrent("three");
                        clickHandler("main_tab")
                    }}
                >
                    Начинки
                </Tab>
            </nav>
            <div className={`${styles.scrollableBox} mt-10`}>
                <h2 className={`text text_type_main-medium ${styles.title}`} id="bun_tab_header">Булки</h2>
                <div className={styles.burgerIngredientList} id="bun_tab">
                    {bunArr.map((bun) => (
                        <BurgerIngredient ingredient={bun} key={bun._id}/>
                    ))}
                </div>
                <h2 className={`text text_type_main-medium ${styles.title}`} id="sauce_tab_header">Соусы</h2>
                <div className={styles.burgerIngredientList} id="sauce_tab">
                    {sauceArr.map((sauce) => {
                        return <BurgerIngredient ingredient={sauce} key={sauce._id}/>
                    })}
                </div>
                <h2 className={`text text_type_main-medium ${styles.title}`} id="main_tab_header">Начинки</h2>
                <div className={styles.burgerIngredientList} id="main_tab">
                    {meatArr.map((main) => {
                        return <BurgerIngredient ingredient={main} key={main._id}/>
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