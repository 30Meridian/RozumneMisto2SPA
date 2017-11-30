import React, {Component} from 'react';

import styles from './styles.scss';
import Box from 'components/box';
import Title from 'components/dynamic-title';

export default class Help extends Component {
	render() {
		return (
			<div className={styles.helpPage}>
				<Title title={`Службовий кабінет. Розділ допомоги. Інформаційна система "Розумне місто" `} />
				<Box>
					<h3>Інструкція</h3>
					<div className={styles.iframeAlign}>
						<iframe src="https://docs.google.com/document/d/1Oszjl-1yKIV1MaOzU9QHH1rOodZXZcd2ufZZxK52WoI/edit?usp=sharing"
							className="iframe-size"></iframe>
					</div>
				</Box>
			</div>
		)
	}
}
