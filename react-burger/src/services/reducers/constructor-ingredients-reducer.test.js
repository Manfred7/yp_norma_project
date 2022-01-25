import {RESET_INGREDIENT_LIST} from "../actions/ingredient-list";
import {constructorIngredientsReducer} from "./constructor-ingredients-reducer";
import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT, RESET_CONSTRUCTOR} from "../actions/burger-constructor";

const initialState = {
    order: {
        bun: null,
        mainsAndSauces: []
    }
};
describe('constructor-ingredients-reducer-test', () => {

    it('should return the initial state', () => {

        const expectedAction = {
            type: RESET_INGREDIENT_LIST
        }

        expect(constructorIngredientsReducer(undefined, expectedAction)).toEqual(initialState)
    })

    it('should RESET_CONSTRUCTOR', () => {

        const expectedAction = {
            type: RESET_CONSTRUCTOR

        }

        expect(constructorIngredientsReducer(initialState, expectedAction)).toEqual(initialState)
    })

    it('should ADD_INGREDIENT BUN', () => {

        const ingredient = {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
            innerId: 10
        }

        const expectedAction = {
            type: ADD_INGREDIENT,
            value: ingredient
        }

        const prevState = {
            ...initialState
        };

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            order: {
                ...initialState.order,
                bun: ingredient

            }
        };

        expect(newState).toEqual(validState);
    })
    it('should ADD_INGREDIENT MAIN', () => {

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            innerId: 1056
        };

        const expectedAction = {
            type: ADD_INGREDIENT,
            value: ingredient
        }

        const prevState = {
            ...initialState
        };

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const copyMainsAndSauces = [...prevState.order.mainsAndSauces, {...ingredient}];

        const validState = {
            ...prevState,
            order: {
                ...prevState.order,
                mainsAndSauces: copyMainsAndSauces
            }
        };

        expect(newState).toEqual(validState);
    })
    it('should ADD_INGREDIENT SAUCE', () => {

        const ingredient = {
            _id: "60d3b41abdacab0026a733ce",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            __v: 0,
            innerId: 1023
        }

        const expectedAction = {
            type: ADD_INGREDIENT,
            value: ingredient
        }

        const prevState = {
            ...initialState
        };

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const copyMainsAndSauces = [...prevState.order.mainsAndSauces, {...ingredient}];

        const validState = {
            ...prevState,
            order: {
                ...prevState.order,
                mainsAndSauces: copyMainsAndSauces

            }
        };

        expect(newState).toEqual(validState);
    })

    it('should MOVE_INGREDIENT', () => {

        const ingredientSauce = {
            _id: "60d3b41abdacab0026a733ce",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            __v: 0,
            innerId: 1023
        }

        const ingredientMain = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            innerId: 1056
        };

        const prevState = {
            ...initialState,
            order: {
                ...initialState.order,
                mainsAndSauces: [ingredientMain,ingredientSauce]
            }
        };

        const expectedAction = {
            type: MOVE_INGREDIENT,
            dragIndex: 0,
            hoverIndex : 1
        }

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            order: {
                ...initialState.order,
                mainsAndSauces: [ingredientSauce, ingredientMain]
            }
        };

        expect(newState).toEqual(validState);
    })

    it('should REMOVE_INGREDIENT BUN', () => {

        const ingredient = {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
            innerId: 10
        }

        const expectedAction = {
            type: REMOVE_INGREDIENT,
            value: ingredient
        }

        const prevState = {
            ...initialState,
            order: {
                ...initialState.order,
                bun: ingredient
            }
        };

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            order: {
                ...initialState.order,
                bun: null

            }
        };

        expect(newState).toEqual(validState);
    })

    it('should REMOVE_INGREDIENT MAIN', () => {

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            innerId: 1056
        };

        const expectedAction = {
            type: REMOVE_INGREDIENT,
            value: ingredient
        }

        const prevState = {
            ...initialState,
            order: {
                ...initialState.order,
                mainsAndSauces :[ingredient]
            }
        };

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            order: {
                ...prevState.order,
                mainsAndSauces: [],

            }
        };

        expect(newState).toEqual(validState);
    })

    it('should REMOVE_INGREDIENT SAUCE', () => {

        const ingredient = {
            _id: "60d3b41abdacab0026a733ce",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            __v: 0,
            innerId: 1023
        }

        const expectedAction = {
            type: REMOVE_INGREDIENT,
            value: ingredient
        }

        const prevState = {
            ...initialState,
            order: {
                ...initialState.order,
                mainsAndSauces :[ingredient]
            }
        };

        const newState = constructorIngredientsReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            order: {
                ...prevState.order,
                mainsAndSauces: [],

            }
        };

        expect(newState).toEqual(validState);
    })
});
