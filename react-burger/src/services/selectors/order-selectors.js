export const orderSelectors = {
    isUpLoading: (store) => store => store.orderState.isUpLoading,
    hasError: (store) => store => store.orderState.hasError,

    order: (store) =>  store => store.orderState.order,
    modalIsVisible: (store) => store => store.orderState.modalIsVisible
}
