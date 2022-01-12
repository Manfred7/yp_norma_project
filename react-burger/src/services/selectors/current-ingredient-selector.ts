import {TRootState} from "../../utils/types";

export const currentIngredientsSelectors = {
    ingredientsList: (store: TRootState) => store.ingredientsState.ingredientsList,
    currentTab: (store: TRootState) => store.ingredientsState.currentTab,
    tabHeadersElements: (store: TRootState) => store.ingredientsState.tabHeadersElements

}
