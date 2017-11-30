import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer, Polygon} from 'react-leaflet';
import {List} from 'immutable';
import {connect} from 'react-redux';
import Box from 'components/box';
import {Input, Button, Select, Form} from '../../../form-components';
import {ButtonDefault} from 'components/common-components/buttons.js';
import styles from './styles.scss';
import form from '../../../common-components/form.scss';

import {
	loadDepartments,
	changeInvestDepartment,
	changeInvestName,
	changeInvestDescrtiption,
	changeInvestPrice,
	changeInvestAddress,
	changeInvestMetrics,
	changeInvestContacts,
	changeInvestInvest,
	changeInvestBuilding,
	changeInvestImage,
	changeInvestDocument,
	changeInvestMap,
	changeInvestMapMarker,
	changeInvestMapValue,
	clearInvestShape,
	submitInvest
} from '../../redux/actions/'

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	departments: state.invest.get('departments'),
	name: state.invest.get('name'),
	description: state.invest.get('description'),
	price: state.invest.get('price'),
	address: state.invest.get('address'),
	square: state.invest.get('square'),
	contacts: state.invest.get('contacts'),
	typeInvest: state.invest.get('typeInvest'),
	typeBuilding: state.invest.get('typeBuilding'),
	image: state.invest.get('investImage'),
	maps: state.invest.get('map'),
	marker: state.invest.get('marker'),
	zoom: state.invest.get('zoom'),
	mapTypes: state.invest.get('mapTypes'),
	document: state.invest.get('document')
});

const mapDispatchToProps = (dispatch) => ({
	loadData: () => {
		dispatch(loadDepartments())
	},
	onDepartmentChange: (value) => dispatch(changeInvestDepartment(value)),
	onNameChange: (event) => dispatch(changeInvestName(event.target.value)),
	onDescriptionChange: (event) => dispatch(changeInvestDescrtiption(event.target.value)),
	onPriceChange: (event) => dispatch(changeInvestPrice(event.target.value)),
	onAddressChange: (event) => dispatch(changeInvestAddress(event.target.value)),
	onMetricsChange: (event) => dispatch(changeInvestMetrics(event.target.value)),
	onContactsChange: (event) => dispatch(changeInvestContacts(event.target.value)),
	onInvestChange: (value) => dispatch(changeInvestInvest(value)),
	onBuildingChange: (value) => dispatch(changeInvestBuilding(value)),
	onImageChange: (event) => dispatch(changeInvestImage(event.target)),
	onDocumentChange: (event) => dispatch(changeInvestDocument(event.target)),
	onChangeMap: (event) => dispatch(changeInvestMap(event.latlng)),
	onChangeMapMarker: (event) => dispatch(changeInvestMapMarker(event.latlng)),
	onChangeMapValue: (value) => dispatch(changeInvestMapValue(value)),
	onCleanShape: (event) => dispatch(clearInvestShape(event.latlng)),
	onSubmit: (event) => {
		event.preventDefault();
		dispatch(submitInvest());
	}
});

class InvestForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'dot'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	componentWillMount() {
		this.props.loadData();
	}
	render() {
		const position = [this.props.community.get('map_lat'), this.props.community.get('map_lon')] || [30, 30];

		const markerPosition = [this.props.marker.get('lat'), this.props.marker.get('lng')];
    const dots = this.props.maps.map((item) =>
      [item.get('lat'), item.get('lng')]
    ).toArray();
		return (
			<Box>
				<h3>Запропонувати інвестиційний проект</h3>
				<p>Текст і матеріали передані через форму будуть надіслані модераторам вашого міста на розгляд. </p>
				<p>Модератори можуть зв'язатися з вами через наданий телефон або пошту, прив'язану до профілю.</p>
				<p>Як матеріали можна використати файли у форматах: .pdf, .doc, .docx, .odt, .rtf, .jpg, .jpeg, .png, .tif, .tiff</p>
				<h4 className={styles.formHead}>Заповніть форму:</h4>
				<form className="ui form">
					<Select label="Департамент:" className={form.field} items={this.props.departments} value={this.props.department} onChange={this.props.onDepartmentChange}/>
					<Input label="Назва:" className={form.field} value={this.props.name} onChange={this.props.onNameChange}/>
					<Input label="Опис:" className={form.field} value={this.props.description} onChange={this.props.onDescriptionChange}/>
					<Input label="Ціна:" className={form.field} value={this.props.price} onChange={this.props.onPriceChange}/>
			  	<Input label="Адреса:" className={form.field} value={this.props.address} onChange={this.props.onAddressChange}/>
					<Input label="Площа:" className={form.field} value={this.props.square} onChange={this.props.onMetricsChange}/>
					<Input label="Контакти:" className={form.field} value={this.props.contacts} onChange={this.props.onContactsChange}/>
					<Select label="Тип об'єкту:" className={form.field} items={this.props.typeInvest} value={this.props.invest} onChange={this.props.onInvestChange}/>
					<Select label="Тип об'єкта:" className={form.field} items={this.props.typeBuilding} value={this.props.building} onChange={this.props.onBuildingChange}/>
					<Input type="file" label="Зображення:" className={form.field} onChange={this.props.onImageChange}/>
					<Input type="file" label="Документ:" className={form.field} onChange={this.props.onDocumentChange}/>


        <div className={styles.select}>
          <p>Виберіть тип відображення на карті:</p>
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="dot">Простий об'єкт</option>
						<option value="shape">Територія</option>
					</select>
        </div>
					{this.state.value == 'dot'
						?
            <div className={styles.map}>
            <h4>Простий об'єкт</h4>
						<div style={{'height': "400px"}}>
            <Map center={position} zoom={6} onClick={this.props.onChangeMapMarker}>
								<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

							{this.props.marker.map((item, i) => (
								<div>
								<Marker key={i} position={[item.get('lat'), item.get('lng')]}>

									<Popup>
										<span>Назва: Оренда приміщення в КЗ «Палац культури міста Нетішина»<br/>
											Категорія: Приміщення
											<br/>
											Адреса: вулиця Шевченка, 3, Нетішин, Хмельницька область, Україна, 30100
											<br/>
											Ціна: Не визначено
											<br/>
											<a href="#!">Сторінка проекту</a>
										</span>
									</Popup>
								</Marker></div>)
								)}
							</Map>
						</div>
              </div>
						:
            <div className={styles.map}>
            <h4>Територія</h4>
						<div style={{'height': "400px"}}>
            <Map center={position} zoom={6} onClick={this.props.onChangeMap}>
							<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/> {this.props.maps.map((value, i) =>
                <Marker key={i} position={[value.get('lat'), value.get('lng')]}>
                <Polygon positions={dots} />
							</Marker>)}

						</Map>
					</div>
						<ButtonDefault value="Очистити" onClick={this.props.onCleanShape}/>
          </div>
				}
          <ButtonDefault value="Відправити на розгляд" onClick={this.props.onSubmit}/>
				</form>

			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestForm);
