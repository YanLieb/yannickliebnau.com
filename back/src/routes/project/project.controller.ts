import type { Request, Response } from "express";

import { saveProject, updateProject, findProjects, findProjectBySlug, deleteProject, ProjectInterface } from '../../models/project/project.model'
import { findCategories } from '../../models/category/category.model';

export default class ProjectController {
  async getNew(req: Request, res: Response) {
    const categories = await findCategories();
    res.render('projects/project', {
      title: 'Create a new project',
      bodyId: 'new-project',
      bodyClasses: 'new-project project',
      categories
    })
  }

  async get(req: Request, res: Response) {
    const { slug } = req.params;
    const project = await findProjectBySlug(slug);
    const categories = await findCategories();

    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      })
    }

    const selectedCatIds = new Set(project.categories.map(cat => cat.id.toString()));
    const categoriesWithSelectedFlag = categories.map(cat => ({
      ...cat.toObject(),
      selected: selectedCatIds.has(cat._id.toString())
    }));

    return res.status(200).render('projects/project', {
      project,
      title: 'Update project',
      scripts: '/dist/js/project-form.js',
      bodyId: `project-${project.id}`,
      bodyClasses: `update-project project-${project.id} project-${project.slug}`,
      categories: categoriesWithSelectedFlag
    })
  }

  async getAll(req: Request, res: Response) {
    const projects = await findProjects();

    if (!projects.length) {
      return res.status(400).render('projects', {
        error: 'No Projects yet'
      })
    }

    res.render('projects', {
      title: 'All projects',
      projects
    })
  }

  async add(req: Request, res: Response) {
    let project = req.body;
    const slugTaken = await findProjectBySlug(project.slug);
    const errors: Record<string, string> = {};

    if (slugTaken) {
      errors.slug = 'This slug is already taken'
    }

    for (const [key, value] of Object.entries(project) as [string, any][]) {
      if (!value) {
        errors[key] = `The field ${key} cannot be empty`
      }
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ error: errors });
    }

    const savedProject = await saveProject(project);

    return res.status(201).json({ savedProject, success: 'Project saved successfully' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const update = req.body as Partial<ProjectInterface>;
    const errors: Record<string, string> = {};

    if (!id) errors.id = 'Missing project id';

    const updatedProject = await updateProject(id, update);

    if (!updatedProject) errors.notFound = 'Project not found';

    if (Object.keys(errors).length) return res.status(400).json({ error: errors });

    return res.status(200).json({ updatedProject, success: 'Project updated successfully' })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const errors: Record<string, string> = {};

    if (!id) errors.id = 'Missing project id to delete';

    const deletedProject = await deleteProject(id);

    if (!deletedProject) errors.notFound = 'Project not found';
    
    if (Object.keys(errors).length) return res.status(400).json({ error: errors });

    return res.status(200).json({deletedProject, success: 'Project deleted'})
  }
}