import { } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/prop-types";
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import './BurgerIngredients.css';

const BurgerIngredients = (props) => {
    const bunArr = props.burgersInfo.filter((item) => item.type === "bun");
    const sauceArr = props.burgersInfo.filter((item) => item.type === "sauce");
    const meatArr = props.burgersInfo.filter((item) => item.type === "main");
    
    return (
        <section className='burger-ingredients'>
            <h1 className="text text_type_main-large burger-ingredients-title">Соберите бургер</h1>
            <nav className='ingredients-list'>
                <p className="text text_type_main-default ingredients-item active">Булки</p>
                <p className="text text_type_main-default ingredients-item">Соусы</p>
                <p className="text text_type_main-default ingredients-item">Начинки</p>
            </nav>
            <div className='burger-ingredient scrollableBox mt-10'>
                <h2 className='text text_type_main-medium title'>Булки</h2>
                <div className='burgerIngredient-list'>
                    {bunArr.map((bun) => {
                       return <BurgerIngredient ingredient={bun} key={bun._id}/>
                    })}
                </div>
                <h2 className='text text_type_main-medium title'>Соусы</h2>
                <div className='burgerIngredient-list'>
                    {sauceArr.map((sauce) => {
                        return <BurgerIngredient ingredient={sauce} key={sauce._id}/>
                    })}
                </div>
                <h2 className='text text_type_main-medium title'>Начинки</h2>
                <div className='burgerIngredient-list'>
                    {meatArr.map((meat) => {
                        return <BurgerIngredient ingredient={meat} key={meat._id}/>
                    })}
                </div>
            </div>
        </section>
    )
}



export default BurgerIngredients;