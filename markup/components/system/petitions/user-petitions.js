import React, {Component} from 'react';

import PetitionItem from './petition-item';

import Box from 'components/box';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';

class Petitions extends Component {
	render() {
		return (
			<Box>
				<h3>Останні петиції, що збирають голоси:</h3>
					<div className={styles.List}>
						<div className={styles.listLeft}>
							<span>Ілюстрація</span>
							<span>Номер заявки</span>
							<span>Суть звернення</span>
						</div>
						<div className={styles.statusWrap}>
							<span>Підписів</span>
						</div>
					</div>

				<PetitionItem/>
				<div className={btn.btnWrap}>
					<div className="btn-group">
						<a href="#!" className='btn btn-default'>
							<i className="fa fa-plus-circle" aria-hidden="true"></i>
							Додати петицію</a>
						<a href="#!" className='btn btn-default'>Активні</a>
						<a href="#!" className='btn btn-default'>Розглядаються</a>
						<a href="#!" className='btn btn-default'>Розглянуті</a>
					</div>
				</div>
			</Box>
		)
	}
}

export default Petitions;
