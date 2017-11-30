import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {Row, Col, Button} from 'react-bootstrap';

import styles from './styles.scss';
import SimpleBarChart from './simple-bar-chart';
import FinanceItem from './finance-item';

class PayerList extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal(item) {
		this.setState({
			showModal: true,
			itemId: item.id,
			itemTransDate: item.trans_date,
			itemAmount: item.amount,
			itemDetail: item.payment_details,

			itemPayerName: item.payer_name,
			itemPayerBankMfo: item.payer_mfo,
			itemPayerBank: item.payer_bank,
			itemPayerEdr: item.payer_edrpou,

			itemReciptName: item.recipt_name,
			itemReciptEdr: item.recipt_edrpou,
			itemReciptBank: item.recipt_bank,
			itemReciptBankMfo: item.recipt_mfo,
		});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}

	render() {

		return (
			<div>
				<div>
					{this.props.transactions
						?(this.props.transactions.length
							? this.props.transactions.map((item, id) => {
								return (
									<div key={item.id} onClick={(event) => this.handleOpenModal(item)}>
										<FinanceItem key={id} items={item} type='filteredByPayer'/>
									</div>
								)
							})
							: <div>Немає жодного платежу</div>
						): null
					}
				</div>

				<ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal}
					contentLabel="Modal" className={{
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
							Інформація про платіж
							<i className="fa fa-times" aria-hidden="true" onClick={(event) => this.handleCloseModal()}></i>
							<div style={{"float": "right"}} className="text-right">
									{this.state.itemId}&nbsp;
									<span className="fa fa-barcode" aria-hidden="true"></span>
							</div>
						</div>
						<ul className={styles.modal}>
							<li>
								<strong>Дата платежу: &nbsp;</strong>{this.state.itemTransDate}</li>
							<li>
								<strong>Сума транзакції: &nbsp;</strong>{this.state.itemAmount}</li>
							<li>
								<strong>Призначення: &nbsp;</strong>{this.state.itemDetail}</li>
							<li>
								<strong>Платник: &nbsp;</strong>{this.state.itemPayerName}</li>
							<li>
								<strong>МФО банку платника: &nbsp;</strong>{this.state.itemPayerBankMfo}</li>
							<li>
								<strong>Банк платника: &nbsp;</strong>{this.state.itemPayerBank}</li>
							<li>
								<strong>ЄРДПОУ платника: &nbsp;</strong>{this.state.itemPayerEdr}</li>
							<li>
								<strong>Отримувач платежу: &nbsp;</strong>{this.state.itemReciptName}</li>
							<li>
								<strong>МФО банку отримувача: &nbsp;</strong>{this.state.itemReciptBankMfo}</li>
							<li>
								<strong>Банк отримувача: &nbsp;</strong>{this.state.itemReciptBank}</li>
							<li>
								<strong>ЄРДПОУ отримувача: &nbsp;</strong>{this.state.itemReciptEdr}</li>
						</ul>

					</Col>
				</Row>
				</ReactModal>

			</div>
		)
	}
}

export default PayerList;
