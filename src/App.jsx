import { useStoryblokBridge } from '@storyblok/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocalBlocksPage from './dev/LocalBlocksPage';
import './lib/storyblock';
import {
	StoryblokComponent,
	getStoryblokApi,
	storyblokEditable,
} from './lib/storyblock';
import { getStorySlugFromUtm } from './lib/utmStorySlug';

function normalizeSlug(pathname) {
	const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

	if (!cleanPath) {
		return '';
	}

	try {
		return decodeURIComponent(cleanPath);
	} catch {
		return cleanPath;
	}
}

function getStoryVersion(search) {
	const queryParams = new URLSearchParams(search);
	const isVisualEditor = queryParams.has('_storyblok');

	if (isVisualEditor || import.meta.env.DEV) {
		return 'draft';
	}

	return 'published';
}

function getSlugCandidates(pathname, search) {
	const routeSlug = normalizeSlug(pathname);
	const homeSlug = import.meta.env.VITE_STORYBLOK_HOME_SLUG || 'therapists';
	const fallbackSlug = import.meta.env.VITE_STORYBLOK_FALLBACK_SLUG;

	const utmSlug = getStorySlugFromUtm(search);

	const baseList = !routeSlug
		? [homeSlug, fallbackSlug].filter(Boolean)
		: [routeSlug, fallbackSlug, homeSlug].filter(Boolean);

	const withUtm = utmSlug != null ? [utmSlug, ...baseList] : baseList;

	return [...new Set(withUtm)];
}

function isLocalBlocksMode(search) {
	if (!import.meta.env.DEV) {
		return false;
	}

	const queryParams = new URLSearchParams(search);
	return (
		import.meta.env.VITE_LOCAL_BLOCKS_MODE === 'true' ||
		queryParams.get('local') === '1'
	);
}

function StoryblokPage({ pathname, search }) {
	const version = getStoryVersion(search);
	const [story, setStory] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const slugCandidates = useMemo(
		() => getSlugCandidates(pathname, search),
		[pathname, search],
	);

	useEffect(() => {
		let cancelled = false;

		const loadStory = async () => {
			setIsLoading(true);
			setError(null);

			const storyblokApi = getStoryblokApi();
			let loadedStory = null;
			let lastError = null;
			const versionCandidates =
				version === 'published' ? ['published', 'draft'] : [version];

			for (const slugCandidate of slugCandidates) {
				for (const versionCandidate of versionCandidates) {
					try {
						const endpoint = `cdn/stories/${encodeURI(slugCandidate)}`;
						const { data } = await storyblokApi.get(endpoint, {
							version: versionCandidate,
						});
						loadedStory = data.story;
						break;
					} catch (fetchError) {
						lastError = fetchError;
					}
				}

				if (loadedStory) break;
			}

			if (cancelled) {
				return;
			}

			if (loadedStory) {
				setStory(loadedStory);
			} else {
				setStory(null);
				setError(lastError);
			}

			setIsLoading(false);
		};

		loadStory();

		return () => {
			cancelled = true;
		};
	}, [slugCandidates, version]);

	useStoryblokBridge(
		story?.id,
		liveStory => {
			setStory(liveStory);
		},
		{ resolveRelations: [] },
	);

	if (isLoading) return <div>Loading story...</div>;

	if (error) {
		return (
			<div>
				Story not found for current route. Checked slugs:{' '}
				{slugCandidates.join(', ')}
			</div>
		);
	}

	if (!story?.content) return <div>Story is empty</div>;

	return (
		<div {...storyblokEditable(story.content)}>
			<StoryblokComponent blok={story.content} />
		</div>
	);
}

function App() {
	const { pathname, search } = useLocation();

	if (isLocalBlocksMode(search)) {
		return <LocalBlocksPage />;
	}

	return <StoryblokPage pathname={pathname} search={search} />;
}

export default App;
