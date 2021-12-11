import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

import NotFound404Page from "../../pages/not-found-404-page";
import LoginPage from "../../pages/login-page";
import BurgerConstructorPage from "../../pages/burger-constructor-page";
import AppHeader from "../app-header/app-header";
import RegisterNewUserPage from "../../pages/register-new-user-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import UserProfilePage, {EditUserProfileForm} from "../../pages/user-profile-page";
import IngredientPage from "../../pages/ingredient-page";
import ForgotPasswordPage from "../../pages/forgot-password-page";
import {APP_ROUTS, TOKENS} from "../../utils/const";
import OrderListPage from "../../pages/order-list-page";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {doGetUserInfo} from "../../services/actions/auth";
import {ingredientsSelectors} from "../../services/selectors/ingredients-list-selectors";
import {getIngredientsData} from "../../services/actions/ingredient-list";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {

    const dispatch = useDispatch();

    const needLoad = useSelector(ingredientsSelectors.needReload);

    useEffect(() => {
        if (needLoad) {
            dispatch(getIngredientsData())
        }
    }, [dispatch, needLoad])

    useEffect(() => {
        const accessToken = localStorage.getItem(TOKENS.ACCESS);

        if (accessToken) {

            dispatch(doGetUserInfo());
        }

    }, [dispatch]);

    return (
        <BrowserRouter>
            <AppHeader/>
            <AppBody/>
            <AppToasts/>
        </BrowserRouter>
    );
}

const AppBody = () => {

    const hasError = useSelector(ingredientsSelectors.hasError);
    const isLoading = useSelector(ingredientsSelectors.isLoading);
    return (
        <>
            {isLoading && <div>Идет загузка данных!</div>}
            {hasError && <div>При попытке получения данных от сервера произошла ошибка!</div>}
            <AppPages/>
        </>)
}

const AppToasts = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />)
}

const AppPages = () => {

    const location = useLocation();
    const background = location.state?.background;

    return (
        <>
            <Routes location={background ?? location}>
                <Route path={APP_ROUTS.ROOT}

                       element={
                           <ProtectedRoute>
                               <BurgerConstructorPage/>
                           </ProtectedRoute>
                       }
                />

                <Route path={APP_ROUTS.INGREDIENT}
                       element={
                           <ProtectedRoute>
                               <IngredientPage/>
                           </ProtectedRoute>}
                />

                <Route path={APP_ROUTS.LOGIN}
                       element={
                           <ProtectedRoute>
                               <LoginPage/>
                           </ProtectedRoute>
                       }
                />

                <Route path={APP_ROUTS.REGISTRATION}
                       element={
                           <ProtectedRoute>
                               <RegisterNewUserPage/>
                           </ProtectedRoute>
                       }
                />

                <Route path={APP_ROUTS.FORGOT_PASSWORD}
                       element={
                           <ProtectedRoute>
                               <ForgotPasswordPage/>
                           </ProtectedRoute>
                       }
                />

                <Route path={APP_ROUTS.RESET_PASSWORD}
                       element={
                           <ProtectedRoute>
                               <ResetPasswordPage/>
                           </ProtectedRoute>
                       }
                />

                <Route path={APP_ROUTS.PROFILE}
                       element={
                           <ProtectedRoute>
                               <UserProfilePage/>
                           </ProtectedRoute>
                       }>

                    <Route index
                           element={
                               <EditUserProfileForm/>
                           }/>

                    <Route path={APP_ROUTS.ORDERS_LIST}
                           element={
                               <OrderListPage/>
                           }/>
                </Route>

                <Route path={APP_ROUTS.NOT_FOUND} element={<NotFound404Page/>}/>

            </Routes>

            {background && (
                <Routes>
                    <Route path={APP_ROUTS.INGREDIENT}
                           element={
                               <IngredientModal/>
                           }
                    />
                </Routes>
            )}

        </>
    );
}

export default App;
