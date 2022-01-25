import React, {FC} from 'react';
import done from '../../images/done.svg'
import s from './order-details.module.css'

interface IOrderDetailsProps {
    orderId: string;
}

const OrderDetails: FC<IOrderDetailsProps> = (props) => {

    return (
        <div className={s.mainContainer}>
            <h3 data-cy="OrderDetails_Id" className="text text_type_digits-large">{props.orderId}</h3>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img className={s.doneIcon} src={done} alt={"done"}/>
            <p className="text text_type_main-small">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь заказа на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;
