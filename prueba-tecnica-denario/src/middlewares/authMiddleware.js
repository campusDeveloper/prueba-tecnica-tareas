import passport from 'passport';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';

class TokenManager {
    constructor() {
        this.invalidTokens = new Set();
    }

    invalidateToken(token) {
        this.invalidTokens.add(token);
    }

    isTokenInvalid(token) {
        return this.invalidTokens.has(token);
    }
}

const tokenManager = new TokenManager();

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false, failWithError: true }, (err, user, info) => {
        if (err || !user) {
            const message = info && info.message ? info.message : 'Autenticación fallida';
            return errorResponse(res, message, 401);
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (tokenManager.isTokenInvalid(token)) {
            console.log('Token inválido:', token);
            return errorResponse(res, 'Autenticación fallida', 401);
        }

        req.user = user;
        return next();
    })(req, res, next);

};

const logoutMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token && !tokenManager.isTokenInvalid(token)) {
        tokenManager.invalidateToken(token);
        console.log('Token invalidado:', token);
    }
    next();
};

export { authMiddleware, logoutMiddleware };
