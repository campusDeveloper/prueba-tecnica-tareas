import { Tarea } from '../../../models/Tarea.js';
import { db } from "../../../config/db.js"
import { literal } from 'sequelize';


export const crearTarea = async (body, idUsuario) => {
    return await db.transaction(async (t) => {
        return await Tarea.create({
            idUsuario: body.idUsuario,
            titulo: body.titulo,
            descripcion: body.descripcion,
            fechaVencimiento: body.fechaVencimiento,
            estado: body.estado,
            idUsuario
        }, { transaction: t });
    })
};

export const obtenerTareas = async (idUsuario) => {
    const data = await Tarea.findAll({
        attributes: [
            'idTarea',
            'titulo',
            'descripcion',
            'fechaVencimiento',
            'estado',
        ],
        where:{
            idUsuario
        },
        order: [['fechaVencimiento', 'DESC']],
        raw: true
    })

    return data
};

export const actualizarTarea = async (idTarea, body) => {
    return await db.transaction(async (t) => {
        let model = await Tarea.findByPk(idTarea)
        model.titulo = body.titulo
        model.descripcion = body.descripcion
        model.fechaVencimiento = body.fechaVencimiento
        model.estado = body.estado
        await model.save({ transaction: t });
        return model
    })
};

export const eliminarTarea = async (idTarea) => {
    return await db.transaction(async (t) => {
        await Tarea.destroy({
            where: { idTarea: idTarea }
        })
        return true;
    })
};

export const cambiarEstado = async (idTarea, estado) => {
    return await db.transaction(async (t) => {
        let model = await Tarea.findByPk(idTarea)
        model.estado = estado
        await model.save({ transaction: t });
        return model
    })
};