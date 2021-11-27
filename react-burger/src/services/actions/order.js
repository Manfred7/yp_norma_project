import {  sendOrderToServer} from "../api";
import {toast} from "react-toastify";

export const ORDER_CONFIRMATION_SUCCESS = "ORDER_CONFIRMATION_SUCCESS";
export const ORDER_CONFIRMATION_ERROR = "ORDER_CONFIRMATION_ERROR";
export const ORDER_CONFIRMATION_REQUEST = "ORDER_CONFIRMATION_REQUEST";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export function pushOrder(order) {

    return async function (dispatch) {

        dispatch({
            type: ORDER_CONFIRMATION_REQUEST
        });

        try {
            const res = await sendOrderToServer(order);
            //const result = await checkResponse(res);

            dispatch({
                type: ORDER_CONFIRMATION_SUCCESS,
                result: {
                    name: res.name,
                    order: {number: res.order.number},
                    success: res.success
                }
            })

            toast.success(`Заказ ${res.order.number}  успешно зарегистрирован в системе!`);

        } catch (e) {

            dispatch({
                type: ORDER_CONFIRMATION_ERROR,
                result: {
                    errorMsg: e
                }
            })

            toast.error("При попытке регистрации заказа произошла ошибка: " + e.message);
        }

    }
}