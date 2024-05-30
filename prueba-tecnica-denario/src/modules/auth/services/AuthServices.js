import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../../../models/Usuario.js';
import { compareSync, hashSync } from 'bcrypt';
import { config } from "../../../config/config.js";
import { db } from "../../../config/db.js"


export const loginUser = async (correo, password) => {
    const user = await Usuario.findOne({
        where: { email: correo },
        raw: true
    });

    if (!user) return {errors: {correo: ["El usuario no existe"]}};
    const isValidPassword = compareSync(password, user.passwordHash);
    if (!isValidPassword) return {errors: {password: ["Contraseña incorrecta"]}};
    const payload = {
        sub: user.idUsuario,
        iat: dayjs().unix(),
        exp: dayjs().add(1, 'days').unix(),
    };

    return {
        token: jwt.sign(payload, config.jwt.secret),
        user: {
            id: user.idUsuario,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
        }
    }
};

export const userInformation = async (idUser) => {
    return await Usuario.findByPk(idUser, {
        attributes:['id', 'nombre', 'email', 'apellido']
    })
}

export const registrarUsuario = async (body) => {
    return await db.transaction(async (t) => {
        return await Usuario.create({
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            passwordHash: hashSync(body.password, 10),
        }, { transaction: t });
    })
};
