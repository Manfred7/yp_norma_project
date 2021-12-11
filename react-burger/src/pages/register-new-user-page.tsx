import React from 'react';
import s from "./register-new-user-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {APP_ROUTS} from "../utils/const";

import {useDispatch} from "react-redux";
import {doRegistrationUserOnServer} from "../services/actions/auth";
import {IUserInfo} from "../utils/types";

const RegisterNewUserPage = () => {


    const [passwordValue, setPasswordValue] = React.useState('')
    const onPasswordValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const [userNameValue, setUserNameValue] = React.useState('')
    const onUserNameValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserNameValue(e.target.value)
    }

    const [emailValue, setEmailValue] = React.useState('')
    const onEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goToNextStep = () => {
        navigate(APP_ROUTS.ROOT);
    }

    const sendRegistrationRequest = (evt:React.FormEvent) => {

         evt.preventDefault(); //отставить сабмитить

        const userInfo:IUserInfo = {
            name: userNameValue,
            email: emailValue,
            password: passwordValue
        }


        dispatch(doRegistrationUserOnServer(userInfo, goToNextStep));
    }
    return (

        <form className={s.mainContainer} onSubmit={sendRegistrationRequest}>
            <p className="text text_type_main-medium">Регистрация</p>

            <div className={s.inputEmail}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onUserNameValueChange}
                    value={userNameValue}
                    name={'userNameInput'}
                    error={false}
                    size={'default'}
                />
            </div>

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
                <Button type="primary" size="small" >
                    Зарегистрироватся
                </Button>
            </div>

            <p className="text text_type_main-small pt-15">Уже зарегистрированы?
                <Link className={s.link +  " text text_type_main-small pl-2 pt-2"}
                      to={APP_ROUTS.LOGIN}>Войти</Link>
            </p>
        </form>
    );
};

export default RegisterNewUserPage;