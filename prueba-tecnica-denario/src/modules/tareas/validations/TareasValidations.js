import Joi from 'joi';
import { mesagesValidation } from '../../../lang/es_ES.js';
import { errorResponse } from '../../../utils/apiResponse.js';
import { Tarea } from '../../../models/Tarea.js';

const customMessages = mesagesValidation;

export const tareaSchema = Joi.object({
    titulo: Joi.string().max(150).required().messages(customMessages),
    descripcion: Joi.string().max(500).required().messages(customMessages),
    fechaVencimiento: Joi.date().required().messages(customMessages),
    estado: Joi.number().integer().valid(1,2,3).required().messages(customMessages),
});

export const cambiarEstadoSchema = Joi.object({
    estado: Joi.number().integer().valid(1,2,3).required().messages(customMessages),
});


export const existeTarea = async (req, res, next) => {
    const tarea = await Tarea.findOne({
        where: { idTarea: req.params.idTarea },
    });
    if (!tarea) return errorResponse(res, "La tarea no existe", 400);
    next();
};