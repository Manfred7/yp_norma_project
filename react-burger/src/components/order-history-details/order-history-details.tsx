import React, {FC} from 'react';
import s from './order-history-details.module.css'
import {IIngredient, TFeedExtendedOrderInfo} from "../../utils/types";

import {INGREDIENT_TYPES, ORDER_STATUS} from "../../utils/const";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getFormattedDateTime} from "../../utils/utils";

interface IOrderHistoryDetailsProps {
    order: TFeedExtendedOrderInfo
}

interface IOrderItemProps {
    ingredient: IIngredient;
}

const OrderItem: FC<IOrderItemProps> = ({ingredient}) => {
    return (
        <>
            <div className={s.orderItem}>

                <div className={s.itemImage}>
                    <img src={ingredient.image_mobile}
                         alt={ingredient.name}
                         width={60}
                         height={40}/>
                </div>

                <div className={s.itemName}>
                    {ingredient.name}
                </div>

                <div className={s.itemPrice}>
                    <div className="text text_type_digits-small mr-2">
                        {`${ingredient.price} `}

                    </div>
                    <div className="text text_type_digits-small mr-5">
                        {` X ${ingredient.__v}`}

                    </div>
                    <div className="text text_type_digits-small mr-2">
                        {`${ingredient.price * ingredient.__v}`}
                    </div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </>

    )
}

const aggregateData = (acc: { [key: string]: ReadonlyArray<IIngredient> }, elem: IIngredient) => {
    return {
        ...acc,
        [elem._id]: acc[elem._id]
            ? [...acc[elem._id], elem]
            : [elem]
    };
};

const groupOrderIngredients = (ingredients: ReadonlyArray<IIngredient>) => {

    const hashIngredients = ingredients.reduce(aggregateData, {});

    const getIngredientCount = (ingredient: IIngredient) => {

        if (ingredient.type === INGREDIENT_TYPES.BUN)
            return 2

        return (hashIngredients[ingredient._id] && hashIngredients[ingredient._id].length) || 0
    }

    const normalizedData: Array<IIngredient> = [];
    let preparedElement: IIngredient;

    ingredients.forEach((element) => {

            preparedElement = {
                ...element,
                __v: getIngredientCount(element)
            }

            if (!normalizedData.find((item) => item._id === preparedElement._id)) {
                normalizedData.push(preparedElement);
            }
        }
    );

    return normalizedData;
}

const OrderHistoryDetails: FC<IOrderHistoryDetailsProps> = ({order}) => {
    const preparedIngredients = groupOrderIngredients(order.ingredients);

    return (
        <div className={s.mainContainer}>

            <div className={s.headerBlock}>
                <h3 className={"text text_type_main-medium " + s.orderName}>{order.name}</h3>
                <p className={"text text_type_main-small " + s.orderStatus}>{ORDER_STATUS[order.status]}</p>
            </div>

            <div className={s.ingredientsBlock}>
                <div className={"text text_type_main-medium mt-2 " + s.ingredientBlockCaption}>
                    Состав:
                </div>

                <div className={s.scrollContainer}>
                    <ul className={s.catalogList}>
                        {preparedIngredients.map((elem: IIngredient) => {
                            return (
                                <OrderItem key={elem._id} ingredient={elem}/>
                            )
                        })}
                    </ul>
                </div>

            </div>
            <div className={s.footerBlock}>

                <p className="text text_type_main-default text_color_inactive">
                    {getFormattedDateTime(order.createdAt)}
                </p>

                <div className={s.priceContainer}>
                    <div className="text text_type_digits-small mr-2">
                        {order.totalPrice}
                    </div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>

        </div>
    );
};

export default OrderHistoryDetails;
