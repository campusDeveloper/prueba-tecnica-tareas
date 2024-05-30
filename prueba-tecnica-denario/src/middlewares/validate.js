import { errorsResponse } from '../utils/apiResponse.js';


export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorsObject = {};
        error.details.forEach(detail => {
            const fieldName = detail.path[0];
            const errorMessage = detail.message;
            if (!errorsObject[fieldName]) {
                errorsObject[fieldName] = [];
            }
            errorsObject[fieldName].push('El campo '+fieldName+' '+errorMessage);
        });
        return errorsResponse(res, errorsObject, 400);
    }

    next();
};

