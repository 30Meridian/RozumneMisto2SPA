import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from '../../../form-components/select';
import { changeDocumentContractDepartment, fetchContractDepartments } from '../../redux/actions/documents';


const mapStateToProps = (state) => ({
	department: state.adminDocuments.get('contractDepartment'),
	contracts: state.adminDocuments.get('contractDepartments'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => dispatch(fetchContractDepartments(id)),
	onChange: (value) => dispatch(changeDocumentContractDepartment(value)),
});

class ContractChoice extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.workflowId);
	}

	render() {
		return (
			<div>
				<Select label="Департаменти" items={this.props.contracts}
					value={this.props.department} valueKey="name_department" onChange={this.props.onChange}/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractChoice);
