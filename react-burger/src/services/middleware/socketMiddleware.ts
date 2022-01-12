import type {Middleware, MiddlewareAPI} from 'redux';
import { TAppDispatch, TApplicationActions, TRootState, TwsActions} from "../../utils/types";

export const socketMiddleware = (wsActions : TwsActions): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const {dispatch} = store;
            const {type} = action;

            if (type === wsActions.wsInit) {
                const cUrl = action.payload;
                socket = new WebSocket(cUrl);
            }

            if (type === wsActions.wsDisconnect) {
                socket?.close(1000);
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch({type: wsActions.onOpen, payload: event});

                };

                socket.onerror = event => {
                    dispatch({type: wsActions.onError, payload: event});

                };

                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    dispatch({type: wsActions.onMessage, payload: data});
                };

                socket.onclose = event => {
                    dispatch({type: wsActions.onClose, payload: event});
                };

            }

            next(action);
        };
    }) as Middleware;
};
