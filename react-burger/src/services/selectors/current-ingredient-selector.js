export const currentIngredientsSelectors = {
    ingredientInfo: (store) => store.currentIngredientState.ingredientInfo,
    modalIsVisible: (store) => store => store.currentIngredientState.modalIsVisible,
    ingredientsList: (store) =>  store.ingredientsState.ingredientsList,
    currentTab: (store) => store.ingredientsState.currentTab,
    tabHeadersElements: (store) => store.ingredientsState.tabHeadersElements

}
