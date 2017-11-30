import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';
import SimpleBarChart from './simple-bar-chart';

const mapStateToProps = (state) => ({
	financeInfo: state.system.get('financeInfo'),
});

class Charts extends Component {

	render() {
		const persons = this.props.financeInfo.persons_rating ? this.props.financeInfo.persons_rating : null
		const companies = this.props.financeInfo.companies_rating ? this.props.financeInfo.companies_rating : null

		return (
			<div>
				{persons ? (
					<div className={styles.chartContainer}>
						<h3 className="text-center">ТОП контрагентів по ФОП (гривень)</h3>
						<SimpleBarChart data={persons}/>
					</div>
				): null}

				{companies ? (
					<div className={styles.chartContainer}>
						<h3 className="text-center">TOП контрагентів по юридичним особам (гривень)</h3>
						<SimpleBarChart data={companies}/>
					</div>
				): null}

			</div>
		)
	}
}

export default connect(mapStateToProps)(Charts);
