import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { URL } from '../../utils/utils'; 
import "./App.css";
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
  const [error, setError] = useState({
    hasError: false,
    message: '',
    errorName: null,
    errorMessage: null,
  });

  useEffect(() => {
    getIngredients()
    .then((ingredients) => {
      setIngredients(ingredients);
    })
    .catch((err) => {
      setError({
        ...error,
        hasError: true,
        message: "Could not get data",
        errorName: err.name,
        errorMessage: err.message,
      });
    });
  }, [])
  
  return (
    <div className="App">
      <AppHeader />
      <main className='main'>
        {ingredients.length !== 0 &&
        <>
          <BurgerIngredients burgersInfo={ingredients}/>
          <BurgerConstructor burgersInfo={ingredients}/>
        </>
        }
      </main>
      {error.hasError &&
        <>
          <h1>{error.message}</h1>
          <h2>{`${error.errorName}: ${error.errorMessage}`}</h2>
        </>
      }
    </div>
  );
}

export default App;
