import React, {Component} from 'react';
import {connect} from 'react-redux';

import config from '../../../config';
import ValueResolver from '../../../common/document/value-resolver';
import {fetchDocument} from '../../redux/actions/documents';
import {Button} from '../../../form-components';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';
import FileList from '../../../admin/documents/card/file-list';
import CompletedProceedingList from '../../../common/document/card/completed-proceeding';
import Spinner from 'components/spinner';
import Title from 'components/dynamic-title';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
	document: state.documents.get('document'),
	title: state.documents.get('document').get('title'),
	image: state.documents.get('document').get('title_image'),
	state: state.documents.get('document').get('state_field_name'),
	created_by: state.documents.get('document').get('created_by_name'),
	formValues: state.documents.get('documentFormValues'),
	completedProceedings: state.documents.get('documentCompletedProceedings'),
	isFetching: state.documents.get('documentIsLoading')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => dispatch(fetchDocument(id))
});

class DocumentCard extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.match.params.id);
	}

	render() {

		if (this.props.isFetching) {
			return (
				<Box>
					<Spinner/>
				</Box>
			)
		}
		return (
			<div>
				<Title title={`Кабінет користувача. Документ №${this.props.document.get('id')}. Інформаційна система "Розумне місто" `} />
				<Box>
					<h3 className="box-title">{this.props.title}</h3>
				</Box>
					<Row>
							<Col md={this.props.image ? 5 : 12}>
								<Box>
									{this.props.formValues.map((item, index) => (
										<div className={styles.item} key={item.get('id')}>
											<label>{item.get('form_component_name')}</label>:
											<ValueResolver item={item}/>
										</div>
									))}
								</Box>
							</Col>
							{this.props.image ?
								<Col md={7}>
								<Box>
									<div>
										<p>
											<strong>Aвтор</strong>: {this.props.created_by}</p>
										<p>
											<strong>Стан документа</strong>: {this.props.state}</p>
										{this.props.image
											? (
												<div>
													<label>Прикріплене зображення:</label>
													<br/>
													<img style={{
														'maxHeight': "300px",
														'maxWidth': "100%"
													}} src={this.props.image}/>
												</div>
											)
											: null}
									</div>
								</Box>
							</Col>
			    	: null}

							<Col md={12} style={{
								'marginTop': "10px"
							}}>
								<Box>
									<strong>Виконані переходи:</strong>
									<CompletedProceedingList completedProceedings={this.props.completedProceedings}/>
								</Box>
							</Col>

							<Col md={12}>
								<Box>
									<FileList documentId={this.props.match.params.id}/>
								</Box>
							</Col>
						</Row>

			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentCard);
