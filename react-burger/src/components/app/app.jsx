import React from 'react';
import s from './app.module.css';
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

import {useDispatch, useSelector} from "react-redux";
import {getIngredientsData, RESET_INGREDIENT_LIST} from "../../services/actions/ingredient-list";
import {CLOSE_ORDER_MODAL} from "../../services/actions/order";
import {ingredientsSelectors} from "../../services/selectors/ingredients-list-selectors";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {CLOSE_CURRENT_INGREDIENT_MODAL} from "../../services/actions/current_ingedient";
import {currentIngredientsSelectors} from "../../services/selectors/current-ingredient-selector";
import {orderSelectors} from "../../services/selectors/order-selectors";
import OrderDetails from "../order-details/order-details";
import {RESET_CONSTRUCTOR} from "../../services/actions/burger-constructor";

const App = () => {
    const dispatch = useDispatch();
    const hasError = useSelector(ingredientsSelectors.hasError);
    const isLoading = useSelector(ingredientsSelectors.isLoading);
    const ingredientsList = useSelector(ingredientsSelectors.ingredientsList);
    const currentIngredient = useSelector(currentIngredientsSelectors.ingredientInfo);
    const currentIngredientModalIsVisible = useSelector(currentIngredientsSelectors.modalIsVisible());
    const orderModalIsVisible = useSelector(orderSelectors.modalIsVisible());
    const order = useSelector(orderSelectors.order());
    const needLoad = useSelector(ingredientsSelectors.needReload);

    React.useEffect(() => {
        if (needLoad) {
            dispatch(getIngredientsData())
        }
    }, [dispatch, needLoad])

    const handleCloseCurrentIngredientModal = () => {
        dispatch({type: CLOSE_CURRENT_INGREDIENT_MODAL})
    }

    const handleCloseOrderModal = () => {
        dispatch({type: CLOSE_ORDER_MODAL})
        dispatch({type: RESET_INGREDIENT_LIST})
        dispatch({type: RESET_CONSTRUCTOR})
    }

    return (
        <>
            <AppHeader/>
            {isLoading && <div>Идет загузка данных!</div>}
            {hasError && <div>При попытке получения данных от сервера произошла ошибка!</div>}
            {!isLoading && !hasError && (ingredientsList.length > 0) &&
            <main className={s.container}>
                <h1>Соберите бургер</h1>
                <div className={s.mainBox}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </div>
                {
                    currentIngredient &&
                    <Modal isOpen={currentIngredientModalIsVisible} header="Детали ингридиента" onClose={handleCloseCurrentIngredientModal}>
                        <IngredientDetails/>
                    </Modal>

                }
                {order.success &&
                <Modal isOpen={orderModalIsVisible} onClose={handleCloseOrderModal}>
                    <OrderDetails orderId={order.number}/>
                </Modal>
                }
            </main>

            }
        </>
    );
}

export default App;
