import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "../services/hooks";
import {feedSelectors} from "../services/selectors/feed-selectors";
import {
    WS_CONNECTION_DISCONNECT,
    WS_CONNECTION_START
} from "../services/actions/wsActions";
import s from "./feed-page.module.css"
import sApp from "../components/app/app.module.css";
import {IFeedMessage, TFeedExtendedOrderInfo} from "../utils/types";

import {ingredientsSelectors} from "../services/selectors/ingredients-list-selectors";
import {getDoneOrders, getFullOrderInfo, getPendingOrders,} from "../utils/utils";

import {SOCKET_ORDERS_ALL_URL} from "../utils/const";
import OrdersList from "../components/orders-list/orders-list";

const FeedPage = () => {

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

    const doneOrders = getDoneOrders(extendedOrderInfoArray);
    const pendingOrders = getPendingOrders(extendedOrderInfoArray);

    useEffect(() => {

        if (needWsReconnect) {
            dispatch(
                {
                    type: WS_CONNECTION_START,
                    payload: SOCKET_ORDERS_ALL_URL
                }
            )
        }

        return () => {
            dispatch({type: WS_CONNECTION_DISCONNECT})
        }

    }, [dispatch,needWsReconnect]);

    return (

        <main className={sApp.container}>
            <h1>Лента заказов</h1>
            <div className={sApp.mainBox}>
                <section className={s.leftBox}>

                    {(extendedOrderInfoArray.length > 0) && (
                        <OrdersList orders={extendedOrderInfoArray} showOrderStatus={false}/>
                    )}

                </section>
                <section className={s.rightBox}>
                    <div className={s.orderStatusBlock}>
                        <div className={s.doneBlock}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <ul className={s.catalogList}>
                                {doneOrders.map((elem: TFeedExtendedOrderInfo) => {
                                    return (
                                        <li key={elem._id} className={s.orderStatusDoneItem}>
                                            {elem.number}
                                        </li>)
                                })}
                            </ul>
                        </div>

                        <div className={s.inProgressBlock}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <ul className={s.catalogList}>
                                {pendingOrders.map((elem: TFeedExtendedOrderInfo) => {
                                    return (
                                        <li key={elem._id} className={s.orderStatusItem}>
                                            {elem.number}
                                        </li>)
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className={s.ordersTotalBlock}>

                        <div className={s.ordersTotalAll}>
                            <p className="text text_type_main-medium">Выполнено за все время: </p>
                            <p className="text text_type_digits-large">{feed?.total}</p>
                        </div>
                        <div className={s.ordersTotalToday}>
                            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                            <p className="text text_type_digits-large">{feed?.totalToday}</p>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default FeedPage;
