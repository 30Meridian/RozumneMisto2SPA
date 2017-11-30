import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ReactModal from 'react-modal';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import Box from 'components/box';
import {ButtonDefault} from 'components/common-components/buttons';
import form from '../../../common-components/form.scss';
import {Input, Button} from '../../../form-components';
import history from '../../../history';
import config from '../../../config';

import styles from './styles.scss';

import {changeStartDate, changeEndDate, fetchFinanceInfo, fetchFinancePayer, sortFinanceBy, reverseFinanceList, loadPayerCodeEdr, loadRecipientName, loadRecipientCodeEdr} from '../../redux/actions';

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
  financeInfo: state.system.get('financeInfo'),

	startDate: state.system.get('startdate'),
	endDate: state.system.get('enddate'),

	recipientCodeEdr: state.system.get('recipientCodeEdr'),
	recipientName: state.system.get('recipientName'),
	payerCodeEdr: state.system.get('payerCodeEdr'),

	sortedBy: state.system.get('sortedBy'),
	reversed: state.system.get('reverseFinanceList'),

	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	fetchFinanceInfoExcel: (slug) => dispatch(fetchFinanceInfoExcel(slug)),

	loadPayerCodeEdr: (value) => dispatch(loadPayerCodeEdr(value)),
	loadRecipientName: (value) => dispatch(loadRecipientName(value)),
	loadRecipientCodeEdr: (value) => dispatch(loadRecipientCodeEdr(value)),

	fetchFinancePayer: (slug, limit, offset) => dispatch(fetchFinancePayer(slug, limit=15, offset=0)),
  fetchFinanceInfo: (slug, limit, offset) => dispatch(fetchFinanceInfo(slug, limit=15, offset=0)),

  onStartDateChange: (date) => dispatch(changeStartDate(date)),
	onEndDateChange: (date) => dispatch(changeEndDate(date)),

	reverseFinanceList: (value) => dispatch(reverseFinanceList(value)),
	sortFinanceBy: (value) => dispatch(sortFinanceBy(value)),
});

const allPayers = "Усі розпорядники коштів"

class Header extends Component {
	constructor() {
		super();
		this.state = {
			payer_edrpou: '',
			showModal: false,
			message: '',
		};
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.onClickExport = this.onClickExport.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}

	handleOpenModal(message) {
		this.setState({showModal: true, message});
	}

	getAllPayers() {
    return allPayers;
  }

	onClickExport(){
		let url = `${config.apiHost}/publicfinance/edata/${this.props.community.get('slug')}/export_excel/`
		let data = {
			'startdate': this.props.startDate.format('DD-MM-YYYY'),
			'enddate': this.props.endDate.format('DD-MM-YYYY'),

			'payerCodeEdr': this.props.payerCodeEdr,
			'recipientName': this.props.recipientName,
			'recipientCodeEdr': this.props.recipientCodeEdr,

			'sortedBy': this.props.sortedBy,
			'reversed': this.props.reversed,
		}

		let xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.responseType = 'blob';
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onload = function(e) {
		    if (this.status == 200) {
		        let blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
		        let downloadUrl = URL.createObjectURL(blob);
		        let a = document.createElement("a");
		        a.href = downloadUrl;
		        a.download = "transactions_report_(www.rozumnemisto.org).xlsx";
		        document.body.appendChild(a);
		        a.click();
		    } else {
		        alert('Unable to download excel.')
		    }
		};
		xhr.send(JSON.stringify(data));
   }

	handleSortClick(sortField) {
		if (sortField === this.props.sortedBy && this.props.reversed) {
			this.props.sortFinanceBy('');
			this.props.reverseFinanceList(false);
		}	else if (sortField === this.props.sortedBy) {
			this.props.sortFinanceBy(sortField);
			this.props.reverseFinanceList(true);
		}	else {
			this.props.sortFinanceBy(sortField);
			this.props.reverseFinanceList(false);
		}
	}

	handleChange(value) {
		$('#allPayersOption').attr('selected', false);
		this.setState({payer_edrpou: value})
	}

	handleButtonClick() {
		this.handleChange('');
		$('#allPayersOption').attr('selected', true);

		this.props.loadPayerCodeEdr('');
		this.props.loadRecipientName('');
		this.props.loadRecipientCodeEdr('');

		history.push(`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance`);
		this.props.fetchFinanceInfo(this.props.community.get('slug'));
	}

	onSubmitForm(event) {
		event.preventDefault();
		let startDate = this.props.startDate.format('DD-MM-YYYY').split('-');
		let endDate = this.props.endDate.format('DD-MM-YYYY').split('-');

		let startDateDay = parseInt(startDate[0]);
		let startDateMonth = parseInt(startDate[1]);
		let startDateYear = parseInt(startDate[2]);

		let endDateDay = parseInt(endDate[0]);
		let endDateMonth = parseInt(endDate[1]);
		let endDateYear = parseInt(endDate[2]);


		if (endDateYear - startDateYear < 0) {
			let error_message = 'Дата введена некорректно';
			this.handleOpenModal(error_message);
		}
		else if (endDateYear - startDateYear > 0){
			let error_message = 'Вибраний часовий проміжок занадто довгий.\nМаксимальне можливе значення 6 місяців.';
			this.handleOpenModal(error_message);
		}
		else if (endDateMonth - startDateMonth < 0) {
			let error_message = 'Дата введена некорректно';
			this.handleOpenModal(error_message);
		}
		else if (endDateMonth - startDateMonth === 0 && endDateDay - startDateDay < 0) {
			let error_message = 'Дата введена некорректно';
			this.handleOpenModal(error_message);
		}
		else if (endDateMonth - startDateMonth > 6){
			let error_message = 'Вибраний часовий проміжок занадто довгий.\nМаксимальне можливе значення 6 місяців.';
			this.handleOpenModal(error_message);
		}
		else if (this.state.payer_edrpou) {
			this.props.loadPayerCodeEdr(this.state.payer_edrpou)
			history.push(`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance/payer`);
			this.props.fetchFinancePayer(this.props.community.get('slug'));
		} else {
			history.push(`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance`);
			this.props.fetchFinanceInfo(this.props.community.get('slug'));
		}
	}

