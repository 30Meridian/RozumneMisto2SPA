import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'components/box';
import Spinner from 'components/spinner';
import SelectPicker from 'components/components/selectpicker';
import Title from 'components/dynamic-title';
import Pagination from 'components/system/pagination';
import Input from 'components/form-components/input';
import { ButtonTransparent } from 'components/common-components/buttons.js';

import { loadCommunityList, loadCommunityStatistic, changeCountCommunityAllowed, loadCommunityMemberList,
	changeSelectedCommunity, changeMemberSearch
} from '../redux/actions/statistic';

import form from 'components/common-components/form.scss';
import styles from '../styles.scss';


const mapStateToProps = state => ({
	countPetition: state.moderator.statistic.get('countPetition'),
	countInfRequest: state.moderator.statistic.get('countInfRequest'),
	countNews: state.moderator.statistic.get('countNews'),
	countPoll: state.moderator.statistic.get('countPoll'),
	communityList: state.moderator.statistic.get('communityList'),
	communityListIsLoading: state.moderator.statistic.get('communityListIsLoading'),
	countCommunityAllowed: state.moderator.statistic.get('countCommunityAllowed'),
	memberList: state.moderator.statistic.get('memberList'),
	memberListIsLoading: state.moderator.statistic.get('memberListIsLoading'),
	selectedCommunity: state.moderator.statistic.get('selectedCommunity'),
	memberSearch: state.moderator.statistic.get('memberSearch'),
});

const mapDispatchToProps = dispatch => ({
	loadCommunityList: (search) => dispatch(loadCommunityList(search)),
	loadCommunityStatistic: (slug) => dispatch(loadCommunityStatistic(slug)),
	changeCountCommunityAllowed: (data) => dispatch(changeCountCommunityAllowed(data)),
	loadCommunityMemberList: (slug, offset, search) => dispatch(loadCommunityMemberList(slug, offset, 10, search)),
	changeSelectedCommunity: (data) => dispatch(changeSelectedCommunity(data)),
	changeMemberSearch: (data) => dispatch(changeMemberSearch(data)),
});

class Content extends Component {
	componentWillMount() {
		let res = this.props.loadCommunityList();
		const page = this.props.match.params.page || 1;
		const offset = 10 * (page - 1);

		res.then(() => {
			this.props.changeCountCommunityAllowed(this.props.communityList.get('count'));
			if (this.props.communityList.get('results').size > 0) {
				this.props.changeSelectedCommunity(this.props.communityList.get('results').get(0));
				this.props.loadCommunityStatistic(this.props.communityList.get('results').get(0).get('slug'));
				this.props.loadCommunityMemberList(this.props.communityList.get('results').get(0).get('slug'), offset);
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.page != nextProps.match.params.page) {
			const page = nextProps.match.params.page || 1;
			const offset = 10 * (page - 1);
			this.props.loadCommunityMemberList(this.props.selectedCommunity.get('slug'), offset, this.props.memberSearch);
		}
	}

	render() {
		const page = this.props.match.params.page || 1;
		const offset = 10 * (page - 1);

		return (
			<div>
				<Title title={`Панель модератора. Інформаційна система "Розумне місто" `} />
				<Box>
					<div className={"text-center"}>
						<h3>Панель модератора</h3>
					</div>
				</Box>
				<Box>
				<div>
					<div className={"text-center"}>
						<h4>Статистика міста</h4>
					</div>
					{this.props.communityListIsLoading && !this.props.communityList.get('results') ?
						<Spinner /> :
							this.props.countCommunityAllowed > 0 ?
							this.props.countCommunityAllowed == 1 ?
							<div className={"text-center"}>
								<p className={form.btnDefault + " " + form.btnBlock + " " + form.btnLarge}>
									{this.props.communityList.get('results').get(0).get('name')}</p>
							</div>
							:
						<SelectPicker items={this.props.communityList.get('results')} itemValue={"name"}
							title={this.props.communityList.get('count') > 0 ?
								this.props.communityList.get('results').get(0).get('name') : null}
							onSearchChange={(event) => this.props.loadCommunityList(event.target.value)}
							onChange={(e, item) => {
								this.props.changeSelectedCommunity(item);
								this.props.loadCommunityStatistic(item.get('slug'));
								this.props.loadCommunityMemberList(item.get('slug'));
								this.props.history.push('/moderator');
							} } />
						:
						<div className={"text-center"}>
							<p>Відсутні міста, доступні для перегляду</p>
						</div>
					}
					<table className="ui table documents-table">
						<thead>
							<tr>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Користувачів</th>
								<th>{this.props.memberList.get('count') || 0}</th>
							</tr>
							<tr>
								<th>Петицій</th>
								<th>{this.props.countPetition}</th>
							</tr>
							<tr>
								<th>Заявок ЖКГ</th>
								<th>{this.props.countInfRequest}</th>
							</tr>
							<tr>
								<th>Опитувань</th>
								<th>{this.props.countPoll}</th>
							</tr>
							<tr>
								<th>Новин</th>
								<th>{this.props.countNews}</th>
							</tr>
						</tbody>
					</table>
				</div>
			</Box>
			<Box>
				<div className="box-head">
					<h4><i className="fa fa-user"></i> Користувачі у вашому населеному пункті {
						this.props.memberList.get('count') || ""}</h4>
				</div>
				<div className="box-head">
					<div className={styles.searchHeader}>
						<form className={`${styles.typeFilter} ui form`} onSubmit={(event) => {
							event.preventDefault();
							this.props.loadCommunityMemberList(this.props.selectedCommunity.get('slug'),
								offset, this.props.memberSearch);
						}}>
							<div className={styles.inputWrap}>
								<Input placeholder={"Введіть ім'я/прізвище/email користувача"} value={this.props.typeFilter}
									onChange={(event) => this.props.changeMemberSearch(event.target.value)} />
							</div>
							<ButtonTransparent size="12px" iconClass="fa fa-search" type="submit" value={"Шукати"}/>
						</form>
					</div>
				</div>
				{this.props.memberListIsLoading ? <Spinner /> : <div>
					<table className="ui table documents-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>ПІБ</th>
								<th>Email</th>
								<th>Телефон</th>
								<th>Дата реєстрації</th>
								<th>Статус</th>
							</tr>
						</thead>
						<tbody>
							{this.props.memberList.get('results').map(item => (
								<tr key={item.get('id')}>
									<td>{item.get('user_data').get('id')}</td>
									<td>{item.get('user_data').get('last_name')} {item.get('user_data').get('first_name')} {
											item.get('user_data').get('middle_name')}</td>
									<td>{item.get('user_data').get('email')}</td>
									<td>{item.get('user_data').get('phone')}</td>
									<td>{new Date(item.get('user_data').get('date_joined')).toLocaleString('uk-UA')}</td>
									<td>{item.get('user_data').get('is_active') ? "Активний" : "Заблокований"}</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination counts={this.props.memberList.get('count')} path={"/moderator/"}
						matched={this.props.match.params.page} limits={10}/>
				</div>}
			</Box>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
