import { successResponse, errorResponse, errorsResponse } from '../../../utils/apiResponse.js'
import {
    loginUser,
    registrarUsuario,
    userInformation
} from '../services/AuthServices.js'

export const login = async (req, res) => {
    const { correo, password } = req.body
    const data = await loginUser(correo, password);
    if(data?.errors) return errorsResponse(res, data.errors, 400);
    return successResponse(res, { message: 'Consultado correctamente', data });
};

export const informacionUsuario = async(req, res) => {
    const data = await userInformation(req.user.id)
    return successResponse(res, { message: 'Consultado correctamente', data });
}

export const nuevoUsuario = async (req, res) => {
    const data = await registrarUsuario(req.body);
    if(data?.error) return errorResponse(res, data, 400);
    return successResponse(res, { message: 'Consultado correctamente', data });
};

export const logout = async(req, res) => {
    return successResponse(res, { message: 'sesión cerrada correctamente' });
}
