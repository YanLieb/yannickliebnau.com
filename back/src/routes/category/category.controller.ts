import type { Request, Response } from 'express';
import { CategoryInterface, saveCategory, updateCategory, findCategoryBySlug, findCategories, deleteCategory } from '../../models/category/category.model';

export default class CategoryController {
  getNew(req: Request, res: Response) {
    res.render('categories/category', {
      title: 'Add new category',
      bodyId: 'new_category',
      bodyClasses: 'new-category category'
    })
  }

  async get(req: Request, res: Response) {
    const { slug } = req.params;
    const category = await findCategoryBySlug(slug);

    if (!category) {
      return res.status(404).json({
        error: 'Category not found'
      })
    }

    return res.status(200).render('categories/category', {
      category,
      title: 'Update category',
      scripts: '/dist/js/category-form.js',
      bodyId: `category-${category.id}`,
      bodyClasses: `update-category category-${category.id} category-${category.slug}`,
    })
  }

  async getAll(req: Request, res: Response) {
    const categories = await findCategories();

    if (!categories.length) {
      return res.status(400).render('categories', {
        error: 'No Caetgories yet'
      })
    }

    res.render('categories', {
      title: 'All Categories',
      categories
    })
  }

  async add(req: Request, res: Response) {
    let category = req.body;
    const slugTaken = await findCategoryBySlug(category.slug);
    const errors: Record<string, string> = {};

    if (slugTaken) {
      errors.slug = 'This slug is already taken'
    }

    for (const [key, value] of Object.entries(category) as [string, any][]) {
      if (!value) {
        errors[key] = `The field ${key} cannot be empty`
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: errors });
    }

    const savedCategory = await saveCategory(category);

    return res.status(201).json({ savedCategory, success: 'Category saved successfully' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const update = req.body as Partial<CategoryInterface>;
    const errors: Record<string, string> = {};

    if (!id) errors.id = 'Missing category id';

    const updatedCategory = await updateCategory(id, update);

    if (!updatedCategory) errors.notFound = 'Category not found';

    if (Object.keys(errors).length) return res.status(400).json({ error: errors });

    return res.status(200).json({ updatedCategory, success: 'Category updated successfully' })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const errors: Record<string, string> = {};

    if (!id) errors.id = 'Missing category id to delete';

    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) errors.notFound = 'Category not found';

    if (Object.keys(errors).length) return res.status(400).json({ error: errors });

    return res.status(200).json({ deletedCategory, success: 'Category deleted' })
  }
}