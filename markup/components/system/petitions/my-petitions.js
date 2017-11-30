import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyPetitions} from '../redux/actions/documents';
import Spinner from '../../spinner';

import Title from 'components/dynamic-title';
import PetitionListBoxMy from './list-box-my';
import Box from 'components/box';

import styles from './styles.scss';


const mapStateToProps = (state) => ({
	petitions: state.system.get('petitions'),
	isFetching: state.system.get('petitionsIsLoading'),
	community: state.system.get('community')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset) => dispatch(fetchMyPetitions(25, offset)),
})

class MyPetitions extends Component {



		componentWillReceiveProps(nextProps) {

			const page = nextProps.match.params.page;
			const offset = 25 * (page - 1);
			if (nextProps.match.url !== this.props.match.url) {
				this.props.onLoad(offset);
			}
		}

		componentWillMount() {
			const page = this.props.match.params.page || 1;
			const offset = 25 * (page - 1);
			this.props.onLoad(offset);
		}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>;
		}

		if (this.props.community.get('payment_model') === 1) {
			return <Box>
				<Title title={`Мої петиції. Інформаційна система "Розумне місто" `} />
				<h2 className="module-header">Модуль не підключений</h2>
			</Box>;
		}


		if (this.props.petitions == undefined) {
			return <div></div>
		}

		if (this.props.petitions.error) {
			return <Box></Box>
		}

		if (!this.props.petitions.results || this.props.petitions.results.length === 0) {
			return (
			<Box>
				<Title title={`Мої петиції. Інформаційна система "Розумне місто" `} />
					<h4 className="box-title">Ви не створили жодної петиції</h4>
			</Box>
			)
		}
		return (
			<div>
				<Title title={`Мої петиції. Інформаційна система "Розумне місто" `} />
				<PetitionListBoxMy header="Мої петиції" items={this.props.petitions} url={this.props.match.params.page}/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPetitions);
