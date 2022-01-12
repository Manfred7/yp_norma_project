import { TRootState} from "../../utils/types";

export const ingredientsSelectors = {
    isLoading: (store:TRootState) => store.ingredientsState.isLoading,
    hasError: (store:TRootState) => store.ingredientsState.hasError,
    ingredientsList: (store:TRootState) => store.ingredientsState.ingredientsList,
    currentTab: (store:TRootState) => store.ingredientsState.currentTab,
    tabHeadersElements: (store:TRootState) => store.ingredientsState.tabHeadersElements,
    needReload: (store:TRootState) => store.ingredientsState.needReload,
    item: (itemId :string) => (store:TRootState) => store.ingredientsState.ingredientsList.find((item) => item._id === itemId),


}
