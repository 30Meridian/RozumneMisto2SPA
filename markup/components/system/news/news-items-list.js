import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Title from '../../dynamic-title';
import {loadWorkflowType, fetchNews} from '../redux/actions/documents';
import NewsItem from './news-item';
import NewsPlaceholder from './placeholder';
import Pagination from '../pagination';
import {DefaultLink, DefaultHref} from 'components/common-components/buttons';
import Spinner from '../../spinner';

import history from '../../history';
import config from '../../config';

import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';
import form from '../../common-components/form.scss';

const mapStateToProps = state => ({
	community: state.system.get('community'),
	news: state.system.get('news'),
	token: state.auth.get('token'),
	isFetching: state.system.get('newsIsLoading'),
	workflow_type: state.documents.get('module_type'),
	hostEnable: state.system.get('standaloneHostEnable')
});

const mapDispatchToProps = dispatch => ({
	onLoad: (offset, slug) => {
		dispatch(fetchNews('', 'Опублікована', 10, offset)),
		dispatch(loadWorkflowType('news', slug))
	}
});

class NewsItemsList extends Component {
	componentWillReceiveProps(nextProps) {
		const page = nextProps.matches;
		const offset = 10 * (page - 1);
		if (nextProps.matches !== this.props.matches) {
			this.props.onLoad(offset);
		}
	}

	componentWillMount() {
		const page = this.props.matches || 1;
		const offset = 10 * (page - 1);
		this.props.onLoad(offset, this.props.community.get('slug'));
	}

	render() {

		if (this.props.isFetching) {
			return <div><Spinner/></div>
		}

		if (this.props.news == undefined) {
			return <div>Новин немає</div>;
		}

		if (this.props.news.error) {
			return <div>
				<Title title={`Новини. Cписок новин. Інформаційна система "Розумне місто" `} />
				<NewsPlaceholder/>
			</div>;
		}


		let proposeBtn = null;
		const slug = this.props.hostEnable
			? ''
			: '/' + this.props.community.get('slug');

		if (this.props.token) {
			proposeBtn = (
				<DefaultLink to={`${slug}/news/suggest`}>
					<i className="fa fa-plus-circle"></i>
					Запропонувати новину
				</DefaultLink>
			);
		}

		if (this.props.news.results.length === 0) {
			return (
				<div>
					<Row>
						<Col md={6}>
							<Title title={`Новини. Cписок новин. Інформаційна система "Розумне місто" `} />
							<h4 className="box-title">Новини відсутні</h4>
							{proposeBtn}
						</Col>
					</Row>
				</div>
			)
		}

		return (
			<div>
				<div className="box-head">
					<Title title={`Новини. Cписок новин. Інформаційна система "Розумне місто" `} />
					<Row>
						<Col md={8}>
							<h3 className="box-title">Новини міста</h3>
						</Col>
						<Col md={4}>
							<div className="export-btn">
								<DefaultHref href={`${config.apiHost}/documents/?workflow_type=${this.props.workflow_type}&state=&visible=True`} target="_blank" size="12px">
									Експорт JSON
								</DefaultHref>
							</div>
						</Col>
					</Row>
				</div>
				<div className="main-content">
					<table className="ui table">
						<thead>
							<tr>
								<th>Ілюстрація</th>
								<th>Cуть новини</th>
								<th className={styles.statusWrap}>Дата створення</th>
							</tr>
						</thead>
						{this.props.isFetching
							? (
								<div>
									<Spinner/>
								</div>
							)
							: (
								<tbody>
									{this.props.news.results.map((item) => (<NewsItem key={item.id} item={item} communitySlug={this.props.hostEnable
										? ''
										: this.props.community.get('slug')}/>))}
								</tbody>
							)}
					</table>
				</div>
				<Pagination counts={this.props.news.count} path={`${slug}/news/`} matched={this.props.matches} limits={10}/>
				<div className={btn.btnWrap}>
					<div className="btn-group hide-mob">
						{proposeBtn}
					</div>
				</div>
			</div>
		)
	}
}

NewsItemsList.propTypes = {
	news: PropTypes.instanceOf(List).isRequired,
	onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItemsList);
