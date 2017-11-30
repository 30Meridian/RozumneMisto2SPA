import React, {Component} from 'react';
import { connect } from 'react-redux';

import Title from '../../dynamic-title';
import { loadWorkflowType, fetchPetitions } from '../redux/actions/documents';
import {Row, Col} from 'react-bootstrap';
import PetitionListBox from './list-box';
import Spinner from '../../spinner';
import PetitionsPlaceholder from './placeholder';
import Box from 'components/box';

const mapStateToProps = (state) => ({
	petitions: state.system.get('petitions'),
	isFetching: state.system.get('petitionsIsLoading'),
	community: state.system.get('community'),
	workflow_type: state.documents.get('module_type')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => {
		dispatch(fetchPetitions('perevirka-golosiv', 10)),
		dispatch(loadWorkflowType('petitions', slug))
	}
});

class Petitions extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.community.get('slug'));
	}

	render() {
		if (this.props.isFetching) {
			return <div><Spinner/></div>;
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
					<Title title={`Петиції. Петиції, які розглядаються. Інформаційна система "Розумне місто" `} />
					<h4 className="box-title">Петиції відсутні</h4>
				</Box>
			)
		}
		return (
			<div>
				<Title title={`Петиції. Петиції, які розглядаються. Інформаційна система "Розумне місто" `} />
				<PetitionListBox
					header="Петиції, що перевіряються"
					items={this.props.petitions}
					workflow_type={this.props.workflow_type}
					state="perevirka-golosiv"
				/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Petitions);
