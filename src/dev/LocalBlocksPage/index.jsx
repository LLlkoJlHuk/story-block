import { createElement } from 'react';
import BlockAdultsGerdOverview from '../../components/BlockAdultsGerdOverview';
import BlockAdultsHealthAttitude from '../../components/BlockAdultsHealthAttitude';
import BlockGerdOverview from '../../components/BlockGerdOverview';
import BlockInfantsGerdOverview from '../../components/BlockInfantsGerdOverview';
import BlockMoreNews from '../../components/BlockMoreNews';
import BlockPreview from '../../components/BlockPreview';
import BlockQuestionsTeaser from '../../components/BlockQuestionsTeaser';
import BlockReferencesList from '../../components/BlockReferencesList';
import styles from './index.module.scss';

const localBlocks = [
	{
		key: 'block_preview',
		Component: BlockPreview,
		blok: {
			_uid: 'local-block-preview',
			component: 'block_preview',
		},
	},
	{
		key: 'block_questions_teaser',
		Component: BlockQuestionsTeaser,
		blok: {
			_uid: 'local-block-questions-teaser',
			component: 'block_questions_teaser',
		},
	},
	{
		key: 'block_gerd_overview',
		Component: BlockGerdOverview,
		blok: {
			_uid: 'local-block-gerd-overview',
			component: 'block_gerd_overview',
		},
	},
	{
		key: 'block_infants_gerd_overview',
		Component: BlockInfantsGerdOverview,
		blok: {
			_uid: 'local-block-infants-gerd-overview',
			component: 'block_infants_gerd_overview',
		},
	},
	{
		key: 'block_adults_gerd_overview',
		Component: BlockAdultsGerdOverview,
		blok: {
			_uid: 'local-block-adults-gerd-overview',
			component: 'block_adults_gerd_overview',
		},
	},
	{
		key: 'block_adults_health_attitude',
		Component: BlockAdultsHealthAttitude,
		blok: {
			_uid: 'local-block-adults-health-attitude',
			component: 'block_adults_health_attitude',
		},
	},
	{
		key: 'block_more_news',
		Component: BlockMoreNews,
		blok: {
			_uid: 'local-block-more-news',
			component: 'block_more_news',
		},
	},
	{
		key: 'block_references_list',
		Component: BlockReferencesList,
		blok: {
			_uid: 'local-block-references-list',
			component: 'block_references_list',
		},
	},
];

export default function LocalBlocksPage() {
	return (
		<main>
			<div className={styles['home-page']}>
				{localBlocks.map(({ key, Component, blok }) => (
					<section key={key}>{createElement(Component, { blok })}</section>
				))}
			</div>
		</main>
	);
}
