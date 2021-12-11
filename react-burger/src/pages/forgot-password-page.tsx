import React, {FormEvent, useEffect} from 'react';
import s from "./forgot-password-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {APP_ROUTS} from "../utils/const";
import {doUserForgotPasswordOnServer, RESET_PASSWORD_INIT} from "../services/actions/auth";
import {useDispatch} from "react-redux";

const ForgotPasswordPage = () => {

    const [emailValue, setEmailValue] = React.useState('')
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setEmailValue(e.currentTarget.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        dispatch({
            type: RESET_PASSWORD_INIT
        })

    }, [dispatch]);

    const goToNextStep = () => {
        navigate(APP_ROUTS.RESET_PASSWORD);
    }

    const sendForgotPassword = (e:FormEvent) => {
        e.preventDefault();

        dispatch(doUserForgotPasswordOnServer(emailValue, goToNextStep));
    }

    return (

        <form className={s.mainContainer} onSubmit={sendForgotPassword}>

            <p className="text text_type_main-medium">Восстановление пароля</p>
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

            <div>
                <Button type="primary" size="small" >
                    Восстановить
                </Button>
            </div>


            <p className="text text_type_main-small pt-15">Вспомнили пароль?
                <Link className={s.link + " text text_type_main-small pl-2 pt-2"}
                      to={APP_ROUTS.LOGIN}>Войти</Link>
            </p>
        </form>
    );
};

export default ForgotPasswordPage;