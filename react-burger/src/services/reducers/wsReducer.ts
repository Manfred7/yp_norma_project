import {
    TWSActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE

} from "../actions/wsActions";
import {IFeedMessage} from "../../utils/types";

interface IWSFeedState{
    isConnected:boolean;
    feed : IFeedMessage | null ;
    isLoaded :boolean;
    error?: Event;
}
const initialState:IWSFeedState = {
    isConnected: false,
    feed :  null,
    isLoaded: false,
    error: undefined
};


export const wsReducer = (state:IWSFeedState = initialState, action : TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true

            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload,
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                error: undefined
            };

        case WS_GET_MESSAGE:{


            return {
                ...state,
                isLoaded : true,
                feed:  {...action.payload}
            };
        }


        default:
            return state;
    }
};
