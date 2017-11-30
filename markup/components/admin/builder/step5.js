import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import history from '../../history';
import { fetchStates, loadTransitions } from '../redux/actions';
import { addPackage, loadPackages, changeAttachedPackagePackage, changeAttachedPackageState,
	changeAttachedPackageTransition, changeAttachedPackageConfig, submitAttachedPackages
} from '../redux/actions/builder/step-five';
import Box from 'components/box';

import { Button } from '../../form-components';
import {ButtonDefault} from 'components/common-components/buttons';
import PackageElement from './package-element';

import form from '../../common-components/form.scss';


const mapStateToProps = state => ({
	states: state.builder.three.get('states'),
	transitions: state.builder.four.get('transitions'),
	packages: state.builder.five.get('packages'),
	attachedPackages: state.builder.five.get('attachedPackages'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: (slug) => {
		dispatch(fetchStates(slug));
		dispatch(loadTransitions(slug));
		dispatch(loadPackages());
	},
	onPackageChange: (value, key) => dispatch(changeAttachedPackagePackage(value, key)),
	onStateChange: (value, key) => dispatch(changeAttachedPackageState(value, key)),
	onTransitionChange: (value, key) => dispatch(changeAttachedPackageTransition(value, key)),
	onConfigChange: (value, key) => dispatch(changeAttachedPackageConfig(value, key)),
	onAddClick: (event) => {
		event.preventDefault();
		dispatch(addPackage());
	},
	onSubmit: (event) => {
		event.preventDefault();
		dispatch(submitAttachedPackages());
	  history.push('/admin/builder');
	}
});

class Step5 extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.match.params.workflow_slug);
	}

	render() {
		const transitions = this.props.transitions.map(item => new Map({
			id: item.get('id'),
			value: item.get('source_state_name') + ' => ' + item.get('destination_state_name'),
		}));
		return (
			<Box>
				<h3>Етап 5</h3>
				<form onSubmit={this.props.onSubmit}>
					{this.props.attachedPackages.map((item, index) => (
						<PackageElement key={index} id={index} item={item}
							onPackageChange={this.props.onPackageChange}
							onStateChange={this.props.onStateChange}
							onTransitionChange={this.props.onTransitionChange}
							onConfigChange={this.props.onConfigChange}
							packages={this.props.packages} states={this.props.states} transitions={transitions} />
					))}
					<ButtonDefault type="submit" value="Прийняти" />
					<ButtonDefault value="Додати" onClick={this.props.onAddClick} />
				</form>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Step5);
