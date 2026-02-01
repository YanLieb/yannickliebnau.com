import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { ProjectInterface } from '@/models/Project';
import { CategoryInterface } from '@/models/Category';

import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"


type ProjectWithCategories = Omit<ProjectInterface, 'categories'> & {
  _id: string;
  categories: Array<CategoryInterface & { _id: string }>;
};

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
        throw new Error(data.error || 'Failed to delete project');
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

  const fetchProjects = async () => {
    setIsLoading(true);
    try {

      const response = await fetch(`/api/projects/`)

      if (!response.ok) throw new Error('Failed to fetch projects')

      const data = await response.json();

      setProjectList(data.projects);
    } catch (err) {
      console.error('error fetching project list : ', err)
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteProject = (slug: string) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this project?');
    if (!shouldDelete) return;
    deleteProject(slug)
  }


  useEffect(() => {
    fetchProjects();
  }, [])

  console.log(projectList)

  return (
    <>
      <h1 className="my-4 text-center text-xl font-bold">Project List</h1>
      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      <div className="flex justify-end mb-5">
        <Button className="">
          <Link href="?mode=new">Add project</Link>
        </Button>
      </div>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Project title</TableHeaderCell>
              <TableHeaderCell>Categories</TableHeaderCell>
              <TableHeaderCell>Featured</TableHeaderCell>
              <TableHeaderCell className='flex gap-4 justify-end'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectList.length > 0 && projectList.map((project: ProjectWithCategories) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>
                  {project.categories && project.categories.map((category) => category.title).join(' - ')}
                </TableCell>
                <TableCell>
                  {project.featured && (<span>★</span>)}
                </TableCell>
                <TableCell className='flex gap-4 justify-end'>
                  <Button variant="secondary" isLoading={isLoading} asChild>
                    <Link href={`?mode=edit&slug=${project.slug}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" isLoading={isLoading} className="list-delete-btn" onClick={() => handleDeleteProject(project.slug)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </>
  )
}
