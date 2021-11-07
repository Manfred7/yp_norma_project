
import {
    CLOSE_CURRENT_INGREDIENT_MODAL,
    SHOW_CURRENT_INGREDIENT_MODAL

} from "../actions/current_ingedient";

const initialState = {
    ingredientInfo: null,
    modalIsVisible: false
};

export const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case  SHOW_CURRENT_INGREDIENT_MODAL:

            return {
                ingredientInfo: action.value,
                modalIsVisible:true
            }

        case  CLOSE_CURRENT_INGREDIENT_MODAL:

            return {
                ...initialState
            }

        default: {
            return state;
        }
    }
};