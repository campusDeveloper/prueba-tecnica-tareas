export const successResponse = async(res, data, code = 200) => {
    return res.status(code).json(data);
};

export const errorResponse = async(res, errorMessage, code, title = null) => {
    if (title) {
      return res.status(code).json({ error: errorMessage, title: title });
    }
    return res.status(code).json({ error: errorMessage });
};

export const errorsResponse = async(res, errorMessage, code, title = null) => {
    if (title) {
      return res.status(code).json({ errors: errorMessage, title: title });
    }
    return res.status(code).json({ errors: errorMessage });
};