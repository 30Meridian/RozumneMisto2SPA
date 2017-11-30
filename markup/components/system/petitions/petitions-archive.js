import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadWorkflowType, fetchPetitions} from '../redux/actions/documents';

import Title from '../../dynamic-title';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';
import PetitionListBox from './list-box';
import PetitionsPlaceholder from './placeholder';
import Spinner from '../../spinner';

const mapStateToProps = (state) => ({
	petitions: state.system.get('petitions'),
	isFetching: state.system.get('petitionsIsLoading'),
	workflow_type: state.documents.get('module_type'),
	community: state.system.get('community')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => {
		dispatch(fetchPetitions('arkhivna', 10)),
		dispatch(loadWorkflowType('petitions', slug))
	}
});

class Petitions extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.community.get('slug'));
	}

	render() {
		if (this.props.isFetching) {
			return <div><Spinner/></div>
		}
		if (this.props.petitions == undefined) {
			return <div></div>
		}
		if (this.props.petitions.error) {
			return <div><PetitionsPlaceholder/></div>
		}
		if (this.props.petitions.results.length === 0) {
			return (
				<Box>
					<Title title={`Петиції. Архівні петиції. Інформаційна система "Розумне місто" `} />
					<h4 className="box-title">Петиції відсутні</h4>
				</Box>
			)
		}

		return (
			<div>
				<Title title={`Петиції. Архівні петиції. Інформаційна система "Розумне місто" `} />
				<PetitionListBox
					header="Петиції, що не зібрали голосів"
					items={this.props.petitions}
					workflow_type={this.props.workflow_type}
					state="arkhivna"
				/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Petitions);
