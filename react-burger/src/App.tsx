import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {getTestData} from "./utils/data";
import PropTypes from 'prop-types';

function App() {
  const data = getTestData();



    return (
    <div className="App">
     <AppHeader/>
      <BurgerIngredients ingrs ={data}/>
      <BurgerConstructor/>

    </div>
  );
}

//BurgerIngredients.propTypes = {};

export default App;
