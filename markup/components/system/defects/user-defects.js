import React, {Component} from 'react';
import DefectItem from './defect-item.js';
import Box from 'components/box';
import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';

class MyDefects extends Component {
	render() {
		return (
			<Box>
				<h3>Останні заявки на усунення дефектів ЖКГ1:</h3>
					<div className={styles.List}>
						<div className={styles.listLeft}>
							<span>Ілюстрація</span>
							<span>Номер заявки</span>
							<span>Суть заявки</span>
						</div>
						<div className={styles.statusWrap}>
							<span>Статус</span>
						</div>
					</div>

				<div className="claims">

					<DefectItem/>

					<div className={btn.btnWrap}>
						<div className="btn-group hide-mob">
						<a href="" className="btn btn-default">
							<i className="fa fa-plus-circle" aria-hidden="true"></i>
							Додати заявку</a>
						<a href="" className="btn btn-default">Реєстр заявок</a>
						</div>
					</div>

				</div>
			</Box>
		)
	}
}

export default MyDefects;
