import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import styles from './index.module.scss';

function HomePage({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const body = blok?.body || [];

	return (
		<div className={styles['home-page']} {...editableProps}>
			{body.length > 0 ? (
				body.map(nestedBlok => (
					<StoryblokComponent
						blok={nestedBlok}
						key={nestedBlok._uid || nestedBlok.id}
					/>
				))
			) : (
				<div>Add a block to the page body in Storyblok.</div>
			)}
		</div>
	);
}

export default HomePage;
