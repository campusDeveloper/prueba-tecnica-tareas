import Joi from 'joi';
import { mesagesValidation } from '../../../lang/es_ES.js';
import { Usuario } from '../../../models/Usuario.js';
import { errorResponse } from '../../../utils/apiResponse.js';

const customMessages = mesagesValidation;

export const loginSchema = Joi.object({
    correo: Joi.string().email().required().messages(customMessages),
    password: Joi.string().required().messages(customMessages),
});

export const validateExistsEmail = async (req, res, next) => {
    const existingUser = await Usuario.findOne({
        where: { email: req.body.correo },
    });
    if (!existingUser) return errorResponse(res, {codigo: 1, error: "usuario no encontrado"}, 400);
    next();
};


export const registerUserSchema = Joi.object({
    nombre: Joi.string().required().max(60).messages(customMessages),
    apellido: Joi.string().required().max(60).messages(customMessages),
    email: Joi.string().email().required().max(60).messages(customMessages),
    password: Joi.string().required().min(5).max(10).messages(customMessages),
})


export const validateUniqueEmail = async (req, res, next) => {
    const existingUser = await Usuario.findOne({
        where: { email: req.body.email },
    });
    if (existingUser) return errorResponse(res, "correo ya existe", 400);
    next();
};