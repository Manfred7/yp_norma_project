import {Navigate, RouteProps, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {authSelectors} from "../../services/selectors/auth-selector";
import {APP_ROUTS} from "../../utils/const";
import * as React from "react";

import {FC} from 'react';

const AuthorisedOnlyRoutes = [APP_ROUTS.PROFILE, APP_ROUTS.ORDERS_LIST];
const NotAuthorisedOnlyRoutes = [APP_ROUTS.LOGIN, APP_ROUTS.REGISTRATION, APP_ROUTS.FORGOT_PASSWORD, APP_ROUTS.RESET_PASSWORD];

const checkAuthorisedOnly = (pathname: string, forgotPasswordRequested: boolean) => {

    const result = AuthorisedOnlyRoutes.some(value => {
        return value === pathname
    });

    const checkResetPasswordIsStepTwo = () => {
        return ((!forgotPasswordRequested) && (pathname === APP_ROUTS.RESET_PASSWORD))
    }
    return result || checkResetPasswordIsStepTwo();
}

const checkNotAuthorisedOnly = (pathname: string) => {

    return NotAuthorisedOnlyRoutes.some(value => {
        return value === pathname
    });
}

const ProtectedRoute: FC<RouteProps> = ({children}) => {

    const userIsAuth = useSelector(authSelectors.isAuth);
    const location = useLocation();

    const forgotPasswordRequested = useSelector(authSelectors.forgotPasswordRequested);

    if ((!userIsAuth) && checkAuthorisedOnly(location.pathname, forgotPasswordRequested)) {

        return (<>
            <Navigate
                replace
                to={APP_ROUTS.LOGIN}
                state={{
                    from: location
                }}
            />
        </>)

    }

    if ((userIsAuth) && checkNotAuthorisedOnly(location.pathname)) {

        const backUrl = location?.state?.from?.pathname || APP_ROUTS.ROOT;

        return (<> <Navigate
            replace
            to={backUrl}
        />
        </>)
    }

    return (<>{children}</>);
}

export default ProtectedRoute;