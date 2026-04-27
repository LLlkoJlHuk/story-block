import {
	apiPlugin,
	getStoryblokApi,
	storyblokEditable,
	StoryblokComponent,
	storyblokInit,
	useStoryblok,
} from '@storyblok/react';
import Component1 from '../components/Component1';
import Feature from '../components/Feature';
import Grid from '../components/Grid';
import Teaser from '../components/Teaser';
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
		component1: Component1,
		teaser: Teaser,
		grid: Grid,
		feature: Feature,
	},
});

export { getStoryblokApi, storyblokEditable, StoryblokComponent, useStoryblok };
