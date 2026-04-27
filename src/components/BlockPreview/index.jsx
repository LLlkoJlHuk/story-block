import { storyblokEditable } from '@storyblok/react';
import styles from './index.module.scss';

export default function BlockPreview({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const title = blok?.title || 'Гастроэзофагиальная рефлюксная болезнь';
	const buttonText = blok?.button_text || 'Поделиться с коллегами';
	const showWomanImage = blok?.show_woman_image ?? true;

	return (
		<div className={styles['BlockPreview']} {...editableProps}>
			<h2 className={styles['title']}>{title}</h2>

			<button className={styles['button']}>{buttonText}</button>

			{showWomanImage && <div className={styles['woman-image']}></div>}
		</div>
	);
}
