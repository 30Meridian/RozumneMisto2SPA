import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyPetitions} from '../redux/actions/documents';
import Spinner from '../../spinner';

import PetitionListBoxSimple from './list-box-simple';
import Box from 'components/box';

import styles from './styles.scss';


const mapStateToProps = (state) => ({
	petitions: state.system.get('petitions'),
	isFetching: state.system.get('petitionsIsLoading'),
	community: state.system.get('community')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch(fetchMyPetitions(5, 0)),
})

class MyPetitionsMain extends Component {


	componentWillMount() {

	this.props.onLoad();

	}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>;
		}

		if (this.props.community.get('payment_model') === 1) {
			return null;
		}

		if (this.props.petitions == undefined) {
			return <div></div>
		}

		if (this.props.petitions.error) {
			return <Box></Box>
		}

		if (this.props.petitions.results.length === 0) {
			return (
			<Box>
					<h4 className="box-title">Ви не створили жодної петиції</h4>
			</Box>
			)
		}
		return (
			<PetitionListBoxSimple header="Мої петиції" items={this.props.petitions} />
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPetitionsMain);
