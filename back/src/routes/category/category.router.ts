import express from 'express';
import CategoryController from './category.controller'

const categoryController = new CategoryController();
const categoryRouter = express.Router();

categoryRouter.get('/new', categoryController.getNew)
categoryRouter.get('/:slug', categoryController.get)
categoryRouter.get('/', categoryController.getAll)

categoryRouter.post('/', categoryController.add)
categoryRouter.patch('/:id', categoryController.update)
categoryRouter.delete('/:id', categoryController.delete);

export default categoryRouter;