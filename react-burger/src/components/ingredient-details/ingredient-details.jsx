import React from 'react';
import {IngredientType} from "../../utils/types.js"
import s from "./ingredient-details.module.css"

const IngredientDetails = (props) => {
    const details = props.ingr;

    return (
        <div className={s.mainContainer}>
            <img src={details.image} alt={details.name}/>
            <h3 className="text text_type_main-medium">{details.name}</h3>

            <div className={`${s.gridContainer} text text_type_main-default text_color_inactive`}>
                <div className={s.box1}>Калории, ккал</div>
                <div className={s.box2}>Белки, г</div>
                <div className={s.box3}>Жиры, г</div>
                <div className={s.box4}>Углеводы, г</div>
                <div className={s.box5}>{details.calories} </div>
                <div className={s.box6}>{details.proteins} </div>
                <div className={s.box7}>{details.fat} </div>
                <div className={s.box8}>{details.carbohydrates} </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingr: IngredientType.isRequired
};

export default IngredientDetails;


