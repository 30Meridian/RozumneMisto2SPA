import React, {Component} from 'react';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {connect} from 'react-redux';

import Nav from '../nav';

import {fetchCommunities} from '../../redux/actions';

const mapStateToProps = (state) => ({communities: state.system.get('communities')});

const mapDispatchToProps = (dispatch) => ({
	fetchCommunities: () => dispatch(fetchCommunities())
});

class Results extends Component {

	componentWillMount() {
		this.props.fetchCommunities()
	}

	render() {

		const position =  [49, 31];

		return (
			<div className="results-page">
			<Nav/>
				<div className="container container-fluid">
					<div className="card-block text-nowrap">
						<h3>Результат роботи сервісу "Розумне місто" за
							<strong>
								<span> 483 </span>
							</strong>
							днів роботи</h3>
						<table className="table table-condensed table-results">
							<tbody>
								<tr>
									<td>Населених пунктів у системі</td>
									<td>
										<span>729</span>
									</td>
								</tr>
								<tr>
									<td>Зареєстрованих користувачів у системі</td>
									<td>
										<span>11268</span>
									</td>
								</tr>
								<tr>
									<td>Задіяних модулів системи (інструментів)</td>
									<td>
										<span>14</span>
									</td>
								</tr>
								<tr>
									<td>Додано новин</td>
									<td>
										<span>1228</span>
									</td>
								</tr>

								<tr>
									<td>Додано заявок на усунення дефектів ЖКГ</td>
									<td>
										<span>899</span>
									</td>
								</tr>
								<tr>
									<td>Додатно петицій</td>
									<td>
										<span>425</span>
									</td>
								</tr>
								<tr>
									<td>Віддано голосів за петиції</td>
									<td>
										<span>27674</span>
									</td>
								</tr>
								<tr>
									<td>Створено опитуваннь (e-референдумів)</td>
									<td>
										<span>45</span>
									</td>
								</tr>
								<tr>
									<td>Віддано голосів за опитування</td>
									<td>
										<span>930</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
