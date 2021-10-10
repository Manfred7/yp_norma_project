import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {Component} from 'react';
import s from "./app-header.module.css"

// TODO: прикрутить из флексбокса равномерное распределение  элементов по горизонтали
// TODO: сверстать на nav header и прочих семантически шутках.
//TODO: списки лишками
class AppHeader extends Component {
    render() {
        return (
            <div className={s.main +" "+ "mt-5"}>
                <div className={s.item}>
                    <BurgerIcon type="primary"/>
                    Конструктор
                </div>
                <div className={s.item}>
                    <ListIcon type="primary"/>
                    Лента заказов
                </div>
                <div className={s.item}>
                    <Logo/>
                </div>
                <div className={s.item}>
                    <ProfileIcon type="primary"/>
                    Личный кабинет
                </div>
            </div>
        );
    }
}

export default AppHeader;
