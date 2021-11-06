import {sendOrderToServer} from "../api";


export const ORDER_CONFIRMATION_SUCCESS = "ORDER_CONFIRMATION_SUCCESS";
export const ORDER_CONFIRMATION_ERROR = "ORDER_CONFIRMATION_ERROR";
export const ORDER_CONFIRMATION_REQUEST = "ORDER_CONFIRMATION_REQUEST";
export const CLOSE_ORDER_MODAL="CLOSE_ORDER_MODAL";

export function pushOrder(order) {

    return function (dispatch) {

        dispatch({
            type: ORDER_CONFIRMATION_REQUEST
        });

        sendOrderToServer(order)
            .then((res) => {

                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка ${res.status}`);

            })
            .then((data) => {

                if (data.success) {

                    dispatch({
                        type: ORDER_CONFIRMATION_SUCCESS,
                        result: {
                            name: data.name,
                            order: {number: data.order.number},
                            success: data.success
                        }
                    })

                } else {
                    return Promise.reject(`Не удалось подтвердить заказ.`);
                }
            })
            .catch((e) => {
                dispatch({
                    type: ORDER_CONFIRMATION_ERROR,
                    result: {
                        errorMsg: e
                    }
                })
            });

    }
}