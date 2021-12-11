import React, {FC} from 'react';
import s from "./ingredient-details.module.css"
import {IIngredient} from "../../utils/types";

interface  IIngredientDetailsProps {
    details:IIngredient
}

const IngredientDetails: FC<IIngredientDetailsProps>= ({details}) => {

    return (
        <div className={s.mainContainer}>
            <img src={details.image} alt={details.name}/>
            <h3 className="text text_type_main-medium">{details.name}</h3>

            <div className={`${s.gridContainer} text text_type_main-default text_color_inactive`}>
                <p className={`${s.box1} text text_type_main-default`}>Калории, ккал</p>
                <p className={`${s.box2} text text_type_main-default`}>Белки, г</p>
                <p className={`${s.box3} text text_type_main-default`}>Жиры, г</p>
                <p className={`${s.box4} text text_type_main-default`}>Углеводы, г</p>
                <p className={`${s.box5} text text_type_digits-default`}>{details.calories} </p>
                <p className={`${s.box6} text text_type_digits-default`}>{details.proteins} </p>
                <p className={`${s.box7} text text_type_digits-default`}>{details.fat} </p>
                <p className={`${s.box8} text text_type_digits-default`}>{details.carbohydrates} </p>
            </div>
        </div>
    )

};




export default IngredientDetails;


