import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import s from "./app-header.module.css"
import {NavLink} from "react-router-dom";
import {APP_ROUTS} from "../../utils/const";

const AppHeader = () => {

    const getTextClass = () => " text text_type_main-default pl-2 pt-2";

    const navLinkClassName = ({isActive}) => {

        const cn = isActive ? s.activeLink : s.linkItem;
        return cn + getTextClass();
    }

    return (
        <header className={s.mainHeader}>
            <nav className={s.mainHeaderNav + " " + s.container}>
                <ul className={s.siteNavigation}>
                    <li className={s.siteNavigationItem}>
                        <BurgerIcon type="primary"/>
                        <NavLink className={navLinkClassName}
                                 to={APP_ROUTS.ROOT} >
                            Конструктор
                        </NavLink>

                    </li>
                    <li className={s.siteNavigationItem}>
                        <ListIcon type="primary"/>
                        <NavLink className={navLinkClassName}
                                 to={APP_ROUTS.ORDERS_LIST} >
                            Лента заказов
                        </NavLink>

                    </li>
                </ul>

                <NavLink className={navLinkClassName}
                         to={APP_ROUTS.ROOT} >
                    <Logo/>
                </NavLink>


                <ul className={s.siteNavigation}>
                    <li className={s.siteNavigationItem}>
                        <ProfileIcon type="primary"/>
                        <NavLink className={navLinkClassName}
                                 to={APP_ROUTS.PROFILE} >
                            Личный кабинет
                        </NavLink>
                    </li>
                </ul>

            </nav>

        </header>

    )
}


export default AppHeader;
