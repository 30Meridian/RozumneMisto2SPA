import React, {Component} from 'react';
import {connect} from 'react-redux';

import Title from 'components/dynamic-title';
import FormResolver from '../../../common/document/form-resolver';
import { Input, Button } from '../../../form-components';
import Box from 'components/box';
import {ButtonGreen} from 'components/common-components/buttons';
import {Row, Col} from 'react-bootstrap';
import { fetchDocumentForm, changeDocumentTitle, changeDocumentTitleImage, submitNewDocument,
changeDocumentFormValue, documentFormChoiceAdd, documentFormChoiceRemove, documentFormChoiceChangeText,
documentFormChoiceChangeFile, documentFormChoiceClean } from '../../../common/redux/actions/document';
import form from '../../../common-components/form.scss';

const mapStateToProps = (state) => ({
	title: state.commDocument.get('title'),
	titleImageOption: state.commDocument.get('titleImageOption'),
	documentForm: state.commDocument.get('documentForm'),
	formValues: state.commDocument.get('documentFormValue'),
	packages: state.commDocument.get('packages'),
	choices: state.commDocument.get('choices')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => {
		dispatch(fetchDocumentForm(slug));
		dispatch(documentFormChoiceClean());
	},
  onValueChange: (data, index) => dispatch(changeDocumentFormValue(data, index)),
	onTitleChange: (event) => dispatch(changeDocumentTitle(event.target.value)),
	onTitleImageChange: (event) => dispatch(changeDocumentTitleImage(event.target)),
	onChoiceAdd: (event) => dispatch(documentFormChoiceAdd()),
	onChoiceRemove: (event, index) => dispatch(documentFormChoiceRemove(index)),
	onChoiceChangeText: (event, index) => dispatch(documentFormChoiceChangeText(event.target.value, index)),
	onChoiceChangeFile: (event, index) => dispatch(documentFormChoiceChangeFile(event.target, index)),
	onSubmit: (event) => {
		event.preventDefault();
		dispatch(submitNewDocument('/admin/documents/document/', true));
	}
});

class CreateForm extends Component {

  componentWillMount() {
    this.props.onLoad(this.props.match.params.slug);
  }

  render() {
		const withChoices = this.props.packages.filter(item => item.config && item.config.choice).size > 0;

    return (
      <div>
				<Title title={`Службовий кабінет. Створення документу типу "${this.props.title}". Інформаційна система "Розумне місто" `} />
        <div className="contents">
          <div className="box">
            <div className="box-body">
							<div className="box-head">
								<div className="content-header">
				          <h3>Створення документу типу "{this.props.title}" </h3>
				        </div>
							</div>
							<div className="builder-form">
	              <form name="form-create" onSubmit={this.props.onSubmit}>
									<div className="form-divider">
	                	<Input label="Назва" required={true}  value={this.props.title} onChange={this.props.onTitleChange} />
									</div>
	                <FormResolver items={this.props.documentForm} values={this.props.formValues}
										onValueChange={this.props.onValueChange} />
									{this.props.packages.size > 0 ?
										this.props.packages.map((item, index) => (
											item.config && item.config.choice ? (
												<div key={index}>
													<div><label>Налаштування голосування:</label></div>
													<div>
														{this.props.choices.size ?
														<Row>
															<Col md={12}>
															<Col md={7} mdOffset={1}>
																Текст
															</Col>
															<Col md={3}>
																Зображення
															</Col>
															<Col md={1}>
																Видалити
															</Col>
														</Col>
															{this.props.choices.map((choice, i) => (
																<div key={i}>
																	<Col className="add-poll" md={12}>
																	<span>
																		{i+1}.
																	</span>
																	<Col md={7}>
																		<input value={choice.get('choice_text')} required={true}
																			onChange={(event) => this.props.onChoiceChangeText(event, i)} />
																	</Col>
																	<Col md={4}>
																		<input type="file" onChange={(event) => this.props.onChoiceChangeFile(event, i)}
																			accept=".png, .jpg, .jpeg, .gif" />
																	</Col>
																	<Col md={1}>
																		<div className="delete-poll">
																			<i className="fa fa-times" onClick={(event) => this.props.onChoiceRemove(event, i)}></i>
																		</div>
																	</Col>
																</Col>
																</div>
															))}
														</Row>
														: null}
														<div className="poll-btn">
															<Button value="Додати" onClick={this.props.onChoiceAdd} />
														</div>
													</div>
												</div>
											) : null
										)) : null}
									<div className="form-divider">
									{this.props.titleImageOption ?
										<Input type="file" label="Зображення (опціонально)" onChange={this.props.onTitleImageChange} />
										: null}
									</div>
									{!withChoices || this.props.choices.size > 0 ?
										<ButtonGreen type="submit" value="Прийняти" />
									: null}
	              </form>
							</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
