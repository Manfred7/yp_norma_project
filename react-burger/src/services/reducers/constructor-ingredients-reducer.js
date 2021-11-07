import {INGREDIENT_TYPES} from "../../utils/const";
import {getNewId} from "../../utils/data";
import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT, RESET_CONSTRUCTOR} from "../actions/burger-constructor";

const initialState = {
    order: {
        bun: null,
        mainsAndSauces: []
    }
};

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {

        case     RESET_CONSTRUCTOR:
            return {
                ...initialState
            }

        case  ADD_INGREDIENT: {

            if (action.value.type === INGREDIENT_TYPES.BUN) {
                const newBun = {...action.value};

                return {
                    ...state,
                    order: {
                        ...state.order,
                        bun: newBun

                    }
                };
            }

            if ((action.value.type === INGREDIENT_TYPES.MAIN) || (action.value.type === INGREDIENT_TYPES.SAUCE)) {

                const newValue = {...action.value, innerId: getNewId()}
                let copyMainsAndSauces = [...state.order.mainsAndSauces];
                copyMainsAndSauces = [...copyMainsAndSauces, newValue];

                return {
                    ...state,
                    order: {
                        ...state.order,
                        mainsAndSauces: copyMainsAndSauces
                    }
                };

            }

            return {
                ...state
            }

        }

        case  MOVE_INGREDIENT: {
            const dragIndex = action.dragIndex;
            const hoverIndex = action.hoverIndex;

            const dragCard = {...state.order.mainsAndSauces[dragIndex]};

            const copyMainsAndSauces = [...state.order.mainsAndSauces];
            copyMainsAndSauces.splice(dragIndex, 1);
            copyMainsAndSauces.splice(hoverIndex, 0, dragCard);

            return {
                ...state,
                order: {
                    ...state.order,
                    mainsAndSauces: copyMainsAndSauces
                }
            };
        }

        case  REMOVE_INGREDIENT: {
            let copyMainsAndSauces = [...state.order.mainsAndSauces];

            if ((action.value.type === INGREDIENT_TYPES.MAIN) || (action.value.type === INGREDIENT_TYPES.SAUCE)) {
                copyMainsAndSauces = copyMainsAndSauces.filter((val) => val.innerId !== action.value.innerId)

            }

            let newBun = state.order.bun;
            if (action.value.type === INGREDIENT_TYPES.BUN) {
                newBun = null;
            }

            return {
                ...state,
                order: {
                    ...state.order,
                    mainsAndSauces: copyMainsAndSauces,
                    bun: newBun

                }
            };

        }

        default: {
            return state;
        }
    }
};