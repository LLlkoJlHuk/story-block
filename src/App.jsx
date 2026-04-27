import { useStoryblokBridge } from '@storyblok/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StoryblokComponent, getStoryblokApi, storyblokEditable } from './lib/storyblock';
import './lib/storyblock';

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

function getSlugCandidates(pathname) {
	const routeSlug = normalizeSlug(pathname);
	const homeSlug = import.meta.env.VITE_STORYBLOK_HOME_SLUG;

	return [
		routeSlug,
		homeSlug,
		'home',
		'test-page',
	].filter(Boolean);
}

function App() {
	const { pathname, search } = useLocation();
	const version = getStoryVersion(search);
	const [story, setStory] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const slugCandidates = useMemo(() => getSlugCandidates(pathname), [pathname]);

	useEffect(() => {
		let cancelled = false;

		const loadStory = async () => {
			setIsLoading(true);
			setError(null);

			const storyblokApi = getStoryblokApi();
			let loadedStory = null;
			let lastError = null;

			for (const slugCandidate of slugCandidates) {
				try {
					const endpoint = `cdn/stories/${encodeURI(slugCandidate)}`;
					const { data } = await storyblokApi.get(endpoint, { version });
					loadedStory = data.story;
					break;
				} catch (fetchError) {
					lastError = fetchError;
				}
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
		(liveStory) => {
			setStory(liveStory);
		},
		{ resolveRelations: [] },
	);

	if (isLoading) return <div>Loading story...</div>;

	if (error) {
		return (
			<div>
				Story not found for current route. Checked slugs: {slugCandidates.join(', ')}
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

export default App;