  render() {
    const StartDate = this.props.startDate;
		const EndDate = this.props.endDate;

		const checkGlyph = (sortedBy) => (
			sortedBy === this.props.sortedBy ? (
				<div className={styles.sortIconChecked}>
					{this.props.reversed ? <Glyphicon glyph="sort-by-attributes-alt" /> : <Glyphicon glyph="sort-by-attributes" />}
				</div>
			): (
				<div className={styles.sortIcon}>
					<Glyphicon glyph="sort" className={styles.sortIcon}/>
				</div>
			)
		)

    return (
      <div>
        <form onSubmit={(event) => this.onSubmitForm(event)}>
          <Row>
            <div className={form.form + " " + styles.financeForm}>
              <Col md={3}>
                <div className={form.field}>
                  <label>Початкова дата</label>
                  <DatePicker selected={StartDate} onChange={this.props.onStartDateChange} dateFormat="DD-MM-YYYY"/>
                </div>
              </Col>
              <Col md={3}>
                <div className={form.field}>
                  <label>Кінцева дата</label>
                  <DatePicker selected={EndDate} onChange={this.props.onEndDateChange} dateFormat="DD-MM-YYYY"/>
                </div>
              </Col>
              <Col md={3}>
                <div  className={form.field}>
                  <label>Розпорядник коштів</label>
                  <select onChange={(event) => this.handleChange(event.target.value)} id="payerSelect">
										<option id="allPayersOption" value="">{this.getAllPayers()}</option>
                    {this.props.financeInfo.payer_list ? (
												this.props.financeInfo.payer_list.map((value, index) => (
													<option key={index} value={value.payer_edrpou}>{value.payer_name}</option>
	                      ))
											): null
                    }
                  </select>
                </div>
              </Col>
              <Col md={3}>
                <div className="search-btn">
                  <ButtonDefault size="12px" type="submit" value="Пошук"/>
									<ButtonDefault size="12px" onClick={this.onClickExport} value="Експорт"/>
                </div>
              </Col>
            </div>
          </Row>
        </form>

        <div>
          <div className="text-center">
            <h2 className={styles.listSummary}>Показано платежі з {StartDate.format("DD-MM-YYYY")} по {EndDate.format("DD-MM-YYYY")}</h2>
            <h4 className={styles.priceSummary}>Загальна сума витрат за період - {this.props.financeInfo.sum} грн.</h4>

            <div className="text-left back-to-all" id="all-transactions" onClick={this.handleButtonClick}>
              <i className="fa fa-toggle-left" aria-hidden="true">&nbsp;</i>
               перейти до списку усіх розпорядників коштів
            </div>

            <div className={styles.listHead}>
              <div onClick={(event) => {this.handleSortClick('amount')}}>Сума та № <span>{checkGlyph('amount')}</span></div>
              <div onClick={(event) => {this.handleSortClick('trans_date')}}>Дата <span>{checkGlyph('trans_date')}</span></div>
              <div onClick={(event) => {this.handleSortClick('payer_name')}}>Розпорядник коштів <span>{checkGlyph('payer_name')}</span></div>
              <div onClick={(event) => {this.handleSortClick('recipt_name')}}>Контрагент <span>{checkGlyph('recipt_name')}</span></div>
              <div onClick={(event) => {this.handleSortClick('payment_details')}}>Призначення платежу <span>{checkGlyph('payment_details')}</span></div>
            </div>
          </div>
        </div>


				<ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className={{
					base: 'cardModal',
					afterOpen: 'myClass_after-open',
					beforeClose: 'myClass_before-close'
				}} contentLabel="Підтвердження запису"
				overlayClassName={{
					base: 'doctorOverlay',
					afterOpen: 'myOverlayClass_after-open',
					beforeClose: 'myOverlayClass_before-close'
				}}>
					<Row>
					 <Col md={12}>
						 <div className="close-modal">
							 <i className="fa fa-times" aria-hidden="true" onClick={(event) => this.handleCloseModal()}></i>
						 </div>
						 <div className={styles.warning}>
							 <h1 className="text-center"><i className="fa fa-exclamation-triangle " aria-hidden="true"></i></h1>
								 <h4 className="text-center">&nbsp;{this.state.message}</h4>
							 {/* <div className="center">
								 <Button onClick={(event) => this.handleCloseModal()} value="Закрити"/>
							 </div> */}
						 </div>
						</Col>
					</Row>
				</ReactModal>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);;
