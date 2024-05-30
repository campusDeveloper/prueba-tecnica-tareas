import { successResponse, errorResponse, errorsResponse } from '../../../utils/apiResponse.js'
import * as service from '../services/TareasServices.js'

export const crearTarea = async (req, res) => {
    const data = await service.crearTarea(req.body, req.user.idUsuario);
    return successResponse(res, { message: 'Tarea creada correctamente', data });
};

export const obtenerTareas = async (req, res) => {
    const data = await service.obtenerTareas(req.user.idUsuario);
    return successResponse(res, { message: 'Consultado correctamente', data });
};

export const actualizarTarea = async (req, res) => {
    const data = await service.actualizarTarea(req.params.idTarea, req.body);
    return successResponse(res, { message: 'Tarea actualizada correctamente', data });
};

export const eliminarTarea = async (req, res) => {
    const data = await service.eliminarTarea(req.params.idTarea);
    return successResponse(res, { message: 'Tarea eliminada correctamente', data });
};

export const cambiarEstado = async (req, res) => {
    const data = await service.cambiarEstado(req.params.idTarea, req.body.estado);
    return successResponse(res, { message: 'Tarea actualziada correctamente', data });
};