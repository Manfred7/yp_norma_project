import {IIngredient} from "./types";

let lastId: number = 0;

export const getNewId = (): number => {
    const id = lastId;
    lastId = lastId + 1;

    return id
}


export const URL_BASE: string = "https://norma.nomoreparties.space";
export const URL_INGREDIENTS: string = "/api/ingredients";
export const URL_POST_ORDER: string = "/api/orders";

export const URL_POST_LOGIN: string = "/api/auth/login";
export const URL_POST_REGISTER: string = "/api/auth/register";
export const URL_POST_LOGOUT: string = "/api/auth/logout";
export const URL_POST_TOKEN: string = "/api/auth/token";
export const URL_USER_INFO: string = "/api/auth/user"


export const URL_PASSWORD_RESET_FORGOT = "/api/password-reset";
export const URL_PASSWORD_RESET = "/api/password-reset/reset";
