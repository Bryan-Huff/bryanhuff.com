import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({
		base: './src/content/blog',
		pattern: '**/*.{md,mdx}',
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const projects = defineCollection({
	loader: glob({
		base: './src/content/projects',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		status: z.enum([
			'Active',
			'Completed',
			'Paused',
			'Archived',
		]),
		technologies: z.array(z.string()),
		featured: z.boolean().default(false),
		order: z.number().optional(),
	}),
});

export const collections = {
	blog,
	projects,
};
