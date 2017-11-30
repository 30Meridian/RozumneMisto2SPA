import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fromJS, toJS} from 'immutable';
import {ButtonDefault} from 'components/common-components/buttons';
import Spinner from '../../../spinner';
import {Row, Col} from 'react-bootstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import Title from 'components/dynamic-title';
import {Input, Select, Button} from '../../../form-components';
import Box from 'components/box';
import {
	loadCommunity,
	loadAllCommunities,
	loadCommunityTypes,
	loadWorkflows,
	changeCommunityName,
	changeCommunityParent,
	changeCommunityKoatuu,
	changeCommunityActive,
	changeCommunityType,
	changeCommunityDocumentPatter,
	changeCommunityBanner,
	changeCommunityMenu,
	changeCommunityOfficeMenu,
	changeWorkflow,
	changeCommunityMap,
	submitCommunity
} from '../../redux/actions/settings/community';

import ModulesManagement from './manage-modules';
import MenuManagement from './manage-menu';

import form from '../../../common-components/form.scss';

const mapStateToProps = (state) => ({
	id: state.settings.community.get('id'),
	name: state.settings.community.get('name'),
	communities: state.settings.community.get('allCommunities'),
	parent: state.settings.community.get('parent'),
	koatuu: state.settings.community.get('koatuu'),
	active: state.settings.community.get('active'),
	communityTypes: state.settings.community.get('communityTypes'),
	communityType: state.settings.community.get('communityType'),
	documentPattern: state.settings.community.get('documentPattern'),
	banner: state.settings.community.get('banner'),
	workflows: state.settings.community.get('paymentWorkflows'),
	workflow: state.settings.community.get('workflow'),
	map: state.settings.community.get('map'),
	zoom: state.settings.community.get('zoom'),
	modules: state.settings.community.get('modules'),
	menu: state.settings.community.get('menu'),
	officeMenu: state.settings.community.get('officeMenu')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => {
		if (id > 0)
			dispatch(loadCommunity(id));
		dispatch(loadAllCommunities());
		dispatch(loadCommunityTypes());
		dispatch(loadWorkflows());
	},
	onChangeName: (event) => dispatch(changeCommunityName(event.target.value)),
	onChangeParent: (value) => dispatch(changeCommunityParent(value)),
	onChangeKoatuu: (event) => dispatch(changeCommunityKoatuu(event.target.value)),
	onChangeActive: (event) => dispatch(changeCommunityActive(event.target.checked)),
	onChangeType: (value) => dispatch(changeCommunityType(value)),
	onChangeDocumentPattern: (event) => dispatch(changeCommunityDocumentPatter(event.target.value)),
	onChangeMap: (event) => dispatch(changeCommunityMap(event.latlng)),
	onChangeBanner: (event) => dispatch(changeCommunityBanner(event.target)),
	onChangeMenu: (event) => dispatch(changeCommunityMenu(event.target.value)),
	onChangeOfficeMenu: (event) => dispatch(changeCommunityOfficeMenu(event.target.value)),
	onChangeWorkflow: (value) => dispatch(changeWorkflow(value)),
	onSubmit: (event, id) => {
		event.preventDefault();
		dispatch(submitCommunity(id));
	}
});

class CommunityManagement extends Component {
	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.onLoad(id);
	}

	render() {

		const position = [this.props.map.get('lat'), this.props.map.get('lng')];

		return (
			<div>
				<Title title={`Службовий кабінет. Редагування громади "${this.props.name}". Інформаційна система "Розумне місто" `} />
				<form className="ui form" onSubmit={(event) => this.props.onSubmit(event, this.props.match.params.id)}>
					<Box title4="Основна інформація: ">
						<Row>
							<Col md={6}>
								<div className="city-name">
									<Input label="Назва" className="form-group" value={this.props.name} onChange={this.props.onChangeName}/>
								</div>
								<Select label="Батьківська" className="form-group" value={this.props.parent} blankOption="true" valueKey="name" items={this.props.communities
									? fromJS(this.props.communities.results)
									: []} onChange={this.props.onChangeParent}/>
								<Input label="КОАТУУ" className="form-group" value={this.props.koatuu} onChange={this.props.onChangeKoatuu}/>
								<Input label="Активна" className="form-group" type="checkbox" checked={this.props.active} onChange={this.props.onChangeActive}/>
								<Select label="Тип спільноти" className="form-group" value={this.props.communityType} valueKey="title" items={this.props.communityTypes} onChange={this.props.onChangeType}/>
								<Select label="Стратегія оплати" className="form-group" value={this.props.workflow} valueKey="value" items={this.props.workflows.get('results')} onChange={this.props.onChangeWorkflow}/>
								<Input type="file" label="Баннер" className="form-group" onChange={this.props.onChangeBanner}/>
							</Col>
							<div className="col-md-6" style={{
								'height': "400px"
							}}>
								<Map center={position} zoom={9} onClick={this.props.onChangeMap}>
									<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
									<Marker position={position}/>
								</Map>
							</div>
						</Row>
					</Box>
					<Box title4="Модулі громади:">
						<Row>
							<Col md={12}>
								<ModulesManagement/>
							</Col>
						</Row>
					</Box>
					<Box>
						<MenuManagement title="Мeню громади" onChange={this.props.onChangeMenu} value={this.props.menu}/>
						<MenuManagement title="Мeню кабінету мешканця" onChange={this.props.onChangeOfficeMenu} value={this.props.officeMenu}/>
						<ButtonDefault type="submit" value="Зберегти"/>
					</Box>
				</form>
			</div>
		);
	}
}
// --Modules--<br/>
export default connect(mapStateToProps, mapDispatchToProps)(CommunityManagement);
