import {RESET_INGREDIENT_LIST} from "../actions/ingredient-list";
import {authReducer} from "./auth-reducer";
import {
    END_EDIT_USER_INFO,
    GET_USER_INFO_ERROR,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS,
    REGISTRATION_ERROR,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RESET_PASSWORD_FORGOT_ERROR,
    RESET_PASSWORD_FORGOT_REQUEST,
    RESET_PASSWORD_FORGOT_SUCCESS,
    RESET_PASSWORD_INIT,
    RESET_PASSWORD_RESET_ERROR,
    RESET_PASSWORD_RESET_REQUEST,
    RESET_PASSWORD_RESET_SUCCESS,
    START_EDIT_USER_INFO, UPDATE_USER_INFO_ERROR, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS
} from "../actions/auth";

const initialState = {
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

describe('auth-reducer-test', () => {

    it('should return the initial state', () => {

        const expectedAction = {
            type: RESET_INGREDIENT_LIST
        }

        expect(authReducer(undefined, expectedAction)).toEqual(initialState)
    })

    it('should REGISTRATION_REQUEST', () => {

        const expectedAction = {
            type: REGISTRATION_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            isLoading: true,
            needReload: false
        };

        expect(newState).toEqual(validState);
    })

    it('should REGISTRATION_SUCCESS', () => {

        const result = {
            email: "user@test.ru",
            name: "test_user",
            accessToken: "#12345qwertyuiop",
            refreshToken: "#09876543qwertyuiop21"
        }

        const expectedAction = {
            type: REGISTRATION_SUCCESS,
            email: result.email,
            name: result.name,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,

            email: result.email,
            name: result.name,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,

            password: "",
            hasError: false,
            isLoading: false,
            isAuth: true
        };

        expect(newState).toEqual(validState);
    })


    it('should REGISTRATION_ERROR', () => {

        const message = 'При регистрации пользователя возникла ошибка!';

        const expectedAction = {
            type: REGISTRATION_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })

    it('should LOGIN_REQUEST', () => {

        const expectedAction = {
            type: LOGIN_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            isLoading: true,
            needReload: false
        };

        expect(newState).toEqual(validState);
    })
    it('should LOGIN_SUCCESS', () => {

        const result = {
            email: "user@test.ru",
            name: "test_user",
            accessToken: "#12345qwertyuiop",
            refreshToken: "#09876543qwertyuiop21"
        }

        const expectedAction = {
            type: LOGIN_SUCCESS,
            email: result.email,
            name: result.name,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,

            email: result.email,
            name: result.name,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,

            password: "",
            hasError: false,
            isLoading: false,
            isAuth: true
        };

        expect(newState).toEqual(validState);
    })
    it('should LOGIN_ERROR', () => {

        const message = 'При авторизации пользователя возникла ошибка!';

        const expectedAction = {
            type: LOGIN_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })

    it('should RESET_PASSWORD_INIT', () => {

        const expectedAction = {
            type: RESET_PASSWORD_INIT
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
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

        expect(newState).toEqual(validState);
    })


    it('should RESET_PASSWORD_FORGOT_REQUEST', () => {

        const expectedAction = {
            type: RESET_PASSWORD_FORGOT_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            forgotPassword: {
                ...prevState.forgotPassword,
                requested: true
            }
        };

        expect(newState).toEqual(validState);
    })

    it('should RESET_PASSWORD_FORGOT_SUCCESS', () => {

        const result = {
            requestSuccess: true,
            message: "Ссылка для сброса пароля отправлена на почту!",
        }

        const expectedAction = {
            type: RESET_PASSWORD_FORGOT_SUCCESS,
            requestSuccess: result.requestSuccess,
            message: result.message
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            forgotPassword: {
                ...prevState.forgotPassword,
                requestSuccess: result.requestSuccess,
                message: result.message,
            }
        };

        expect(newState).toEqual(validState);
    })

    it('should RESET_PASSWORD_FORGOT_ERROR', () => {

        const message = 'При сбросе пароля возникла ошибка!';

        const expectedAction = {
            type: RESET_PASSWORD_FORGOT_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })


    it('should RESET_PASSWORD_RESET_REQUEST', () => {

        const expectedAction = {
            type: RESET_PASSWORD_RESET_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            resetPassword: {
                ...prevState.resetPassword,
                requested: true
            }
        };

        expect(newState).toEqual(validState);
    })
    it('should RESET_PASSWORD_RESET_SUCCESS', () => {

        const result = {
            requestSuccess: true,
            message: "Пароль успешно сброшен!",
        }

        const expectedAction = {
            type: RESET_PASSWORD_RESET_SUCCESS,
            requestSuccess: result.requestSuccess,
            message: result.message
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            resetPassword: {
                ...prevState.resetPassword,
                requestSuccess: result.requestSuccess,
                message: result.message,
            }
        };

        expect(newState).toEqual(validState);
    })

    it('should RESET_PASSWORD_RESET_ERROR', () => {

        const message = 'При сбросе пароля возникла ошибка!';

        const expectedAction = {
            type: RESET_PASSWORD_RESET_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })

    it('should GET_USER_INFO_REQUEST', () => {

        const expectedAction = {
            type: GET_USER_INFO_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            isLoading: true,
            needReload: false
        };

        expect(newState).toEqual(validState);
    })

    it('should GET_USER_INFO_SUCCESS', () => {

        const result = {
            email: "user@test.ru",
            name: "test_user",
        }

        const expectedAction = {
            type: GET_USER_INFO_SUCCESS,
            email: result.email,
            name: result.name
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            email: result.email,
            name: result.name,

            password: "",
            hasError: false,
            isLoading: false,
            isAuth: true
        };

        expect(newState).toEqual(validState);
    })

    it('should GET_USER_INFO_ERROR', () => {

        const message = 'При получении данных пользователя возникла ошибка!';

        const expectedAction = {
            type: GET_USER_INFO_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })

    it('should START_EDIT_USER_INFO', () => {

        const expectedAction = {
            type: START_EDIT_USER_INFO
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            userInfoChanged: true
        };

        expect(newState).toEqual(validState);
    })

    it('should END_EDIT_USER_INFO', () => {

        const expectedAction = {
            type: END_EDIT_USER_INFO
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...prevState,
            userInfoChanged: false
        };

        expect(newState).toEqual(validState);
    })

    it('should UPDATE_USER_INFO_REQUEST', () => {

        const expectedAction = {
            type: UPDATE_USER_INFO_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            isLoading: true,
            needReload: false
        };

        expect(newState).toEqual(validState);
    })

    it('should UPDATE_USER_INFO_SUCCESS', () => {

        const result = {
            email: "user@test.ru",
            name: "test_user"
        }

        const expectedAction = {
            type: UPDATE_USER_INFO_SUCCESS,
            email: result.email,
            name: result.name
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,

            email: result.email,
            name: result.name,
            userInfoChanged: false,

            password: "",
            hasError: false,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })

    it('should UPDATE_USER_INFO_ERROR', () => {

        const message = 'При обновлении данных пользователя возникла ошибка!';

        const expectedAction = {
            type: UPDATE_USER_INFO_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })

    it('should LOGOUT_REQUEST', () => {

        const expectedAction = {
            type: LOGOUT_REQUEST
        }

        const prevState = {
            ...initialState
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState,
            isLoading: true,
            needReload: false
        };

        expect(newState).toEqual(validState);
    })

    it('should UPDATE_USER_INFO_SUCCESS', () => {

        const expectedAction = {
            type: LOGOUT_SUCCESS
        }

        const prevState = {
            ...initialState,
            isAuth: true,
            email: "user@test.ru",
            name: "test_user",
        };

        const newState = authReducer(prevState, expectedAction);

        const validState = {
            ...initialState
        };

        expect(newState).toEqual(validState);
    })

    it('should LOGOUT_ERROR', () => {

        const message = 'При попытке выйти из системы возникла ошибка!';

        const expectedAction = {
            type: LOGOUT_ERROR,
            err_msg: message
        }

        const newState = authReducer(initialState, expectedAction);

        const validState = {
            ...initialState,
            hasError: true,
            errorMsg: message,
            isLoading: false
        };

        expect(newState).toEqual(validState);
    })
})
