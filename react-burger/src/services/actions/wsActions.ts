import {IFeedMessage, TwsActions} from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_DISCONNECT: 'WS_CONNECTION_DISCONNECT' = 'WS_CONNECTION_DISCONNECT';

export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export interface IWS_ConnectionDisconnectAction {
    readonly type: typeof WS_CONNECTION_DISCONNECT;
}

export interface IWS_ConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    payload:string ;
}
export interface IWS_ConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWS_ConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
    payload:Event
}

export interface IWS_ConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWS_GetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    payload :IFeedMessage;
}

export type TWSActions =
    | IWS_ConnectionStartAction
    | IWS_ConnectionDisconnectAction
    | IWS_ConnectionSuccessAction
    | IWS_ConnectionErrorAction
    | IWS_ConnectionClosedAction
    | IWS_GetMessageAction;


export const wsActions: TwsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    wsDisconnect: WS_CONNECTION_DISCONNECT
};
