import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux';
import {Row, Col, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import PayerList from './payer-list';
import RecipientList from './recipient-list';
import ItemsList from './all-items-list';
import Charts from './charts';

import Spinner from '../../../spinner';
import {Input, Button} from '../../../form-components';
import {ButtonDefault} from 'components/common-components/buttons';

import Pagination from '../../pagination';

import styles from './styles.scss';
import form from '../../../common-components/form.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import {changeStartDate, changeEndDate, fetchOpenFinance, loadPayerCodeEdr, loadRecipientCodeEdr,
	 			searchFinance, loadFinancePageType, sortFinanceBy, reverseFinanceList} from '../../redux/actions';

const mapStateToProps = (state) => ({
	startDate: state.system.get('startdate'),
	endDate: state.system.get('enddate'),
	community: state.system.get('community'),
	companies: state.system.get('dataCompanies'),
	persons: state.system.get('dataPersons'),
	isFetching: state.system.get('moduleIsLoading'),
	sum: state.system.get('financeSum'),
	recipientCodeEdr: state.system.get('recipientCodeEdr'),

	recipientName: state.system.get('recipientName'),

	pageType: state.system.get('financePageType'),
	sortedBy: state.system.get('sortedBy'),
	reversed: state.system.get('reverseFinanceList'),

	allFinance: state.system.get('allFinance'),
	finance: state.system.get('finance'),

	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	loadFinance: (slug) => dispatch(fetchOpenFinance(slug)),
	fetchOpenFinance: (slug, limit, offset) => dispatch(fetchOpenFinance(slug, limit, offset)),

	onStartDateChange: (date) => dispatch(changeStartDate(date)),
	onEndDateChange: (date) => dispatch(changeEndDate(date)),

	loadRecipientCodeEdr: (value) => dispatch(loadRecipientCodeEdr(value)),
	loadPayerCodeEdr: (value) => dispatch(loadPayerCodeEdr(value)),
	loadRecipientName: (value) => dispatch(loadRecipientName(value)),

	// onChangeInputSearch: (event) => dispatch(loadRecipientCodeEdr(event.target.value)),

	changePageType: (value) => dispatch(loadFinancePageType(value)),
	sortFinanceBy: (value) => dispatch(sortFinanceBy(value)),
	loadFinancePageType: (value) => dispatch(loadFinancePageType(value)),
	searchFinance: (slug) => dispatch(searchFinance(slug)),
	reverseFinanceList: (value) => dispatch(reverseFinanceList(value)),
});

class Filters extends Component {
		constructor(props) {
		 super(props)
		 this.state = {
			 dropDownValue: 'Усі розпорядники коштів',
		 }

		 this.getOffset = this.getOffset.bind(this);
		 this.getPayerIdFromName = this.getPayerIdFromName.bind(this);
		 this.validateDropDown = this.validateDropDown.bind(this);
		 this.createDropDown = this.createDropDown.bind(this);
		//  this.handleSortClick = this.handleSortClick.bind(this);
 		 this.onSubmitFinance = this.onSubmitFinance.bind(this);
	 }

	 componentWillReceiveProps(nextProps) {
 		const page = nextProps.match.params.page;
 		const offset = 15 * (page - 1);
 		if (nextProps.match.params.page !== this.props.match.params.page) {
 			this.props.fetchOpenFinance(this.props.community.get('slug'), 15, offset);
 		}
 	}

 	componentWillMount() {
 		const page = this.props.match.params.page || 1;
 		const offset = 15 * (page - 1);
 		this.props.fetchOpenFinance(this.props.community.get('slug'), 15, offset);
 	}

	getOffset() {
		const page = this.props.match.params.page || 1;
		return 15 * (page - 1);
	}

	 handleChange (event) {
		 this.setState({dropDownValue: event.target.value });
	 }

	 getPayerIdFromName() {
		 const items = this.props.allFinance
		 if (items) {
			 for (let i = 0; i < items.length; i++) {
				 if (items[i].payer_name === this.state.dropDownValue) {
					 return items[i].payer_edrpou
				 }
			 }
		 }
	 	}

		handleSortClick(sortedBy) {
			if (sortedBy === this.props.sortedBy && this.props.reversed) {
				this.props.sortFinanceBy('');
				this.props.reverseFinanceList(false);
			}	else if (sortedBy === this.props.sortedBy) {
				this.props.sortFinanceBy(sortedBy);
				this.props.reverseFinanceList(true);
			}	else {
				this.props.sortFinanceBy(sortedBy);
				this.props.reverseFinanceList(false);
			}

			if (this.props.pageType === "all") {
				this.props.fetchOpenFinance(this.props.community.get('slug'), 15, this.getOffset());
			}	else {
				this.props.searchFinance(this.props.community.get('slug'),  15, this.getOffset());
			}
	}

	onSubmitFinance(event) {
		event.preventDefault();

		let pageType = this.state.dropDownValue === 'Усі розпорядники коштів' ? 'all' : 'filteredByPayer';
		let id = this.getPayerIdFromName(this.state.dropDownValue);

		if (pageType === 'all') {
			this.props.loadFinancePageType(pageType);
			this.props.fetchOpenFinance(this.props.community.get('slug'));
		}	else {
			if (id) {
				this.props.loadPayerCodeEdr(id)
				this.props.loadRecipientCodeEdr('')
			}
			this.props.loadFinancePageType(pageType);
			this.props.searchFinance(this.props.community.get('slug'));
		}

		// if (this.props.recipientCodeEdr) {
		// 	this.props.loadFinancePageType('filteredByRecipient');
		// 	this.props.searchFinance(this.props.community.get('slug'));
		// }	else {
		// 	this.props.searchFinance(this.props.community.get('slug'));
		// }
	}

