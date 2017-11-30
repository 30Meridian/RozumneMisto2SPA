import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadWorkflowType, fetchPetitions} from '../redux/actions/documents';

import Title from '../../dynamic-title';
import PetitionListBox from './list-box';
import PetitionsPlaceholder from './placeholder';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';


import Spinner from '../../spinner';

const mapStateToProps = (state) => ({
	petitions: state.system.get('petitions'),
	isFetching: state.system.get('petitionsIsLoading'),
	community: state.system.get('community'),
	workflow_type: state.documents.get('module_type')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset, slug) => {
		dispatch(fetchPetitions('zbir-golosiv', 25, offset)),
		dispatch(loadWorkflowType('petitions', slug))
	}
});

class Petitions extends Component {

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
		this.props.onLoad(offset, this.props.community.get('slug'));
	}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>;
		}
		if (this.props.petitions == undefined) {
			return <div></div>
		}

		if (this.props.petitions.error) {
			return <div>
				<Title title={`Петиції. Активні петиції. Інформаційна система "Розумне місто" `} />
				<PetitionsPlaceholder/>
			</div>
		}

		if (this.props.petitions.results.length === 0) {
			return (
				<Box>
					<Title title={`Петиції. Активні петиції. Інформаційна система "Розумне місто" `} />
					<h4 className="box-title">Петиції відсутні</h4>
				</Box>
			)
		}
		return (
			<div>
				<Title title={`Петиції. Активні петиції. Інформаційна система "Розумне місто" `} />
				<PetitionListBox
					header="Останні петиції, що збирають голоси"
					items={this.props.petitions}
					url={this.props.match.params.page}
					limit={25}
					workflow_type={this.props.workflow_type}
					state="zbir-golosiv"
				/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Petitions);
