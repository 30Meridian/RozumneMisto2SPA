import React, { Component } from 'react';
import { connect } from 'react-redux';

import {loadWorkflowType, fetchPolls} from '../redux/actions/documents';
import Box from 'components/box';

import Spinner from '../../spinner';
import Title from '../../dynamic-title';
import PollsPlaceholder from './placeholder';

import PollsListBox from './list';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
  community: state.system.get('community'),
  polls: state.system.get('polls'),
  isFetching: state.system.get('pollsIsLoading'),
  workflow_type: state.documents.get('module_type'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: (slug) => {
    dispatch(fetchPolls('', '', 20)),
    dispatch(loadWorkflowType('polls', slug))
  }
});

class Polls extends Component {

  componentWillMount() {
    this.props.onLoad(this.props.community.get('slug'));
  }

	render () {

    if (this.props.isFetching) {
			return <Box><Spinner /></Box>
		};

    if (this.props.polls == undefined) {
			return <div></div>;
		}

    if (this.props.polls.error) {
      return <div>
        <Title title={`Опитування. Останні опитування. Інформаційна система "Розумне місто" `} />
        <PollsPlaceholder/></div>;
    }

    if (this.props.polls.results.length === 0) {
      return (
      <Box>
        <Title title={`Опитування. Останні опитування. Інформаційна система "Розумне місто" `} />
          <h4 className="box-title">Опитування відсутні</h4>
      </Box>
      )
    }

		return (
			<Box>
        <Title title={`Опитування. Останні опитування. Інформаційна система "Розумне місто" `} />
        <PollsListBox header="Останні опитування" items={this.props.polls.results} workflow_type={this.props.workflow_type} />
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
