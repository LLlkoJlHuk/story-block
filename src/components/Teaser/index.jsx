import { storyblokEditable } from '@storyblok/react';

export default function Teaser({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const headline = blok?.headline || 'Teaser headline';

	return (
		<section {...editableProps}>
			<h2>{headline}</h2>
		</section>
	);
}
