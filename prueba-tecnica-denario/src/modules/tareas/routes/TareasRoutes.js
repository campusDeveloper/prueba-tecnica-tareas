import { Router } from "express";
import * as tareas from "../controllers/TareasController.js";
import { tryCatch } from "../../../utils/tryCatch.js";
import * as validation from "../validations/TareasValidations.js"
import { validate } from "../../../middlewares/validate.js";

export const routerTareas = Router();

routerTareas.post("/tarea", validate(validation.tareaSchema), tryCatch(tareas.crearTarea));
routerTareas.get("/tarea", tryCatch(tareas.obtenerTareas));
routerTareas.put("/tarea/:idTarea", validate(validation.tareaSchema), validation.existeTarea, tryCatch(tareas.actualizarTarea));
routerTareas.delete("/tarea/:idTarea", validation.existeTarea, tryCatch(tareas.eliminarTarea));
routerTareas.put("/tarea/:idTarea/cambiar-estado", validate(validation.cambiarEstadoSchema), validation.existeTarea, tryCatch(tareas.cambiarEstado));