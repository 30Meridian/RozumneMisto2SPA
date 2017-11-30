import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Marker, Polygon, Popup, TileLayer} from 'react-leaflet';

import Pagination from '../../pagination';
import Statistic from './statistic';
import history from '../../../history';
import Spinner from '../../../spinner';
import Box from 'components/box';
import {loadInvests, loadInvestsList} from '../../redux/actions';

import styles from './styles.scss';

const mapStateToProps = state => ({
	community: state.system.get('community'),
	investments: state.invest.get('investments'),
	investmentsList: state.invest.get('investmentsList'),
	isFetching: state.system.get('moduleIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable')
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => dispatch(loadInvests()),
	loadList: (limit, offset) => dispatch(loadInvestsList(limit, offset))
});

class MapInvest extends Component {

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 10 * (page - 1);
		if (nextProps.match.url !== this.props.match.url) {
			this.props.loadList(10, offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 10 * (page - 1);
		this.props.loadList(10, offset);
		this.props.onLoad();
	}

	render() {

		if (!(this.props.investments.get('results')) || !(this.props.investmentsList.get('results'))) {
			return null;
		}

		const position = [this.props.community.get('map_lat'), this.props.community.get('map_lon')] || [30, 30];
		const zoom = this.props.community
			? this.props.community.get('zoom')
			: 12
		return (
			<Box>

				{/* <Statistic/>  */}

				<div style={{
					'height': "400px"
				}}>
					<Map center={position} zoom={this.props.community.get('zoom')}>
						<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/> {this.props.investments.get('results').map((item, id) => <div>

							{item.get('map_points').size === 1
								? (
									<Marker key={item.get('map_points').get(0).get('id')} position={[item.get('map_points').get(0).get('map_lat'), item.get('map_points').get(0).get('map_lon')]}>
										<Popup>
											<span className="default-link" onClick={(event) => {
												history.push(`${this.props.hostEnable
													? ''
													: '/' + this.props.community.get('slug')}/invest-map/detail/${item.get('id')}`)
											}}>{item.get('name')}</span>
										</Popup>
									</Marker>
								)
								: (

									<Polygon positions={item.get('map_points').toArray().map((value) => ([value.get('map_lat'), value.get('map_lon')]))}>
										<Popup>
											<span className="default-link" key={id} onClick={(event) => {
												history.push(`${this.props.hostEnable
													? ''
													: '/' + this.props.community.get('slug')}/invest-map/detail/${item.get('id')}`)
											}}>{item.get('name')}</span>
										</Popup>
									</Polygon>
								)
							}
						</div>)}
					</Map>
				</div>

				{this.props.isFetching
					? (
						<div className="text-center">
							<Spinner/>
						</div>
					)
					: (
						<table className="ui table">
							<thead>

								<tr>
									<th>Ілюстрація</th>
									<th>Назва обєкту</th>
									<th>Адреса</th>
									<th className={styles.statusWrap}>Ціна</th>
								</tr>
							</thead>

							<tbody>
								{this.props.investmentsList.get('results').map((item) => (
									<tr onClick={(event) => {
										history.push(`${this.props.hostEnable
											? ''
											: '/' + this.props.community.get('slug')}/invest-map/detail/${item.get('id')}`)
									}}>
										<td className={styles.imgTD}><img src={item.get('image')}/></td>
										<td>{item.get('name')}</td>
										<td>{item.get('address')}</td>
										<td style={{
											"width": "90px"
										}}>{item.get('price')}</td>
									</tr>
								))}
							</tbody>

						</table>
					)}

				<Pagination counts={this.props.investments.get('count')} path={`${this.props.hostEnable
					? ''
					: '/' + this.props.community.get('slug')}/invest-map/`} matched={this.props.match.params.page} limits={10}/>

			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapInvest);
