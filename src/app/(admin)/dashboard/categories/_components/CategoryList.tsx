import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { CategoryInterface } from '@/models/Category';

import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"


export interface CategoryList_CategoryInterface extends CategoryInterface {
  _id: string;
}

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);



  const deleteCategory = async (slug: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/categories/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }

      setMessage({
        type: 'success',
        text: 'Category deleted successfully!',
      });

      setTimeout(() => {
        window.location.replace('/dashboard/categories')
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

  const fetchCategories = async () => {
    setIsLoading(true);
    try {

      const response = await fetch(`/api/categories/`)

      if (!response.ok) throw new Error('Failed to fetch categories')

      const data = await response.json();

      setCategoryList(data.categories);
    } catch (err) {
      console.error('error fetching category list : ', err)
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteCategory = (slug: string) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this category?');
    if (!shouldDelete) return;
    deleteCategory(slug)
  }


  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <>
      <h1 className="my-4 text-center text-xl font-bold">Category List</h1>
      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      <div className="flex justify-end mb-5">
        <Button className="">
          <Link href="?mode=new">Add category</Link>
        </Button>
      </div>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Category title</TableHeaderCell>
              <TableHeaderCell className='flex gap-4 justify-end'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList.length > 0 && categoryList.map((category: CategoryList_CategoryInterface) => (
              <TableRow key={category._id}>
                <TableCell>{category.title}</TableCell>
                <TableCell className='flex gap-4 justify-end'>
                  <Button variant="secondary" isLoading={isLoading} asChild>
                    <Link href={`?mode=edit&slug=${category.slug}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" isLoading={isLoading} className="list-delete-btn" onClick={() => handleDeleteCategory(category.slug)}>
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