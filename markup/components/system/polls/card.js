import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactModal from 'react-modal';
import {Row, Col} from 'react-bootstrap';
import { FacebookButton, FacebookCount } from "react-social";
import Title from '../../dynamic-title';
import Spinner from '../../spinner';
import {fetchDocument, loadPackageVote, loadPackageData, sendPackageData, fetchVoteSummary} from '../redux/actions/documents';
import Button from '../../form-components/button';
import {ButtonDanger, ButtonGreen} from 'components/common-components/buttons';
import Box from 'components/box';
import BreadCrumbs from '../breadcrumbs';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	document: state.documents.get('document'),
	packages: state.documents.get('packages'),
	formValues: state.documents.get('documentFormValues'),
	community: state.system.get('community'),
	counts: state.documents.get('counts'),
	choices: state.documents.get('votes'),
	vote: state.documents.get('package_data').get('vote'),
	summary: state.documents.get('voteSummary'),
	isFetching: state.documents.get('documentIsLoading')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id, token) => {
		dispatch(fetchDocument(id));
		dispatch(loadPackageVote(id, true));
		dispatch(fetchVoteSummary(id));
		if (token) {
			dispatch(loadPackageData(id, 'vote'));
		}
	},
	onClick: (id, data) => {
		dispatch(sendPackageData(id, 'vote', data));
	}
});

const statuses = {
	'Збір голосів': (
		<span className={styles.status + " " + styles.open}>Збір голосів</span>
	),
	'Архівне': (
		<span className={styles.status + " " + styles.done}>Архівне</span>
	),
	'Заплановано': (
		<span className={styles.status + " " + styles.will}>Заплановано</span>
	),
	'Відхилено': (
		<span className={styles.status + " " + styles.declined}>Відхилено</span>
	)
};

class PollsCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'radioButton': -1,
			'showModal': false,
			imgSrc: ""
		}

		this.changeRadio = this.changeRadio.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(imgSrc) {
		this.setState({showModal: true, imgSrc});
	};

	closeModal() {
		this.setState({showModal: false})
	}

	changeRadio(key) {
		this.setState({radioButton: key});
	};

	componentWillMount() {
		this.props.onLoad(this.props.match.params.id, this.props.token);
	}

	render() {
		const document = this.props.document;
		const choice = this.props.vote && this.props.vote.get('valid');

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>
		}
		return (
			<div className={styles.pollsCard}>
				<Title title={`Опитування. ${this.props.document.get('title')}. Інформаційна система "Розумне місто" `} />
				<Row>
					<div className="document-top">
						<div>
							<BreadCrumbs documentLink="polls" documentId={this.props.document.get('id')} documentName="Опитування"/>
						</div>
						<div>
							<FacebookButton url={window.location.href} message={this.props.document.get('title')} className={form.btnDefault + " " + form.btnFacebook} appId={259035427863157}>
                <i className="fa fa-facebook"></i>
                {" Поділитися "}
              </FacebookButton>
						</div>
					</div>
				</Row>
				<Box title4={document.get('title')}>
					<div className="polls-wrap">
						<div className={styles.pollsHead}>
							<div className={styles.leftHead}>
								<i className="fa fa-clock-o"></i>
								Опитування триває з {new Date(document.get('date_created')).toLocaleString('uk-UA')}
							</div>
							<div className={styles.rightHead}>
								{statuses[document.get('state_field_name')]}
							</div>
						</div>
						<div className={styles.pollsBody}>
							{this.props.formValues.map((item, index) => (
								<blockquote key={item.get('id')}>
									<label>
										{item.get('form_component_name')}:
									</label>
									<div dangerouslySetInnerHTML={{
										__html: item.get('value')
									}}></div>
								</blockquote>
							))}
						</div>
						{this.props.packages.size > 0
							? this.props.packages.map((item, index) => item === 'vote'
								? choice
									? (
										<div>
											<div className={styles.radioButtons} key={index}>
												<h4>Результати голосування:</h4>
												<ul className={styles.pollsResults + " " + styles.pollsDone}>
													{this.props.choices.map((item, index) => (
														<li>
															<div>{item.get('choice_text')}: {this.props.summary.get(String(item.get('id')))}</div>
															{!(this.props.summary.get(String(item.get('id'))) === 0)
																? (
																	<div className={styles.progressContainer}>
																		<span className={styles.badge + " " + styles.hiddenBlock}>{item.get('choice_text')}: {this.props.summary.get(String(item.get('id')))}</span>
																		<div className={styles.progress}>
																			<div className={styles.progressBar} style={{
																				"width": `${ (this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100}%`
																			}}>
																				<span className={styles.progressValue}>{Math.round((parseFloat(this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100) * 100) / 100}% ({this.props.summary.get(String(item.get('id')))})</span>
																			</div>
																		</div>
																	</div>
																)
																: (
																	<div className={styles.progressContainer}>
																		<span className={styles.badge + " " + styles.hiddenBlock}>{item.get('choice_text')}: {this.props.summary.get(String(item.get('id')))}</span>
																		<div className={styles.progress}>
																			<div className={styles.progressBar} style={{
																				"width": `${ (this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100}%`
																			}}>
																				<span className={styles.progressValue}>{Math.round((parseFloat(this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100) * 100) / 100}% ({this.props.summary.get(String(item.get('id')))})</span>
																			</div>
																		</div>
																	</div>)}
															<div>{item.get('choice_image')
																	? <div onClick={(event) => {
																			this.openModal(item.get('choice_image'))
																		}}>
																			<img src={item.get('choice_image')} alt="Зображення"/></div>
																	: null}
															</div>
														</li>
													))}
												</ul>
											</div>
											<ButtonDanger value="Відкликати голос" onClick={() => this.props.onClick(this.props.match.params.id, {choice: null})}/>
										</div>
									)
									: (
										<div className={styles.radioButtons} key={index}>
											{this.props.token == undefined
												? (
													<h4 className={styles.placeholderText}>
														Для того, щоб проголосувати <Link className="default-link" to="/sign-in">Зареєструйтесь</Link> або <Link className="default-link" to="/sign-in">увійдіть</Link> до системи
													</h4>
												)
												: null}
											<h4>Варіанти голосів:</h4>
											{this.props.choices.map((item, index) => (
												<div className="radio checkbox" key={item.get('id')}>
													<input type="radio" id={item.get('id')} name="optradio" onClick={
														this.props.token ?
														(event) => {
														this.props.onClick(this.props.match.params.id, {
															choice: this.props.choices.get(index).get('id')
														});
														this.changeRadio(-1);
													}:null}/>
													<label htmlFor={item.get('id')}>
														{item.get('choice_text')}</label>
													{item.get('choice_image')
														? <div onClick={(event) => {
																this.openModal(item.get('choice_image'))
															}}>
																<img src={item.get('choice_image')} alt="Зображення"/></div>
														: null}
												</div>
											))}
											{this.props.token != undefined
												? (this.state.radioButton > -1
													? (
														<div>
															<ButtonGreen value="Проголосувати" onClick={() => {
																this.props.onClick(this.props.match.params.id, {
																	choice: this.props.choices.get(this.state.radioButton).get('id')
																});
																this.changeRadio(-1);
															}}/>
														</div>
													)
													: null)
												: (
													<h4 className={styles.placeholderText}>
														Для того, щоб проголосувати <Link className="default-link" to="/sign-in"> Зареєструйтесь </Link> або <Link className="default-link" to="/sign-in"> увійдіть </Link> до системи
													</h4>
												)}
										</div>
									)
								: null)
							: <div className={styles.radioButtons}>
								<h4>Результати голосування:</h4>
								<ul className={styles.pollsResults + " " + styles.pollsDone}>
									{this.props.choices.map((item, index) => (
										<li>
											{!(this.props.summary.get(String(item.get('id'))) === 0)
												? (
													<div className={styles.progressContainer}>
														<span className={styles.badge}>{item.get('choice_text')}: {this.props.summary.get(String(item.get('id')))}</span>
														<div className={styles.progress}>
															<div className={styles.progressBar} style={{
																"width": `${ (this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100}%`
															}}>
																<span className={styles.progressValue}>{Math.round((parseFloat(this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100) * 100) / 100}% ({this.props.summary.get(String(item.get('id')))})</span>
															</div>
														</div>
													</div>
												)
												: (
													<div className={styles.progressContainer}>
														<span className={styles.badge}>{item.get('choice_text')}: {this.props.summary.get(String(item.get('id')))}</span>
														<div className={styles.progress}>
															<div className={styles.progressBar} style={{
																"width": `${ (this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100}%`
															}}>
																<span className={styles.progressValue}>{Math.round((parseFloat(this.props.summary.get(String(item.get('id'))) / this.props.summary.get('count')) * 100) * 100) / 100}% ({this.props.summary.get(String(item.get('id')))})</span>
															</div>
														</div>
													</div>
												)}
											<div>{item.get('choice_image')
												? <div onClick={(event) => {
														this.openModal(item.get('choice_image'))
													}}>
														<img src={item.get('choice_image')} alt="Зображення"/></div>
												: null}
											</div>
										</li>
									))}
								</ul>
							</div>}
					</div>
					<ReactModal isOpen={this.state.showModal} onRequestClose={this.closeModal} className={{
						base: 'pollModal',
						afterOpen: 'myClass_after-open',
						beforeClose: 'myClass_before-close'
					}} contentLabel="Підтвердження запису" overlayClassName={{
						base: 'doctorOverlay',
						afterOpen: 'myOverlayClass_after-open',
						beforeClose: 'myOverlayClass_before-close'
					}}>
						<Row>
							<Col md={12}>
								<div className="close-modal">
									<i className="fa fa-times" aria-hidden="true" onClick={(event) => this.closeModal()}></i>
								</div>
								<div className="modal-img">
									<img src={this.state.imgSrc} alt="Зображення"/>
								</div>
							</Col>
						</Row>
					</ReactModal>
				</Box>
			</div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PollsCard);
