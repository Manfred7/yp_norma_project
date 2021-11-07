import {
    AFTER_ADD_TO_CONSTRUCTOR, AFTER_REMOVE_FROM_CONSTRUCTOR, GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS, RESET_INGREDIENT_LIST,
    SET_CURRENT_TAB,
    SET_TAB_HEADERS
} from "../actions/ingredient-list";
import {TAB_CAPTIONS} from "../../utils/const";

const initialState = {
    ingredientsList: [],
    hasError: false,
    needReload: true,
    isLoading: false,
    currentTab: TAB_CAPTIONS.BUN,
    tabHeadersElements: {bunElement: null, sauceElement: null, mainElement: null}
};

export const ingredientListReducer = (state = initialState, action) => {
    switch (action.type) {

        case RESET_INGREDIENT_LIST: {
            return {...state, needReload: true}
        }
        case AFTER_REMOVE_FROM_CONSTRUCTOR: {

            const valueIdx = state.ingredientsList.findIndex((item) => item._id === action.value._id);

            let val = {
                ...state.ingredientsList[valueIdx],
            };

            val.__v = val.__v - 1;

            const newIngredientsList = state.ingredientsList.map(
                (item, idx) => {
                    if (idx === valueIdx) {
                        return val
                    } else {
                        return item
                    }
                })

            return {...state, ingredientsList: newIngredientsList};

        }
        case AFTER_ADD_TO_CONSTRUCTOR: {

            const valueIdx = state.ingredientsList.findIndex((item) => item._id === action.value._id);

            let val = {
                ...state.ingredientsList[valueIdx],
            };

            val.__v = val.__v + 1;

            const newIngredientsList = state.ingredientsList.map(
                (item, idx) => {
                    if (idx === valueIdx) {
                        return val
                    } else {
                        return item
                    }
                })

            return {...state, ingredientsList: newIngredientsList};

        }

        case SET_TAB_HEADERS:
            return {
                ...state,
                tabHeadersElements: {
                    bunElement: action.value.bunElement,
                    sauceElement: action.value.sauceElement,
                    mainElement: action.value.mainElement

                }
            }
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.value
            }

        case GET_ITEMS_REQUEST: {
            return {
                ...initialState,
                isLoading: true,
                needReload: false
            };
        }

        case GET_ITEMS_SUCCESS: {
            return {...state, hasError: false, ingredientsList: action.ingredientsList, isLoading: false};
        }

        case GET_ITEMS_ERROR: {
            return {...initialState, hasError: true, isLoading: false};
        }
        default: {
            return state;
        }
    }
};