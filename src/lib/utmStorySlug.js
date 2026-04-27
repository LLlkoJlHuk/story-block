/**
 * Кампании: значение utm_campaign в ссылке → технический slug истории в Storyblok.
 * В Space создай отдельную story для каждого slug (разный body / тексты).
 * Сравнение без учёта регистра.
 *
 * Пример ссылки: https://site/?utm_campaign=therapists
 */
export const UTM_CAMPAIGN_TO_STORY_SLUG = {
	therapists: 'therapists',
	pediatricians: 'pediatricians',
};

function parseSlugMapFromEnv() {
	const raw = import.meta.env.VITE_UTM_CAMPAIGN_SLUG_MAP_JSON;
	if (!raw || typeof raw !== 'string') {
		return {};
	}
	try {
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === 'object' ? parsed : {};
	} catch {
		console.warn(
			'[Storyblok] Invalid VITE_UTM_CAMPAIGN_SLUG_MAP_JSON — expected JSON object.',
		);
		return {};
	}
}

/** Slug истории для текущего query или null */
export function getStorySlugFromUtm(search) {
	const merged = {
		...UTM_CAMPAIGN_TO_STORY_SLUG,
		...parseSlugMapFromEnv(),
	};

	const params = new URLSearchParams(search);
	const raw = params.get('utm_campaign');
	if (!raw) {
		return null;
	}

	const key = raw.trim().toLowerCase();
	const slugByKey =
		merged[key] ??
		Object.entries(merged).find(
			([campaign]) => campaign.toLowerCase() === key,
		)?.[1];

	return typeof slugByKey === 'string' && slugByKey.trim()
		? slugByKey.trim()
		: null;
}
