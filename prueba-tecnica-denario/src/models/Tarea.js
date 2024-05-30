import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Tarea = db.define("tareas", {
	idTarea: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idUsuario',
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
	titulo: {
		type: DataTypes.STRING(120),
		field: 'titulo',
		allowNull: false,
	},
	descripcion: {
		type: DataTypes.STRING(500),
		field: 'descripcion',
		allowNull: false,
	},
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fechaVencimiento',
    },
	estado: {
		type: DataTypes.TINYINT,
		field: 'estado',
		allowNull: false,
	},
},
{
	timestamps: false
});