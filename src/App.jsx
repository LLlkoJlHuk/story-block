import { StoryblokComponent, storyblokEditable, useStoryblok } from '@storyblok/react';
import { useLocation } from 'react-router-dom';
import './lib/storyblock';

function getStorySlug(pathname) {
	const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
	return cleanPath || 'home';
}

function getStoryVersion(search) {
	const queryParams = new URLSearchParams(search);
	const isVisualEditor = queryParams.has('_storyblok');

	if (isVisualEditor || import.meta.env.DEV) {
		return 'draft';
	}

	return 'published';
}

function App() {
	const { pathname, search } = useLocation();
	const slug = getStorySlug(pathname);
	const version = getStoryVersion(search);
	const story = useStoryblok(slug, { version });

	if (!story?.content) return <div>Loading...</div>;

	return (
		<div {...storyblokEditable(story.content)}>
			<StoryblokComponent blok={story.content} />
		</div>
	);
}

export default App;
