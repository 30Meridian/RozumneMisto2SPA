import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import { Row, Col } from 'react-bootstrap';

import {loadWorkflowType, fetchDefects} from '../redux/actions/documents';
import Box from 'components/box';
import DefectsPlaceholder from './placeholder';
import Title from '../../dynamic-title';
import Spinner from '../../spinner';
import {DefaultHref, DefaultLink} from 'components/common-components/buttons';

import DefectsListBox from './list-box';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';
import form from '../../common-components/form.scss';
import config from '../../config';

const mapStateToProps = state => ({
	defects: state.system.get('defects'),
	community: state.system.get('community'),
	token: state.auth.get('token'),
	isFetching: state.system.get('defectsIsLoading'),
	workflow_type: state.documents.get('module_type'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: (offset, slug) => {
		dispatch(fetchDefects('', '', 25, offset)),
		dispatch(loadWorkflowType('defects', slug))
	}
});

class DefectsList extends Component {
	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.url !== this.props.match.url) {
			this.props.onLoad(offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 10 * (page - 1);
		this.props.onLoad(offset, this.props.community.get('slug'));
	}

	render() {
		const center = [
			Number(this.props.community.get('map_lat')),
			Number(this.props.community.get('map_lon'))
		] || [50, 30];

		if (this.props.isFetching) {
			return (
				<Box>
					<Title title={`Заявки ЖКГ. Список заявок ЖКГ. Інформаційна система "Розумне місто" `} />
					<Spinner/>
				</Box>)
		}

		if (this.props.defects == undefined) {
			return <div></div>;
		}

		if (this.props.defects.error) {
			return <div>
				<Title title={`Заявки ЖКГ. Список заявок ЖКГ. Інформаційна система "Розумне місто" `} />
				<DefectsPlaceholder />
			</div>;
		}

		if (this.props.defects.results.length === 0) {
      return (
      <Box>
				<Title title={`Заявки ЖКГ. Список заявок ЖКГ. Інформаційна система "Розумне місто" `} />
        <h4 className="box-title">Заявки відсутні</h4>
      </Box>
      )
    }

		return (
			<div className="box defects-list">
				<Title title={`Заявки ЖКГ. Список заявок ЖКГ. Інформаційна система "Розумне місто" `} />
				<div className="box-body">
					<div>
						<Row>
							<Col md={8}>
								<h4>Останні заявки на усунення дефектів ЖКГ:</h4>
							</Col>
							<Col md={4}>
			          <div className="export-btn">
			            <DefaultHref size="12px" href={`${config.apiHost}/documents/?workflow_type=${this.props.workflow_type}&state=&visible=True`} target="_blank">
			              Експорт JSON
			            </DefaultHref>
			          </div>
			        </Col>
						</Row>

						<DefectsListBox items={this.props.defects} url={this.props.match.params.page} limit={25}/>
						<div className={btn.btnWrap}>
							<div className="btn-group hide-mob">
								{this.props.token
									? (
										<DefaultLink to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/defects/create`}>
											<i className="fa fa-plus-circle" aria-hidden="true"></i>Додати заявку
										</DefaultLink>
									)
									: (null)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DefectsList);
