import './App.css';
import AppHeader from "./components/app-header/app-header.jsx";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "./components/burger-constructor/burger-constructor.jsx";
import {getTestData} from "./utils/data";

function App() {
    const data = getTestData();

    return (
        <>
            <AppHeader/>
            <main className={"container"}>
                <h1>Соберите бургер</h1>
                <div className={"mainBox"}>
                    <BurgerIngredients ingrs={data}/>
                    <BurgerConstructor ingrs={data}/>

                </div>
            </main>
            <footer>

            </footer>
        </>
    );
}

export default App;
