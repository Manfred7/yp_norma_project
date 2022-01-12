export enum TAB_CAPTIONS {
    BUN = "Булки",
    SAUCE = "Соусы",
    MAINS = "Начинки"
}

export enum INGREDIENT_TYPES {
    BUN = "bun",
    MAIN = "main",
    SAUCE = "sauce"
}

export enum DRAG_DROP_TYPE {
    FROM_LIST_TO_CONSTRUCTOR = "FROM_LIST_TO_CONSTRUCTOR",
    CONSTRUCTOR_SORT = "CONSTRUCTOR_SORT"
}

export const ORDER_STATUS: Record<string, string> = {
    "created": "Создан",
    "pending": " Готовится",
    "done": "Выполнен"
};

export enum APP_ROUTS {
    ROOT = "/",
    LOGIN = "/login",
    REGISTRATION = "/register",
    FORGOT_PASSWORD = "/forgot-password",
    RESET_PASSWORD = "/reset-password",
    PROFILE = "/profile",
    INGREDIENT_ID = "/ingredients/:id",
    ORDERS_HISTORY = "/profile/orders",
    ORDER_ID = "/profile/orders/:id",
    FEED = "/feed",
    FEED_ID = "/feed/:id",
    NOT_FOUND = "*"
};

export enum TOKENS {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
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

export const SOCKET_ORDERS_ALL_URL = 'wss://norma.nomoreparties.space/orders/all';
export const SOCKET_USER_ORDERS_URL = `wss://norma.nomoreparties.space/orders?`;

export const SIMPLE_DATE_FORMAT = 'dd/MM/yyyy HH:mm';
export const I_GMT_DATE_FORMAT = 'd.M.yyyy HH:mm  \'i-\'z';
export const I_GMT_TIME_FORMAT = 'HH:mm  \'i-\'z';

export const MAX_INGREDIENTS_LIST_IMAGE_COUNT = 5;
