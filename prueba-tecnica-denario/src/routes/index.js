import express from "express"

import { routerAuth } from "../modules/auth/routes/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { routerTareas } from "../modules/tareas/routes/TareasRoutes.js";




const mainRouter = express.Router();
//rutas sin autenticacion
mainRouter.use(routerAuth);

//rutas con autenticacion
mainRouter.use(authMiddleware)
mainRouter.use(routerTareas);

export { mainRouter };