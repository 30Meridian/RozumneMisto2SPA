import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Map, TileLayer, Marker} from 'react-leaflet';
import ReactModal from 'react-modal';

import {ButtonDefault, ButtonGreen, ButtonDanger, DefaultLink, InfoLink} from 'components/common-components/buttons';
import Spinner from '../../../spinner';
import Title from 'components/dynamic-title';
import config from '../../../config';
import history from '../../../history';

import {
	fetchDocument,
	documentProceed,
	changeDocumentProceedMessage,
	attachFileToList,
	removeFileFromList,
	changeDocumentContractDepartment,
	destroyDocument,
	fetchPrintTemplate,
	loadDocumentVoteList,
} from '../../redux/actions/documents';
import {Button} from '../../../form-components';
import Input from '../../../form-components/input';
import Box from 'components/box';
import BreadCrumbs from '../../breadcrumbs';
import CompletedProceedingList from '../../../common/document/card/completed-proceeding';
import ContractChoice from './contract-choice';
import FileList from './file-list';

import {Row, Col, ButtonGroup} from 'react-bootstrap';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';

const mapStateToProps = (state) => ({
	user: state.auth.get('user'),
	title: state.adminDocuments.get('title'),
	title_image: state.adminDocuments.get('title_image'),
	date_created: state.adminDocuments.get('date_created'),
	id: state.adminDocuments.get('id'),
	state: state.adminDocuments.get('state'),
	created_by: state.adminDocuments.get('created_by'),
	formValues: state.adminDocuments.get('documentFormValues'),
	completedProceedings: state.adminDocuments.get('completedProceedings'),
	proceedings: state.adminDocuments.get('proceedings'),
	message: state.adminDocuments.get('message'),
	workflow_type_id: state.adminDocuments.get('workflow_type_id'),
	newFiles: state.adminDocuments.get('newFiles'),
	documentCard: state.adminDocuments.get('documentCard'),
	template: state.adminDocuments.get('printTemplate'),
	documentVoteList: state.adminDocuments.get('documentVoteList'),
	isFetching: state.adminDocuments.get('documentIsLoading')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => {
		dispatch(fetchDocument(id));
		dispatch(loadDocumentVoteList(id, 1, 0, true));
	},
	onClick: (pk, next_state) => dispatch(documentProceed(pk, next_state)),
	onMessageChange: (event) => dispatch(changeDocumentProceedMessage(event.target.value)),
	onAddFile: (event) => {
		event.preventDefault();
		dispatch(attachFileToList(event.target));
	},
	onDeleteFile: (event, value) => {
		event.preventDefault();
		dispatch(removeFileFromList(value))
	},
	onContractDepartmentChange: (value) => dispatch(changeDocumentContractDepartment(value)),
	onDeleteClick: (event, id) => dispatch(destroyDocument(id)),
	onFetchPrintTemplate: (id, window) => dispatch(fetchPrintTemplate(id, window)),
});

