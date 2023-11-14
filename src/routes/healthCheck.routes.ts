import { Express } from 'express';
import HealthCheckController from '../controller/healthCheck.controller';



export function HealthCheck(app: Express) {
    //healthCheck
    app.get('/api/healthchecks', HealthCheckController);
};
