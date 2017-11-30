import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {fetchDonors} from '../../redux/actions';
import Donor from './donor';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';
import Title from 'components/dynamic-title';

import Spinner from '../../../spinner';

import styles from './styles.scss';

const mapStateToProps = state => ({
	donors: state.system.get('donors'),
	community: state.system.get('community'),
	isFetching: state.system.get('moduleIsLoading')
});

const mapDispatchToProps = dispatch => ({
		fetchDonors: (slug) => dispatch(fetchDonors(slug))
});

class Donors extends Component {

	componentWillMount() {
		this.props.fetchDonors(this.props.community.get('slug'));
	}

	render() {

		 return (
			<Box>
				<Title title={`Донорство крові. Інформаційна система "Розумне місто" `} />
				<h3 className={styles.center}>Донорство крові</h3>
				<div className={styles.center}>
					<img className={styles.img} src="/assets/img/content/logo-donor.png"/>
				</div>
				<h5>
					<strong>Про проект "ДонорUA"</strong>
				</h5>
				<p>"ДонорUA" - автоматизована система рекрутингу донорів крові, основна мета якої - встановити швидкий контакт "донор - реципієнт". Проект також спрямований на координацію донорів крові та пропаганду безоплатного донорства в Україні.
				</p>
				<div className={styles.cards}>
					<Row>
					{this.props.isFetching ? (
						<div><Spinner /></div>) : (
						<div>
							{this.props.donors.size > 0 ? (
								<ul>
									{this.props.donors.map((value, i) => <Donor key={i} item={value}/>)}
								</ul>
							): (
								<div className={styles.empty}><h4>Донори відсутні</h4></div>
							)}
						</div>
					)}
				</Row>
				</div>
			</Box>
		)
	}
}

Donors.propTypes = {
	donors: PropTypes.instanceOf(List).isRequired,
	fetchDonors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Donors);
