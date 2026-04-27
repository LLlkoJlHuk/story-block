import { storyblokEditable } from '@storyblok/react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

function hasNewsTitle(title) {
	if (title == null || title === '') {
		return false;
	}
	if (typeof title === 'string') {
		return title.trim().length > 0;
	}
	return true;
}

export default function BlockMoreNews({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};

	const title = blok?.title || 'Далее к другим новостям';

	const defaultNews = [
		{
			title: 'Изжога — одно из проявлений функциональных расстройств ЖКТ!',
			link: '#',
			module: '02',
			is_soon: true,
		},
		{
			title:
				'Отравления у детей — разбираемся в терминологии и подходах к лечению',
			link: '#',
			module: '03',
			is_soon: true,
		},
		{
			title: 'От причин формирования рефлюкса до возможных осложнений',
			link: '#',
			module: '04',
			is_soon: true,
		},
		{
			title:
				'Синдром перекреста в гастроэнтерологии: ГЭРБ, функциональной диспепсии и СРК',
			link: '#',
			module: '05',
			is_soon: true,
		},
	];

	const slots = [1, 2, 3, 4].map(i => ({
		title: blok?.[`news_${i}_title`],
		link: blok?.[`news_${i}_link`] || '#',
		module: blok?.[`news_${i}_module`] || '',
		is_soon: blok?.[`news_${i}_is_soon`] ?? false,
	}));

	const fromBlok = slots.filter(s => hasNewsTitle(s.title));
	const finalNews = fromBlok.length > 0 ? fromBlok : defaultNews;

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockMoreNews']} {...editableProps}>
				<h2 className={styles['title']}>{title}</h2>

				<div className={styles['news']}>
					{finalNews.map((item, index) => (
						<a
							href={item.link}
							target='_blank'
							className={`${styles['news--item']} ${item.is_soon ? styles['news--item--soon'] : ''}`}
							key={index}
						>
							<div className={styles['news--item--module']}>
								Модуль <br />
								<span>{item.module}</span>
							</div>
							<div className={styles['news--item--title']}>
								<RichOrPlain value={item.title} fallback='' />
							</div>

							{item.is_soon && (
								<div className={styles['news--item--soon-wrapper']}>
									<div className={styles['news--item--soon-wrapper--text']}>
										Скоро
									</div>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										className={styles['news--item--soon-wrapper--image']}
									>
										<g clipPath='url(#clip0_1_1621)'>
											<mask id='path-1-inside-1_1_1621' fill='white'>
												<rect y='8' width='24' height='16' rx='1' />
											</mask>
											<rect
												y='8'
												width='24'
												height='16'
												rx='1'
												stroke='currentColor'
												strokeWidth='4'
												mask='url(#path-1-inside-1_1_1621)'
											/>
											<path
												d='M5 8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8'
												stroke='currentColor'
												strokeWidth='2'
											/>
											<path d='M9 16L15 16' stroke='currentColor' strokeWidth='2' />
										</g>
										<defs>
											<clipPath id='clip0_1_1621'>
												<rect width='24' height='24' fill='white' />
											</clipPath>
										</defs>
									</svg>
								</div>
							)}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
