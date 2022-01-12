import {checkResponse, loadIngredientsData} from "../api";
import {
    IIngredient,
    IIngredientsDataResponse,
    IOrderIngredient,
    ITabHeadersElements,
    TAppThunk
} from "../../utils/types";
import {TAB_CAPTIONS} from "../../utils/const";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

export interface IGetItemsRequestAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    ingredientsList: Array<IIngredient>;
}

export interface IGetItemsErrorAction {
    readonly type: typeof GET_ITEMS_ERROR;
}


export const SET_CURRENT_TAB = "SET_CURRENT_TAB";

export interface ISetCurrentTabAction {
    readonly type: typeof SET_CURRENT_TAB;
    value: TAB_CAPTIONS;
}

export const SET_TAB_HEADERS = "SET_TAB_HEADERS";

export interface ISetTabHeadersAction {
    readonly type: typeof SET_TAB_HEADERS;
    value: ITabHeadersElements;
}

export const AFTER_ADD_TO_CONSTRUCTOR = "AFTER_ADD_TO_CONSTRUCTOR";
export const AFTER_REMOVE_FROM_CONSTRUCTOR = "AFTER_REMOVE_FROM_CONSTRUCTOR";

export interface IAfterAddToConstructorAction {
    readonly type: typeof AFTER_ADD_TO_CONSTRUCTOR;
    value: IOrderIngredient
}

export interface IAfterRemoveFromConstructorAction {
    readonly type: typeof AFTER_REMOVE_FROM_CONSTRUCTOR;
    value: IOrderIngredient
}

export const RESET_INGREDIENT_LIST = "RESET_INGREDIENT_LIST";

export interface IResetIngredientListAction {
    readonly type: typeof RESET_INGREDIENT_LIST;
}

export type  TIngredientListAction =
    IGetItemsRequestAction
    | IGetItemsSuccessAction
    | IGetItemsErrorAction
    | ISetCurrentTabAction
    | ISetTabHeadersAction
    | IAfterAddToConstructorAction
    | IAfterRemoveFromConstructorAction
    | IResetIngredientListAction;

export const getIngredientsData: TAppThunk = () => {

    return async function (dispatch: any) {

        dispatch({
            type: GET_ITEMS_REQUEST
        });

        try {

            const resData = await loadIngredientsData();
            const result = await checkResponse<IIngredientsDataResponse>(resData);

            dispatch({
                type: GET_ITEMS_SUCCESS,
                ingredientsList: result.data
            })

        } catch (err) {
            dispatch({
                type: GET_ITEMS_ERROR
            });

        }

    };
}