	// componentDidMount() {
	// 	this.props.loadFinance(this.props.community.get('slug'));
	// }

	createDropDown() {
		// if (this.props.pageType === "all"){
		// 	if (this.props.finance) {
		// 		if (this.props.finance.get('transactions')) {
		// 			return this.validateDropDown(this.props.allFinance)
		// 		} else return []
		// 	} else return []
		// }
		// else {
		// 	return this.validateDropDown(this.props.allFinance)
		// }
		return this.validateDropDown(this.props.allFinance)
	}

	validateDropDown(transactions) {
		const options_set = new Set();
		options_set.add('Усі розпорядники коштів')
		transactions.map((item) => {
			options_set.add(item.payer_name);
		});
		return Array.from(options_set);
	}

	render() {
		if (this.props.finance.get('transactions') === "connection_refused") {
			return (
				<div>
					<h4>Сервіс "E-DATA" не доступний на даний момент</h4>
				</div>
		)
		}
		const StartDate = this.props.startDate;
		const EndDate = this.props.endDate;

		const checkGlyph = (sortedBy) => {
			if (sortedBy === this.props.sortedBy) {
				return (
					<div className={styles.sortIconChecked}>{
							this.props.reversed ? <Glyphicon glyph="sort-by-attributes-alt" /> : <Glyphicon glyph="sort-by-attributes" />
					}</div>
				)
			}
			else {
				return (
					<div className={styles.sortIcon}>
						<Glyphicon glyph="sort" className={styles.sortIcon}/>
					</div>
				)
			}
		}

		const dropDownItems = this.createDropDown();
		return (
			<div>
				<form onSubmit={(event) => this.onSubmitFinance(event)}>
					<Row>

						<div className={form.form + " " + styles.financeForm}>
							<Col md={3}>
								<div className={form.field}>
									<label>Початкова дата</label>
									<DatePicker selected={this.props.startDate} onChange={this.props.onStartDateChange} dateFormat="DD-MM-YYYY"/>
								</div>
							</Col>
							<Col md={3}>
								<div className={form.field}>
									<label>Кінцева дата</label>
									<DatePicker selected={this.props.endDate} onChange={this.props.onEndDateChange} dateFormat="DD-MM-YYYY"/>
								</div>
							</Col>
							<Col md={3}>
								{/*
								<div className={form.field}>
									<Input label="ЄДРПОУ"
										onChange={(event) => {this.props.onChangeInputSearch(event);}}
										onFocus={(event) => {this.props.onChangeInputSearch(event);}}
										/>

								</div>
								*/}
								<div  className={form.field}>
									<label>Розпорядник коштів</label>
									<select onChange={this.handleChange.bind(this)}>
										{dropDownItems.map((value, index) => (
												<option key={index} value={value} >{value}</option>
											))
										}
									</select>
								</div>
							</Col>
							<Col md={3}>
								<div className="search-btn">
									<ButtonDefault size="12px" type="submit" value="Пошук"/>
								</div>
							</Col>
						</div>
					</Row>
				</form>
				<div>
					<div className="text-center">
						<h2>Показано платежі з {StartDate.format("DD-MM-YYYY")} по {EndDate.format("DD-MM-YYYY")}</h2>
						<h4>Загальна сума витрат за період - {this.props.sum} грн.</h4>
						{this.props.pageType !== "all"
							? (
								<div className="text-left back-to-all"
									onClick={(event) => {
										this.props.loadFinance(this.props.community.get('slug'));
										this.props.changePageType("all")
									}}>
									<i className="fa fa-toggle-left" aria-hidden="true">&nbsp;</i>
									 перейти до списку усіх розпорядників коштів
								</div>
							): null
						}

						<div className={styles.listHead}>
							<div onClick={(event) => {this.handleSortClick('amount')}}>Сума та № <span>{checkGlyph('amount')}</span></div>
							<div onClick={(event) => {this.handleSortClick('trans_date')}}>Дата <span>{checkGlyph('trans_date')}</span></div>
							<div onClick={(event) => {this.handleSortClick('payer_name')}}>Розпорядник коштів <span>{checkGlyph('payer_name')}</span></div>
							<div onClick={(event) => {this.handleSortClick('recipt_name')}}>Контрагент <span>{checkGlyph('recipt_name')}</span></div>
							<div onClick={(event) => {this.handleSortClick('payment_details')}}>Призначення платежу <span>{checkGlyph('payment_details')}</span></div>
						</div>
						{this.props.isFetching
							? (
								<div><Spinner/></div>
							)
							: (
								<div>
								    {(() => {
								        switch (this.props.pageType) {
								            case 'all':
								                return (
																	<ItemsList
																		transactions={this.props.finance.get('transactions')}
																		/>
																)
														case 'filteredByPayer':
								                return (
																	<PayerList transactions={this.props.finance.get('transactions')} />
																)
														case 'filteredByRecipient':
								                return (
																	<RecipientList transactions={this.props.finance.get('transactions')} />
																)

								            default :
								                <div></div>
								        }
								    })()}
								</div>
							)}
					</div>
					<Pagination counts={this.props.finance.get('count')} path={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/open-finance/`} matched={this.props.match.params.page} limits={15}/>
					<Charts
						persons={this.props.persons}
						companies={this.props.companies}/>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
