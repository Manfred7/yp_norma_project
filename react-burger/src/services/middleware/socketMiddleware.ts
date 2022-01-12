import type {Middleware, MiddlewareAPI} from 'redux';
import {TAppDispatch, TApplicationActions, TRootState} from "../../utils/types";
import {toast} from "react-toastify";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_DISCONNECT,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/wsActions";

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === WS_CONNECTION_START) {
                 const cUrl = action.payload;
                socket = new WebSocket(cUrl);
            }

            if (type === WS_CONNECTION_DISCONNECT) {
                socket?.close(1000);
                toast.success('WS_CONNECTION_DISCONNECT');
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });

                };

                socket.onerror = event => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });

                };

                socket.onmessage = event => {
                    const data  = JSON.parse(event.data);
                    dispatch({ type: WS_GET_MESSAGE, payload: data });
                };

                socket.onclose = event => {
                    dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
                };

            }

            next(action);
        };
    }) as Middleware;
};
