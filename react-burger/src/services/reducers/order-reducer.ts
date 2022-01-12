import {

    ORDER_CONFIRMATION_REQUEST,
    ORDER_CONFIRMATION_SUCCESS,
    ORDER_CONFIRMATION_ERROR, CLOSE_ORDER_MODAL, TOrderActions
} from "../actions/order";
import {IOrderIngredient} from "../../utils/types";

export interface IOrderBody {
    bun: IOrderIngredient | null;
    mainsAndSauces: Array<IOrderIngredient>;
    number: string;
    success: boolean;
}

export interface IOrderState {
    order: IOrderBody;
    isUpLoading: boolean;
    modalIsVisible: boolean;
    errMsg: string;
    hasError: boolean;
};

const initialState: IOrderState = {
    order: {
        bun: null,
        mainsAndSauces: [],
        number: '-1',
        success: false,
    },
    isUpLoading: false,
    modalIsVisible: false,
    errMsg: "",
    hasError: false,
};

export const orderReducer = (state:IOrderState = initialState, action:TOrderActions) => {

    switch (action.type) {


        case CLOSE_ORDER_MODAL: {
            return {
                ...initialState
            }
        }

        case ORDER_CONFIRMATION_REQUEST: {
            return {
                ...state,
                isUpLoading: true
            };
        }

        case  ORDER_CONFIRMATION_SUCCESS: {

            const newState :IOrderState = {
                ...state,
                order: {
                    ...state.order,
                    number: action.result.orderNumber,
                    success: action.result.success
                },

                isUpLoading: false,
                modalIsVisible: true
            };


            return newState
        }
        case  ORDER_CONFIRMATION_ERROR: {
            return {
                ...state,
                success: false,
                hasError: true,
                isUpLoading: false,
                errMsg: action.errorMsg
            };
        }


        default: {
            return state;
        }
    }
};
