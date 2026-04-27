import { storyblokEditable } from '@storyblok/react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

export default function BlockAdultsGerdOverview({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const title = blok?.title || 'Взрослые пациенты';
	const borderedFallback =
		'У взрослых часто развиваются полиморбидные состояния, что делает особо важной дифференциальную диагностику и влияет на выбор тактики лечения с учетом наличия других заболеваний¹⁷.';
	const textFallback =
		'Помимо изжоги, пациентов часто беспокоят внепищеводные проявления, которые не всегда распознаются врачами¹⁷. \n\nВнепищеводные симптомы чаще возникают из-за заброса содержимого желудка в гортань, что приводит к возникновению осиплости голоса и необходимости откашляться — «прочистить горло». Пациенты с ГЭРБ нередко жалуются на чувство давления или «комка» в горле¹⁷.';

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockAdultsGerdOverview']} {...editableProps}>
				<h2 className={styles['title']}>{title}</h2>

				<div className={styles['content']}>
					<div className={styles['content--image']}></div>

					<div className={styles['content--text']}>
						<div className={styles['content--text--rich-text']}>
							<RichOrPlain
								value={blok?.text}
								fallback={textFallback}
								className={styles['content--text']}
								as='p'
							/>
						</div>
						<div className={styles['content--text--bordered-text']}>
							<RichOrPlain
								value={blok?.bordered_text}
								fallback={borderedFallback}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
