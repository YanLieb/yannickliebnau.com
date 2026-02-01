import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { ZodError } from 'zod';
import slugify from 'slug';

import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ToggleGroup, ToggleGroupItem } from '@/components/Toggle';
import { Switch } from '@/components/Switch';
import Tiptap from '@/components/Tiptap';

import { projectSchema, ProjectFormData } from '@/schemas/project.schema';
import { CategoryList_CategoryInterface } from '@/app/(admin)/dashboard/categories/_components/CategoryList';


export default function ProjectForm({ mode, slug }: { mode: string, slug: string }) {

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    link: '',
    categories: [],
    featured: false
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchCategories = async () => {
    setIsLoading(true);
    try {

      const response = await fetch(`/api/categories/`)

      if (!response.ok) throw new Error('Failed to fetch categories')

      const data = await response.json();

      setCategories(data.categories);
    } catch (err) {
      console.error('error fetching category list : ', err)
    } finally {
      setIsLoading(false);
    }
  }

  const fetchProject = async () => {
    setIsLoading(true);
    setMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch(`/api/projects/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch project')

      const project = await response.json();

      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        link: project.link,
        categories: project.categories,
        featured: project.featured,
      });
    } catch (e) {
      console.error('Error fetching project: ', e)
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

  const saveProject = async (validatedData: ProjectFormData, mode: string, slug: string) => {
    setIsLoading(true)

    try {
      const fetchPath = mode === 'new' ? '/api/projects' : `/api/projects/${slug}`;

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
          throw new Error(data.error || 'Failed to save project');
        }
        return;
      }

      setMessage({
        type: 'success',
        text: mode === 'new' ? 'Project created successfully!' : 'Project updated successfully',
      });

      setTimeout(() => {
        window.location.replace('/dashboard/projects')
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

  const deleteProject = async (slug: string) => {
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
    fetchCategories();
    if (slug) {
      fetchProject();
    }
  }, [slug])


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = projectSchema.parse(formData);
      setFieldErrors({});
      setMessage(null);
      saveProject(validatedData, mode, slug)
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach(issue => {
          const field = issue.path[0];
          if (field) errors[field.toString()] = issue.message;
        });
        setFieldErrors(errors)
        setMessage({ type: 'error', text: 'Please fix the errors below' });
        return;
      }

      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occured'
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title') newData.slug = slugify(value);
      return newData;
    });
  };

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleCategoriesChange = (values: string[]) => {
    setFormData(prev => ({ ...prev, categories: values }))
    if (fieldErrors.categories) {
      setFieldErrors(prev => ({...prev, categories: ''}))
    }
  }

  const handleSwitch = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }))
  }

  const handleDeleteProject = (slug: string) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this project?');
    if (!shouldDelete) return;
    deleteProject(slug)
  }

  return (
    <div>
      <h1 className='my-4 text-center text-xl'>
        {mode === 'new' ? (
          'New Project'
        ) : (
          'Update Project'
        )}
      </h1>
      <Button variant='secondary' asChild className='mb-5'>
        <Link href='/dashboard/projects'>Back to project list</Link>
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
            placeholder="Project title"
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
            placeholder="Project slug (e.g., my-awesome-project)"
            className="mt-2"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          {fieldErrors.slug && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.slug}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="description" className="font-medium">
            Description
          </Label>
          <Tiptap
            value={formData.description}
            onChange={handleDescriptionChange}
          />
          {fieldErrors.description && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="link" className="font-medium">
            Link
          </Label>
          <Input
            id="link"
            name="link"
            placeholder="https://example.com"
            className="mt-2"
            type="url"
            value={formData.link}
            onChange={handleChange}
            required
          />
          {fieldErrors.link && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.link}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor='categories' className='font-medium block mb-3'>Categories</Label>
          <ToggleGroup type="multiple" value={formData.categories} onValueChange={handleCategoriesChange}>
              {categories.map((category: CategoryList_CategoryInterface) => (
                <ToggleGroupItem key={category._id} value={category._id}>
                  {category.title}
                </ToggleGroupItem>
              ))}
          </ToggleGroup>
          {fieldErrors.categories && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.categories}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor='featured' className='font-medium block mb-3'>Featured project</Label>
          <Switch id='featured' name='featured' checked={formData.featured} onCheckedChange={handleSwitch} />
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {mode === "new" ?
              isLoading ? 'Saving...' : 'Save project'
              :
              isLoading ? 'Updating...' : 'Update project'
            }
          </Button>
          {mode !== 'new' && (
            <Button variant="destructive" isLoading={isLoading} onClick={() => handleDeleteProject(formData.slug)}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
