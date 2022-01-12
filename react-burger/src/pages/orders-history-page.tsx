import React, {FC, useEffect} from 'react';
import s from "./user-profile-page.module.css"
import {useDispatch, useSelector} from "../services/hooks";
import {feedSelectors} from "../services/selectors/feed-selectors";
import {IFeedMessage, TFeedExtendedOrderInfo} from "../utils/types";
import {ingredientsSelectors} from "../services/selectors/ingredients-list-selectors";
import {getFullOrderInfo, getUserOrdersWsURL} from "../utils/utils";
import {WS_CONNECTION_DISCONNECT, WS_CONNECTION_START} from "../services/actions/wsActions";
import OrdersList from "../components/orders-list/orders-list";
import {TOKENS} from "../utils/const";

const OrdersHistoryPage: FC = () => {

    const feed = useSelector(feedSelectors.feedData) as IFeedMessage;

    const needWsReconnect = useSelector(feedSelectors.needWsReconnect)
    const dispatch = useDispatch();

    const sourceIngredients = useSelector(ingredientsSelectors.ingredientsList);

    let extendedOrderInfoArray: Array<TFeedExtendedOrderInfo> = [];


    if (feed && feed.orders && sourceIngredients) {

        for (const order of feed.orders) {
            const fullOrderInfo = getFullOrderInfo(order, sourceIngredients);
            extendedOrderInfoArray.push(fullOrderInfo);
        }
    }

    useEffect(() => {

        const accessToken = localStorage.getItem(TOKENS.ACCESS);

        if (accessToken) {

            if (needWsReconnect) {
                dispatch({
                        type: WS_CONNECTION_START,
                        payload: getUserOrdersWsURL(accessToken)
                    }
                )
            }
        }

        return () => {
            dispatch({ type: WS_CONNECTION_DISCONNECT })
        }

    }, [dispatch,needWsReconnect]);
    return (
        <div className={s.mainContainer + ' text text_type_main-medium mt-5'}>

            <section>
                {(extendedOrderInfoArray.length > 0) && (
                    <OrdersList orders={extendedOrderInfoArray} showOrderStatus={true}/>
                )}
            </section>
        </div>
    );
};

export default OrdersHistoryPage;
