import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import httpStatus from 'http-status';

import { Usuario } from '../models/Usuario.js';
import { errorResponse } from '../utils/apiResponse.js';
import { config } from './config.js';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        const user = await Usuario.findOne({ where: { idUsuario: payload.sub }, raw: true});
        if (!user) { return errorResponse(null, "token invalido", 401);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
