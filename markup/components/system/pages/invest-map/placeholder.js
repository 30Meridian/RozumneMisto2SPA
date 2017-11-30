import React, {Component} from 'react';

import Box from 'components/box';

import styles from './styles.scss';

class InvestPlaceholder extends Component {
	render() {
		return (
			<Box>
				<div className={styles.investImgBlock}>
					<h2>Інвестеційна мапа</h2>
					<p>Практичний інструмент візуалізації та адміністрування об’єктів для залучення інвестицій до громади.</p>
					<p>Працює у 76 містах</p>
					<div className={styles.investImg}>
						<img src="/assets/img/content/invest1.jpg"/>
					</div>
					<div className={styles.investImg}>
						<img src="/assets/img/content/invest2.jpg"/>
					</div>
					<div className={styles.investImg}>
						<img src="/assets/img/content/invest3.jpg"/>
					</div>
					<div className={styles.investImg}>
						<img src="/assets/img/content/invest4.jpg"/>
					</div>
				</div>
			</Box>
		)
	}
}

export default InvestPlaceholder;
