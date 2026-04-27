import { storyblokEditable } from '@storyblok/react';

export default function Feature({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const title = blok?.name || blok?.title || 'Feature';

	return (
		<div {...editableProps}>
			{title}
		</div>
	);
}
