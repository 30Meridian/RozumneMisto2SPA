import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchNews} from '../redux/actions/documents';
import NewsList from './news-items-list';

import Box from 'components/box';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';

const mapStateToProps = state => ({
	community: state.system.get('community'),
	token: state.auth.get('token'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = dispatch => ({});

class News extends Component {
	render() {
		return (
			<Box>
				<NewsList url={this.props.match.params.page} numbers={10} />
				<div className={btn.btnWrap}>
					<div className="btn-group hide-mob">
						{this.props.token
							? (
								<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/news/suggest`} className="btn btn-default">
									<i className="fa fa-plus-circle"></i>
									Запропонувати новину
								</Link>
							)
							: (null)}
						<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/news`} className='btn btn-default'>
							Читати усі новини
						</Link>
					</div>
				</div>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
