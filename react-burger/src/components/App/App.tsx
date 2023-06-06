import { useEffect, FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from '../AppHeader/AppHeader'; 
import styles from "./app.module.css";

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
import { INGREDIENT_MODAL_TITLE, WS_ORDERS_API, WS_PROFILE_ORDERS_API } from '../../utils/utils';
import { getUser } from '../../services/actions/authentication';

import {
  connect as connectWsFeed,
  disconnect as disconnectWsFeed,
} from "../../services/actions/ws-feed";

import {
  connect as connectWsProfile,
  disconnect as disconnectWsProfile,
} from "../../services/actions/ws-profile";
import { getCookie } from '../../utils/cookie';
import { useAppSelector, useAppDispatch } from '../../services/types';
import { FeedPage } from '../../pages/FeedPage';


const App: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken")?.slice(7);

  useEffect(() => {
    dispatch(getIngredients() as any)
    dispatch(getUser() as any);  
  }, [dispatch])

  useEffect(() => {
    if (location.pathname.includes("/feed")) {
      dispatch(connectWsFeed(WS_ORDERS_API));
    } else {
      dispatch(disconnectWsFeed());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (location.pathname.includes("/profile/orders")) {
      dispatch(
        connectWsProfile(`${WS_PROFILE_ORDERS_API}?token=${accessToken}`)
      );
    } else {
      dispatch(disconnectWsProfile());
    }
  }, [location.pathname, dispatch, accessToken]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed">
          <Route index element={<FeedPage />} />
          <Route path=":id" element={<FeedShowOrderPage />} />
        </Route>
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
           <Route
           path="orders"
           element={
             <ProtectedRouteElement onlyUnAuth={false}>
               <ProfileOrders />
             </ProtectedRouteElement>
           }
         />
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
