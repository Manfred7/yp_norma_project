import React, {useState} from 'react';
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {IngredientType} from "../../utils/types.js"
import s from "./burger-ingredients.module.css"
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const IngrTabs = () => {
    const [current, setCurrent] = useState("Булки")
    const arr = [
        {caption: "Булки", id: 1}, {caption: "Соусы", id: 2}, {caption: "Начинки", id: 3}
    ];
    return (
        <div style={{display: 'flex'}}>
            {arr.map((elem => {

                return <Tab key={elem.id}
                            value={elem.caption}
                            active={current === elem.caption}
                            onClick={setCurrent}>
                    {elem.caption}
                </Tab>

            }))}
        </div>
    )
}

const Ingridient = ({source}) => {
    const [modalIsVisible, setModalIsVisible] = React.useState(false);

    const handleOpenModal = () => {
        setModalIsVisible(true);
    }

    const handleCloseModal = () => {
        setModalIsVisible(!modalIsVisible);
    }

    return (
        <li className={s.catalogItem}>

            <img src={source.image} alt={source.name} onClick={handleOpenModal}/>

            <div className={s.priceConstainer}>

                <p className="text text_type_main-small pr-1">
                    {source.price}
                </p>
                <CurrencyIcon type="primary"/>
            </div>

            <p className="text text_type_main-small">
                {source.name}
            </p>

            <Modal isOpen={modalIsVisible} header="Детали ингридиента" onClose={handleCloseModal}>
                <IngredientDetails ingr={source}/>
            </Modal>

        </li>)
}

Ingridient.propTypes = {
    source: PropTypes.objectOf(IngredientType.isRequired).isRequired
};

const BurgerIngredients = (props) => {

    return (
        <section>
            <IngrTabs/>
            <div className={s.scrollContainer}>
                <ul className={s.catalogList}>
                    {props.ingrs.map((elem => {
                        return (
                            <Ingridient key={elem._id} source={elem}/>
                        )
                    }))}
                </ul>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingrs: PropTypes.arrayOf(IngredientType.isRequired).isRequired
};

export default BurgerIngredients;


