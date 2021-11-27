export const orderSelectors = {
    isUpLoading: (store) => store.orderState.isUpLoading,
    hasError: (store) => store.orderState.hasError,
    order: (store) =>  store.orderState.order,
    modalIsVisible: (store)  => store.orderState.modalIsVisible
}
