import { storyblokEditable } from '@storyblok/react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

export default function BlockQuestionsTeaser({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};

	const defaultQuestions = [
		'Почему ГЭРБ с каждым годом становится все актуальнее?',
		'Неужели ГЭРБ может быть даже у самых маленьких пациентов?',
		'Как бороться с недугом и победить его?',
	];
	const questionKeys = ['question_1', 'question_2', 'question_3'];
	const finalQuestions = questionKeys.map((key, i) => {
		const v = blok?.[key];
		if (v == null || v === '') {
			return defaultQuestions[i];
		}
		return v;
	});

	const answerTitleFallback =
		'На эти и многие другие вопросы ответим в нашем материале.';

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockQuestionsTeaser']} {...editableProps}>
				<div className={styles['questions']}>
					{finalQuestions.map((qValue, index) => (
						<div className={styles['question']} key={index}>
							<div className={styles['question--image-container']}>
								<div className={styles['question--image']}></div>
								<div className={styles['question--line']}></div>
							</div>
							<RichOrPlain
								value={qValue}
								fallback=''
								className={styles['question--title']}
							/>
						</div>
					))}
					<div className={styles['answer']}>
						<RichOrPlain
							value={blok?.answer_title}
							fallback={answerTitleFallback}
							className={styles['answer--title']}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
