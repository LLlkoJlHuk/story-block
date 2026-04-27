import {
	apiPlugin,
	getStoryblokApi,
	storyblokEditable,
	StoryblokComponent,
	storyblokInit,
	useStoryblok,
} from '@storyblok/react';
import Component1 from '../components/Component1';
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
	components: {
		page: HomePage,
		component1: Component1,
	},
});

export { getStoryblokApi, storyblokEditable, StoryblokComponent, useStoryblok };
