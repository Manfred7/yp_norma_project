import React, {Component} from 'react';
import PropTypes from "prop-types";
import {IngredientType} from "../../utils/types.js"
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
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

    render() {
        return (
            <section>
                <ul className={s.scrollContainer + " " + s.catalogList}>

                    {this.props.ingrs.map((elem, idx) => {

                        return (
                            <li key={elem._id} className={s.catalogItem}>
                                <ConstructorElement
                                    type={this.getType(this.props.ingrs, idx)}
                                    isLocked={true}
                                    text={elem.name}
                                    price={elem.price}
                                    thumbnail={elem.image}
                                />
                            </li>
                        )

                    })}

                </ul>
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
