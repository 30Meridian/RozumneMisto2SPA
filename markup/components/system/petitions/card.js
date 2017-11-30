import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactModal from 'react-modal';

import Spinner from '../../spinner';
import ValueResolver from '../../common/document/value-resolver';
import CompletedProceedingList from '../../common/document/card/completed-proceeding';
import {Button} from '../../form-components';
import {ButtonDefault} from 'components/common-components/buttons';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';

import Pagination from '../pagination';

import {fetchDocument, fetchPetitionsVotes, cleanFormValues} from '../redux/actions/documents';
import { FacebookButton, FacebookCount } from "react-social";

import Modal from '../modal';

import BreadCrumbs from '../breadcrumbs';

import PackageResolver from '../packages/package-resolver';

import styles from './styles.scss';
import form from '../../common-components/form.scss';

import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';
import Title from '../../dynamic-title';
const {FacebookShareButton} = ShareButtons;

const {FacebookShareCount} = ShareCounts;

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	document: state.documents.get('document'),
	packages: state.documents.get('packages'),
	formValues: state.documents.get('documentFormValues'),
	community: state.system.get('community'),
	completedProceedings: state.documents.get('documentCompletedProceedings'),
	counts: state.documents.get('counts'),
	isFetching: state.documents.get('documentIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id, limit, offset) => {
		dispatch(cleanFormValues());
		dispatch(fetchDocument(id));
		dispatch(fetchPetitionsVotes(id, limit, offset));
	}
});

class PetitionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'showModal': false,
			'showVotes': false
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleVotes = this.handleVotes.bind(this);

	}

	openModal() {
		this.setState({showModal: true});
	};

	closeModal() {
		this.setState({showModal: false})
	}

	handleVotes() {
		this.setState({
			showVotes: !this.state.showVotes
		});
	};

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.url !== this.props.match.url) {
			this.props.onLoad(this.props.match.params.id, 25, offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.onLoad(this.props.match.params.id, 25, offset);
	}

	render() {
		if (this.props.counts == undefined) {
			return <div><Spinner/></div>;
		}

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>
		}
		const countsLeft = 100 - this.props.counts.results.length;
		const dateFormatted = new Date(this.props.document.get('date_created'));
		const publishDate = new Date(this.props.completedProceedings.get(0) && this.props.completedProceedings.get(0).get('transaction_date') || Date.now());
		const waitDays = (this.props.document.get('max_days') || 90) - Math.floor((Date.now() - publishDate) / (3600000 * 24));
		const daysGone = (this.props.document.get('max_days') || 90) - waitDays;
		const countsWidth = (this.props.counts.count / this.props.document.get('max_votes')) * 100;
		const daysWidth = (daysGone / (this.props.document.get('max_days') || 90)) * 100;
		const countsStyle = {
			width: `${countsWidth}%`
		};
		const widthStyles = {
			width: `${daysWidth}%`
		};

		const votesClass = this.state.showVotes
			? styles.petitionVoteVisible
			: styles.petitionVoteHidden;

		const imageUrl = '/assets/img/general/logo.png'

		return (
			<div>
				<Title title={`Петиції. ${this.props.document.get('title')}. Інформаційна система "Розумне місто" `} />
				<Row>
					<div className="document-top">
						<div><BreadCrumbs documentLink="petitions" documentId={this.props.document.get('id')} documentName="Петиції"/></div>
						<div>
							<FacebookButton url={window.location.href} message={this.props.document.get('title')} className={form.btnDefault + " " + form.btnFacebook} appId={259035427863157}>
                <i className="fa fa-facebook"></i>
                {" Поділитися "}
              </FacebookButton>
					</div>
					</div>
				</Row>
				<Box title4={this.props.document.get('title')}>
					<Row className="content-row">
						<Col md={7}>
							<Row className={styles.petitionRow}>
								<Col md={7} className="mob-pd">
									<ul className={styles.petitionProps}>
										<li>
											<strong>Петиція до міської ради м. {this.props.community.get('name')}</strong>
										</li>
										<li>
											<strong>Номер петиції:
											</strong>
											{this.props.document.get('id')}</li>
										<li>
											<strong>Дата cтворення:
											</strong>
											{new Date(this.props.document.get('date_created')).toLocaleString('uk-UA')}</li>
										<li>
											<strong>Дата публікації:
											</strong>
											{publishDate.toLocaleString('uk-UA')}</li>
										<li>
											<strong>Стан документу:
											</strong>
											{this.props.document.get('state_field_name')}</li>
										<li className={styles.city}>
											<strong>Місто:
											</strong>
											<Link className="default-link" to={`/${this.props.community.get('slug')}`}>
												{this.props.community.get('name')}
											</Link>
										</li>
										<li className={styles.author}>
											<strong>Автор:
											</strong>
											{this.props.document.get('created_by_name')}
										</li>
									</ul>
								</Col>
								<Col md={5} className="mob-pd">
									<div className={styles.petitionButton}>
										{this.props.token
											? (<PackageResolver items={this.props.packages} id={this.props.match.params.id}/>)
											: (
												<h4 className={styles.placeholderText}>Для того, щоб підписати петицію <Link className="default-link" to="/sign-in">Зареєструйтесь</Link> або <Link className="default-link" to="/sign-in">увійдіть</Link> до системи</h4>
											)}
									</div>
								</Col>
							</Row>
							<Col md={6} className="mob-pd">
								<div className={styles.infoBox + " " + styles.bgGreen}>
									<span className={styles.infoBoxIcon}>
										<i className="fa fa-list-ul"></i>
									</span>
									<div className={styles.infoBoxContent}>
										<span className={styles.infoBoxText}>ПІДПИСІВ</span>
										<span className={styles.infoBoxNumber}>{this.props.counts.count}</span>
										<div className={styles.progress}>
											<div className={styles.progressBar} style={countsStyle}></div>
										</div>
										<span className={styles.progressDescription}>з {this.props.document.get('max_votes')}
											необхідних</span>
									</div>
								</div>
							</Col>
							<Col md={6} className="mob-pd">
								{this.props.packages.size > 0
									? (
										<div className={styles.infoBox + " " + styles.bgOrange}>
											<span className={styles.infoBoxIcon}>
												<i className="fa fa-calendar"></i>
											</span>
											<div className={styles.infoBoxContent}>
												<span className={styles.infoBoxText}>ЗАЛИШИЛОСЬ</span>
												<span className={styles.infoBoxNumber}>
													{waitDays > 0
														? waitDays
														: 0} днів
													</span>
												<div className={styles.progress}>
													<div className={styles.progressBar} style={widthStyles}></div>
												</div>
												<span className={styles.progressDescription}>поріг - {this.props.document.get('max_days')} днів
													</span>
											</div>
										</div>
									)
									: null}
							</Col>
						</Col>
						<Col md={5}>
							<div className={styles.petitionImage} onClick={this.openModal}>
								{this.props.document.get('title_image')
									? (<img src={this.props.document.get('title_image')}/>)
									: (<img src="/assets/img/general/empty.gif"/>)}
							</div>
						</Col>
					</Row>
				</Box>

				<ReactModal isOpen={this.state.showModal} onRequestClose={this.closeModal} className={{
					base: 'cardModal',
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
								{this.props.document.get('title_image')
									? (<img src={this.props.document.get('title_image')}/>)
									: (<img src="/assets/img/general/empty.gif"/>)
}
							</div>
						</Col>
					</Row>
				</ReactModal>

				<Row className="petition-row">
					<Col md={12}>
						{this.props.formValues.map((item, index) => (
							<Box key={item.get('id')} title4={item.get('form_component_name')}>
								<div><ValueResolver item={item}/></div>
							</Box>
						))}
					</Col>

					<Col md={12}>
						<Box title4="Інформація про підписи: ">
							{this.props.counts.results.map((item, i) => <Col md={4} key={i} className={votesClass}>
								<div className={styles.smallBox}>
									<div className={styles.inner}>
										<h4>
											<Link to={`/profile/${item.user}`}>{item.user_name}</Link>
										</h4>
										<p>{new Date(item.date_voted).toLocaleString('uk-UA')}</p>
									</div>
									<div className={styles.icon}>
										<i className="fa fa-pencil-square-o"></i>
									</div>
								</div>
							</Col>)}
							<div className="clearfix"></div>

							<Col md={12}>
								{this.state.showVotes
									? (<Pagination counts={this.props.counts.count} path={`${this.props.hostEnable
										? ''
										: '/' + this.props.community.get('slug')}/petitions/document/${this.props.document.get('id')}/page=`} matched={this.props.match.params.page} limits={25}/>)
									: null}
							</Col>

							<div className="clearfix"></div>
							{this.props.counts.results.length > 6
								? (
									<div className={styles.votesBtn}>
										{this.state.showVotes
											? (
												<ButtonDefault value="Cховати підписи" onClick={this.handleVotes}/>
											)
											: (
												<ButtonDefault value="Показати усі підписи" onClick={this.handleVotes}/>
											)}

									</div>
								)
								: null}
						</Box>
					</Col>

					<Col md={12}>
						<Box title4="Активність по петиції:">
							<CompletedProceedingList completedProceedings={this.props.completedProceedings}/>
						</Box>
					</Col>
				</Row>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PetitionCard);
