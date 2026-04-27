import { StoryblokRichText } from '@storyblok/react';

/**
 * Richtext из Storyblok (объект doc) или обычная строка.
 * Заголовки/подзаголовки и лейблы кнопок — оставляй plain string в компоненте, без этого хелпера.
 */
export default function RichOrPlain({
	value,
	fallback = '',
	className,
	as: Comp = 'div',
}) {
	const doc = value && typeof value === 'object' ? value : null;
	const plain = (typeof value === 'string' && value) || fallback;

	if (doc) {
		return <StoryblokRichText doc={doc} className={className} />;
	}

	if (!plain) {
		return null;
	}

	return <Comp className={className}>{plain}</Comp>;
}
