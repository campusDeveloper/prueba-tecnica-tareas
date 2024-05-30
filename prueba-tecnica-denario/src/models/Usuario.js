import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Usuario = db.define("usuarios", {

	idUsuario: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre: {
		type: DataTypes.STRING(60),
		field: 'nombre',
		allowNull: false,
	},
	apellido: {
		type: DataTypes.STRING(60),
		field: 'apellido',
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(80),
		allowNull: false,
		field: 'email',
		unique: "email"
	},
	passwordHash: {
		type: DataTypes.STRING(120),
		field: 'passwordHash',
		allowNull: true,
	},
},
{
	timestamps: false
});