import React, { Component } from 'react';
import ReactModal from 'react-modal';
import {Row, Col} from 'react-bootstrap';

import config from '../../../config';
import Modal from '../../../system/modal';

import styles from './styles.scss';

class CompletedProceedingList extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			itemId: null,
			imgSrc: ""
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal(itemId, imgSrc) {
		this.setState({showModal: true, itemId, imgSrc});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}

	checkURL(url) {
		url = url.toLowerCase();
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}

	render() {
		if (this.props.completedProceedings.size < 1){
			return (<div>Документ не виконував переходів</div>);
		}

		return (
			<Row className="proceedings-row">
					<Col md={2}><strong>Стан документа</strong></Col>
					<Col md={3}><strong>Користувач</strong></Col>
					<Col md={2}><strong>Дата</strong></Col>
					<Col md={5}><strong>Коментар</strong></Col>

					<hr/>

				<div>
					{this.props.completedProceedings.map((item) => (
						<div key={item.get('id')}>
							<Col md={2}>{item.get('transition_destination')}</Col>
							{item.get('user_log').length === 0 ? (
								<div>
									<Col md={3}>{item.get('transactioner') ? item.get('transactioner')
										: <span className="text-muted">
										<i className="fa fa-cogs"></i> Автоматична операція</span>}
									</Col>
									<Col md={2}>{new Date(item.get('transaction_date')).toLocaleString('uk-UA')}</Col>
									<Col md={5}>Коментар відсутній</Col>
								</div>
							) :
							item.get('user_log').length === 1 ? (
								<div>
									{item.get('user_log').map(log => (
										<div key={log.id}>
											<Col md={3}>{log.user_name} ({log.position_title ? log.position_title : 'Адміністратор'})</Col>
											<Col md={2}>{new Date(log.date_created).toLocaleString('uk-UA')}</Col>
											<Col md={5}>&nbsp;{log.message ? log.message : "Коментар відсутній"}</Col>
												<Col md={5} mdOffset={7}>
												<div className="attached-file-list">
													{log.attached_file_list ? log.attached_file_list.map((file, i) => {
														return (
															!this.checkURL(config.host + file.url)
															?(
																<div>
																	<a href={config.host + file.url} target="_blank">
																		<div className="small-image-wrapper">
																			<img src="/assets/img/general/document.png" />
																			<div className="small-text-wrapper">{file.filename}</div>
																		</div>
																	</a>
																</div>
															)
															:(
																<div key={i}
																	className="small-image-wrapper"
																	onClick={(event) => {
																		this.handleOpenModal(i, file.url)}}>
																		<img src={config.host + file.url}/>
																</div>
															)
														)
													}) : null}
												</div>
											</Col>
										</div>
									))}
								</div>
							) : (
								<div>
									<Col md={3}>{item.get('transactioner') ? item.get('transactioner')
										: <span className="text-muted">
										<i className="fa fa-cogs"></i> Автоматична операція</span>}
									</Col>
									<Col md={2}>{new Date(item.get('transaction_date')).toLocaleString('uk-UA')}</Col>
									<Col md={5}></Col>
									{item.get('user_log').map(log => (<div key={log.id}>
										<Col md={3} mdOffset={2}>{log.user_name} ({log.position_title})</Col>
										<Col md={2}>{new Date(log.date_created).toLocaleString('uk-UA')}</Col>
										<Col md={5}>{log.message}</Col>
											<Col md={5} mdOffset={7}>
											<div className="attached-file-list">
												{log.attached_file_list ? log.attached_file_list.map((file, i) => {
													return (
														!this.checkURL(config.host + file.url)
														?(
															<div>
																<a href={config.host + file.url} target="_blank">
																	<div className="small-image-wrapper">
																		<img src="/assets/img/general/document.png" />
																		<div className="small-text-wrapper">{file.filename}</div>
																	</div>
																</a>
															</div>
														)
														:(
															<div key={i}
																className="small-image-wrapper"
																onClick={(event) => {
																	this.handleOpenModal(i, file.url)}}>
																	<img src={config.host + file.url}/>
															</div>
														)
													)
												}) : null}
											</div>
										</Col>
									</div>))}
								</div>
							)}
							<Col md={12} className="hr-class"><hr/></Col>
						</div>
					))}
				</div>

				<ReactModal isOpen={this.state.handleOpenModal} onRequestClose={this.handleCloseModal} className={{
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
						 <div className={styles.modalDetailImg}>
							 <i className="fa fa-times" aria-hidden="true"
								 onClick={this.handleCloseModal}></i>
							 <img src={config.host + this.state.imgSrc}/>
						 </div>
					 </Col>
				 </Row>
			 </ReactModal>


			</Row>
		);
	}
}

export default CompletedProceedingList;
