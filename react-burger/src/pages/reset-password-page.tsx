import React from 'react';
import s from "./reset-password-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {APP_ROUTS} from "../utils/const";
import {useDispatch} from "react-redux";
import { doUserResetPasswordOnServer} from "../services/actions/auth";


const ResetPasswordPage = () => {

    const [passwordValue, setPasswordValue] = React.useState('')
    const onPasswordValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const [emailCodeValue, setEmailCodeValue] = React.useState('')
    const onEmailCodeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmailCodeValue(e.target.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToNextStep = () => {
        navigate(APP_ROUTS.LOGIN);
    }
    const sendResetPassword = (e:React.FormEvent) => {
        e.preventDefault();

        const userInfo = {
            tokenFromEmail: emailCodeValue,
            newPassword: passwordValue
        }

        dispatch(doUserResetPasswordOnServer(userInfo, goToNextStep));

    }
    return (

        <form className={s.mainContainer} onSubmit={sendResetPassword}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <div className={s.inputPassword}>
                <PasswordInput onChange={onPasswordValueChange} value={passwordValue} name={'passwordInput'}/>
            </div>

            <div className={s.inputEmail}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onEmailCodeChange}
                    value={emailCodeValue}
                    name={'emailCodeInput'}
                    error={false}
                    size={'default'}
                />
            </div>

            <div>
                <Button type="primary" size="small" >
                    Сохранить
                </Button>
            </div>

            <p className="text text_type_main-small pt-15">Вспомнили пароль?
                <Link className={s.link +  " text text_type_main-small pl-2 pt-2"}
                      to={APP_ROUTS.LOGIN}>Войти</Link>
            </p>
        </form>
    );
};

export default ResetPasswordPage;