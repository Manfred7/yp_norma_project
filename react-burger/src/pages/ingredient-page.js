import React from 'react';
import { useSelector} from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams} from "react-router-dom";
import {ingredientsSelectors} from "../services/selectors/ingredients-list-selectors";
import s from "./ingredient-page.module.css";

const IngredientPage = () => {

    const {id} = useParams();

    const currentIngredient = useSelector(ingredientsSelectors.item(id));

    return (
        <>
            {currentIngredient &&
            <div className={s.Card}>
                <h3 className={' text text_type_main-large mt-10 mr-10 ml-10'}>
                    Детали ингредиента
                </h3>
                <IngredientDetails details={currentIngredient}/>
            </div>
            }
        </>
    )

};

export default IngredientPage;

