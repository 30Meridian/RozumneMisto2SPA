import React, {Component} from 'react';
import {connect} from 'react-redux';

import Box from 'components/box';
import FormResolver from '../../common/document/form-resolver';
import Input from '../../form-components/input';
import Title from '../../dynamic-title';
import Button from '../../form-components/button';
import {ButtonGreen} from 'components/common-components/buttons';
import {fetchDocumentFormForModule, changeDocumentTitle, changeDocumentTitleImage, submitNewDocument, changeDocumentFormValue} from '../../common/redux/actions/document';
import {Row, Col} from 'react-bootstrap';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({title: state.commDocument.get('title'), documentForm: state.commDocument.get('documentForm'), formValues: state.commDocument.get('documentFormValue'), community: state.system.get('community'), hostEnable: state.system.get('standaloneHostEnable')});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug, moduleKey) => dispatch(fetchDocumentFormForModule(slug, moduleKey)),
	onValueChange: (data, index) => dispatch(changeDocumentFormValue(data, index)),
	onTitleChange: (event) => {
		event.preventDefault();
		dispatch(changeDocumentTitle(event.target.value));
	},
	onTitleImageChange: (event) => {
		event.preventDefault();
		dispatch(changeDocumentTitleImage(event.target));
	},
	onSubmit: (event, url) => {
		event.preventDefault();
		dispatch(submitNewDocument(url));
	}
});

class CreatePetition extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.match.params.community_slug || this.props.community.get('slug'), 'petitions');
	}

	render() {
		return (
			<div>
				<Title title={`Петиції. Створити петицію. Інформаційна система "Розумне місто" `} />
				<Box title4="Створити петицію">

					<form className="ui form" onSubmit={(event) => this.props.onSubmit(event, `${this.props.hostEnable
						? ''
						: '/' + this.props.match.params.community_slug}/petitions/`)}>
						<div className={form.divider}>
							<Input label="Назва" required={true} value={this.props.title} onChange={this.props.onTitleChange}/>
						</div>
						<FormResolver items={this.props.documentForm} values={this.props.formValues} onValueChange={this.props.onValueChange}/>
						<div className={form.divider}>
							<Input type="file" label="Зображення" onChange={this.props.onTitleImageChange}/>
						</div>
						<div className={form.divider}>
							<ButtonGreen type="submit" value="Відправити"/>
						</div>
					</form>
				</Box>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePetition);
