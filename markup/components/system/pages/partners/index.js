import React, {Component} from 'react';
import Box from 'components/box';
import styles from './styles.scss';

class Partners extends Component {
	render() {
		return (
			<Box>
				<h3 className={styles.center}>Друзі та партнери</h3>
				<h3 className={styles.center}>
					<i className="fa fa-heart-o text-red"></i>
				</h3>
				<h3 className={styles.center}>Неймовірні люди роблять неймовірні інструменти заради нашого спільного майбутнього</h3>

				<table className={styles.partners}>
					<tbody>
						<tr>
							<td>
								<a href="http://donor.ua/" target="_blank"><img src="/assets/img/content/logo-donor.png"/></a>
							</td>
							<td>
								<a href="http://spending.gov.ua/" target="_blank">
									<img src="/assets/img/content/logo_edata.png"/></a>
							</td>
							<td>
								<a href="http://ukryama.com/"><img src="http://ukryama.com/images/logo.png"/></a>
							</td>
							<td>
								<a href="http://eidos.org.ua/" target="_blank">
									<img src="http://eidos.org.ua/wp-content/uploads/2016/03/logo.jpg"/></a>
							</td>
							<td>
								<a href="http://igov.org.ua/" target="_blank">
									<img src="/assets/img/content/igov.jpg"/></a>
							</td>
						</tr>
					</tbody>
				</table>
			</Box>
		)
	}
}

export default Partners;
