import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./pages.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { RootState } from "../services/slices";
import { useAppSelector } from "../services/hooks";

function ConstructorPage(): JSX.Element {
    const { error, status } = useAppSelector((state: RootState) => state.ingredients)

    return (
        <main className={styles.mainConstructor}>
            {typeof error === "string" && status === "failed" ? (
                <h1>{error}</h1>
                ) : (
                <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
                </DndProvider>
            )}
      </main>
    )
}

export default ConstructorPage;