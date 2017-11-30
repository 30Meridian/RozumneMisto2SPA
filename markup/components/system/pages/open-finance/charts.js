import React, {Component} from 'react';

import styles from './styles.scss';
import SimpleBarChart from './simple-bar-chart';


class Charts extends Component {

	render() {
		return (
			<div>
				<div className={styles.chartContainer}>
					<h3 className="text-center">ТОП контрагентів по ФОП (гривень)</h3>
					<SimpleBarChart data={this.props.persons}/>
				</div>
				<div className={styles.chartContainer}>
					<h3 className="text-center">TOП контрагентів по юридичним особам (гривень)</h3>
					<SimpleBarChart data={this.props.companies}/>
				</div>
			</div>
		)
	}
}

export default Charts;
