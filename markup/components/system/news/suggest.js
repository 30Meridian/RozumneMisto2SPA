import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ButtonGreen} from 'components/common-components/buttons.js';
import Box from 'components/box';
import Title from '../../dynamic-title';
import FormResolver from '../../common/document/form-resolver';
import Input from '../../form-components/input';
import Button from '../../form-components/button';
import {fetchDocumentFormForModule, changeDocumentTitle, changeDocumentTitleImage, submitNewDocument, changeDocumentFormValue} from '../../common/redux/actions/document';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({title: state.commDocument.get('title'), documentForm: state.commDocument.get('documentForm'), formValues: state.commDocument.get('documentFormValue'), hostEnable: state.system.get('standaloneHostEnable')});

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

class SuggestNews extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.match.params.community_slug, 'news');
	}

	render() {
		return (
			<div>
				<Box title4="Запропонувати новину">
					<Title title={`Новини. Запронувати новину. Інформаційна система "Розумне місто" `} />
					<form className="ui form" onSubmit={(event) => this.props.onSubmit(event, `${this.props.hostEnable
						? ''
						: '/' + this.props.match.params.community_slug}/news/`)}>
						<div className={form.divider}>
							<Input label="Заголовок новини" required={true} value={this.props.title} onChange={this.props.onTitleChange}/>
						</div>
						<FormResolver items={this.props.documentForm} values={this.props.formValues} onValueChange={this.props.onValueChange}/>
						<div className={form.divider}>
							<Input type="file" label="Зображення" onChange={this.props.onTitleImageChange}/>
						</div>
						<div className={form.divider}>
							<ButtonGreen type="submit" value="Відправити на розгляд"/>
						</div>
					</form>
				</Box>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestNews);
