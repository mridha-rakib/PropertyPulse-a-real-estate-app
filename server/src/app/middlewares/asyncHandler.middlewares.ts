import type { NextFunction, Request, RequestHandler, Response } from 'express'

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

function asyncHandler(fn: AsyncRequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next)
    }
    catch (error) {
      console.error('Error in async function:', error)
      next(error)
    }
  }
}

export default asyncHandler
