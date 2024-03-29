import React from 'react';
import {useSelector} from "../../services/hooks";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useNavigate, useParams} from "react-router-dom";

import Modal from "../modal/modal";
import {ingredientsSelectors} from "../../services/selectors/ingredients-list-selectors";
import {IIngredient} from "../../utils/types";

const IngredientModal = () => {

    const {id } = useParams() ;
    const currentIngredient = useSelector(ingredientsSelectors.item(id as string)) as IIngredient;

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

