import {TRootState} from "../../utils/types";

export const authSelectors = {
    isAuth: (store:TRootState) =>   store.authState.isAuth,
    forgotPasswordRequested : (store:TRootState) => store.authState.forgotPassword.requestSuccess,
    email: (store:TRootState) =>   store.authState.email,
    name: (store:TRootState) =>   store.authState.name,
    userInfoChanged:(store:TRootState) => store.authState.userInfoChanged
}
