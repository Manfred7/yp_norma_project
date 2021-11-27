import React from 'react';
import { useSelector} from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useNavigate, useParams} from "react-router-dom";

import Modal from "../modal/modal";
import {ingredientsSelectors} from "../../services/selectors/ingredients-list-selectors";

const IngredientModal = () => {

    const {id} = useParams();
    let currentIngredient = useSelector(ingredientsSelectors.item(id));

    const navigate = useNavigate()

    const handleCloseCurrentIngredientModal = () => {
        navigate(-1);
    }

    return (
        <>
            {currentIngredient &&
            <Modal isOpen={true} header="Детали ингредиента"
                   onClose={handleCloseCurrentIngredientModal}>
                <IngredientDetails details={currentIngredient}/>
            </Modal>
            }
        </>
    )

};

export default IngredientModal;

