import {INGREDIENT_TYPES, TOKENS} from "./const";
import {IIngredient, ITokenData} from "./types";


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

