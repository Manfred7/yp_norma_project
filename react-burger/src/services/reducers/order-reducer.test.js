import { orderReducer} from "./order-reducer";
import {
    CLOSE_ORDER_MODAL,
    ORDER_CONFIRMATION_ERROR,
    ORDER_CONFIRMATION_REQUEST,
    ORDER_CONFIRMATION_SUCCESS
} from "../actions/order";
import {GET_ITEMS_ERROR, RESET_INGREDIENT_LIST} from "../actions/ingredient-list";
import {ingredientListReducer} from "./ingredients-list-reducer";

const initialState = {
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


describe('order-reducer-test', () => {

    it('should return the initial state', () => {

        const expectedAction = {
            type: RESET_INGREDIENT_LIST
        }

        expect(orderReducer(undefined, expectedAction)).toEqual(initialState)
    })

    it('should CLOSE_ORDER_MODAL', () => {

        const expectedAction = {
            type: CLOSE_ORDER_MODAL

        }

        expect(orderReducer(initialState, expectedAction)).toEqual(initialState)
    })

    it('should ORDER_CONFIRMATION_REQUEST', () => {

        const expectedAction = {
            type: ORDER_CONFIRMATION_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = orderReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            isUpLoading: true
        };

        expect(newState).toEqual(validState);
    })

    it('should ORDER_CONFIRMATION_SUCCESS', () => {

        const orderRegistrationResult = {
            name: 'Краторный бургер',
            orderNumber: '3453656',
            success: true
        }

        const expectedAction = {
            type: ORDER_CONFIRMATION_SUCCESS,
            result: orderRegistrationResult
        }

        const newState = orderReducer(initialState, expectedAction);

        const validState = {
            ...initialState,

            order: {
                ...initialState.order,
                number: orderRegistrationResult.orderNumber,
                success: orderRegistrationResult.success
            },

            isUpLoading: false,
            modalIsVisible: true
        };

        expect(newState).toEqual(validState);
    })

    it('should ORDER_CONFIRMATION_ERROR', () => {

        const message = 'При регистрации заказа возникла ошибка!';

        const expectedAction = {
            type: ORDER_CONFIRMATION_ERROR,
            errorMsg : message
        }

        const newState = orderReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            success: false,
            hasError: true,
            isUpLoading: false,
            errMsg: message
        };

        expect(newState).toEqual(validState);
    })
})
