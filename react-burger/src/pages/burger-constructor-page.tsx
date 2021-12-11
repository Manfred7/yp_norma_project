import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ingredientsSelectors} from "../services/selectors/ingredients-list-selectors";

import {orderSelectors} from "../services/selectors/order-selectors";
import { RESET_INGREDIENT_LIST} from "../services/actions/ingredient-list";

import {CLOSE_ORDER_MODAL} from "../services/actions/order";
import {RESET_CONSTRUCTOR} from "../services/actions/burger-constructor";

import s from "../components/app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";

import OrderDetails from "../components/order-details/order-details";

const BurgerConstructorPage = () => {
    const dispatch = useDispatch();
    const hasError = useSelector(ingredientsSelectors.hasError);
    const isLoading = useSelector(ingredientsSelectors.isLoading);
    const ingredientsList = useSelector(ingredientsSelectors.ingredientsList);

    const orderModalIsVisible = useSelector(orderSelectors.modalIsVisible);
    const order = useSelector(orderSelectors.order);

    const handleCloseOrderModal = () => {
        dispatch({type: CLOSE_ORDER_MODAL})
        dispatch({type: RESET_INGREDIENT_LIST})
        dispatch({type: RESET_CONSTRUCTOR})
    }

    return (
        <>

            {!isLoading && !hasError && (ingredientsList.length > 0) &&
            <main className={s.container}>
                <h1>Соберите бургер</h1>
                <div className={s.mainBox}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </div>

                {order.success &&
                <Modal isOpen={orderModalIsVisible}  onClose={handleCloseOrderModal}>
                    <OrderDetails orderId={order.number}/>
                </Modal>
                }
            </main>

            }
        </>
    );
}

export default BurgerConstructorPage;