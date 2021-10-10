import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {Component} from 'react';
import s from "./app-header.module.css"

// TODO: прикрутить из флексбокса равномерное распределение  элементов по горизонтали
// TODO: сверстать на nav header и прочих семантически шутках.
//TODO: списки лишками


const our = () => {
    return ''
}

class AppHeader extends Component {
    render() {
        return (
            <header className={s.mainHeader}>
                <nav className={s.mainHeaderNav + " " + s.container}>
                    <ul className={s.siteNavigation}>
                        <li className={s.siteNavigationItem}>
                            <BurgerIcon type="primary"/>
                            <a className={s.linkItem} href="#">Конструктор</a>
                        </li>
                        <li className={s.siteNavigationItem}>
                            <ListIcon type="primary"/>
                            <a className={s.linkItem} href="#">Лента заказов</a>
                        </li>
                    </ul>

                    <a className={s.mainHeaderLogo} href="index.html">
                        <Logo/>
                    </a>

                    <ul className={s.siteNavigation}>
                        <li className={s.siteNavigationItem}>
                            <ProfileIcon type="primary"/>
                            <a className={s.linkItem} href="#">Личный кабинет</a>
                        </li>
                    </ul>

                </nav>
            </header>

        )
    }
    }

    export default AppHeader;
