import {TRootState} from "../../utils/types";

export const orderSelectors = {
    isUpLoading: (store:TRootState) => store.orderState.isUpLoading,
    hasError: (store:TRootState) => store.orderState.hasError,
    order: (store:TRootState) =>  store.orderState.order,
    modalIsVisible: (store:TRootState)  => store.orderState.modalIsVisible
}
