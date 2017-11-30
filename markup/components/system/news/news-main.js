import React, {Component, PropTypes} from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNews } from '../redux/actions/documents';
import NewsListMain from './news-main-list';
import Box from 'components/box';
import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';
const mapStateToProps = state => ({
  community: state.system.get('community'),
  token: state.auth.get('token'),
});
const mapDispatchToProps = dispatch => ({});
class MainNews extends Component {
	render() {
		return (
			<div>
        <NewsListMain numbers={5}/>
			</div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainNews);
