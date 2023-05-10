import {createBrowserRouter} from "react-router-dom";
import {AuthenticationForm} from "./Public/AuthenticationForm";
import Calculator from "./Authenticated/Calculator";

const publicRouter = createBrowserRouter([
    {
        path: "*",
        element: <AuthenticationForm />,
    },
]);

const authenticatedRouter = createBrowserRouter([
    {
        path: "/",
        element: <Calculator />
    }
])

export const getRouter = (isAuthenticated: boolean) => {
    if(isAuthenticated) {
        return authenticatedRouter;
    }
    return publicRouter;
}