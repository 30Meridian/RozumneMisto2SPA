import React, {Component} from 'react';
import {connect} from 'react-redux';

import Box from 'components/box';
import FormResolver from '../../common/document/form-resolver';
import {Input, Button} from '../../form-components';
import {fetchDocumentFormForModule, changeDocumentTitle, changeDocumentTitleImage, submitNewDocument, changeDocumentFormValue} from '../../common/redux/actions/document';
import {ButtonGreen} from 'components/common-components/buttons.js';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
	title: state.commDocument.get('title'),
	titleImageOption: state.commDocument.get('titleImageOption'),
	documentForm: state.commDocument.get('documentForm'),
	formValues: state.commDocument.get('documentFormValue'),
	community: state.system.get('community'),
	hostEnable: state.system.get('standaloneHostEnable')
});

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
		dispatch(submitNewDocument(url, true));
	}
});

class CreateDefect extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.match.params.community_slug || this.props.community.get('slug'), 'defects');
	}

	render() {
		const map = [
			Number(this.props.community.get('map_lat')),
			Number(this.props.community.get('map_lon'))
		] || [50, 30];
		return (
			<div>
				<Box title4="Створити заявку ЖКГ">

					<form className="ui form" onSubmit={(event) => this.props.onSubmit(event, `${this.props.hostEnable
						? ''
						: '/' + this.props.match.params.community_slug}/defects/document/`)}>
						<div className={form.divider}>
							<Input label="Суть заявки" required={true} value={this.props.title} onChange={this.props.onTitleChange}/>
						</div>
						<FormResolver items={this.props.documentForm} values={this.props.formValues} map={map} onValueChange={this.props.onValueChange}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDefect);
