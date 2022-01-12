import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "../services/hooks";
import {feedSelectors} from "../services/selectors/feed-selectors";
import { IIngredient,  TFeedOrder} from "../utils/types";
import {ingredientsSelectors} from "../services/selectors/ingredients-list-selectors";
import {getFullOrderInfo, getUserOrdersWsURL} from "../utils/utils";
import {useParams} from "react-router-dom";

import OrderHistoryDetails from "../components/order-history-details/order-history-details";
import {WS_CONNECTION_DISCONNECT, WS_CONNECTION_START} from "../services/actions/wsActions";
import {SOCKET_ORDERS_ALL_URL, TOKENS} from "../utils/const";
import s from "./order-history-detail-page.module.css";

export enum THistoryDetailMode {
    userHistory,
    feed
}

export interface IOrderHistoryDetailPageProps {
    mode: THistoryDetailMode
}

const OrderHistoryDetailPage: FC<IOrderHistoryDetailPageProps> = ({mode}) => {

    const {id} = useParams();

    const currentOrder = useSelector(feedSelectors.getOrderById((id as string))) as TFeedOrder;

    const sourceIngredients = useSelector(ingredientsSelectors.ingredientsList) as Array<IIngredient>;

    let orderInfo = null;

    const needWsReconnect = useSelector(feedSelectors.needWsReconnect)
    const dispatch = useDispatch();




    useEffect(() => {
        const doConnect = (wsUrl: string) => {
            if (needWsReconnect) {
                dispatch({
                        type: WS_CONNECTION_START,
                        payload: wsUrl
                    }
                )
            }
        }

        if (mode === THistoryDetailMode.userHistory) {

            const accessToken = localStorage.getItem(TOKENS.ACCESS);

            if (accessToken) {
                doConnect(getUserOrdersWsURL(accessToken))
            }

        } else {
            doConnect(SOCKET_ORDERS_ALL_URL)
        }

        return () => {
            dispatch({ type: WS_CONNECTION_DISCONNECT })
        }

    }, [dispatch,mode,needWsReconnect]);

    if ((currentOrder) && (sourceIngredients.length > 0)) {
        orderInfo = getFullOrderInfo(currentOrder, sourceIngredients);
    }

    return (
        <>
            {(!orderInfo) && (
                <>
                    <h1>Идет загрузка!</h1>

                </>
            )}
            {(orderInfo) && (
                <div className={s.feedCard}>
                    <h1>#{orderInfo.number}</h1>
                    <OrderHistoryDetails order={orderInfo}/>
                </div>
            )}

        </>
    );
};

export default OrderHistoryDetailPage;
