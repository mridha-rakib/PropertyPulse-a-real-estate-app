import type { NextFunction, Request, Response } from 'express';
import statuses from 'http-status';

interface CustomError extends Error {
    status?: number;
}

export const errorLogger = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = {
		name: err.name,
		message: err.message,
		stack: err?.stack || null,
		status: err?.status || statuses.BAD_REQUEST,
	};
	res.status(error.status).send({ error });
};
