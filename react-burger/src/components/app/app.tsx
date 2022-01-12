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
import OrdersHistoryPage from "../../pages/orders-history-page";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "../../services/hooks";
import {doGetUserInfo} from "../../services/actions/auth";
import {ingredientsSelectors} from "../../services/selectors/ingredients-list-selectors";
import {getIngredientsData} from "../../services/actions/ingredient-list";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import ProtectedRoute from "../protected-route/protected-route";
import FeedPage from "../../pages/feed-page";

import OrderHistoryDetailPage, {THistoryDetailMode} from "../../pages/order-history-detail-page";
import OrderHistoryDetailsModal from "./order-history-details-modal/order-history-details-modal";


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

                <Route path={APP_ROUTS.INGREDIENT_ID}
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

                    <Route path={APP_ROUTS.ORDERS_HISTORY}
                           element={
                               <OrdersHistoryPage/>
                           }/>



                </Route>

                <Route path={APP_ROUTS.ORDER_ID}
                       element={
                           <ProtectedRoute>
                               <OrderHistoryDetailPage mode={THistoryDetailMode.userHistory}/>
                           </ProtectedRoute>}
                />

                <Route path={APP_ROUTS.FEED_ID}
                       element={
                           <ProtectedRoute>
                               <OrderHistoryDetailPage mode={THistoryDetailMode.feed}/>
                           </ProtectedRoute>}
                />
                <Route path={APP_ROUTS.FEED}
                       element={
                           <FeedPage/>
                       }>


                </Route>



                <Route path={APP_ROUTS.NOT_FOUND} element={<NotFound404Page/>}/>

            </Routes>

            {background && (
                <Routes>
                    <Route path={APP_ROUTS.INGREDIENT_ID}
                           element={
                               <IngredientModal/>
                           }
                    />

                    <Route path={APP_ROUTS.FEED_ID}
                           element={
                               <OrderHistoryDetailsModal/>
                           }
                    />

                    <Route path={APP_ROUTS.ORDER_ID}
                           element={
                               <OrderHistoryDetailsModal/>
                           }
                    />
                </Routes>
            )}

        </>
    );
}

export default App;
