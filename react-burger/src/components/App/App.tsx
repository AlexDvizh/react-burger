import { useEffect, FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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

import ProtectedRoute from '../Protected-route';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails';
import { INGREDIENT_MODAL_TITLE } from '../../utils/utils';
import { getUser } from '../../services/actions/authentication';


const App: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients() as any)
    dispatch(getUser() as any);  
  }, [dispatch])

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/login" element={
          <ProtectedRoute onlyUnAuth={true}>
            <LoginPage />
          </ProtectedRoute>
        }/>
        <Route path="/register" element={
          <ProtectedRoute onlyUnAuth={true}>
            <RegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={
          <ProtectedRoute onlyUnAuth={false}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
      </Routes>
      { background &&
      <Routes>
        <Route path='/ingredients/:id' element={
          <Modal 
            title={INGREDIENT_MODAL_TITLE} 
            handleModalClose={handleModalClose} 
          >
            <IngredientDetails />
          </Modal>
          } 
        />
      </Routes>
      }
    </div>
  );
}

export default App;
