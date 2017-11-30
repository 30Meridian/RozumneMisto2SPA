import React, {Component} from 'react';
import {connect} from 'react-redux';

import history from '../../history';
import { loadTransitions, loadStaffList, submitAttachedStaff } from '../redux/actions';
import { Button } from '../../form-components';
import {ButtonDefault} from 'components/common-components/buttons';
import StaffElement from './staff-element';
import Box from 'components/box';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
	transitions: state.builder.four.get('transitions'),
});

const mapDispatchToProps = (dispatch) => ({
	loadStaffList: (workflowId) => dispatch(loadStaffList(workflowId)),
	loadTransitionList: (workflowId) => dispatch(loadTransitions(workflowId)),
	onSubmit: (event, workflowId) => {
		event.preventDefault();
		dispatch(submitAttachedStaff('/admin/builder'));
	}
})

class Step4 extends Component {
	componentWillMount() {
		this.props.loadStaffList(this.props.match.params.workflowId);
		this.props.loadTransitionList(this.props.match.params.workflowId);
	}

	render() {
		return (
			<Box>
				<div className="box-head">
					<h3>Відповідальний персонал</h3>
				</div>
				<form
					onSubmit={(event) => this.props.onSubmit(event, this.props.match.params.workflowId)}>
					{this.props.transitions.map((item, index) =>
						<Box><StaffElement key={index} id={index} item={item}/></Box>
					)}
					<ButtonDefault type="submit" value="Прийняти" />
				</form>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
