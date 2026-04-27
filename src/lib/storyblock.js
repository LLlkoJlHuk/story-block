import {
	apiPlugin,
	getStoryblokApi,
	StoryblokComponent,
	storyblokEditable,
	storyblokInit,
	useStoryblok,
} from '@storyblok/react';
import BlockPreview from '../components/BlockPreview';
import HomePage from '../pages/HomePage';

const accessToken = import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN;
const region = import.meta.env.VITE_STORYBLOK_REGION || 'eu';

if (!accessToken) {
	console.warn(
		'[Storyblok] Missing VITE_STORYBLOK_ACCESS_TOKEN. Content requests will fail until token is set.',
	);
}

storyblokInit({
	accessToken,
	use: [apiPlugin],
	apiOptions: { region },
	enableFallbackComponent: true,
	components: {
		page: HomePage,
		block_preview: BlockPreview,
	},
});

export { getStoryblokApi, StoryblokComponent, storyblokEditable, useStoryblok };
