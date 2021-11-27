export const authSelectors = {
    isAuth: (store) =>   store.authState.isAuth,
    forgotPasswordRequested : (store) => store.authState.forgotPassword.requestSuccess,
    email: (store) =>   store.authState.email,
    name: (store) =>   store.authState.name,
    userInfoChanged:(store) => store.authState.userInfoChanged
}
