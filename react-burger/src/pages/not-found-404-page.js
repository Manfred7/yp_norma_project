import React from 'react';
import s from "./not-found-404-page.module.css"

const NotFound404Page = () => {

    return (
        <div className={s.mainContainer}>
            <h2 className={" text text_type_main-medium"}>Страница не найдена!</h2>
        </div>
    );
};

export default NotFound404Page;