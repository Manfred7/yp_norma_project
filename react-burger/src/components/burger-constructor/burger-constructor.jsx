import React, {Component} from 'react';
import PropTypes from "prop-types";
import {IngredientType} from "../../utils/types.js"
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css"

class BurgerConstructor extends Component {

    constructor() {
        super();
        this.totalSum = 610;
    }

    getType = (arr, idx) => {
        if (idx === 0)
            return 'top';

        if (idx === arr.length - 1)
            return 'bottom';

        return ''
    }

    getIngrsByType = (arr, ingrType) => {
        return arr.filter((elem) => elem.type === ingrType)
    }
    getBuns = (arr) => {
        return this.getIngrsByType(arr, "bun");
    }

    getMainsAndSauces = (arr) => {
        return arr.filter((elem) => elem.type !== "bun")
    }

    render() {

        const currentBun = this.getBuns(this.props.ingrs)[0];
        const mainsAndSauces = this.getMainsAndSauces(this.props.ingrs);

        return (
            <section>

                <div className={s.catalogItem}>
                    <ConstructorElement
                        type={"top"}
                        isLocked={true}
                        text={currentBun.name + " (верх)"}
                        price={currentBun.price}
                        thumbnail={currentBun.image}
                    />
                </div>

                <ul className={s.scrollContainer + " " + s.catalogList}>

                    {mainsAndSauces.map((elem, idx) => {

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

                    })}

                </ul>

                <div className={s.catalogItem}>
                    <ConstructorElement
                        type={"bottom"}
                        isLocked={true}
                        text={currentBun.name + " (низ)"}
                        price={currentBun.price}
                        thumbnail={currentBun.image}
                    />
                </div>

                <div className={s.totalConstainer}>

                    <div className={s.totalSum}>
                        <p className="text text_type_digits-medium">
                            <CurrencyIcon type="primary"/> {this.totalSum}
                        </p>
                    </div>

                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>

                </div>

            </section>


        );
    }
}

BurgerConstructor.propTypes = {
    ingrs: PropTypes.arrayOf(IngredientType.isRequired).isRequired
};
export default BurgerConstructor;
