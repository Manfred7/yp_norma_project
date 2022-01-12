import React, {FC} from 'react';
import s from "./user-profile-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Outlet, useMatch} from "react-router-dom";
import {APP_ROUTS} from "../utils/const";
import {doLogoutFromServer, doUpdateUserInfo, END_EDIT_USER_INFO, START_EDIT_USER_INFO} from "../services/actions/auth";
import {useDispatch, useSelector} from "../services/hooks";
import {authSelectors} from "../services/selectors/auth-selector";
import {TNavLinkClassNameParam} from "../utils/types";

export const EditUserProfileForm: FC = () => {

    const dispatch = useDispatch();

    const userName = useSelector(authSelectors.name);
    const userEmail = useSelector(authSelectors.email);
    const userInfoChanged = useSelector(authSelectors.userInfoChanged);

    const SetUserInfoChanged = () => {
        if (userInfoChanged !== true) {
            dispatch(
                {type: START_EDIT_USER_INFO}
            );
        }
    }

    const [passwordValue, setPasswordValue] = React.useState('')

    const onPasswordValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
        SetUserInfoChanged();
    }

    const [userNameValue, setUserNameValue] = React.useState(userName);

    const onUserNameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserNameValue(e.target.value);

        SetUserInfoChanged();
    }

    const [emailValue, setEmailValue] = React.useState(userEmail);
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);

        SetUserInfoChanged();
    }

    const cancelUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        setEmailValue(userEmail);
        setUserNameValue(userName);
        setPasswordValue('');

        if (userInfoChanged !== false) {
            dispatch(
                {type: END_EDIT_USER_INFO}
            );
        }
    }

    const updateUserInfo = (e: React.FormEvent) => {

        e.preventDefault();

        const userInfo = {
            name: userNameValue,
            email: emailValue,
            password: passwordValue
        }

        dispatch(doUpdateUserInfo(userInfo));

    }

    return (

        <form className={s.mainContainer} onSubmit={updateUserInfo}>

            <div className={s.inputEmail}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onUserNameValueChange}
                    value={userNameValue}
                    name={'userNameInput'}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
            </div>

            <div className={s.inputEmail}>
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={onEmailChange}
                    value={emailValue}
                    name={'emailInput'}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
            </div>

            <div className={s.inputPassword}>

                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={onPasswordValueChange}
                    value={passwordValue}
                    name={'passwordInput'}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
            </div>

            {userInfoChanged && <div>
                <Button type="secondary" size="small" onClick={cancelUpdate}>
                    Отмена
                </Button>
                <Button type="primary" size="small">
                    Сохранить
                </Button>
            </div>
            }
        </form>
    )
}

const UserProfileNavigation: FC = () => {
    const dispatch = useDispatch();
    const isProfileEditRoute = useMatch(APP_ROUTS.PROFILE);

    const logoutClick = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(doLogoutFromServer());
    }
    const getTextClass = () => " text text_type_main-medium";

    const navLinkClassName = (param: TNavLinkClassNameParam): string => {

        const cn = param.isActive ? s.activeLink : s.link;
        return cn + getTextClass();
    }

    return (
        <>
            <div className={s.main}>
                <div className={s.nav + ' mr-15'}>
                    <NavLink
                        to={{pathname: APP_ROUTS.PROFILE}}
                        end
                        className={navLinkClassName}
                    >
                        Профиль
                    </NavLink>

                    <NavLink

                        to={{pathname: APP_ROUTS.ORDERS_HISTORY}}
                        end
                        className={navLinkClassName}
                    >
                        История заказов
                    </NavLink>

                    <div
                        className={s.exitLink + ' text text_type_main-medium'}
                        onClick={logoutClick}
                    >
                        Выход
                    </div>
                    {isProfileEditRoute &&

                        <p className={s.text + ' text text_type_main-default mt-20'}>
                            В этом разделе вы можете изменить свои персональные данные
                        </p>
                    }

                </div>
            </div>
            <Outlet/>
        </>
    );

}

const UserProfilePage = () => {
    return <UserProfileNavigation/>
};

export default UserProfilePage;