class DocumentCard extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			item: null
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.fetchTemplate = this.fetchTemplate.bind(this);
	}

	fetchTemplate(window) {
		this.props.onFetchPrintTemplate(this.props.id, window);
		// if (this.props.template) {

		// }
	}

	handleOpenModal(item) {
		this.setState({showModal: true, item});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}

	componentWillMount() {
		this.props.onLoad(this.props.match.params.id);
	}

	switchComponent(item) {
		const value = item.get('value');
		switch (item.get('form_component_type')) {
			case "map":
				const position = [value['lat'], value['lng']] || [0, 0];
				if (this.state.showModal)
					return null;

				return (
					<div style={{
						'height': "400px"
					}}>
						<Map center={position} zoom={12}>
							<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
							<Marker position={position}/>
						</Map>
					</div>
				);
			case "ckeditor":
				return (
					<div dangerouslySetInnerHTML={{
						__html: value
					}}></div>
				);
			case "checkbox":
				return value
					? "Так"
					: "Ні";
			case "file":
				return Object.keys(value).map(key => <a href={config.host + value[key]}>Переглянути файл</a>);
			default:
				return String(value);
		}
	}

	render() {
		const votePackageAttached = this.props.documentCard.get('attached_package_list') ?
			this.props.documentCard.get('attached_package_list')
			.filter(item => item === 'vote').length > 0 : false;

		const publicBudgetModule = this.props.documentCard.get('module_list') ?
			this.props.documentCard.get('module_list').filter(item => item === 'publicbudget').length > 0 : false;

		if (this.props.isFetching) {
			return <div><Spinner /></div>
		}

		return (
			<div className="admin-contents">
				<Title title={`Службовий кабінет. Документ №${this.props.title}. Інформаційна система "Розумне місто" `} />
				<BreadCrumbs documentId={this.props.id} />
				<Box>
					<div className="document-title">
						<h3 className="box-title">{this.props.title}</h3>
						<span onClick={(event) => {
							history.goBack()
						}}>
							<i className="fa fa-arrow-circle-o-left"></i>
						</span>
					</div>
				</Box>
				{this.props.title && this.props.state.length > 0 && this.props.created_by ? (
						<Row>
							<Col md={5}>

								<Box title4="Основна інформація:">
									<p>
										<strong>ID</strong>: {this.props.id}</p>
									<p>
									<p>
										<strong>Aвтор</strong>: {this.props.created_by}</p>
										<p>
											<strong>Контакти автора</strong>: {this.props.documentCard.get('created_by_contact')}
										</p>
									</p>
									<p>
										<strong>Статус документа</strong>: {this.props.state}</p>
									<p>
										<strong>Дата створення</strong>: {new Date(this.props.date_created).toLocaleString('uk-UA')}</p>
									<p>
										<strong>Відповідальний департамент</strong>: {this.props.documentCard.get('department').name}</p>
									{ this.props.documentCard && this.props.documentCard.get('tag_list') ?
										<p>
											<strong>Категорії</strong>: {this.props.documentCard.get('tag_list').map(item => (
												<span key={item.id}>{item.tag_label}</span>
											))}
										</p>
									: null }
									{votePackageAttached ? <p>
										<strong>Віддано голосів</strong>: {this.props.documentVoteList.get('count')}
									</p> : null}
									{ votePackageAttached && publicBudgetModule ?
										<div>
											<p>
												<strong>Віддано голосів оффлайн</strong>: {this.props.documentCard.get('offline_vote_count')}
											</p>
											<p>
												<strong>Голосів усього</strong>: {this.props.documentCard.get('vote_sum')}
											</p>
										</div>
									: null}
									{ votePackageAttached && publicBudgetModule ?
										<DefaultLink to={`${this.props.match.url}/pb/offlinevote/`}>
											Додати оффлайн голоси
										</DefaultLink>
									: null }
									{this.props.user && this.props.user.get('is_superuser')
										? <ButtonDanger value="Видалити документ" onClick={(e) => {
												this.props.onDeleteClick(e, this.props.match.params.id)
											}}/>
										: null}
								</Box>
								{this.props.title_image
									? (
										<Box title4="Картка документа:">
											{this.props.formValues.map((item, index) => (
												<div key={item.get('id')}>
													<label>
														{item.get('form_component_name') === "Map"
															? ("Мапа")
															: (item.get('form_component_name'))}
													</label>
													: {this.switchComponent(item)}
												</div>
											))}
										</Box>
									)
									: null}
							</Col>

							<Col md={7}>

								{this.props.title_image
									? (
										<Box title4="Прикріплене зображення:">
											<div className="defect-img">
												<br/>
												<img style={{
													'maxHeight': "300px",
													'maxWidth': "100%"
												}} src={this.props.title_image}/>
											</div>
										</Box>
									)
									: (
										<Box title4="Картка документа:">
											{this.props.formValues.map((item, index) => (
												<div key={item.get('id')}>
													<label>
														{item.get('form_component_name') === "Map"
															? ("Мапа")
															: (item.get('form_component_name'))}
													</label>
													: {this.switchComponent(item)}
												</div>
											))}
										</Box>
									)}

									<Box>
										<Row>
										<Col md={6}>
											<div className={styles.print}>
											<ButtonGreen
												block
												value="Друкувати"
												iconClass="fa fa-print"
												onClick={() => this.fetchTemplate(window.open())}/>
										</div>
										</Col>
										<Col md={6}>
											{votePackageAttached ? <div>
											<InfoLink block to={`${this.props.match.url}/votelist/1`}
												onClick={(event => {})}> <i className="fa fa-list" aria-hidden="true"></i>
												 Список голосів </InfoLink>
										</div> : null}
										</Col>
										</Row>

									</Box>
							</Col>

							<Col md={12}>
								{this.props.proceedings.length > 0
									? (
										<Box title4="Доступні дії:">
											<Row className="proceedings-row">
												{this.props.proceedings.map((item, index) => (
													<Col md={12} style={{
														'marginTop': "5px"
													}} key={item.get('id')}>

													{item.get('contract').state === "reject" ?
														<div>
															<ButtonDanger
																 value={`${this.props.state} => ${item.get('label')}`}
																 onClick={(event) => {this.handleOpenModal(item)}} />
														</div>
														: <div>
															{item.get('contract').state === "select" ?
															<ButtonGreen
																value={`${this.props.state} => ${item.get('label')}`}
																onClick={(event) => {this.handleOpenModal(item)}} />
															: <ButtonDefault
																value={`${this.props.state} => ${item.get('label')}`}
																onClick={(event) => {this.handleOpenModal(item)}} />
														}</div>
												}
													</Col>
												))}
											</Row>
										</Box>
									)
									: (
										<Box>
										<Row>
											<Col md={12}>
												<div>Відсутні доступні дій по документу</div>
											</Col>
										</Row>
										</Box>
									)}

								<Box title4="Життєвий цикл документа:">
									<CompletedProceedingList completedProceedings={this.props.completedProceedings}/>
								</Box>
							</Col>
							<Col md={12}>
								<FileList documentId={this.props.match.params.id}/>
							</Col>
						</Row>
					)
					: (<Spinner/>)}

				<div>
					<ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} contentLabel="Minimal Modal Example" className={{
						base: 'simpleModal',
						afterOpen: 'myClass_after-open',
						beforeClose: 'myClass_before-close'
					}} contentLabel="Підтвердження запису" overlayClassName={{
						base: 'doctorOverlay',
						afterOpen: 'myOverlayClass_after-open',
						beforeClose: 'myOverlayClass_before-close'
					}}>
						<Row>
							{this.state.item && this.state.item.get('contract').state === "select"
								? (
									<Col md={12}>
										<div className={form.inlineField}>
											<ContractChoice workflowId={this.props.workflow_type_id}/>
										</div>
									</Col>
								)
								: null}

							<Col md={12}>
								<div className="form-group">
									<label>Резолюція:</label>
									<textarea className="form-control" value={this.props.message} onChange={this.props.onMessageChange}></textarea>
									<div className={styles.addFiles}>
										<Input key={this.props.newFiles.size} type="file" label="Додати файл" multiple={true} accept=".pdf, .doc, .docx, .png, .jpg, .jpeg, .gif, .xlsx, .xls, .odt, .tif, .tiff" onChange={(event) => this.props.onAddFile(event, this.props.documentId)}/>
										<div className={styles.modalFiles}>
										{this.props.newFiles.map((item, index) => (
											<div className={styles.modalFile} key={index}>
												<i className="fa fa-times" onClick={(event) => this.props.onDeleteFile(event, index)}></i>
												{item.name}
											</div>
										))}
									</div>
									</div>
								</div>
							</Col>

							<Col md={12}>
								<Col md={6}>
									<ButtonGreen block value="Підтвердити" onClick={(event) => {
										this.handleCloseModal();
										if (this.state.item.get('contract').state === "reject") {
											this.props.onContractDepartmentChange(null);
										}
										this.props.onClick(this.props.match.params.id, this.state.item.get('id'))
									}}/>
								</Col>
								<Col md={6}>
									<ButtonDanger block value="Закрити вікно" onClick={this.handleCloseModal}/>
								</Col>

								<Col md={1}></Col>
							</Col>
						</Row>
					</ReactModal>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentCard);
