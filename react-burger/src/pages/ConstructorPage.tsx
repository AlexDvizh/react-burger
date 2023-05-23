import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./pages.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { RootState } from "../services/reducers";

function ConstructorPage(): JSX.Element {
    const { hasError } = useSelector((state: RootState) => state.ingredients)

    return (
        <main className={styles.mainConstructor}>
            {!hasError &&
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
            }
      </main>
    )
}

export default ConstructorPage;