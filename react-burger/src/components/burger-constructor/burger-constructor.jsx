import React, {useContext, useEffect} from 'react';
import PropTypes from "prop-types";
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {BurgerContext} from "../../services/burger-context";

const Bun = (props) => {

    return (<div className={s.catalogItem}>
        <ConstructorElement
            type={props.type}
            isLocked={true}
            text={props.description}
            price={props.price}
            thumbnail={props.image}
        />
    </div>)
}

Bun.propTypes = {
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

const BurgerConstructor = () => {

    const [modalIsVisible, setModalIsVisible] = React.useState(false);
    const [needShowConfirm, setNeedShowConfirm] = React.useState(true);

    const {order, pushOrder} = useContext(BurgerContext);

    const totalSum = order.totalPrice;

    const currentBun = order.bun;
    const mainsAndSauces = [...order.mains, ...order.sauces];

    const sendOrder = () => {
        pushOrder();
        setNeedShowConfirm(true);
    }
    const handleOpenModal = () => {
        setModalIsVisible(true);
    }

    const handleCloseModal = () => {
        setModalIsVisible(false);
        setNeedShowConfirm(false);
    }
    useEffect(() => {
        if (order.success && needShowConfirm)
            handleOpenModal();
    })

    const fillIngrs = () => {

        return mainsAndSauces.map((elem) => {

            return (
                <li key={elem._id} className={s.catalogItem}>
                    <div className={s.mainsAndSaucesItem}>

                        <DragIcon type="primary"/>
                        <ConstructorElement
                            type={""}
                            isLocked={false}
                            text={elem.name}
                            price={elem.price}
                            thumbnail={elem.image}
                        />
                    </div>
                </li>
            )

        })
    }

    return (
        <section>
            <div className={s.bunContainer}>
                <Bun description={currentBun.name + " (верх)"}
                     image={currentBun.image}
                     type={"top"}
                     price={order.bunDisplayPrice}/>
            </div>

            <ul className={s.scrollContainer + " " + s.catalogList}>
                {fillIngrs()}
            </ul>

            <div className={s.bunContainer}>
                <Bun description={currentBun.name + " (низ)"}
                     image={currentBun.image}
                     type={"bottom"}
                     price={order.bunDisplayPrice}/>
            </div>

            <div className={s.totalConstainer}>
                <div className={s.totalSum}>
                    <p className="text text_type_digits-medium">
                        <CurrencyIcon type="primary"/> {totalSum}
                    </p>
                </div>

                <div style={{overflow: "hidden"}}>
                    <Button type="primary" size="large" onClick={sendOrder}>
                        Оформить заказ
                    </Button>
                    <Modal isOpen={modalIsVisible && needShowConfirm} onClose={handleCloseModal}>
                        <OrderDetails orderId={order.number}/>
                    </Modal>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;
