import { createBrowserRouter } from "react-router-dom";
import { CriptoHome } from "./pages/criptoHome";
import { CriptoDetails } from "./pages/criptoDetails";
import NotFound from "./pages/notfound";

import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<CriptoHome/>
            },
            {
                path: "/criptoDetails/:id",
                element: <CriptoDetails/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
])

export { router };