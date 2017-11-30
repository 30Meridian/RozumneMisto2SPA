import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Map} from 'immutable';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {fetchTenders} from '../../redux/actions';

 
import Tab from '../../../../assets/js/libraries/tab';
import ReactModal from 'react-modal';
import Pagination from '../../pagination';
import Spinner from '../../../spinner';
import Box from 'components/box';
import Button from '../../../form-components/button';
import {Row, Col} from 'react-bootstrap';
import Title from 'components/dynamic-title';

import styles from './styles.scss';

const mapStateToProps = state => ({tenders: state.system.get('tenders'), community: state.system.get('community'), isFetching: state.system.get('moduleIsLoading'), hostEnable: state.system.get('standaloneHostEnable')});

const mapDispatchToProps = dispatch => ({
	fetchTenders: (slug, offset, limit) => dispatch(fetchTenders(slug, offset, limit))
});

const statuses = {
	'active.tendering': (
		<span className={styles.label + " " + styles.send}>Подання пропозицій</span>
	),
	'active.auction': (
		<span className={styles.label + " " + styles.auction}>Аукціон</span>
	),
	'active.qualification': (
		<span className={styles.label + " " + styles.qualification}>Кваліфікація переможця</span>
	),
	'active.awarded': (
		<span className={styles.label + " " + styles.watched}>Пропозиції розглянуті</span>
	),
	'unsuccessful': (
		<span className={styles.label + " " + styles.declined}>Торги відмінено</span>
	),
	'cancelled': (
		<span className={styles.label + " " + styles.danger}>Відмінена</span>
	),
	'active.enquiries': (
		<span className={styles.label + " " + styles.warning}>Період уточнень</span>
	),
	'complete': (
		<span className={styles.label + " " + styles.success}>Завершена</span>
	)
};
class EProcurement extends Component {

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page || 1;
		const offset = 35 * (page - 1);
		if (nextProps.match.url !== this.props.match.url) {
			this.props.fetchTenders(this.props.match.params.community_slug || this.props.community.get('slug'), offset, 35);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 35 * (page - 1);
		this.props.fetchTenders(this.props.match.params.community_slug || this.props.community.get('slug'), offset, 35);
	}

