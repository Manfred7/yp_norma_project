import {IOrderIngredient} from "../../utils/types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT"
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    value: IOrderIngredient;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    value: IOrderIngredient;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    dragIndex: number;
    hoverIndex: number;
}

export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
    IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IResetConstructorAction;
