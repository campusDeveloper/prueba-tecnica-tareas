import "dotenv/config";

export const config = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	DB: {
        dev: {
            manager:{
                dialect: process.env.DB_DIALECT,
                host: process.env.DB_HOST_MANAGER,
                port: process.env.DB_PORT_MANAGER,
                username: process.env.DB_USERNAME_MANAGER,
                password: process.env.DB_PASSWORD_MANAGER,
                database: process.env.DB_DATABASE_MANAGER,
                timezone: process.env.TZ,

            },
        },
	},
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
};