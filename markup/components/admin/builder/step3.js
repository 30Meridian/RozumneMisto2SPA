import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ButtonDefault} from 'components/common-components/buttons';
import history from '../../history';
import { fetchStates, loadTransitions } from '../redux/actions';
import {Button} from '../../form-components';

import TransitionElement from './transition-element';
import {addTransition, submitTransitions} from '../redux/actions';

import Box from 'components/box';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({transitions: state.builder.three.get('transitions')})

const mapDispatchToProps = (dispatch) => ({
	fetchStateList: (workflowId) => dispatch(fetchStates(workflowId)),
	loadTransitionList: (workflowId) => dispatch(loadTransitions(workflowId)),
	onAddClick: (event) => {
		event.preventDefault();
		dispatch(addTransition());
	},
	onSubmit: (event, workflowId) => {
		event.preventDefault();
		dispatch(submitTransitions(workflowId, `/admin/builder/workflow/${workflowId}/step4`));
	}
})

class Step3 extends Component {
	componentWillMount() {
		this.props.fetchStateList(this.props.match.params.workflowId);
		this.props.loadTransitionList(this.props.match.params.workflowId);
	}

	render() {
		return (
			<Box>
				<div className="box-head">
					<h3>Переходи</h3>
				</div>
				<form
					onSubmit={(event) => this.props.onSubmit(event, this.props.match.params.workflowId)}>
					{this.props.transitions.map((value, index) => (
						!value.get('isDeleted') ? <TransitionElement key={index} id={index} item={value}/> : null
					))}
					<ButtonDefault value="Додати" onClick={this.props.onAddClick}/>
					<hr/>
					<ButtonDefault type="submit" value="Зберегти"/>
				</form>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
