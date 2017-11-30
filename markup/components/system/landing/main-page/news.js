import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import config from '../../../config';

import {loadLiveStream} from '../../redux/actions';
import {ButtonGreen} from 'components/common-components/buttons.js';
import {Row, Col} from 'react-bootstrap';
import Button from '../../../form-components/button';
import Spinner from '../../../spinner';

import styles from './styles.scss';
import form from '../../../common-components/form.scss';

const mapStateToProps = (state) => ({livestream: state.system.get('livestream'), isFetching: state.system.get('newsAreLoading')});

const mapDispatchToProps = (dispatch) => ({
	onMount: () => {
		dispatch(loadLiveStream(6, 0));
	},
	onLoad: (limit, offset) => {
		dispatch(loadLiveStream(limit, offset));
	}
});

class News extends Component {

	constructor(props) {
		super(props);

		this.limit = 6;
		this.offset = 0;

		this.addNews = this.addNews.bind(this);
	}

	addNews() {
		this.limit += 6;
		this.offset += 6;
	}

	componentWillMount() {
		this.props.onMount();
	}

	render() {

		if (this.props.livestream === undefined) {
			return <div></div>
		}

		return (
			<section className={styles.sectionNews}>
				<h2 className="text-center">Останні новини</h2>
				<div className="container">
					<div className="promo-news">
						{this.props.livestream.results.map((item) =>
						 <div className="promo-item">
							<div className={styles.newsCard}>
								<div className={styles.newsImg}>
									<Link to={`/${item.department.slug}/${item.module_list[0]}/document/${item.id}`}>
										{item.title_image
											? <img src={config.host + item .title_image}/>
											: <img src="/assets/img/general/placeholder1.png"/>}
									</Link>
								</div>
								<div className={styles.tags}>
									<div className={styles.date}>
										<i className="fa fa-calendar"></i>
										{new Date(item.date_created).toLocaleDateString('uk-UA')}
									</div>
									<div className={styles.places}>
										<i className="fa fa-tags"></i>
										{item.workflow_type_name}
									</div>
								</div>
								<div className={styles.newsHead}>
									<h3>
										<Link to={`/${item.department.slug}/${item.module_list[0]}/document/${item.id}`}>
											{item.title}
										</Link>
									</h3>
								</div>
								<div className={styles.newsDescription}>
									{item.description}
								</div>
							</div>
						</div>
					)}
				</div>
					{this.props.isFetching && (<Spinner/>)}
					<div className="text-center">
						<ButtonGreen size="18px" value={"Хочеш ще?"} onClick={(event) => {
							this.addNews();
							this.props.onLoad(this.limit, this.offset);
						}}/>
					</div>
				</div>
			</section>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
