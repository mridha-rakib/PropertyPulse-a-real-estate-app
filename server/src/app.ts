import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import { errorLogger } from './app/middlewares/error.middleware';
import httpStatus from 'http-status';
import rootRouter from "@/app/routes/index.routes"

const app: Application = express();




app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/api', rootRouter);

app.use(errorLogger);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
    next();
  });
  

  export default app;