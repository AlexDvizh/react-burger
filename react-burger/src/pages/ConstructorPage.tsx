import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./pages.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { RootState } from "../services/reducers";
import { useAppSelector } from "../services/types/web-socket";

function ConstructorPage(): JSX.Element {
    const { hasError, status } = useAppSelector((state: RootState) => state.ingredients)

    return (
        <main className={styles.mainConstructor}>
            {typeof hasError === "string" && status === "failed" ? (
                <h1>{hasError}</h1>
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