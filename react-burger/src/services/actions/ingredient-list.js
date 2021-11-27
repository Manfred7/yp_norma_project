import {loadIngredientsData} from "../api";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const SET_CURRENT_TAB = "SET_CURRENT_TAB";
export const SET_TAB_HEADERS = "SET_TAB_HEADERS";
export const AFTER_ADD_TO_CONSTRUCTOR = "AFTER_ADD_TO_CONSTRUCTOR";
export const AFTER_REMOVE_FROM_CONSTRUCTOR = "AFTER_REMOVE_FROM_CONSTRUCTOR";
export const RESET_INGREDIENT_LIST = "RESET_INGREDIENT_LIST";

/*
export function getIngredientsData() {

    return function (dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        loadIngredientsData().then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        }).then(data => {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    ingredientsList: data.data
                })
            }
        ).catch(e => {
            dispatch({
                type: GET_ITEMS_ERROR
            });
        });
    };
}*/


const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsData() {

    return async function (dispatch) {

        dispatch({
            type: GET_ITEMS_REQUEST
        });

        try {

            const resData = await loadIngredientsData();
            const result = await checkResponse(resData);

            dispatch({
                type: GET_ITEMS_SUCCESS,
                ingredientsList: result.data
            })

        } catch (err) {
            dispatch({
                type: GET_ITEMS_ERROR
            });

        }

    };
}