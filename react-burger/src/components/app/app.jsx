import React from 'react';
import s from './app.module.css';
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import {URL_BASE, URL_INGREDIENTS, URL_POST_ORDER} from "../../utils/data";
import {OrderContext} from "../../services/order-context";
import {generateTestOrder} from "../../utils/test-utils";


const CREATE_NEW_ORDER = "createNewOrder";
const CONFIRM_ORDER = "confirmOrder";
const ERROR_ORDER_CONFIRMATION = "errorConfirmOrder";


const App = () => {
    const [state, setState] = React.useState({hasError: false, isLoading: false, ingredientsData: null});

    const reducer = (state, action) => {

        switch (action.type) {

            case CREATE_NEW_ORDER:
                return generateTestOrder(action.ingredientsData);

            case CONFIRM_ORDER:
                return {
                    ...state,
                    number: action.result.order.number,
                    success: action.result.success
                };

            case ERROR_ORDER_CONFIRMATION: {
                return {
                    ...state,
                    success: false,
                    hasError: true,
                    errMsg: action.result.errorMsg
                };
            }

            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    const [order, dispatch] = React.useReducer(reducer, null);

    const loadIngredientsData = () => {
        setState({...state, hasError: false, isLoading: true});

        fetch(`${URL_BASE}${URL_INGREDIENTS}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => setState({...state, ingredientsData: data.data, isLoading: false}))
            .catch(e => {
                setState({...state, hasError: true, isLoading: false});
            });
    };

    const confirmOrder = (data) => {

        dispatch({
            type: CONFIRM_ORDER,
            result: {
                name: data.name,
                order: {number: data.order.number},
                success: data.success
            }
        })
    }

    const notConfirmed = (e) => {
        dispatch({
            type: ERROR_ORDER_CONFIRMATION,
            result: {
                errorMsg: e
            }
        })
    }

    const sendOrderToServer = () => {
        const ingredients = [order.bun._id, ...order.saucesIds, ...order.mainsIds];

        fetch(`${URL_BASE}${URL_POST_ORDER}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ingredients})
            })
            .then((res) => {

                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((data) => {
                if (data.success) {
                    confirmOrder(data);
                } else {
                    return Promise.reject(`Не удалось подтвердить заказ.`);
                }
            })
            .catch((error) => {
                notConfirmed(null, error);
            });

    }


    React.useEffect(() => {
        loadIngredientsData();

    }, [])

    React.useEffect(() => {
        if (state.ingredientsData) {
            dispatch(
                {
                    type: CREATE_NEW_ORDER,
                    ingredientsData: state.ingredientsData
                })
        }
    }, [state.ingredientsData])


    return (
        <>
            <AppHeader/>
            {state.isLoading && <div>Идет загузка данных!</div>}
            {state.hasError && <div>При попытке получения данных от сервера произошла ошибка!</div>}
            {!state.isLoading && !state.hasError && state.ingredientsData && order &&
            <main className={s.container}>
                <h1>Соберите бургер</h1>
                <div className={s.mainBox}>
                    <OrderContext.Provider value={
                        {
                            sourceIngredients: state.ingredientsData,
                            order: order,
                            pushOrder: sendOrderToServer
                        }
                    }>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </OrderContext.Provider>
                </div>
            </main>

            }
        </>
    );
}

export default App;
