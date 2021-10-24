import React, {useContext, useState} from 'react';
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {IngredientType} from "../../utils/types.js"
import s from "./burger-ingredients.module.css"
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../services/burger-context";

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

const Ingredient = ({value, showDetail}) => {

    const showModal = () => {
        showDetail(value)
    }

    return (
        <li className={s.catalogItem}>

            <img src={value.image} alt={value.name} onClick={showModal}/>

            <div className={s.priceContainer}>
                <p className="text text_type_main-small pr-1">
                    {value.price}
                </p>
                <CurrencyIcon type="primary"/>
            </div>

            <p className="text text_type_main-small">
                {value.name}
            </p>

        </li>)
}

Ingredient.propTypes = {
    value: IngredientType.isRequired,
    showDetail: PropTypes.func.isRequired
};

const BurgerIngredients = () => {
    const [modalIsVisible, setModalIsVisible] = React.useState(false);
    const [currentIngredient, setCurrentIngredient] = React.useState(null);

    const {sourceIngredients} = useContext(BurgerContext);

    const setCurrentAndOpenModal = (value) => {
        setCurrentIngredient(value);
        setModalIsVisible(true);
    }

    const handleCloseModal = () => {
        setModalIsVisible(!modalIsVisible);
    }

    return (
        <section>
            <IngrTabs/>
            <div className={s.scrollContainer}>
                <ul className={s.catalogList}>
                    {sourceIngredients.map((elem => {
                        return (
                            <Ingredient key={elem._id} value={elem} showDetail={setCurrentAndOpenModal}/>
                        )
                    }))}
                </ul>
            </div>
            {
                currentIngredient &&
                <Modal isOpen={modalIsVisible} header="Детали ингридиента" onClose={handleCloseModal}>
                    <IngredientDetails ingr={currentIngredient}/>
                </Modal>
            }
        </section>
    );
}

export default BurgerIngredients;


