import { storyblokEditable } from '@storyblok/react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

export default function BlockGerdOverview({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const title = blok?.title || 'Гастроэзофагиальная рефлюксная болезнь';
	const borderedFallback =
		'В чем различия между пациентами разного возраста с ГЭРБ?';
	const textFallback =
		'Специалисты определяют ГЭРБ как хроническое заболевание с рецидивирующим течением, связанное с непроизвольным и регулярно повторяющимся забросом желудочного содержимого в пищевод, что вызывает повреждения слизистой оболочки пищевода и/или приводит к характерным симптомам, включая изжогу¹.';

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockGerdOverview']} {...editableProps}>
				<h2 className={styles['title']}>{title}</h2>

				<div className={styles['content']}>
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

					<div className={styles['content--image']}></div>
				</div>
			</div>
		</div>
	);
}
