import {
    END_EDIT_USER_INFO,
    GET_USER_INFO_ERROR,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTRATION_ERROR,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RESET_PASSWORD_FORGOT_ERROR,
    RESET_PASSWORD_FORGOT_REQUEST,
    RESET_PASSWORD_FORGOT_SUCCESS,
    RESET_PASSWORD_INIT,
    RESET_PASSWORD_RESET_ERROR,
    RESET_PASSWORD_RESET_REQUEST,
    RESET_PASSWORD_RESET_SUCCESS, START_EDIT_USER_INFO, TAuthActions,
    UPDATE_USER_INFO_ERROR,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS
} from "../actions/auth";

interface IResetPasswordStatus {
    requested: boolean,
    requestSuccess: boolean,
    message: string;
}

interface IAuthState {
    email: string;
    name: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    isLoading: boolean;
    hasError: boolean;
    errorMsg: string;
    isAuth: boolean;
    userInfoChanged: boolean;
    forgotPassword: IResetPasswordStatus;
    resetPassword: IResetPasswordStatus;
}

const initialState: IAuthState = {
    email: "",
    name: "",
    password: "",
    accessToken: "",
    refreshToken: "",
    isLoading: false,
    hasError: false,
    errorMsg: "",
    isAuth: false,
    userInfoChanged: false,

    forgotPassword: {
        requested: false,
        requestSuccess: false,
        message: ""
    },

    resetPassword: {
        requested: false,
        requestSuccess: false,
        message: ""
    }
};

export const authReducer = (state:IAuthState = initialState, action : TAuthActions) => {

    switch (action.type) {

        case REGISTRATION_REQUEST: {

            return {
                ...initialState,
                isLoading: true,
                needReload: false
            };
        }

        case REGISTRATION_SUCCESS: {
            return {
                ...state,

                email: action.email,
                name: action.name,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,

                password: "",
                hasError: false,
                isLoading: false,
                isAuth: true
            };
        }

        case REGISTRATION_ERROR: {
            return {
                ...initialState, hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }

        case LOGIN_REQUEST: {
            return {
                ...initialState,
                isLoading: true,
                needReload: false
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,

                email: action.email,
                name: action.name,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,

                password: "",
                hasError: false,
                isLoading: false,
                isAuth: true
            };
        }

        case LOGIN_ERROR: {
            return {
                ...initialState, hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }

        case RESET_PASSWORD_INIT : {
            return {

                ...state,
                forgotPassword: {
                    requested: false,
                    requestSuccess: false,
                    message: ""
                },

                resetPassword: {
                    requested: false,
                    requestSuccess: false,
                    message: ""
                }
            };

        }

        case RESET_PASSWORD_FORGOT_REQUEST: {

            return {
                ...state,
                forgotPassword: {
                    ...state.forgotPassword,
                    requested: true
                }
            };
        }

        case RESET_PASSWORD_FORGOT_SUCCESS: {
            return {
                ...state,
                forgotPassword: {
                    ...state.forgotPassword,
                    requestSuccess: action.requestSuccess,
                    message: action.message,
                }
            };
        }

        case RESET_PASSWORD_FORGOT_ERROR: {
            return {
                ...initialState, hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }


        case RESET_PASSWORD_RESET_REQUEST: {

            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    requested: true
                }
            };
        }

        case RESET_PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    requestSuccess: action.requestSuccess,
                    message: action.message,
                }
            };
        }

        case RESET_PASSWORD_RESET_ERROR: {
            return {
                ...initialState, hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }


        case GET_USER_INFO_REQUEST: {

            return {
                ...initialState,
                isLoading: true,
                needReload: false
            };
        }

        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,

                email: action.email,
                name: action.name,

                password: "",
                hasError: false,
                isLoading: false,
                isAuth: true
            };
        }

        case GET_USER_INFO_ERROR: {
            return {
                ...initialState,
                hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }

        case START_EDIT_USER_INFO: {
            return {
                ...state,
                userInfoChanged: true
            };
        }

        case END_EDIT_USER_INFO: {
            return {
                ...state,
                userInfoChanged: false
            };

        }

        case UPDATE_USER_INFO_REQUEST: {

            return {
                ...state,
                isLoading: true,
                needReload: false
            };
        }

        case UPDATE_USER_INFO_SUCCESS: {
            return {

                ...state,

                email: action.email,
                name: action.name,
                userInfoChanged: false,

                password: "",
                hasError: false,
                isLoading: false
            };
        }

        case UPDATE_USER_INFO_ERROR: {
            return {
                ...state,

                hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }

        case LOGOUT_REQUEST: {

            return {
                ...state,
                isLoading: true,
                needReload: false
            };
        }

        case LOGOUT_SUCCESS: {
            return {
                ...initialState
            };
        }

        case LOGOUT_ERROR: {
            return {
                ...initialState,
                hasError: true,
                errorMsg: action.err_msg,
                isLoading: false
            };
        }


        default: {
            return state;
        }
    }
};