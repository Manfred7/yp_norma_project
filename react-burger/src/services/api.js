import {URL_BASE, URL_INGREDIENTS, URL_POST_ORDER} from "../utils/data";

export const loadIngredientsData = async () => {
    return await fetch(`${URL_BASE}${URL_INGREDIENTS}`)
}

export const sendOrderToServer = async (order) => {

    const mainsAndSaucesIds = order.mainsAndSauces.map((val) => val._id);
    const ingredients = [order.bun._id, ...mainsAndSaucesIds];

    return await fetch(`${URL_BASE}${URL_POST_ORDER}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ingredients})
        })
}