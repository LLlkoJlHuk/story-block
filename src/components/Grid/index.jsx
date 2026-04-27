import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

export default function Grid({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const columns = blok?.columns || [];

	return (
		<section {...editableProps}>
			{columns.map((nestedBlok) => (
				<StoryblokComponent
					blok={nestedBlok}
					key={nestedBlok._uid || nestedBlok.id}
				/>
			))}
		</section>
	);
}
