import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Marker, Polygon, Popup, TileLayer} from 'react-leaflet';
import ReactModal from 'react-modal';
import { FacebookButton, FacebookCount } from "react-social";
import Spinner from '../../spinner';
import ValueResolver from '../../common/document/value-resolver';

import {fetchDocument, cleanFormValues} from '../redux/actions/documents';
import Title from '../../dynamic-title';
import {Button} from '../../form-components';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';
import CompletedProceedingList from '../../common/document/card/completed-proceeding';
import FacebookShare from '../share';
import BreadCrumbs from '../breadcrumbs';
import Modal from '../modal';
import styles from './styles.scss';
import form from 'components/common-components/form.scss';

const mapStateToProps = (state) => ({community: state.system.get('community'), document: state.documents.get('document'), formValues: state.documents.get('documentFormValues'), completedProceedings: state.documents.get('documentCompletedProceedings'), isFetching: state.documents.get('documentIsLoading')});
const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => {
		dispatch(cleanFormValues());
		dispatch(fetchDocument(id));
	}
});
class DefectCard extends Component {

	componentWillMount() {
		this.props.onLoad(this.props.match.params.id);
	}

	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal(event) {
		this.setState({
			modalOpen: !this.state.modalOpen
		});
	}

	render() {
		const positions = this.props.formValues.toArray().map((item) => {
			return item.get('form_component_name');
		});

		const positionToDelete = positions.indexOf('Map');
		const dataArray = this.props.formValues.splice(positionToDelete, 1);
		const arrayCoordinats = this.props.formValues.map((item) => {
			return item.get('value');
		});

		const mapMarker = arrayCoordinats.toArray()[positionToDelete];

		const mapLat = mapMarker
			? mapMarker.lat
			: 50;
		const mapLng = mapMarker
			? mapMarker.lng
			: 30;

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>
		}

		return (
			<div>
				<Title title={`Заявки ЖКГ. ${this.props.document.get('title')}. Інформаційна система "Розумне місто" `} />
				<Row>
					<div className="document-top">
						<div>
							<BreadCrumbs documentLink="defects" documentId={this.props.document.get('id')} documentName="Заявки ЖКГ"/>
						</div>
						<div md={6} clas>
							<FacebookButton url={window.location.href} message={this.props.document.get('title')} className={form.btnDefault + " " + form.btnFacebook} appId={259035427863157}>
                <i className="fa fa-facebook"></i>
                {" Поділитися "}
              </FacebookButton>
						</div>
					</div>
					<Col md={12}>
						<Box title4={this.props.document.get('title')}>
							<div className="row">
								<div className="col-md-6">
									<div>
										<strong>Додав:</strong> {this.props.document.get('created_by_name')}</div>
									<div>
										<strong>Додана:</strong> {new Date(this.props.document.get('date_created')).toLocaleString('uk-UA')}</div>
									{dataArray.map((item, index) => (
										<div key={item.get('id')} className="defect-wrap">
											<label>{item.get('form_component_name')}: </label> <ValueResolver item={item}/>
										</div>
									))}
									<strong>Статус заявки:</strong> {this.props.document.get('state_field_name')}<br/>
								</div>
								<div className="col-md-6 map-wrapper">
									<div className={styles.mapBlock} style={{
										'height': "300px"
									}}>
										<Map center={[mapLat, mapLng]} zoom={this.props.community.get('zoom')} style={{
											'zIndex': 0
										}}>
											<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
											<Marker position={[mapLat, mapLng]}>
												<Popup>
													<span>{this.props.document.get('title')}
													</span>
												</Popup>
											</Marker>
										</Map>
									</div>
								</div>
							</div>
						</Box>
					</Col>
					<Col md={12}>

						<ReactModal isOpen={this.state.modalOpen} onRequestClose={this.toggleModal} className={{
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
										<i className="fa fa-times" aria-hidden="true" onClick={(event) => this.toggleModal()}></i>
									</div>
									<div className={styles.modalDetailImg}>
										{this.props.document.get('title_image')
											? (<img src={this.props.document.get('title_image')}/>)
											: (<img src="/assets/img/general/empty.gif"/>)}
									</div>
								</Col>
							</Row>
						</ReactModal>

						<Box title4="Зображення">
							<div className={styles.detailImg} onClick={this.toggleModal}>
								{this.props.document.get('title_image')
									? (<img src={this.props.document.get('title_image')}/>)
									: (<img src="/assets/img/general/empty.gif"/>)}
							</div>
						</Box>

					</Col>
					<Col md={12}>
						<Box title4="Зміна станів">
							<CompletedProceedingList completedProceedings={this.props.completedProceedings}/>

						</Box>
					</Col>
				</Row>
			</div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DefectCard);
