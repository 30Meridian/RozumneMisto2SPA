import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {fetchPolls} from '../redux/actions/documents';
import Box from 'components/box';

import Spinner from '../../spinner';

import PollsPlaceholder from './placeholder';

import PollsListBox from './list';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
  community: state.system.get('community'),
  polls: state.system.get('polls'),
  isFetching: state.system.get('pollsIsLoading')
});

const mapDispatchToProps = dispatch => ({
	onLoad: (slug) => dispatch(fetchPolls('', '', 5, 0, slug)),
});

class PollsMain extends Component {
  componentWillMount() {
    this.props.onLoad(this.props.match.params.community_slug);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
			this.props.onLoad(nextProps.match.params.community_slug);
		}
  }

	render () {

    if (this.props.isFetching) {
			return <Box><Spinner /></Box>
		};

    if (this.props.polls == undefined) {
			return null;
		}

    if (this.props.polls.error) {
      return <div><PollsPlaceholder/></div>;
    }

    if (this.props.polls.results.length === 0) {
      return null;
    }

		return (
			<Box>
        <div className="polls-main">
          <PollsListBox header="Останні опитування" items={this.props.polls.results} />
        </div>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PollsMain));
