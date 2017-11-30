import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormResolver from '../../../common/document/form-resolver';
import { Input, Button } from '../../../form-components';
import Box from 'components/box';
import Title from 'components/dynamic-title';
import {ButtonDefault} from 'components/common-components/buttons';

import { fetchDocumentForm, changeDocumentTitle, changeDocumentTitleImage, submitNewDocument,
changeDocumentFormValue } from '../../../common/redux/actions/document';

import form from '../../../common-components/form.scss';

const mapStateToProps = (state) => ({
	title: state.commDocument.get('title'),
	titleImageOption: state.commDocument.get('titleImageOption'),
	documentForm: state.commDocument.get('documentForm'),
	formValues: state.commDocument.get('documentFormValue'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => dispatch(fetchDocumentForm(slug)),
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


class CreateForm extends Component {
  componentWillMount() {
    this.props.onLoad(this.props.match.params.slug);
  }

  render() {
    return (
      <div>
				<Title title={`Кабінет користувача. Створити документ. Інформаційна система "Розумне місто" `} />
        <div className="content-header">
          <h3> Створити документ </h3>
        </div>
        <div className="contents">
          <div className="box">
            <div className="box-body">
              <form className="ui form" onSubmit={(event) => this.props.onSubmit(event,
								 `${this.props.hostEnable ? '' : '/' + this.props.match.params.community_slug}/cabinet/documents/document/`)}>
                <Input label="Назва" required={true}  value={this.props.title} onChange={this.props.onTitleChange} />
                <FormResolver items={this.props.documentForm} values={this.props.formValues}
									onValueChange={this.props.onValueChange} />
								{this.props.titleImageOption ?
									<Input type="file" label="Зображення (опціонально)" onChange={this.props.onTitleImageChange} /> :
									(null)
								}
								<ButtonDefault type="submit" value="Прийняти" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
