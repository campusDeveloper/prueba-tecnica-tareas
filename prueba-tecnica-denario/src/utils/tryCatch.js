import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ timestamp, level, message, stack, file, line }) => {
    return `${timestamp} [${level}] - ${message} (${file}:${line})\n${stack || ''}`;
});

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.Console(),
    ],
});

export const tryCatch = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        const fileInfo = extractFileInfo(error)
        const formattedError = {
            error: 'error',
            message: error.message,
            details: error.toString(),
            timestamp: new Date().toISOString(),
            file: fileInfo.file,
            line: fileInfo.line
        };

        logger.error('Ocurrió un error:', formattedError);

        return res.status(500).json(formattedError);
    }
};

function extractFileInfo(error) {
    if (error.fileName && error.lineNumber) {
        return { file: error.fileName, line: error.lineNumber };
    }

    // Intentar extraer información de archivo y línea de la pila de seguimiento
    const stackLines = error.stack.split('\n');
    for (const line of stackLines) {
        const match = line.match(/\((.*):(\d+):(\d+)\)/);
        if (match) {
            return { file: match[1], line: parseInt(match[2]) };
        }
    }

    // Si no se encuentra información, devolver "N/A"
    return { file: 'N/A', line: 'N/A' };
}

