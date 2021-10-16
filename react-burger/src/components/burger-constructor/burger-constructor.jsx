import React from 'react';
import PropTypes from "prop-types";
import {IngredientType} from "../../utils/types.js"
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

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

const BurgerConstructor = (props) => {

    const [modalIsVisible, setModalIsVisible] = React.useState(false);
    const totalSum = 610;

    const getIngrsByType = (arr, ingrType) => {
        return arr.filter((elem) => elem.type === ingrType)
    }
    const getBuns = (arr) => {
        return getIngrsByType(arr, "bun");
    }

    const getMainsAndSauces = (arr) => {
        return arr.filter((elem) => elem.type !== "bun")
    }

    const currentBun = getBuns(props.ingrs)[0];
    console.log("currentBun", props);

    const mainsAndSauces = getMainsAndSauces(props.ingrs);


    const handleOpenModal = () => {
        setModalIsVisible(true);
    }

    const handleCloseModal = () => {
        setModalIsVisible(false);
    }
    const fillIngrs = () => {

        return mainsAndSauces.map((elem) => {

            return (
                <li key={elem._id} className={s.catalogItem}>
                    <div className={s.mainsAndSaucesItem}>

                        <DragIcon type="primary"/>
                        <ConstructorElement
                            type={"top"}
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
            <Bun description={currentBun.name + " (верх)"}
                 image={currentBun.image}
                 type={"top"}
                 price={currentBun.price}/>

            <ul className={s.scrollContainer + " " + s.catalogList}>
                {fillIngrs()}
            </ul>

            <Bun description={currentBun.name + " (низ)"}
                 image={currentBun.image}
                 type={"bottom"}
                 price={currentBun.price}/>

            <div className={s.totalConstainer}>
                <div className={s.totalSum}>
                    <p className="text text_type_digits-medium">
                        <CurrencyIcon type="primary"/> {totalSum}
                    </p>
                </div>

                <div style={{overflow: "hidden"}}>
                    <Button type="primary" size="large" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                    <Modal isOpen={modalIsVisible} onClose={handleCloseModal}>
                        <OrderDetails orderId={"034536"}/>
                    </Modal>
                </div>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingrs: PropTypes.arrayOf(IngredientType.isRequired).isRequired
};

export default BurgerConstructor;
