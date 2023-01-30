import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { URL } from '../../utils/utils'; 
import styles from "./app.module.css";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


const getIngredients = () => {
  return fetch(URL)
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((response) => {
      if (response?.success) return response.data;
      return Promise.reject(response);
    });
};

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  

  useEffect(() => {

  }, [])
  
  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        {ingredients.length !== 0 &&
        <>
          <BurgerIngredients burgersInfo={ingredients}/>
          <BurgerConstructor burgersInfo={ingredients}/>
        </>
        }
      </main>
    </div>
  );
}

export default App;
