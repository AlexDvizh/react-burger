import React, { useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../AppHeader/AppHeader'; 
import styles from "./app.module.css";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';



const App = () => {
  const { hasError } = useSelector((state) => state.ingredients)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getIngredients())
    
  }, [dispatch])
  
  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        {!hasError &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        }
      </main>
    </div>
  );
}

export default App;
