import {

    ORDER_CONFIRMATION_REQUEST,
    ORDER_CONFIRMATION_SUCCESS,
    ORDER_CONFIRMATION_ERROR, CLOSE_ORDER_MODAL
} from "../actions/order";

const initialState = {
    order: {
        bun: null,
        mainsAndSauces: [],
        number: -1,
        success: false,
    },
    isUpLoading: false,
    modalIsVisible: false,
    errMsg: "",
    hasError: false,
};

export const orderReducer = (state = initialState, action) => {

    switch (action.type) {


        case CLOSE_ORDER_MODAL:{
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

            const newState = {
                ...state,
                order: {
                    ...state.order,
                    number: action.result.order.number,
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
                errMsg: action.result.errorMsg
            };
        }


        default: {
            return state;
        }
    }
};