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
} from "../utils/data";

import {saveTokensToStorage} from "../utils/utils";
import {TOKENS} from "../utils/const";

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {

    const refreshToken = localStorage.getItem(TOKENS.REFRESH);

    return fetch(`${URL_BASE}${URL_POST_TOKEN}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: refreshToken,
        }),
    }).then(checkResponse);
};

export const retriableFetch = async (url, options = {}) => {

    try {
        const res = await fetch(url, options);
        const result = await checkResponse(res);

        return result;
    } catch (err) {

        if (err.message === "jwt expired") {

            const refreshData = await refreshToken();

            saveTokensToStorage(refreshData);

            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); // повторяем оригинальный запрос с оригинальными options (+ дополнительным хедером)
            return await checkResponse(res); // если все равно проваливаемся -- значит не судьба :/
        } else {
            throw err;
        }
    }
};

export const loadIngredientsData = async () => {
    return await fetch(`${URL_BASE}${URL_INGREDIENTS}`)
}

export const sendOrderToServer = async (order) => {

    const mainsAndSaucesIds = order.mainsAndSauces.map((val) => val._id);
    const ingredients = [order.bun._id, ...mainsAndSaucesIds];

    return await retriableFetch(`${URL_BASE}${URL_POST_ORDER}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + localStorage.getItem(TOKENS.ACCESS)
            },
            body: JSON.stringify({ingredients})
        })
}

export const registerUserOnServer = async (userInfo) => {

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

export const loginToServer = async (userInfo) => {

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

export const passwordForgotRequest = async (email) => {

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

export const passwordResetRequest = async (userInfo) => {

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

export const logoutFromServer = async (token) => {

    return await fetch(`${URL_BASE}${URL_POST_LOGOUT}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({token})
        })
}

export const refreshTokenOnServer = async (refreshToken) => {
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

export const getUserInfo = async () => {

    const token = localStorage.getItem(TOKENS.ACCESS);

    return await retriableFetch(`${URL_BASE}${URL_USER_INFO}`, {

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

export const updateUserInfo = async (userInfo) => {

    return await retriableFetch(`${URL_BASE}${URL_USER_INFO}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + localStorage.getItem(TOKENS.ACCESS)
            },
            body: JSON.stringify({email: userInfo.email, password: userInfo.password, name: userInfo.name})
        })
}