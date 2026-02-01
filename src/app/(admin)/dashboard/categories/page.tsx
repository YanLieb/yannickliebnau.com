"use client"

import { useSearchParams } from "next/navigation"
import CategoryForm from './_components/CategoryForm'
import CategoryList from './_components/CategoryList'

export default function Projects() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as string;
  const slug = searchParams.get('slug') as string;

  return mode ? <CategoryForm mode={mode} slug={slug} /> : <CategoryList />;
}