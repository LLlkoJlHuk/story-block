import Component1 from '@/components/Component1';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './index.module.scss';

function HomePage({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const body = blok?.body || [];

	return (
		<div className={styles['home-page']} {...editableProps}>
			<div className={styles['wrapper']}>
				{body.length > 0
					? body.map((nestedBlok) => (
							<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
						))
					: <Component1 />}
			</div>
		</div>
	);
}

export default HomePage;
