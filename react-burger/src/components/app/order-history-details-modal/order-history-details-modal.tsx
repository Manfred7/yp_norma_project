import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "../../../services/hooks";
import {feedSelectors} from "../../../services/selectors/feed-selectors";
import {IIngredient, TFeedOrder} from "../../../utils/types";
import {ingredientsSelectors} from "../../../services/selectors/ingredients-list-selectors";
import {getFullOrderInfo} from "../../../utils/utils";
import OrderHistoryDetails from "../../order-history-details/order-history-details";
import Modal from "../../modal/modal";

const OrderHistoryDetailsModal = () => {
    const {id} = useParams();

    const currentOrder = useSelector(feedSelectors.getOrderById((id as string))) as TFeedOrder;

    const sourceIngredients = useSelector(ingredientsSelectors.ingredientsList) as Array<IIngredient>;

    let orderInfo = null;

    if ((currentOrder) && (sourceIngredients.length > 0)) {
        orderInfo = getFullOrderInfo(currentOrder, sourceIngredients);
    }

    const navigate = useNavigate()

    const handleCloseCurrentIngredientModal = () => {
        navigate(-1);
    }

    return (
        <>
            {(orderInfo) && (
                <Modal isOpen={true} header={`                 #${orderInfo.number}`}
                       onClose={handleCloseCurrentIngredientModal}>
                    <OrderHistoryDetails order={orderInfo}/>
                </Modal>
            )}

        </>
    );

};

export default OrderHistoryDetailsModal;
