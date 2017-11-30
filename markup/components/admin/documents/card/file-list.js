import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import {Row, Col} from 'react-bootstrap';
import config from '../../../config';

import {fetchAttachedFile} from '../../redux/actions/documents';

import Modal from '../../../system/modal';
import Box from 'components/box';

import styles from './styles.scss';

const mapStateToProps = state => ({fileList: state.adminDocuments.get('attachedFiles')});

const mapDispatchToProps = dispatch => ({
	loadData: (documentId) => dispatch(fetchAttachedFile(documentId))
});

class FileList extends Component {
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

	componentWillMount() {
		this.props.loadData(this.props.documentId);
	}

	checkURL(url) {
		url = url.toLowerCase();
		return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}

	render() {
		return (
			<div>
				{this.props.fileList.size > 0
					? (
						<Box>
							<div className="file-list">
								<label>Прикріплені файли:</label>
								<ul className={styles.files}>
									{this.props.fileList.map(item => (!this.checkURL(config.host + item.get('file'))
										? (
											<li>
												<a href={config.host + item.get('file')} target="_blank">
													<div className="text-wrapper">{item.get('filename')}</div>
													<div className="image-wrapper document-wrap">
														<img src="/assets/img/general/document.png"/>
													</div>
												</a>
											</li>
										)
										: (
											<li key={item.get('id')} onClick={(event) => {
												this.handleOpenModal(item.get('id'), item.get('file'))
											}}>
												<div className="image-wrapper">
													<img src={config.host + item.get('file')}/>
												</div>
											</li>
										)))}
								</ul>

								<ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className={{
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
												<i className="fa fa-times" aria-hidden="true" onClick={(event) => this.handleCloseModal()}></i>
											</div>
											<div>
												<img src={config.host + this.state.imgSrc}/>
											</div>
										</Col>
									</Row>
								</ReactModal>

							</div>
						</Box>
					)
					: (
						<Box>
							<div className="file-list">Ще не прикріплено жодного файлу</div>
						</Box>
					)}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
