import { Router } from "express";
import * as auth from "../controllers/AuthController.js";
import { tryCatch } from "../../../utils/tryCatch.js";
import { loginSchema, registerUserSchema, validateUniqueEmail, validateExistsEmail } from "../validations/authValidation.js"
import { authMiddleware, logoutMiddleware } from "../../../middlewares/authMiddleware.js"
import { validate } from "../../../middlewares/validate.js";

export const routerAuth = Router();

routerAuth.post("/login", validate(loginSchema), validateExistsEmail, tryCatch(auth.login));
routerAuth.get("/user", authMiddleware, tryCatch(auth.informacionUsuario));
routerAuth.post("/registrar-usuario", validate(registerUserSchema), validateUniqueEmail, tryCatch(auth.nuevoUsuario));
routerAuth.post("/logout", authMiddleware, logoutMiddleware, tryCatch(auth.logout));