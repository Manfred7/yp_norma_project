import React, {FC, useRef} from 'react';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css"
import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT} from "../../services/actions/burger-constructor";
import {useDrag, useDrop} from "react-dnd";
import {AFTER_ADD_TO_CONSTRUCTOR, AFTER_REMOVE_FROM_CONSTRUCTOR} from "../../services/actions/ingredient-list";
import {sumPrice} from "../../utils/utils";
import {APP_ROUTS, DRAG_DROP_TYPE, INGREDIENT_TYPES} from "../../utils/const";
import {pushOrder} from "../../services/actions/order";
import {constructorSelectors} from "../../services/selectors/constructor-ingredients-selector";
import {useNavigate} from "react-router-dom";
import {authSelectors} from "../../services/selectors/auth-selector";
import {toast} from "react-toastify";
import {IOrderIngredient} from "../../utils/types";

type TOrderIngredientPropsType = {
    key: string;
    elem: IOrderIngredient;
    index: number;
};

type TConstructorSortItem = {
    index:number;
}

interface IBunProps {
    description: string;
    image: string;
    type?: 'top' | 'bottom';
    price: number;
}

const Bun = (props: IBunProps) => {

    return (<div className={s.catalogItem}>
        <ConstructorElement
            type={props.type}
            isLocked={true}
            text={props.description}
            price={props.price}
            thumbnail={props.image}
        />
    </div>)
}

const OrderIngredient:FC<TOrderIngredientPropsType>=(props) => {

    const {elem, index} = props;

    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    const doRemoveIngredient = (item: IOrderIngredient) => {

        dispatch({
            type: REMOVE_INGREDIENT,
            value: {...item},
        });

        dispatch({
            type: AFTER_REMOVE_FROM_CONSTRUCTOR,
            value: {...item}
        })
    }

    const moveCard = (dragIndex: number, hoverIndex: number) => {

        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        });

    }


    const [, drop] = useDrop({
        accept: DRAG_DROP_TYPE.CONSTRUCTOR_SORT,

        hover(item:TConstructorSortItem
              , monitor) {

            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;

            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            if (!hoverBoundingRect) return;

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag] = useDrag({
        type: DRAG_DROP_TYPE.CONSTRUCTOR_SORT,
        item: () => {
            return {index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <li ref={ref} className={s.catalogItem} style={{opacity}}>
            <div className={s.mainsAndSaucesItem}>
                <div className={s.draggableItem}>
                    <DragIcon type="primary"/>
                </div>
                <ConstructorElement
                    isLocked={false}
                    text={elem.name}
                    price={elem.price}
                    thumbnail={elem.image}
                    handleClose={() => doRemoveIngredient(elem)}
                />
            </div>
        </li>
    )
}

const BurgerConstructor = () => {

    const orderBody = useSelector(constructorSelectors.orderBody);

    const userIsAuth = useSelector(authSelectors.isAuth);

    const dispatch = useDispatch();

    const currentBun = orderBody.bun;
    const mainsAndSauces = orderBody.mainsAndSauces;

    let bunDisplayPrice = 0;
    let totalSum = sumPrice(mainsAndSauces);

    if (currentBun) {
        totalSum = totalSum + currentBun.price * 2;
        bunDisplayPrice = currentBun.price;
    }

    const navigate = useNavigate();

    const sendOrder = () => {

        if (!userIsAuth) {
            toast.info("Для регистрации заказа необходимо зайти в систему!");
            navigate(APP_ROUTS.LOGIN);
        } else {

            if (!currentBun) {
                toast.error("Необходимо добавить булку!");

                return
            }

            toast.info("Регистрируем заказ!");
            dispatch(pushOrder(orderBody));
        }
    }

    const fillIngrs = () => {

        return mainsAndSauces.map((elem: IOrderIngredient, index: number) => {
            return <OrderIngredient key={elem.innerId} elem={elem} index={index}/>

        })
    }

    const [, dropRef] = useDrop({
        accept: DRAG_DROP_TYPE.FROM_LIST_TO_CONSTRUCTOR,
        drop(item:IOrderIngredient) {

            if ((currentBun) && (item.type === INGREDIENT_TYPES.BUN)) {

                dispatch({
                    type: REMOVE_INGREDIENT,
                    value: {...currentBun}
                });

                dispatch({
                    type: AFTER_REMOVE_FROM_CONSTRUCTOR,
                    value: {...currentBun}
                });

                dispatch({
                    type: AFTER_REMOVE_FROM_CONSTRUCTOR,
                    value: {...currentBun}
                });


            }

            dispatch({
                type: ADD_INGREDIENT,
                value: {...item}

            });

            if (item.type === INGREDIENT_TYPES.BUN) {
                dispatch({
                    type: AFTER_ADD_TO_CONSTRUCTOR,
                    value: {...item}
                })
                dispatch({
                    type: AFTER_ADD_TO_CONSTRUCTOR,
                    value: {...item}
                })
            } else {
                dispatch({
                    type: AFTER_ADD_TO_CONSTRUCTOR,
                    value: {...item}
                })
            }
        }
    });

    return (
        <section ref={dropRef}>

            {currentBun &&
                <div className={s.bunContainer}>
                    <Bun key={1} description={currentBun.name + " (верх)"}
                         image={currentBun.image}
                         type={"top"}
                         price={bunDisplayPrice}/>
                </div>
            }

            <ul className={s.scrollContainer + " " + s.catalogList}>
                {fillIngrs()}
            </ul>


            {currentBun &&
                <div className={s.bunContainer}>
                    <Bun key={2} description={currentBun.name + " (низ)"}
                         image={currentBun.image}
                         type={"bottom"}
                         price={bunDisplayPrice}/>
                </div>
            }

            <div className={s.totalConstainer}>
                <div className={s.totalSum}>
                    <p className="text text_type_digits-medium">
                        <CurrencyIcon type="primary"/> {totalSum}
                    </p>
                </div>

                <div style={{overflow: "hidden"}}>
                    <Button type="primary" size="large" onClick={sendOrder}>
                        Оформить заказ
                    </Button>

                </div>
            </div>
        </section>
    );

}

export default BurgerConstructor;
