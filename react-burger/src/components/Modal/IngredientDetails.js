import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css";

const IngredientDetails = (props) => {

    return (
        <div className={styles.modalСontent}>
            <img
                src={props.ingredient.image}
                alt={props.ingredient.name}
                className={styles.ingredientImg}
            />
            <p className="mt-4 mb-8 text text_type_main-medium">
                {props.ingredient.name}
            </p>
            <div className={`mb-10 ${styles.ingredientWrap}`}>
                <div className={`mr-5 ${styles.ingredientItem}`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.ingredient.calories}
                    </p>
                </div>
                <div className={`mr-5 ${styles.ingredientItem}`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.ingredient.proteins}
                    </p>
                </div>
                <div className={`mr-5 ${styles.ingredientItem}`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.ingredient.fat}
                    </p>
                </div>
                <div className={styles.ingredientItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {props.ingredient.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;