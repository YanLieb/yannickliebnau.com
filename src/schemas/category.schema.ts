import { z } from 'zod';

export const categorySchema = z.object({
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
});

// Export the TypeScript type inferred from the schema
export type CategoryFormData = z.infer<typeof categorySchema>;