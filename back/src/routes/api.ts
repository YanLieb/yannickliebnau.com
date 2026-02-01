import express from 'express';
import type { Request, Response } from 'express';

import projectRouter from './project/project.router'
import categoryRouter from './category/category.router';

const api = express.Router();

api.get('/', (req: Request, res: Response) => {
  res.render('index', {title: "Welcome"})
})
api.use('/projects', projectRouter)
api.use('/categories', categoryRouter);

export default api;