import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import {ButtonDefault} from 'components/common-components/buttons';
import history from '../../history';
import {fetchStates, addState, submitStates} from '../redux/actions';
import {Button} from '../../form-components';

import Box from 'components/box';

import SelectElement from './state-element';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({states: state.builder.two.get('states')})

const mapDispatchToProps = (dispatch) => ({
	fetchStateList: (workflowId) => dispatch(fetchStates(workflowId)),
	onAddClick: (event) => {
		event.preventDefault();
		dispatch(addState());
	},
	onSubmit: (event, workflowId) => {
		event.preventDefault();
		dispatch(submitStates(workflowId, `/admin/builder/workflow/${workflowId}/step3`));
	}
})

class Step2 extends Component {
	componentWillMount() {
		this.props.fetchStateList(this.props.match.params.workflowId);
	}

	render() {
		return (
				<Box>
					<div className="box-head">
						<h3>Стани</h3>
					</div>
					<form
						onSubmit={(event) => this.props.onSubmit(event, this.props.match.params.workflowId)}>
						{this.props.states.map((value, index) =>
							!value.get('isDeleted') ? <SelectElement key={index} id={index} item={value}/> : null
						)}
						<hr/>
						<ButtonDefault value="Додати" onClick={this.props.onAddClick}/>
						<hr/>
						<ButtonDefault type="submit" value="Зберегти"/>
					</form>
				</Box>
		);
	}
};

Step2.propTypes = {
	states: React.PropTypes.instanceOf(List).isRequired,
	onMount: React.PropTypes.func.isRequired,
	onAddClick: React.PropTypes.func.isRequired,
	onSubmit: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
