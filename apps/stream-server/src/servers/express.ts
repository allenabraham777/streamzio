import { Express, Request, Response } from 'express';
import cors from 'cors';

export const expressServer = (app: Express) => {
    app.use(cors());
    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });
};
