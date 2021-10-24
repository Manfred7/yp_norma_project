const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const getRandomInt = (max) => Math.floor(Math.random() * (max));

const getRandomArrayElement = (array) => array[getRandomInt(array.length)];

const tossCoin = () => {
    return (getRandomInt(2) === 1);
}

const getRandomArray = (sourceArray) => {

    let resultArr = [];

    for (let i = 0; i < sourceArray.length; i++) {
        if (tossCoin()) {
            resultArr.push(sourceArray[i]);
        }
    }

    return resultArr;
};


const getIngrsByType = (arr, ingrType) => {
    return arr.filter((elem) => elem.type === ingrType)
}

const getBuns = (arr) => {
    return getIngrsByType(arr, BUN);
}

const getMains = (arr) => {
    return getIngrsByType(arr, MAIN);
}

const getSauces = (arr) => {
    return getIngrsByType(arr, SAUCE);
}

const sumPrice = (arr) => {
    let result = 0;

    arr.forEach((item) => {
        result = result + item.price
    })

    return result
}

export const generateTestOrder = (sorceData) => {

    const buns = getBuns(sorceData);
    const randomBun = getRandomArrayElement(buns);

    const mains = getMains(sorceData);
    const randomMains = getRandomArray(mains);
    const mainsIds = randomMains.map((val) => val._id);

    const sauces = getSauces(sorceData);
    const randomSauces = getRandomArray(sauces);
    const saucesIds = randomSauces.map((val) => val._id);
    const mainsPrice = sumPrice(randomMains);
    const saucesPrice = sumPrice(randomSauces);

    const bunDisplayPrice = randomBun.price / 2;

    const totalPrice = randomBun.price + mainsPrice + saucesPrice;

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