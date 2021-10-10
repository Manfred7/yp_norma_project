import s from './app.module.css';
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import {getTestData} from "../../utils/data";

function App() {
    const data = getTestData();

    return (
        <>
            <AppHeader/>
            <main className={s.container}>
                <h1>Соберите бургер</h1>
                <div className={s.mainBox}>
                    <BurgerIngredients ingrs={data}/>
                    <BurgerConstructor ingrs={data}/>
                </div>
            </main>
        </>
    );
}

export default App;
