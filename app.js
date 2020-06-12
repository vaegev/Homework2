import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes/index';
import cors from 'cors';
import authRouter from './routes/auth';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send(err.stack);
    }
});

module.exports = app;
