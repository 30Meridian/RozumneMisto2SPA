import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import {fetchNews} from '../redux/actions/documents';
import NewsItemsList from './news-items-list';

import Box from 'components/box';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';

const mapStateToProps = state => ({community: state.system.get('community')});

const mapDispatchToProps = dispatch => ({
	onLoad: () => dispatch(fetchNews())
});

class NewsList extends Component {
	componentWillMount() {
		this.props.onLoad();
	}

	render(props) {
		return (
			<Box>
				<NewsItemsList matches={this.props.match.params.page} number={this.props.numbers}/>
			</Box>
		)
	}
}

NewsList.propTypes = {
	onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
