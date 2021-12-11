import {  sendOrderToServer} from "../api";
import {toast} from "react-toastify";
import {IOrderBody, IOrderRegistrationResponse} from "../../utils/types";

export const ORDER_CONFIRMATION_SUCCESS = "ORDER_CONFIRMATION_SUCCESS";
export const ORDER_CONFIRMATION_ERROR = "ORDER_CONFIRMATION_ERROR";
export const ORDER_CONFIRMATION_REQUEST = "ORDER_CONFIRMATION_REQUEST";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export function pushOrder(order:IOrderBody) {

    return async function (dispatch:any) {

        dispatch({
            type: ORDER_CONFIRMATION_REQUEST
        });

        try {
            const res = await sendOrderToServer<IOrderRegistrationResponse>(order) as IOrderRegistrationResponse;

            dispatch({
                type: ORDER_CONFIRMATION_SUCCESS,
                result: {
                    name: res.name,
                    order: {number: res.order.number},
                    success: res.success
                }
            })

            toast.success(`Заказ ${res.order.number}  успешно зарегистрирован в системе!`);

        } catch (e:any) {

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