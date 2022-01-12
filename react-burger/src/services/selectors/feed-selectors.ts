import {TRootState} from "../../utils/types";

export const feedSelectors = {
    feedData: (store:TRootState) =>   store.wsFeedState.feed,
    isConnected : (store:TRootState) => store.wsFeedState.isConnected,
    needWsReconnect: (store:TRootState) => !store.wsFeedState.isConnected,
    isLoaded : (store:TRootState) => store.wsFeedState.isLoaded,
    error: (store:TRootState) =>   store.wsFeedState.error,
    getOrderById: (orderId :string) => (store:TRootState) =>
        store.wsFeedState.feed?.orders.find((item) => item._id === orderId)
}
