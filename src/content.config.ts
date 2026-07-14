import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const people = defineCollection({
	loader: glob({ base: './src/content/people', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		category: z.string(),
		location: z.string(),
		skills: z.string(),
		about: z.string(),
		photos: z.array(z.string()).optional(),
		contact: z.string(),
	}),
});

const events = defineCollection({
	loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		date: z.coerce.date(),
		location: z.string(),
		category: z.string(),
		summary: z.string(),
	}),
});

export const collections = { blog, people, events };
