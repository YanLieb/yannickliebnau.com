import express from 'express';

import ProjectController from './project.controller';

const projectController = new ProjectController;
const projectRouter = express.Router();

projectRouter.get('/new', projectController.getNew)
projectRouter.get("/:slug", projectController.get)
projectRouter.get('/', projectController.getAll)

projectRouter.post('/', projectController.add)
projectRouter.patch('/:id', projectController.update)
projectRouter.delete('/:id', projectController.delete);

export default projectRouter;