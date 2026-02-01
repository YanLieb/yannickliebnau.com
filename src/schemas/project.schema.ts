import { z } from 'zod';

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters')
    .trim(),

  slug: z
    .string()
    .min(1, 'Slug is required')
    .min(2, 'Slug must be at least 2 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only (e.g., my-project-name)')
    .trim()
    .toLowerCase(),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .trim(),

  link: z
    .string()
    .min(1, 'Link is required')
    .trim()
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      message: 'Must be a valid URL with a proper domain (e.g., https://example.com)',
    }),
  featured: z
    .boolean().default(false),
  categories: z
    .array(
      z
        .string()
        .regex(/^[a-f\d]{24}$/i, 'Category id must be a Mongo ObjectId'),
    )
    .nonempty('Pick at least one category'),
});

// Export the TypeScript type inferred from the schema
export type ProjectFormData = z.infer<typeof projectSchema>;
