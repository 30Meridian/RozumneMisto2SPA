import React, {Component} from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import {ButtonDefault} from 'components/common-components/buttons.js';
import { Input, Select, Button } from 'components/form-components';
import Checkbox from 'components/form-components/checkbox';
import SelectPicker from 'components/components/selectpicker';
import Spinner from 'components/spinner';
import Box from 'components/box';

import form from 'components/common-components/form.scss';
import styles from './styles.scss';

import { createWorkflowType, loadCategoryList, loadDepartmentList, loadWorkflowType, loadWorkflowTypeForm,
	changeWorkflowTypeField, changeWorkflowTypeForm, submitWorkflowType,
} from '../redux/actions/builder/workflow';

const mapStateToProps = (state) => ({
	departmentList: state.builder.workflow.get('departmentList'),
	departmentListIsLoading: state.builder.workflow.get('departmentListIsLoading'),
	categoryList: state.builder.workflow.get('categoryList'),
	workflow: state.builder.workflow.get('workflow'),
	workflowIsLoading: state.builder.workflow.get('workflowIsLoading'),
	workflowForm: state.builder.workflow.get('workflowForm'),
});

const mapDispatchToProps = (dispatch) => ({
	createWorkflowType: () => dispatch(createWorkflowType()),
	loadWorkflowType: (workflowId) => dispatch(loadWorkflowType(workflowId)),
	loadWorkflowTypeForm: (workflowId) => dispatch(loadWorkflowTypeForm(workflowId)),
	loadDepartmentList: (search) => dispatch(loadDepartmentList(search)),
	loadCategoryList: () => dispatch(loadCategoryList()),
	changeWorkflowTypeField: (key, data) => dispatch(changeWorkflowTypeField(key, data)),
	changeWorkflowTypeForm: (data) => dispatch(changeWorkflowTypeForm(data)),
	submitWorkflowType: (workflowId) => dispatch(submitWorkflowType(workflowId)),
});

class Step1 extends Component {
	componentWillMount() {
		let workflowId = this.props.match.params.workflowId;
		if (workflowId > 0) {
			this.props.loadWorkflowType(workflowId);
			this.props.loadWorkflowTypeForm(workflowId);
		} else this.props.createWorkflowType();

		this.props.loadCategoryList();
		this.props.loadDepartmentList();
	}

	componentDidMount() {
		const formBuilder = $('.build-wrap').formBuilder();
		this.props.changeWorkflowTypeForm(formBuilder);
	}

	render() {
		return (
				<Box>
					<div className="box-head">
						<h3>Інформація про процес</h3>
					</div>
					{this.props.workflowIsLoading ? <Spinner /> :
					<form>
						<Input label="Заголовок" type="text" required={true}
							value={this.props.workflow.get('title')}
							onChange={(event) => this.props.changeWorkflowTypeField('title', event.target.value)}/>
						<Select label="Категорія" items={this.props.categoryList.get('results')}
							value={this.props.workflow.get('category')} valueKey={"name"}
							onChange={(value) => this.props.changeWorkflowTypeField('category', value)}/>
						<hr />
						<div>
							<label>Департамент: </label>
							{this.props.departmentListIsLoading && !this.props.departmentList.get('results') ? <Spinner /> :
								<SelectPicker items={this.props.departmentList.get('results')}
									value={this.props.workflow.get("owner")} itemValue={"full_name"}
									title={this.props.workflow.get("owner_name")}
									onSearchChange={(event) => this.props.loadDepartmentList(event.target.value)}
									onChange={(event, item) => this.props.changeWorkflowTypeField('owner', item.get('id'))}
									/>
							}
						</div>
						<Checkbox label="Титульне зображення" className={form.inlineField} type="checkbox"
							checked={this.props.workflow.get('image_option')}
							onChange={(event) => this.props.changeWorkflowTypeField('image_option', event.target.checked)}/>
					</form>
					}
					<div name="formBuilder" className="build-wrap"></div>
					<ButtonDefault value="Зберегти"
						onClick={(event) => this.props.submitWorkflowType(this.props.match.params.workflowId)} />
				</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
