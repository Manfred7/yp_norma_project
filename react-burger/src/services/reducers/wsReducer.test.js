import {RESET_INGREDIENT_LIST} from "../actions/ingredient-list";
import {wsReducer} from "./wsReducer";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../actions/wsActions";

const initialState = {
    isConnected: false,
    feed: null,
    isLoaded: false,
    error: undefined
};

const testFeedData ={
    success: true,
    orders: [
        {
            _id: "61ed2fd36d7cd8001b2d1ec8",
            ingredients: [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733cb",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733c7"
            ],
            status: "done",
            name: "Space бессмертный био-марсианский флюоресцентный бургер",
            createdAt: "2022-01-23T10:37:07.397Z",
            updatedAt: "2022-01-23T10:37:07.584Z",
            number: 8720
        },
        {
            _id: "61ed2fac6d7cd8001b2d1ec6",
            ingredients: [
                "60d3b41abdacab0026a733c6",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733c6"
            ],
            status: "done",
            name: "Space краторный бессмертный бургер",
            createdAt: "2022-01-23T10:36:28.606Z",
            updatedAt: "2022-01-23T10:36:28.856Z",
            number: 8719
        },
        {
            _id: "61ebe2336d7cd8001b2d1c14",
            ingredients: [
                "60d3b41abdacab0026a733c8",
                "60d3b41abdacab0026a733c6"
            ],
            status: "done",
            name: "Краторный люминесцентный бургер",
            createdAt: "2022-01-22T10:53:39.416Z",
            updatedAt: "2022-01-22T10:53:39.707Z",
            number: 8671
        }
    ],
    total: 3,
    totalToday: 3
};

describe('auth-reducer-test', () => {

    it('should return the initial state', () => {

        const expectedAction = {
            type: RESET_INGREDIENT_LIST
        }

        expect(wsReducer(undefined, expectedAction)).toEqual(initialState)
    })

    it('should WS_CONNECTION_SUCCESS', () => {

        const expectedAction = {
            type: WS_CONNECTION_SUCCESS
        }

        const prevState = {
            ...initialState
        };

        const newState = wsReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            wsConnected: true
        };

        expect(newState).toEqual(validState);
    })

    it('should WS_CONNECTION_ERROR', () => {

        const message = 'Ошибка в вебсокете!';

        const expectedAction = {
            type: WS_CONNECTION_ERROR,
            payload: message
        }

        const newState = wsReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            wsConnected: false,
            error: message,
        };

        expect(newState).toEqual(validState);
    })

    it('should WS_CONNECTION_CLOSED', () => {

        const expectedAction = {
            type: WS_CONNECTION_CLOSED,
        }

        const newState = wsReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            wsConnected: false,
            error: undefined,
        };

        expect(newState).toEqual(validState);
    })

    it('should WS_GET_MESSAGE', () => {

        const expectedAction = {
            type: WS_GET_MESSAGE,
            payload: testFeedData
        }

        const prevState = {
            ...initialState
        };

        const newState = wsReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            isLoaded : true,
            feed:  {...testFeedData}
        };

        expect(newState).toEqual(validState);
    })

})
