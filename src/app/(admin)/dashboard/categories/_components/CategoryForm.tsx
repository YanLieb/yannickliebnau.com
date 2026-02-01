import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { ZodError } from 'zod';
import slugify from 'slug';

import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import { categorySchema, CategoryFormData } from '@/schemas/category.schema';

export default function ProjectForm({ mode, slug }: { mode: string, slug: string }) {

  const [formData, setFormData] = useState<CategoryFormData>({
    title: '',
    slug: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchCategory = async () => {
    setIsLoading(true);
    setMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch(`/api/categories/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch project')

      const project = await response.json();

      setFormData({
        title: project.title,
        slug: project.slug,
      });
    } catch (e) {
      console.error('Error fetching category: ', e)
    } finally {
      setIsLoading(false);
    }
  }

  const setErrors = (dataErrors: Array<{ field: string, message: string }>) => {
    const errors: Record<string, string> = {};
    dataErrors.forEach((err: { field: string; message: string }) => {
      errors[err.field] = err.message;
    });
    setFieldErrors(errors);
    setMessage({ type: 'error', text: 'Please fix the errors below' });
  }

  const saveCategory = async (validatedData: CategoryFormData, mode: string, slug: string) => {
    setIsLoading(true)

    try {
      const fetchPath = mode === 'new' ? '/api/categories' : `/api/categories/${slug}`;

      const response = await fetch(fetchPath, {
        method: mode === 'new' ? 'POST' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          throw new Error(data.error || 'Failed to save category');
        }
        return;
      }

      setMessage({
        type: 'success',
        text: mode === 'new' ? 'Category created successfully!' : 'Category updated successfully',
      });

      setTimeout(() => {
        window.location.replace('/dashboard/categories')
      }, 1000)

    } catch (error) {
      if (error instanceof ZodError) {
        // Handle client-side validation errors
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0];
          if (field) {
            errors[field.toString()] = err.message;
          }
        });
        setFieldErrors(errors);
        setMessage({ type: 'error', text: 'Please fix the errors below' });
      } else {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'An error occurred'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCategory = async (slug: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          throw new Error(data.error || 'Failed to delete project');
        }
        return;
      }

      setMessage({
        type: 'success',
        text: 'Project deleted successfully!',
      });

      setTimeout(() => {
        window.location.replace('/dashboard/projects')
      }, 1000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchCategory();
    }
  }, [slug])


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedData = categorySchema.parse(formData);
    saveCategory(validatedData, mode, slug)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title') newData.slug = slugify(value);
      return newData;
    });
  };

  const handleDeleteCategory = (slug: string) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this category?');
    if (!shouldDelete) return;
    deleteCategory(slug)
  }

  return (
    <div>
      <h1 className='my-4 text-center text-xl'>
        {mode === 'new' ? (
          'New Category'
        ) : (
          'Update Category'
        )}
      </h1>
      <Button variant='secondary' asChild className='mb-5'>
        <Link href='/dashboard/categories'>Back to category list</Link>
      </Button>
      <form onSubmit={handleSubmit}>
        {message && (
          <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="title" className="font-medium">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Category title"
            className="mt-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {fieldErrors.title && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="slug" className="font-medium">
            Slug
          </Label>
          <Input
            id="slug"
            name="slug"
            placeholder="Category slug (e.g., my-awesome-category)"
            className="mt-2"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          {fieldErrors.slug && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.slug}</p>
          )}
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {mode === "new" ?
              isLoading ? 'Saving...' : 'Save category'
              :
              isLoading ? 'Updating...' : 'Update category'
            }
          </Button>
          {mode !== 'new' && (
            <Button variant="destructive" isLoading={isLoading} onClick={() => handleDeleteCategory(formData.slug)}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
