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
		type: z.enum(["person", "business", "organization", "club"]),
		description: z.string(),

		industries: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),

		location: z.string().optional(),
		website: z.string().url().optional(),

		photos: z.array(z.string()).optional(),

		contact: z
			.object({
				email: z.string().email().optional(),
				phone: z.string().optional(),
			})
			.optional(),

		social: z
			.object({
				facebook: z.string().url().optional(),
				instagram: z.string().url().optional(),
				linkedin: z.string().url().optional(),
				github: z.string().url().optional(),
				youtube: z.string().url().optional(),
				x: z.string().url().optional(),
			})
			.optional(),
	})
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
