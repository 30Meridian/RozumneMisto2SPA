import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {fetchQueueValue} from '../../redux/actions';
import Box from 'components/box';
import AccomodationPlaceholder from './placeholder';
import {Row, Col} from 'react-bootstrap';
import Title from 'components/dynamic-title';

import styles from './styles.scss';

const mapStateToProps = state => ({queue: state.system.get('queue'), community: state.system.get('community')});

const mapDispatchToProps = dispatch => ({
	fetchQueueValue: (slug) => dispatch(fetchQueueValue(slug))
});

class OpenBudget extends Component {

	componentWillMount() {
		this.props.fetchQueueValue(this.props.community.get('slug'));
	}

	render() {
		return (
			<Box>
				<Title title={`Черги на житло. Інформаційна система "Розумне місто" `} />
				{this.props.community.get('payment_model') == 1
					? (<AccomodationPlaceholder/>)
					: (
						<div>
							<h3 className="section-head">Черги на житло</h3>
							<Row>
								<Col md={12}>
									<div className={styles.frame} dangerouslySetInnerHTML={{
										__html: this.props.queue
									}}></div>
								</Col>
							</Row>
						</div>
					)}

			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenBudget);
