import {
    checkResponse, getUserInfo,
    loginToServer, logoutFromServer,
    passwordForgotRequest,
    passwordResetRequest,

    registerUserOnServer, updateUserInfo
} from "../api";
import {toast} from "react-toastify";
import {clearStorage, saveTokensToStorage} from "../../utils/utils";
import {TOKENS} from "../../utils/const";
import {
    IPasswordResetParams,
    IUserInfo,
    TFunc,
    ILoginResponse,
    IMyCustomResponse,
    IUserInfoResponse, IUpdateUserInfoResponse, ILogoutFromServerResponse
} from "../../utils/types";

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const RESET_PASSWORD_INIT = 'RESET_PASSWORD_INIT';

export const RESET_PASSWORD_FORGOT_REQUEST = 'RESET_PASSWORD_FORGOT_REQUEST';
export const RESET_PASSWORD_FORGOT_SUCCESS = 'RESET_PASSWORD_FORGOT_SUCCESS';
export const RESET_PASSWORD_FORGOT_ERROR = 'RESET_PASSWORD_FORGOT_ERROR';

export const RESET_PASSWORD_RESET_REQUEST = 'RESET_PASSWORD_RESET_REQUEST';
export const RESET_PASSWORD_RESET_SUCCESS = 'RESET_PASSWORD_RESET_SUCCESS';
export const RESET_PASSWORD_RESET_ERROR = 'RESET_PASSWORD_RESET_ERROR';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const START_EDIT_USER_INFO = 'START_EDIT_USER_INFO';
export const END_EDIT_USER_INFO = 'END_EDIT_USER_INFO';
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_ERROR = 'UPDATE_USER_INFO_ERROR';

export function doRegistrationUserOnServer(userInfo: IUserInfo, goToNextStep: TFunc) {

    return async function (dispatch: any) {
        dispatch({
            type: REGISTRATION_REQUEST
        });

        try {
            const res = await registerUserOnServer(userInfo);
            const data = await checkResponse<ILoginResponse>(res);

            saveTokensToStorage(data);

            dispatch({
                type: REGISTRATION_SUCCESS,
                email: data.user.email,
                name: data.user.name,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken

            })

            toast.success(`${data.user.name} вы успешно зарегистрировались в системе!`);

            goToNextStep();

        } catch (e: any) {
            toast.error("При попытке регистрации произошла ошибка: " + e.message);

            dispatch({
                type: REGISTRATION_ERROR,
                err_msg: e
            });

        }

    };
}

export function doLoginUserOnServer(userInfo: IUserInfo) {

    return async function (dispatch: any) {

        dispatch({
            type: LOGIN_REQUEST
        });

        try {
            const result = await loginToServer(userInfo);
            const data = await checkResponse(result) as ILoginResponse;

            saveTokensToStorage(data);

            dispatch({
                type: LOGIN_SUCCESS,
                email: data.user.email,
                name: data.user.name,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken

            })

            toast.success(data.user.name + " Вы успешно зашли в систему! ");

        } catch (e: any) {

            dispatch({
                type: LOGIN_ERROR,
                err_msg: e
            });

            toast.error("При попытке авторизации произошла ошибка: " + e.message);
        }

    };
}

export function doUserForgotPasswordOnServer(email: string, nextStep: TFunc) {


    return async function (dispatch: any) {

        dispatch({
            type: RESET_PASSWORD_FORGOT_REQUEST
        });
        try {

            const res = await passwordForgotRequest(email);
            const result = await checkResponse<IMyCustomResponse>(res);

            dispatch({
                type: RESET_PASSWORD_FORGOT_SUCCESS,
                requestSuccess: result.success,
                message: result.message,
            })

            toast.success("Код для восстановления пароля отправлен на почту: " + email);
            nextStep();
        } catch (e: any) {

            toast.error("При запросе кода для сброса пароля произошла ошибка!" + e.message);
            dispatch({
                type: RESET_PASSWORD_FORGOT_ERROR,
                err_msg: e
            });

        }

    };
}

export function doUserResetPasswordOnServer(userInfo: IPasswordResetParams, goToNextStep: TFunc) {

    return async function (dispatch: any) {

        dispatch({
            type: RESET_PASSWORD_RESET_REQUEST
        });

        try {

            const res = await passwordResetRequest(userInfo);
            const result = await checkResponse<IMyCustomResponse>(res);

            dispatch({
                type: RESET_PASSWORD_RESET_SUCCESS,
                requestSuccess: result.success,
                message: result.message,
            })

            toast.success("Пароль успешно изменен!");

            goToNextStep();

        } catch (e: any) {


            dispatch({
                type: RESET_PASSWORD_RESET_ERROR,
                err_msg: e
            });

            toast.error("При установке нового пароля произошла ошибка:  " + e.message);
        }

    }
}

export function doGetUserInfo() {

    return async function (dispatch: any) {

        dispatch({
            type: GET_USER_INFO_REQUEST
        });

        try {

            const result = await getUserInfo<IUserInfoResponse>() as IUserInfoResponse;

            dispatch({
                type: GET_USER_INFO_SUCCESS,
                requestSuccess: result.success,
                email: result.user.email,
                name: result.user.name
            })

        } catch (e: any) {


            dispatch({
                type: GET_USER_INFO_ERROR,
                err_msg: e
            });

            toast.error("При запросе данных о пользователе произошла ошибка:  " + e.message);
        }

    }

}

export function doUpdateUserInfo(userInfo: IUserInfo) {

    return async function (dispatch: any) {

        dispatch({
            type: UPDATE_USER_INFO_REQUEST
        });

        try {

            const result = await updateUserInfo<IUpdateUserInfoResponse>(userInfo) as IUpdateUserInfoResponse ;

             dispatch({
                type: UPDATE_USER_INFO_SUCCESS,
                requestSuccess: result.success,
                email: result.user.email,
                name: result.user.name
            })

            toast.success("Данные успешно изменены!");


        } catch (e: any) {


            dispatch({
                type: UPDATE_USER_INFO_ERROR,
                err_msg: e
            });

            toast.error("При запросе данных о пользователе произошла ошибка:  " + e.message);
        }

    }

}

export function doLogoutFromServer() {

    return async function (dispatch: any) {

        dispatch({
            type: LOGOUT_REQUEST
        });

        try {

            const token: string = localStorage.getItem(TOKENS.REFRESH) as string;
            const result = await logoutFromServer(token);
            const data = await checkResponse<ILogoutFromServerResponse>(result);

            dispatch({
                type: LOGOUT_SUCCESS,
                requestSuccess: data.success,
                message: data.message
            })

            clearStorage();

            toast.success("Вы успешно вышли из системы: " + data.message);

        } catch (e: any) {

            dispatch({
                type: LOGOUT_ERROR,
                err_msg: e
            });

            toast.error("При выходе из системы произошла ошибка:  " + e.message);
        }

    }

}