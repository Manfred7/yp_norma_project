export const ingredientsSelectors = {
    isLoading: (store) => store.ingredientsState.isLoading,
    hasError: (store) => store.ingredientsState.hasError,
    ingredientsList: (store) =>  store.ingredientsState.ingredientsList,
    currentTab: (store) => store.ingredientsState.currentTab,
    tabHeadersElements: (store) => store.ingredientsState.tabHeadersElements,
    needReload: (store) => store.ingredientsState.needReload,

}