	constructor() {
		super();
		this.state = {
			showModal: false,
			value: new Map()
		}
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal(value) {
		this.setState({showModal: true, value});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}

	componentDidMount() {
		$('.tabular.menu .item').tab();
	}

	render() {

		if (this.props.tenders === undefined) {
			return <Box><Spinner/></Box>;
		}

		let tenders;

		if (this.props.tenders === null) {
			tenders = (
				<div className={styles.nullTenders}>
					<Title title={`Електронні закупівлі. Інформаційна система "Розумне місто" `} />
					<p>
						Ваша громада безкоштовно підключена до всеукраїнського сервісу “Розумне місто” з чотирма базовими модулями. Однак на сьогодні у нас ще відсутні дані щодо розпорядників коштів місцевого бюджету, тому відображення даних - неможливе.
					</p>
					<p>
						Сприяйте впровадженню електронного врядування у Вашій громаді в повному обсязі!
					</p>
					<p>
						З нами можна зв‘язатись:
						<ul>
							<li>
								<a className={styles.contactsLink} href="tel:+38 (044) 539-44-22">+38 (044) 539-44-22</a>
							</li>
							<li>
								<a className={styles.contactsLink} href="tel:+38 (067) 569-44-22">+38 (067) 569-44-22</a>
							</li>
							<li>
								<a className={styles.contactsLink} href=":mailto:office@rozumnemisto.org">office@rozumnemisto.org</a>
							</li>
						</ul>
					</p>
				</div>
			);
		} else {
			tenders = (
				<div>
					<Title title={`Електронні закупівлі. Інформаційна система "Розумне місто" `} />
					<Row>
						<Col md={12} className="procurementWrap">

							<table className="ui table">
								<thead>
									<tr>
										<th>Сума закупівлі (грн.)</th>
										<th>Закупівельна організація</th>
										<th>Предмет закупівлі</th>
										<th>Дата публікації</th>
										<th className={styles.statusTD}>Статус</th>
									</tr>
								</thead>
								{this.props.isFetching
									? (
										<div>
											<Spinner/>
										</div>
									)
									: (
										<tbody>
											{this.props.tenders.tender.map((value, i) => <tr onClick={(event) => this.handleOpenModal(value)}>
												<td>
													<span className="hide-md">
														<strong>Сума закупівлі: &nbsp;</strong>
													</span>{value.tenderValue}</td>
												<td>
													<span className="hide-md">
														<strong>Закупівельна організація: &nbsp;</strong>
													</span>{value.organizationName}</td>
												<td>
													<span className="hide-md">
														<strong>Предемет закупівлі: &nbsp;</strong>
													</span><strong>{value.title}</strong>
												</td>
												<td>
													<span className="hide-md">
														<strong>Дата публікації: &nbsp;</strong></span>{value.dateModified}
													</td>
												<td className={styles.statusTD}>
													<span className="hide-md">
														<strong>Статус: &nbsp;</strong></span>{statuses[value.status]}</td>
											</tr>)}
										</tbody>
									)}
							</table>
						</Col>

					</Row>
					<Pagination counts={this.props.tenders.countAllRecords} path={`${this.props.hostEnable
						? ""
						: '/' + this.props.community.get('slug')}/e-procurement/`} matched={this.props.match.params.page} limits={35}/>
				</div>
			);
		}

		return (
			<Box>
				<Title title={`Електронні закупівлі. Інформаційна система "Розумне місто" `} />
				<div className={styles.center}>
					<h3>
						<img src="/assets/img/general/logo-prozorro.png"/>
						<p>Електронні аукціони "Прозорро"</p>
					</h3>
				</div>
				<div className="ui tabular menu bt">
					<div className="item active" data-tab="tab-name">Про проект</div>
					<div className="item" data-tab="tab-name2">Як продавати державі? (відео)</div>
				</div>
				<div className="ui tab active" data-tab="tab-name">
					<Row>
						<Col md={12}>
							<p className={styles.green}>
								<a href="https://prozorro.gov.ua/">ProZorro
								</a>
								– пілотний проект електронної системи публічних закупівель, що дозволяє онлайн продавати Державі.</p>
							<p className={styles.green}>
								<strong>Хочете продавати свої товари чи послуги місцевим організаціям? <Link to="/sign-in">Реєструйтесь!</Link></strong>
							</p>
						</Col>
					</Row>
				</div>
				<div className="ui tab" data-tab="tab-name2">
					<div className={styles.frame}>
						<iframe src="https://www.youtube.com/embed/skcfKPXJqvA" frameBorder="0" allowFullScreen=""></iframe>
					</div>
				</div>
				{tenders}
				<ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className={{
					base: 'itemModal',
					afterOpen: 'myClass_after-open',
					beforeClose: 'myClass_before-close'
				}} overlayClassName={{
					base: 'doctorOverlay',
					afterOpen: 'myOverlayClass_after-open',
					beforeClose: 'myOverlayClass_before-close'
				}}>

					<Row>
						<Col md={12}>
							<div className="modal-header">
								Інформація про тендер
								<i className="fa fa-times" aria-hidden="true" onClick={(event) => this.handleCloseModal()}></i>
							</div>
							<ul>
								<li>
									<strong>ІД: &nbsp;
									</strong>
									{this.state.value.tenderId}</li>
								<li>
									<strong>Предмет закупівлі: &nbsp;</strong>
									{this.state.value.title}</li>
								<li>
									<strong>Сума закупівлі: &nbsp;</strong>{this.state.value.tenderValue}</li>
								<li>
									<strong>Найменування замовника: &nbsp;</strong>{this.state.value.organizationName}</li>
								<li>
									<strong>Дата створення тендеру: &nbsp;</strong>{this.state.value.dateModified}
								</li>
								{this.state.value.tenderStartDate
									? (
										<li>
											<strong>Дата початку аукціона:&nbsp;
											</strong>{new Date(this.state.value.tenderStartDate).toLocaleDateString('uk-UA')}
										</li>
									)
									: null}
								{this.state.value.tenderEndDate
									? (
										<li>
											<strong>Дата кінця аукціона: &nbsp;</strong>{new Date(this.state.value.tenderEndDate).toLocaleDateString('uk-UA')}
										</li>
									)
									: null}
								<li>
									<strong>Контактна особа: &nbsp;</strong>{this.state.value.contactPointName}</li>
								<li>
									<strong>Пряме посилання: &nbsp;</strong>
									<a href={`https://prozorro.gov.ua/en/tender/${this.state.value.tenderId}`} target="_blank">
										prozorro.gov.ua/en/tender/{this.state.value.tenderId}
									</a>
								</li>
								<li>
									<strong>Статус: &nbsp;</strong>{statuses[this.state.value.status]}</li>
							</ul>

						</Col>
					</Row>
				</ReactModal>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EProcurement);
