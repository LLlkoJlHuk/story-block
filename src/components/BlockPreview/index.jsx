import { storyblokEditable } from '@storyblok/react';
import styles from './index.module.scss';

export default function BlockPreview({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const title = blok?.title || 'Гастроэзофагиальная рефлюксная болезнь';
	const buttonText = blok?.button_text || 'Поделиться с коллегами';
	const buttonLink = blok?.button_link || '#';
	const showWomanImage = blok?.show_woman_image ?? true;

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockPreview']} {...editableProps}>
				<h2 className={styles['title']}>{title}</h2>

				<a href={buttonLink} target='_blank' className={styles['button']}>
					{buttonText}
				</a>

				{showWomanImage && <div className={styles['woman-image']}></div>}
			</div>
		</div>
	);
}
