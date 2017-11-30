import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {fetchNews} from '../redux/actions/documents';
import NewsItem from './news-item';
import Pagination from '../pagination';
import {Row, Col, ButtonGroup} from 'react-bootstrap';

import Spinner from '../../spinner';

import history from '../../history';

import Box from 'components/box';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';

const mapStateToProps = state => ({community: state.system.get('community'), news: state.system.get('news'), token: state.auth.get('token'), isFetching: state.system.get('newsIsLoading'), hostEnable: state.system.get('standaloneHostEnable')});

const mapDispatchToProps = dispatch => ({
	onLoad: (number, offset, slug) => dispatch(fetchNews('', 'Опублікована', 5, 0, slug))
});

class NewsItemsListMain extends Component {
	componentWillReceiveProps(nextProps) {
		const page = nextProps.matched;
		const offset = 5 * (page - 1);
		if (nextProps.matched !== this.props.matched || this.props.match.url !== nextProps.match.url) {
			this.props.onLoad(this.props.numbers, offset, nextProps.match.params.community_slug);
		}
	}

	componentWillMount() {
		const page = this.props.matched || 1;
		const offset = 5 * (page - 1);
		this.props.onLoad(this.props.numbers, offset, this.props.match.params.community_slug);

	}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>
		}

		if (this.props.news == undefined) {
			return <div>Новин немає</div>;
		}

		if (this.props.news.error) {
			return null;
		}

		if (this.props.news.results.length === 0) {
			return null;
		}

		return (
			<Box title4="Новини міста">
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

				<Pagination counts={this.props.news.count} path={`${this.props.hostEnable
					? ''
					: '/' + this.props.community.get('slug')}/news/`} limits={10}/>

				<div className={btn.btnWrap}>
					<ButtonGroup className="hide-mob">
						{this.props.token
							? (
								<Link to={`${this.props.hostEnable
									? ''
									: '/' + this.props.community.get('slug')}/news/suggest`} className="btn btn-default">
									<i className="fa fa-plus-circle"></i>
									Запропонувати новину
								</Link>
							)
							: (null)}
						<Link to={`${this.props.hostEnable
							? ''
							: '/' + this.props.community.get('slug')}/news`} className='btn btn-default'>
							Читати усі новини
						</Link>
					</ButtonGroup>
				</div>
			</Box>
		)
	}
}

NewsItemsListMain.propTypes = {
	news: PropTypes.instanceOf(List).isRequired,
	onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsItemsListMain));
