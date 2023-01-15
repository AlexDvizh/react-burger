import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { URL } from '../../utils/utils'; 
import './App.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


const getIngredients = () => {
  return fetch(URL)
    .then((res) => res.json())
    .then((response) => {
      if (response?.success) return response.data;
      return Promise.reject(response);
    });
};

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients()
    .then((ingredients) => {
      setIngredients(ingredients);
    })
    .catch(() => alert("Во время загрузки ингредиентов произошла ошибка."));
  }, [])
  
  return (
    <div className="App">
      <AppHeader />
      <div className='main'>
        {ingredients.length !== 0 &&
        <>
          <BurgerIngredients burgersInfo={ingredients}/>
          <BurgerConstructor burgersInfo={ingredients}/>
        </>
        }
      </div>
    </div>
  );
}

export default App;
