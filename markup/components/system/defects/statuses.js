import React from 'react';

import styles from './styles.scss';

const statuses = {
	'Відкрита': (
		<span className={styles.defectStatus + " " + styles.open}>Відкрита</span>
	),
	'Прийнята до виконання': (
		<span className={styles.defectStatus + " " + styles.inWork}>Прийнята до виконання</span>
	),
	'Виконана': (
		<span className={styles.defectStatus + " " + styles.done}>Виконана</span>
	),
	'Заплановано': (
		<span className={styles.defectStatus + " " + styles.will}>Запланована</span>
	),
	'Модерація': (
		<span className={styles.defectStatus + " " + styles.moderation}>Модерація</span>
	),
	'Відхилена': (
		<span className={styles.defectStatus + " " + styles.declined}>Відхилена</span>
	)
};

export default statuses;
