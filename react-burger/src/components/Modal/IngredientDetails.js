import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from "./modal.module.css";

const IngredientDetails = () => {
    const { id } = useParams(); 
    const { ingredients } = useSelector((store) => store.ingredients);

    if (ingredients[0]) {
        const ingredient = ingredients.find((el) => el._id === id);
        
        return (
            <div className={styles.modalСontent}>
                <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className={styles.ingredientImg}
                />
                <p className={`mt-4 mb-8 text text_type_main-medium ${styles.ingredientName}`}>
                    {ingredient.name}
                </p>
                <div className={`mb-10 ${styles.ingredientWrap}`}>
                    <div className={`mr-5 ${styles.ingredientItem}`}>
                        <p className="text text_type_main-default text_color_inactive">
                            Калории, ккал
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.calories}
                        </p>
                    </div>
                    <div className={`mr-5 ${styles.ingredientItem}`}>
                        <p className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.proteins}
                        </p>
                    </div>
                    <div className={`mr-5 ${styles.ingredientItem}`}>
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.fat}
                        </p>
                    </div>
                    <div className={styles.ingredientItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.carbohydrates}
                        </p>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default IngredientDetails;