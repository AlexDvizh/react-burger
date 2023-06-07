import { useParams } from 'react-router-dom';
import styles from "./modal.module.css";
import { RootState } from '../../services/reducers';
import { TIngredient } from "../../utils/types/ingredients-types";
import { useAppSelector } from '../../services/hooks';

function IngredientDetails(): JSX.Element {
    const { id } = useParams(); 
    const { ingredients }: { ingredients: TIngredient[] } = useAppSelector((store: RootState) => store.ingredients);

    const ingredient = ingredients.find((el) => el._id === id);
        
    return (
        <div className={styles.modalСontent}>
            {ingredient && (
            <>
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
            </>
            )}
        </div>
    )
}

export default IngredientDetails;