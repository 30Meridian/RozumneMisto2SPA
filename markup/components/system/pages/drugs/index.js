import React, { Component } from 'react';
import { List } from 'immutable';
import { connect} from 'react-redux';
import { loadDrugList } from '../../redux/actions';
import Box from 'components/box';
import Placeholder from './placeholder';
import { Row, Col } from 'react-bootstrap';

import styles from './styles.scss';

const mapStateToProps = state => ({
	drugsList: state.system.get('drugsList'),
	community: state.system.get('community')
});

const mapDispatchToProps = dispatch => ({
	loadDrugList: (slug) => dispatch(loadDrugList(slug))
});

class Drugs extends Component {

	componentWillMount() {
		this.props.loadDrugList(this.props.community.get('slug'));
	}

	render() {
		return (
			<Box>
				{this.props.community.get('payment_model') == 1
					? (<Placeholder/>)
					: (
						<div>
							<h3 className="section-head">Реєстр ліків</h3>
							<Row>
								<Col md={12}>
									<div className={styles.frame} dangerouslySetInnerHTML={{
										__html: this.props.drugsList
									}}></div>
								</Col>
							</Row>
						</div>
					)}
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Drugs);
