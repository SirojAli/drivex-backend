import slugify from 'slugify';

/**
 * Generates a unique, URL-friendly slug
 * @param value Title or name string
 * @param suffix Optional suffix (e.g., ID or timestamp) to ensure uniqueness
 */
export function generateSlug(value: string, suffix?: string): string {
	const baseSlug = slugify(value, {
		lower: true,
		strict: true, // remove non-alphanum
		locale: 'en',
		trim: true,
	});

	return suffix ? `${baseSlug}-${suffix}` : baseSlug;
}
