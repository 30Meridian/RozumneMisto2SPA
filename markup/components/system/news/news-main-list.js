import React, {Component, PropTypes} from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import { fetchNews } from '../redux/actions/documents';
import NewsItemsListMain from './news-items-list-main';

import Box from 'components/box';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';


const mapStateToProps = state => ({
  community: state.system.get('community'),
});

const mapDispatchToProps = dispatch => ({
});

class NewsListMain extends Component {
	render(props) {
		return (
			<div>
        <NewsItemsListMain number={this.props.numbers}/>
			</div>
		)
	}
}

NewsListMain.propTypes = {
	onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsListMain);
