import React from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./login-page.module.css";
import {Link} from "react-router-dom";
import {APP_ROUTS} from "../utils/const";
import {useDispatch} from "react-redux";
import {doLoginUserOnServer} from "../services/actions/auth";
import {IUserInfo} from "../utils/types";

const LoginPage = () => {
    const [passwordValue, setPasswordValue] = React.useState('')
    const onPasswordValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const [emailValue, setEmailValue] = React.useState('')
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const dispatch = useDispatch();

    const sendLoginRequest = (evt: React.FormEvent) => {

        evt.preventDefault();

        const userInfo: IUserInfo = {
            email: emailValue,
            password: passwordValue,
            name: ""
        }

        dispatch(doLoginUserOnServer(userInfo));
    }

    return (

        <form className={s.mainContainer} onSubmit={sendLoginRequest}>
            <p className="text text_type_main-medium">Вход</p>
            <div className={s.inputEmail}>
                <Input
                    type={'email'}
                    placeholder={'email'}
                    onChange={onEmailChange}
                    value={emailValue}
                    name={'emailInput'}
                    error={false}
                    size={'default'}
                />
            </div>
            <div className={s.inputPassword}>
                <PasswordInput onChange={onPasswordValueChange} value={passwordValue} name={'passwordInput'}/>
            </div>

            <div>
                <Button type="primary" size="small">
                    Войти
                </Button>
            </div>

            <p className="text text_type_main-small pt-7">Вы новый пользователь?
                <Link className={s.link + " text text_type_main-small pl-2 pt-2"}
                      to={APP_ROUTS.REGISTRATION}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-small pt-2">Забыли пароль?
                <Link className={s.link + " text text_type_main-small pl-2 pt-2"}
                      to={APP_ROUTS.FORGOT_PASSWORD}>Восстановить пароль</Link>
            </p>
        </form>
    );
};

export default LoginPage;