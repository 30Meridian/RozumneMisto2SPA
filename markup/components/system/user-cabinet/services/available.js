import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ButtonDefault} from 'components/common-components/buttons';
import {loadPublicServices} from '../../redux/actions';
import history from '../../../history';
import {List, Button} from '../../../form-components';
import Box from 'components/box';
import Spinner from '../../../spinner';
import Pagination from '../../pagination';
import Title from 'components/dynamic-title';

import styles from './styles.scss';
import form from '../../../common-components/form.scss';

const mapStateToProps = (state) => ({
	services: state.system.get('services'),
	user: state.auth.get('user'),
	community: state.system.get('community'),
	isFetching: state.system.get('servicesIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug, offset) => dispatch(loadPublicServices(slug, 25, offset)),
	onClick: (data, slug) => {
		history.push(`${slug}/cabinet/documents/create/${data.slug}`);
	}
});

class AvailableList extends Component {

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.onLoad(this.props.match.params.community_slug || this.props.community.get('slug'), offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.onLoad(this.props.match.params.community_slug || this.props.community.get('slug'), offset);
	}

	render() {

		if (this.props.isFetching) {
			return <div><Spinner/></div>
		}

		if (this.props.services == undefined) {
			return <div></div>;
		}

		return (
			<div className="document-tables">
				<Title title={`Доступні послуги. Інформаційна система "Розумне місто" `} />
				<Box title4="Доступні послуги">
					{this.props.services.results.length > 0
						? (
							<table className="ui single line table documents-table">
								<thead>
									<tr>
										<th>ID</th>
										<th>Назва</th>
										<th>Видимість</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{this.props.services.results.map(item => (
										<tr key={item.id}>
											<td>
												<p>{item.id}</p>
											</td>
											<td>
												<p>{item.title}</p>
											</td>
											<td>
												<p>{item.public
														? 'Публічний'
														: 'Організаційний'}</p>
											</td>
											<td style={{
												width: "125px"
											}}>
												<p><ButtonDefault size="12px" value="Створити"
													onClick={() => this.props.onClick(item, this.props.hostEnable ? '' : '/' + this.props.community.get('slug'))}/></p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)
						: (
							<div>
								<p>Доступні послуги відсутні для даного міста.</p>
								<p>Адміністратор міста може додати послуги через конструктор.</p>
							</div>
						)}
					<Pagination counts={this.props.services.count} path={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/cabinet/available/`} matched={this.props.match.params.page} limits={25}/>
				</Box>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableList);
