import {
	apiPlugin,
	getStoryblokApi,
	StoryblokComponent,
	storyblokEditable,
	storyblokInit,
	useStoryblok,
} from '@storyblok/react';
import BlockAdultsGerdOverview from '../components/BlockAdultsGerdOverview';
import BlockAdultsHealthAttitude from '../components/BlockAdultsHealthAttitude';
import BlockGerdOverview from '../components/BlockGerdOverview';
import BlockInfantsGerdOverview from '../components/BlockInfantsGerdOverview';
import BlockMoreNews from '../components/BlockMoreNews';
import BlockPreview from '../components/BlockPreview';
import BlockQuestionsTeaser from '../components/BlockQuestionsTeaser';
import BlockReferencesList from '../components/BlockReferencesList';
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
		block_questions_teaser: BlockQuestionsTeaser,
		block_gerd_overview: BlockGerdOverview,
		block_infants_gerd_overview: BlockInfantsGerdOverview,
		block_adults_gerd_overview: BlockAdultsGerdOverview,
		block_adults_health_attitude: BlockAdultsHealthAttitude,
		block_more_news: BlockMoreNews,
		block_references_list: BlockReferencesList,
	},
});

export { getStoryblokApi, StoryblokComponent, storyblokEditable, useStoryblok };
