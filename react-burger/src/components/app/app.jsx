import React from 'react';
import s from './app.module.css';
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import {URL_BASE, URL_INGREDIENTS} from "../../utils/data";

const App=() =>{
    const [state, setState] = React.useState({hasError: false, isLoading: false, ingredientsData: null});

    const LoadIngedientsData = () => {
        setState({...state, hasError: false, isLoading: true});

        fetch(`${URL_BASE}${URL_INGREDIENTS}`)
            .then(res => res.json())
            .then(data => setState({...state, ingredientsData: data.data, isLoading: false}))
            .catch(e => {
                setState({...state, hasError: true, isLoading: false});
            });
    };

    React.useEffect(() => {
        LoadIngedientsData();
    }, [])

    return (
        <>
            <AppHeader/>
            {state.isLoading && <div>Идет загузка данных!</div>}
            {state.hasError && <div>При попытке получения данных от сервера произошла ошибка!</div>}
            {!state.isLoading && !state.hasError && state.ingredientsData &&
            <main className={s.container}>
                <h1>Соберите бургер</h1>
                <div className={s.mainBox}>
                    <BurgerIngredients ingrs={state.ingredientsData}/>
                    <BurgerConstructor ingrs={state.ingredientsData}/>
                </div>
            </main>
            }
        </>
    );
}

export default App;
