import express from "express";
import { listingRouter } from "@/app/modules/listing/listing.routes";
import { authRouter } from "../modules/auth/auth.routes";


const rootRouter = express.Router();

const rootRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/listing',
        route: listingRouter,
    }, 
]

rootRoutes.forEach(route => rootRouter.use(route.path, route.route))

export default rootRouter;