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

export enum APP_ROUTS {
    ROOT = "/",
    LOGIN = "/login",
    REGISTRATION = "/register",
    FORGOT_PASSWORD = "/forgot-password",
    RESET_PASSWORD = "/reset-password",
    PROFILE = "/profile",
    INGREDIENT = "/ingredients/:id",
    ORDERS_LIST = "/profile/orders",
    OLD_ORDER = "/profile/orders:id",
    NOT_FOUND = "*"
};


export enum TOKENS {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
}
