import {I_GMT_DATE_FORMAT, I_GMT_TIME_FORMAT, INGREDIENT_TYPES, SOCKET_USER_ORDERS_URL, TOKENS} from "./const";
import {IIngredient, ITokenData, TFeedExtendedOrderInfo, TFeedOrder} from "./types";
import {format} from "date-fns-tz";

import {parseJSON, isToday, isYesterday} from 'date-fns'

let lastId: number = 0;

export enum ORDER_STATUS {
    CREATED = "created",
    PENDING = "pending",
    DONE = "done"
}

const MIN_ORDER_INDEX = 0;
const MAX_ORDER_INDEX = 9;

export const getNewId = (): string => {
    const id = lastId;
    lastId = lastId + 1;

    return id.toString();
}

const getRandomInt = (max: number) => Math.floor(Math.random() * (max));

const getRandomArrayElement = (array: Array<IIngredient>) => array[getRandomInt(array.length)];

const tossCoin = () => {
    return (getRandomInt(2) === 1);
}

const getRandomArray = (sourceArray: Array<IIngredient>) => {

    let resultArr = [];

    for (let i = 0; i < sourceArray.length; i++) {
        if (tossCoin()) {
            resultArr.push(sourceArray[i]);
        }
    }

    return resultArr;
};


const getIngrsByType = (arr: Array<IIngredient>, ingrType: string) => {
    return arr.filter((elem) => elem.type === ingrType)
}

const getOrderByType = (arr: Array<TFeedExtendedOrderInfo>, status: string) => {
    const filtredArr = arr.filter((elem) => elem.status === status);

    return filtredArr.slice(MIN_ORDER_INDEX, MAX_ORDER_INDEX);
}

export const getDoneOrders = (arr: Array<TFeedExtendedOrderInfo>) => {
    return getOrderByType(arr, ORDER_STATUS.DONE);
}
export const getPendingOrders = (arr: Array<TFeedExtendedOrderInfo>) => {
    return getOrderByType(arr, ORDER_STATUS.PENDING);
}

export const getBuns = (arr: Array<IIngredient>) => {
    return getIngrsByType(arr, INGREDIENT_TYPES.BUN);
}

export const getMains = (arr: Array<IIngredient>) => {
    return getIngrsByType(arr, INGREDIENT_TYPES.MAIN);
}

export const getSauces = (arr: Array<IIngredient>) => {
    return getIngrsByType(arr, INGREDIENT_TYPES.SAUCE);
}

export const sumPrice = (arr: Array<IIngredient>) => {
    let result = 0;

    arr.forEach((item) => {
        result = result + item.price
    })

    return result
}

export const sumAllIngredientPrice = (arr: Array<IIngredient>) => {
    let result = 0;

    arr.forEach((item) => {
        if (item.type === INGREDIENT_TYPES.BUN) {
            result = result + item.price * 2
        } else {
            result = result + item.price
        }
    })

    return result
}

export const getFormattedDateTime = (value: string) => {

    const dateValue: Date = parseJSON(value);
    if (isToday(dateValue)) {
        return 'Сегодня, ' + format(dateValue, I_GMT_TIME_FORMAT, {timeZone: 'Europe/Moscow'})
    }

    if (isYesterday(dateValue)) {
        return 'Вчера, ' + format(dateValue, I_GMT_TIME_FORMAT, {timeZone: 'Europe/Moscow'})
    }
    return format(dateValue, I_GMT_DATE_FORMAT, {timeZone: 'Europe/Moscow'})
}
export const getUserOrdersWsURL = (token: string) => {
    return SOCKET_USER_ORDERS_URL + `token=${token}`
}
export const generateTestOrder = (sourceData: Array<IIngredient>) => {

    const buns: Array<IIngredient> = getBuns(sourceData);
    const randomBun = getRandomArrayElement(buns);

    const mains: Array<IIngredient> = getMains(sourceData);
    const randomMains: Array<IIngredient> = getRandomArray(mains);
    const mainsIds: Array<string> = randomMains.map((val) => val._id);

    const sauces: Array<IIngredient> = getSauces(sourceData);
    const randomSauces: Array<IIngredient> = getRandomArray(sauces);
    const saucesIds: Array<string> = randomSauces.map((val) => val._id);
    const mainsPrice: number = sumPrice(randomMains);
    const saucesPrice: number = sumPrice(randomSauces);

    const bunDisplayPrice: number = randomBun.price / 2;

    const totalPrice: number = randomBun.price + mainsPrice + saucesPrice;

    return {
        bun: randomBun,
        mains: randomMains,
        mainsIds: mainsIds,
        saucesIds: saucesIds,
        sauces: randomSauces,
        totalPrice: totalPrice,
        bunDisplayPrice: bunDisplayPrice,
        number: -1,
        success: false,
        hasError: false,
        errMsg: ""
    };
}


export const saveTokensToStorage = (data: ITokenData) => {

    let authToken = "";
    if (data.accessToken.indexOf('Bearer') === 0) {
        authToken = data.accessToken.split('Bearer ')[1];
    }

    const refreshToken = data.refreshToken;

    localStorage.setItem(TOKENS.ACCESS, authToken);
    localStorage.setItem(TOKENS.REFRESH, refreshToken);
}

export const clearStorage = () => {
    localStorage.clear();
}

export const getIngredientsInfoArrayByIdArray = (idArray: Array<string>, ingredientsList: Array<IIngredient>) => {

    let resultArray: Array<IIngredient> = [];

    for (const ingredientId of idArray) {
        let extendedInfo = ingredientsList.find((item) => item._id === ingredientId);

        if (extendedInfo !== undefined) {
            resultArray.push(extendedInfo)
        }
    }

    return resultArray;
}

export const getFullOrderInfo = (order: TFeedOrder, ingredientsFullInfo: Array<IIngredient>) => {


    let extendIngredientInfoArray = getIngredientsInfoArrayByIdArray(order.ingredients, ingredientsFullInfo);

    const totalPrice = sumAllIngredientPrice(extendIngredientInfoArray);

    let newOrderInfo: TFeedExtendedOrderInfo = {
        _id: order._id,
        status: order.status,
        number: order.number,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        ingredients: extendIngredientInfoArray,
        name: order.name,
        totalPrice: totalPrice
    };

    return newOrderInfo
}
