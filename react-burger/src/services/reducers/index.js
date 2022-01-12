import { combineReducers } from 'redux';
import {constructorIngredientsReducer} from "./constructor-ingredients-reducer";
import {orderReducer} from "./order-reducer";
import {ingredientListReducer} from "./ingredients-list-reducer";
import {authReducer} from "./auth-reducer";
import {wsReducer} from "./wsReducer";

export const rootReducer = combineReducers({
    constructorIngredients: constructorIngredientsReducer,
    orderState : orderReducer,
    ingredientsState:ingredientListReducer,
    authState :authReducer,
    wsFeedState :wsReducer
});
