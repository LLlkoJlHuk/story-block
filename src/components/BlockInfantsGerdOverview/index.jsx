import { storyblokEditable } from '@storyblok/react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

export default function BlockInfantsGerdOverview({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const title = blok?.title || 'Младенцы';
	const textTitle =
		blok?.text_title || 'Для начала необходимо разграничить два термина:';
	const item1TextTitle = blok?.item1_text_title || 'ГЭР';
	const item1DescriptionFallback = 'гастроэзофагеальный рефлюкс ';
	const item2TextTitle = blok?.item2_text_title || 'ГЭРБ';
	const item2DescriptionFallback = 'гастроэзофагиальная рефлюксная болезнь ';
	const textFallback =
		'ГЭР — это непроизвольное прохождение содержимого желудка в пищевод с регургитацией и/или рвотой или без них. У детей он часто представляет собой физиологическое явление, особенно у младенцев со срыгиванием².';
	const buttonText = blok?.link_text || 'Узнать больше о ГЭР у детей';
	const buttonLink = blok?.link_href || '#';
	const subtitle =
		blok?.subtitle ||
		'ГЭР считается патологическим и называется ГЭРБ, если рефлюкс негативно влияет на здоровье ребенка, например⁴:';
	const defaultAchievements = [
		'Препятствует полноценному питанию ребенка, его росту и развитию',
		'Затрудняет дыхание (кашель, свистящие хрипы или остановка дыхания)',
		'Повреждает пищевод (приводит к развитию эзофагита)',
		'Не прекращается в младенчестве и продолжается в детстве',
	];
	const achievementKeys = [
		'achievement_1',
		'achievement_2',
		'achievement_3',
		'achievement_4',
	];
	const finalAchievements = achievementKeys.map((key, i) => {
		const v = blok?.[key];
		if (v == null || v === '') {
			return defaultAchievements[i];
		}
		return v;
	});

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockInfantsGerdOverview']} {...editableProps}>
				<h2 className={styles['title']}>{title}</h2>

				<div className={styles['content']}>
					<div className={styles['content--image']}></div>

					<div className={styles['content--text']}>
						<div className={styles['content--text--title']}>{textTitle}</div>
						<div className={styles['content--text--flex-wrapper']}>
							<div className={styles['content--text--flex-wrapper--item']}>
								<div
									className={styles['content--text--flex-wrapper--item--title']}
								>
									{item1TextTitle}
								</div>
								<div
									className={styles['content--text--flex-wrapper--item--text']}
								>
									<RichOrPlain
										value={blok?.item1_description}
										fallback={item1DescriptionFallback}
									/>
								</div>
							</div>
							<div className={styles['content--text--flex-wrapper--item']}>
								<div
									className={styles['content--text--flex-wrapper--item--title']}
								>
									{item2TextTitle}
								</div>
								<div
									className={styles['content--text--flex-wrapper--item--text']}
								>
									<RichOrPlain
										value={blok?.item2_description}
										fallback={item2DescriptionFallback}
									/>
								</div>
							</div>
						</div>
						<div className={styles['content--text--rich-text']}>
							<RichOrPlain
								value={blok?.text}
								fallback={textFallback}
								className={styles['content--text']}
								as='p'
							/>
						</div>
						<a
							href={buttonLink}
							target='_blank'
							className={styles['content--text--link']}
						>
							{buttonText}
						</a>
					</div>
				</div>

				<h3 className={styles['subtitle']}>{subtitle}</h3>

				<div className={styles['achievements']}>
					{finalAchievements.map((achValue, index) => (
						<div className={styles['achievement']} key={index}>
							<div className={styles['achievement--image-container']}>
								<div className={styles['achievement--image']}></div>
								<div className={styles['achievement--line']}></div>
							</div>
							<RichOrPlain
								value={achValue}
								fallback=''
								className={styles['achievement--title']}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
