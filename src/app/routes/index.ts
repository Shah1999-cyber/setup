import { userRoutes } from './../modules/user/user.route';
import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path : '/students',
        route : StudentRoutes
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;