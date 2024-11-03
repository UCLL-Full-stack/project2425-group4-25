import * as dotenv from 'dotenv';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { carRouter } from './controller/car.routes';
import { maintenanceRouter } from './controller/maintenance.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car API',
            version: '1.0.0',
            description: 'A simple API to manage cars',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/cars', carRouter);
app.use('/maintenances', maintenanceRouter);

app.use((err: Error, req:Request, res: Response, next:NextFunction) => {
    console.error(err);

    res.status(400).json({
        status: 'application error',
        message: err.message
    });
});


app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
