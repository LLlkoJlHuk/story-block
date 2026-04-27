import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

export default function BlockAdultsHealthAttitude({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const [isExpanded, setIsExpanded] = useState(true);

	const title = blok?.title || 'Отношение взрослых к своему здоровью';
	const item1Fallback =
		'Согласно исследованиям, взрослые люди (30+ лет), с одной стороны, более обеспокоены состоянием своего здоровья и поэтому лучше следят за ним, с другой — склонны к ипохондрии различной степени¹⁸ ¹⁹';
	const item2Fallback =
		'Взрослые более осведомлены о вопросах здоровья и склонны пользоваться разнообразными источниками информации о различных заболеваниях. Также они чаще обращаются за медицинской помощью по поводу профилактики по сравнению с другими возрастными группами¹⁸';
	const descriptionFallback =
		'Учитывайте психологические особенности данной возрастной группы пациентов на приеме. Рассказывайте о различных аспектах заболевания, включая вопросы профилактики, объясняйте, зачем нужен тот или иной метод диагностики, и почему важно применять то или иное лекарственное средство.';

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockAdultsHealthAttitude']} {...editableProps}>
				<div className={styles['content']}>
					<h2 className={styles['title']}>{title}</h2>

					<button
						type="button"
						className={`${styles['arrow']} ${!isExpanded ? styles['arrow--collapsed'] : ''}`}
						aria-expanded={isExpanded}
						aria-label={isExpanded ? 'Свернуть блок' : 'Развернуть блок'}
						onClick={() => setIsExpanded((v) => !v)}
					/>

					<div
						className={`${styles['flex-collapse']} ${isExpanded ? styles['flex-collapse--open'] : styles['flex-collapse--closed']}`}
					>
						<div className={styles['flex-collapse-inner']}>
							<div className={styles['flex-wrapper']}>
								<div className={styles['flex-wrapper--item']}>
									<div className={styles['flex-wrapper--item--image']}></div>
									<div className={styles['flex-wrapper--item--text']}>
										<RichOrPlain
											value={blok?.item1_text}
											fallback={item1Fallback}
										/>
									</div>
								</div>
								<div className={styles['flex-wrapper--item']}>
									<div className={styles['flex-wrapper--item--image']}></div>
									<div className={styles['flex-wrapper--item--text']}>
										<RichOrPlain
											value={blok?.item2_text}
											fallback={item2Fallback}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles['description']}>
					<div className={styles['description--image']}></div>
					<div className={styles['description--text']}>
						<RichOrPlain
							value={blok?.description_text}
							fallback={descriptionFallback}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
