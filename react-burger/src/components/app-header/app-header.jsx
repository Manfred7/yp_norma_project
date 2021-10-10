import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React  from 'react';
import s from "./app-header.module.css"

const AppHeader = () => {

    return (
        <header className={s.mainHeader}>
            <nav className={s.mainHeaderNav + " " + s.container}>
                <ul className={s.siteNavigation}>
                    <li className={s.siteNavigationItem}>
                        <BurgerIcon type="primary"/>
                        <a className={s.linkItem} href="index.html">Конструктор</a>
                    </li>
                    <li className={s.siteNavigationItem}>
                        <ListIcon type="primary"/>
                        <a className={s.linkItem} href="index.html">Лента заказов</a>
                    </li>
                </ul>

                <a className={s.mainHeaderLogo} href="index.html">
                    <Logo/>
                </a>

                <ul className={s.siteNavigation}>
                    <li className={s.siteNavigationItem}>
                        <ProfileIcon type="primary"/>
                        <a className={s.linkItem} href="index.html">Личный кабинет</a>
                    </li>
                </ul>

            </nav>
        </header>

    )
}


export default AppHeader;
