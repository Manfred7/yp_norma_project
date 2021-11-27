import { combineReducers } from 'redux';
import {constructorIngredientsReducer} from "./constructor-ingredients-reducer";
import {orderReducer} from "./order-reducer";
import {currentIngredientReducer} from "./current-ingredient-reducer";
import {ingredientListReducer} from "./ingredients-list-reducer";
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
    constructorIngredients: constructorIngredientsReducer,
    orderState : orderReducer,
    currentIngredientState :currentIngredientReducer,
    ingredientsState:ingredientListReducer,
    authState :authReducer
});