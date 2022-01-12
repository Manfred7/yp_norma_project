import React, {FC} from 'react';
import s from "../../pages/feed-page.module.css";
import {IIngredient, TFeedExtendedOrderInfo} from "../../utils/types";
import {useLocation, useNavigate} from "react-router-dom";
import {MAX_INGREDIENTS_LIST_IMAGE_COUNT, ORDER_STATUS} from "../../utils/const";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getFormattedDateTime} from "../../utils/utils";

interface IFeedOrderInfoProps {
    orderInfo: TFeedExtendedOrderInfo;
    showOrderStatus: boolean;
}

interface IIngredientImagesProps {
    ingredients: IIngredient[];
}

const IngredientImages = (props: IIngredientImagesProps) => {

    const printedIngredients = props.ingredients.slice(0, MAX_INGREDIENTS_LIST_IMAGE_COUNT);

    return (
        <div className={s.ingredientImages}>{
            printedIngredients.map((elem: IIngredient, idx) => {

                return (
                    <div className={s.ingredientImage} key={idx}>
                        <img src={elem.image_mobile}
                             alt={elem.name}
                             width={60}
                             height={40}/>

                    </div>)
            })


        }
            {props.ingredients.length > 5 && (
                <div className={s.ingredientImage}>
                    <img src={props.ingredients[MAX_INGREDIENTS_LIST_IMAGE_COUNT].image_mobile}
                         alt={props.ingredients[MAX_INGREDIENTS_LIST_IMAGE_COUNT].name}
                         width={60}
                         height={40}/>

                    <Counter count={props.ingredients.length - MAX_INGREDIENTS_LIST_IMAGE_COUNT} size="small"/>

                </div>)}

        </div>
    )
}

const FeedOrderInfo: FC<IFeedOrderInfoProps> = ({orderInfo, showOrderStatus}) => {

    const location = useLocation();

    const navigate = useNavigate();

    const showModal = () => {

        navigate(`${location.pathname}/${orderInfo._id}`, {
            state: {
                background: location
            }
        });

    }

    return (
        <li className={s.catalogItem} onClick={showModal}>

            <div className={s.ingredientBoxHeader}>

                <div className={s.ingredientBoxNumber}>
                    <p className="text text_type_digits-default">
                        {`#${orderInfo.number}`}
                    </p>
                </div>

                <div className={s.ingredientBoxDate}>
                    <p className="text text_type_main-small">
                        {getFormattedDateTime(orderInfo.createdAt)}

                    </p>
                </div>

            </div>

            <div className={s.ingredientBoxName}>
                <p className="text text_type_main-medium">
                    {orderInfo.name}
                </p>
                {showOrderStatus && (
                    <div>
                        <p className="text text_type_main-small mt-3">
                            {ORDER_STATUS[orderInfo.status]}
                        </p>
                    </div>

                )}
            </div>


            <div className={s.ingredientBoxFooter}>
                <IngredientImages ingredients={orderInfo.ingredients}/>

                <div className={s.priceContainer}>
                    <div className="text text_type_digits-small">
                        {orderInfo.totalPrice}
                    </div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </li>
    )
}

interface IOrderListProps {
    orders: TFeedExtendedOrderInfo[];
    showOrderStatus: boolean;
}

const OrdersList: FC<IOrderListProps> = ({orders, showOrderStatus}) => {
    return (

        <div className={s.scrollContainer}>
            <ul className={s.catalogList}>
                {orders.map((elem: TFeedExtendedOrderInfo) => {
                    return (
                        <FeedOrderInfo key={elem._id} orderInfo={elem} showOrderStatus={showOrderStatus}/>
                    )
                })}
            </ul>
        </div>)
};

export default OrdersList;
