import React, {FC, useEffect, useRef} from 'react';
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "../../utils/types"
import s from "./burger-ingredients.module.css"
import {useDispatch, useSelector} from "react-redux";
import {ingredientsSelectors} from "../../services/selectors/ingredients-list-selectors";
import {useDrag} from "react-dnd";
import {getBuns, getMains, getSauces} from "../../utils/utils";
import {SET_CURRENT_TAB, SET_TAB_HEADERS} from "../../services/actions/ingredient-list";
import { DRAG_DROP_TYPE, TAB_CAPTIONS} from "../../utils/const";
import {useLocation, useNavigate} from "react-router-dom";

const IngrTabs = () => {
    const dispatch = useDispatch();

    const bunElement = useSelector(ingredientsSelectors.tabHeadersElements).bunElement;
    const sauceElement = useSelector(ingredientsSelectors.tabHeadersElements).sauceElement;
    const mainElement = useSelector(ingredientsSelectors.tabHeadersElements).mainElement;
    const current = useSelector(ingredientsSelectors.currentTab);

    const setCurrent = (value:string) => {
        dispatch({type: SET_CURRENT_TAB, value: value});

        let scrollToElement = null;

        switch (value) {
            case TAB_CAPTIONS.BUN: {
                scrollToElement = bunElement;
                break;
            }
            case  TAB_CAPTIONS.SAUCE: {
                scrollToElement = sauceElement;
                break;
            }
            case  TAB_CAPTIONS.MAINS: {
                scrollToElement = mainElement;
                break;
            }
            default:
                scrollToElement = null;
        }

        if (scrollToElement) {
            scrollToElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    const arr = [
        {caption: TAB_CAPTIONS.BUN, id: 1}, {caption: TAB_CAPTIONS.SAUCE, id: 2}, {caption: TAB_CAPTIONS.MAINS, id: 3}
    ];

    return (
        <div style={{display: 'flex'}}>
            {arr.map((elem => {

                return <Tab key={elem.id}
                            value={elem.caption}
                            active={current === elem.caption}
                            onClick={setCurrent}>
                    {elem.caption}
                </Tab>

            }))}
        </div>
    )
}

interface  IIngredientProps{
    key:string;
    value:IIngredient
}
const Ingredient : FC<IIngredientProps> = ({value}) => {


    const [, dragRef] = useDrag({
        type: DRAG_DROP_TYPE.FROM_LIST_TO_CONSTRUCTOR,
        item: value
    });

    const location = useLocation();

    const navigate = useNavigate();

    const showModal = () => {

        navigate(`/ingredients/${value._id}`, {
            state: {
                background: location
            }
        });

    }

    return (
        <li ref={dragRef} className={s.catalogItem}>

            <img src={value.image} alt={value.name} onClick={showModal}/>

            <div className={s.priceContainer}>
                <p className="text text_type_main-small pr-1">
                    {value.price}
                </p>
                <CurrencyIcon type="primary"/>
            </div>

            <p className="text text_type_main-small">
                {value.name}
            </p>

            {value.__v > 0 &&
            <Counter count={value.__v} size="small"/>
            }
        </li>)
}


const BurgerIngredients = () => {

    const dispatch = useDispatch();
    const currentTab = useSelector(ingredientsSelectors.currentTab);
    const sourceIngredients = useSelector(ingredientsSelectors.ingredientsList);

    const refBuns = useRef<HTMLDivElement>(null);
    const refMains = useRef<HTMLDivElement>(null);
    const refSauces = useRef<HTMLDivElement>(null);
    const refContainer = useRef<HTMLDivElement>(null);

    const buns = getBuns(sourceIngredients);
    const mains = getMains(sourceIngredients);
    const sauces = getSauces(sourceIngredients);

    useEffect(() => {

        dispatch({
            type: SET_TAB_HEADERS,
            value: {
                bunElement: refBuns.current,
                sauceElement: refSauces.current,
                mainElement: refMains.current
            }
        });
    }, [dispatch])


    const scrollListener = () => {

        const container = refContainer.current;
        const bunElement = refBuns.current;
        const mainElement = refMains.current;
        const sauceElement = refSauces.current;

        if (!container || !bunElement || !sauceElement || !mainElement) {
            dispatch({type: SET_CURRENT_TAB, value: TAB_CAPTIONS.BUN});
            return;
        }
        const bunLength = Math.abs(
            container.getBoundingClientRect().top -
            bunElement.getBoundingClientRect().top
        );
        const sauceLength = Math.abs(
            container.getBoundingClientRect().top -
            sauceElement.getBoundingClientRect().top
        );
        const mainLength = Math.abs(
            container.getBoundingClientRect().top -
            mainElement.getBoundingClientRect().top
        );

        const rightTabLength = Math.min(bunLength, sauceLength, mainLength);

        const newTab = bunLength === rightTabLength
            ? TAB_CAPTIONS.BUN
            : sauceLength === rightTabLength
                ? TAB_CAPTIONS.SAUCE
                : TAB_CAPTIONS.MAINS;

        if (currentTab !== newTab) {
            dispatch({type: SET_CURRENT_TAB, value: newTab});
        }
    };


    return (
        <section>
            <IngrTabs/>

            <div ref={refContainer} onScroll={scrollListener} className={s.scrollContainer}>

                <div ref={refBuns}>
                    <h3 className={'text text_type_main-medium mt-5 '}>{TAB_CAPTIONS.BUN}</h3>
                    <ul className={s.catalogList}>
                        {buns.map((elem:IIngredient) => {
                            return (
                                <Ingredient key={elem._id} value={elem}/>
                            )
                        })}
                    </ul>
                </div>

                <div ref={refSauces}>
                    <h3 className={'text text_type_main-medium mt-5 '}>{TAB_CAPTIONS.SAUCE}</h3>
                    <ul className={s.catalogList}>
                        {sauces.map((elem:IIngredient) => {
                            return (
                                <Ingredient key={elem._id} value={elem}/>
                            )
                        })}
                    </ul>
                </div>

                <div ref={refMains}>
                    <h3 className={'text text_type_main-medium mt-5 '}>{TAB_CAPTIONS.MAINS}</h3>
                    <ul className={s.catalogList}>
                        {mains.map((elem:IIngredient) => {
                            return (
                                <Ingredient key={elem._id} value={elem}/>
                            )
                        })}
                    </ul>
                </div>
            </div>


        </section>
    );
}

export default BurgerIngredients;


