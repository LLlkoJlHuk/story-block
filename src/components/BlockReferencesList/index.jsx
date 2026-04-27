import { storyblokEditable } from '@storyblok/react';
import { useLayoutEffect, useRef, useState } from 'react';
import RichOrPlain from '../../lib/RichOrPlain';
import styles from './index.module.scss';

const COLLAPSED_PX = 38;

export default function BlockReferencesList({ blok }) {
	const editableProps = blok ? storyblokEditable(blok) : {};
	const [isExpanded, setIsExpanded] = useState(false);
	const innerRef = useRef(null);
	const [contentHeightPx, setContentHeightPx] = useState(COLLAPSED_PX);

	const title = blok?.title || 'Список литературы';

	const textFallback =
		'ГЭР — гастроэзофагеальный рефлюкс; ГЭРБ — гастроэзофагиальная рефлюксная болезнь.';

	useLayoutEffect(() => {
		const el = innerRef.current;
		if (!el) return;

		const measure = () => {
			setContentHeightPx(Math.max(COLLAPSED_PX, el.scrollHeight));
		};

		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);

		return () => ro.disconnect();
	}, [blok?.text]);

	return (
		<div className={styles['component-wrapper']}>
			<div className={styles['BlockReferencesList']} {...editableProps}>
				<h2 className={styles['title']}>{title}</h2>

				<div className={styles['references']}>
					<div
						className={styles['references--body']}
						style={{
							gridTemplateRows: isExpanded
								? `${contentHeightPx}px`
								: `${COLLAPSED_PX}px`,
						}}
					>
						<div ref={innerRef} className={styles['references--body-inner']}>
							<RichOrPlain
								value={blok?.text}
								fallback={textFallback}
								className={styles['references--text']}
								as='p'
							/>
						</div>
					</div>

					<button
						type='button'
						className={`${styles['references--arrow']} ${!isExpanded ? styles['references--arrow-collapsed'] : ''}`}
						aria-expanded={isExpanded}
						aria-label={isExpanded ? 'Свернуть список' : 'Развернуть список'}
						onClick={() => setIsExpanded(v => !v)}
					/>
				</div>

				<div className={styles['numb-odbr']}>Номер одобрения</div>
			</div>
		</div>
	);
}
