import {TRootState} from "../../utils/types";

export const constructorSelectors = {
    orderBody: (store:TRootState) =>   store.constructorIngredients.order,
}
