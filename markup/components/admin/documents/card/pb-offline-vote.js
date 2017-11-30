import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'components/box';
import Input from 'components/form-components/input';
import Button from 'components/form-components/button';
import {ButtonGreen} from 'components/common-components/buttons';
import { loadDocumentOfflineVote, changeOfflineVoteField, submitDocumentOfflineVote
} from '../../redux/actions/documents';

import form from 'components/common-components/form.scss';


const mapStateToProps = state => ({
	offlineVote: state.adminDocuments.get('offlineVote'),
});

const mapDispatchToProps = dispatch => ({
	onMount: (id) => dispatch(loadDocumentOfflineVote(id)),
	onOfflineVoteChange: (field, value) => dispatch(changeOfflineVoteField(field, value)),
	onFormSubmit: (id) => dispatch(submitDocumentOfflineVote(id)),
});

class PbOfflineVote extends Component {
	componentWillMount() {
		this.props.onMount(this.props.match.params.id);
	}

	render() {
		return (
			<Box>
				<h3>Додати голоси за проект</h3>
				<form className="ui form" onSubmit={(event) => {
						event.preventDefault();
						this.props.onFormSubmit(this.props.match.params.id);
					}}>
					<div className={form.inlineField}>
					<Input label="Кількість голосів:" type="number" required={true} min={0}
						value={this.props.offlineVote.get('vote_count')}
						onChange={(event) => this.props.onOfflineVoteChange('vote_count', event.target.value)}/>
					</div>
					<ButtonGreen type="submit" value="Зберегти"/>
				</form>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PbOfflineVote);
