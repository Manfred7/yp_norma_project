import {
    URL_BASE,
    URL_INGREDIENTS,
    URL_PASSWORD_RESET,
    URL_PASSWORD_RESET_FORGOT,
    URL_POST_LOGIN,
    URL_POST_LOGOUT,
    URL_POST_ORDER,
    URL_POST_REGISTER,
    URL_POST_TOKEN,
    URL_USER_INFO
} from "../utils/const";

import {saveTokensToStorage} from "../utils/utils";
import {TOKENS} from "../utils/const";
import {
    IIngredient,
    ILoginResponse,
    IOrderBody,
    IPasswordResetParams,
    IUserInfo

} from "../utils/types";

export const checkResponse = async <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() as Promise<T> : res.json().then((err: string) => Promise.reject(err));
};

export const refreshToken = async () => {

    const refreshToken: string = localStorage.getItem(TOKENS.REFRESH) as string;

    return fetch(`${URL_BASE}${URL_POST_TOKEN}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: refreshToken,
        }),
    })
};

export const retriableFetch = async <T>(url: string, options: RequestInit): Promise<T | undefined> => {

    try {
        const res = await fetch(url, options);
        return checkResponse<T>(res);

    } catch (err) {

        if ((err instanceof Error) && (err.message === "jwt expired")) {

            const refreshData = await refreshToken();
            const data = await checkResponse<ILoginResponse>(refreshData);

            saveTokensToStorage(data);

            if ((options) && (options.headers instanceof Headers)) {
                options.headers.set('authorization', data.accessToken);
            }

            const res = await fetch(url, options); // повторяем оригинальный запрос с оригинальными options (+ дополнительным хедером)
            return checkResponse<T>(res);
        } else {

            throw err;
        }
    }
};


export const loadIngredientsData = async () => {
    return await fetch(`${URL_BASE}${URL_INGREDIENTS}`)
}

export const sendOrderToServer = async <T>(order: IOrderBody) => {

    const mainsAndSaucesIds = order.mainsAndSauces.map((val: IIngredient) => val._id);
    const ingredients = [order.bun?._id, ...mainsAndSaucesIds];

    return await retriableFetch<T>(`${URL_BASE}${URL_POST_ORDER}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + localStorage.getItem(TOKENS.ACCESS)
            },
            body: JSON.stringify({ingredients})
        })
}

export const registerUserOnServer = async (userInfo: IUserInfo) => {

    return await fetch(`${URL_BASE}${URL_POST_REGISTER}`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',

            body: JSON.stringify({email: userInfo.email, password: userInfo.password, name: userInfo.name})
        })
}

export const loginToServer = async (userInfo: IUserInfo) => {

    return await fetch(`${URL_BASE}${URL_POST_LOGIN}`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',

            body: JSON.stringify({email: userInfo.email, password: userInfo.password})
        })
}

export const passwordForgotRequest = async (email: string) => {

    return await fetch(`${URL_BASE}${URL_PASSWORD_RESET_FORGOT}`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',

            body: JSON.stringify({email: email})
        })
}

export const passwordResetRequest = async (userInfo: IPasswordResetParams) => {

    return await fetch(`${URL_BASE}${URL_PASSWORD_RESET}`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',

            body: JSON.stringify({token: userInfo.tokenFromEmail, password: userInfo.newPassword})
        })

}

export const logoutFromServer = async (token: string) => {

    return await fetch(`${URL_BASE}${URL_POST_LOGOUT}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({token})
        })
}

export const refreshTokenOnServer = async (refreshToken: string) => {
    const token = {refreshToken};

    return await fetch(`${URL_BASE}${URL_POST_TOKEN}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({token})
        })
}

export const getUserInfo = async <T>() => {

    const token = localStorage.getItem(TOKENS.ACCESS);

    return await retriableFetch<T>(`${URL_BASE}${URL_USER_INFO}`, {

        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',

        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        }

    })
}

export const updateUserInfo = async <T>(userInfo: IUserInfo): Promise<T | undefined> => {

    return await retriableFetch<T>(`${URL_BASE}${URL_USER_INFO}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + localStorage.getItem(TOKENS.ACCESS)
            },
            body: JSON.stringify({email: userInfo.email, password: userInfo.password, name: userInfo.name})
        })
}
