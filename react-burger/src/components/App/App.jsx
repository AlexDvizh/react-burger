import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from '../AppHeader/AppHeader'; 
import styles from "./app.module.css";

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import ConstructorPage from '../../pages/ConstructorPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage';

import { getCookie } from "../../utils/cookie";
import { setUser } from '../../services/actions/user';
import ProtectedRoute from '../Protected-route';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails';
import { INGREDIENT_MODAL_TITLE } from '../../utils/utils';


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  const refreshToken = window.localStorage.getItem("refreshToken");
  
  useEffect(() => {
    dispatch(getIngredients())  
  }, [dispatch])

  if (accessToken || (!accessToken && refreshToken)) {
    dispatch(setUser(accessToken, refreshToken));
  }

  return (
    <div className={styles.App}>
      <AppHeader />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<ConstructorPage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<ProtectedRoute element={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          { background &&
            <Route path='/ingredients/:id' element={<Modal element={<IngredientDetails />} />} />
          }
        </Routes>
    </div>
  );
}

export default App;
