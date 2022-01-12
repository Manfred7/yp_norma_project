import {store} from "../services/store";
import {TAuthActions} from "../services/actions/auth";
import {TBurgerConstructorActions} from "../services/actions/burger-constructor";
import {TIngredientListAction} from "../services/actions/ingredient-list";
import {TOrderActions} from "../services/actions/order";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {TWSActions} from "../services/actions/wsActions";

export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type IIngredientElementRef = React.RefObject<HTMLDivElement> | null;

export interface ITabHeadersElements {
    bunElement: IIngredientElementRef;
    sauceElement: IIngredientElementRef;
    mainElement: IIngredientElementRef;
}

export interface IOrderIngredient extends IIngredient {
    innerId: string;
}

export interface IPasswordResetParams {
    tokenFromEmail: string;
    newPassword: string;
}

export interface ITokenData {
    refreshToken: string;
    accessToken: string;
}

export interface IUserInfo {
    name: string,
    email: string,
    password: string
}

export interface IMyCustomResponse {
    message?: string;
    headers?: Headers;
    success: boolean;
}

export interface IIngredientsDataResponse extends IMyCustomResponse {
    data: Array<IIngredient>
};

export interface IOwner {
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
}

export interface IServerResponseOrder {
    createdAt: string;
    ingredients: Array<IIngredient>;
    name: string;
    number: number;
    owner: IOwner;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IOrderRegistrationResponse extends IMyCustomResponse {
    name: string;
    order: IServerResponseOrder;
}

export interface ILogoutFromServerResponse extends IMyCustomResponse {
}

export interface ILoginResponse extends IMyCustomResponse {
    user: IUserInfo;
    refreshToken: string;
    accessToken: string;
}

export interface IUpdateUserInfoResponse extends ILoginResponse {
}

export interface IUserInfoResponse extends ILoginResponse {
}

export interface IOrderBody {
    bun: IIngredient | null;
    mainsAndSauces: Array<IIngredient>
}

export type TFunc = () => void;

export type TNavLinkClassNameParam = {
    isActive: boolean;
};


export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TAuthActions
    | TBurgerConstructorActions
    | TIngredientListAction
    | TOrderActions
    | TWSActions;

export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type TAppDispatch = Dispatch<TApplicationActions>;  /*typeof store.dispatch;*/


export interface IFeedCustomOrder<T>{
    ingredients: Array<T>;
    _id: string;
    status: string;
    number: string;
    createdAt: string;
    updatedAt: string;
    name: string;
}
export type TFeedOrder = IFeedCustomOrder<string>;

export type TFeedExtendedOrderInfo  = IFeedCustomOrder<IIngredient> & {totalPrice : number};

export interface IFeedMessage {
    success: boolean;
    orders: Array<TFeedOrder>;
    total: number;
    totalToday: number;
}
