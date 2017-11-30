import React, { Component } from 'react';
import {connect} from 'react-redux';

import {loadPublicTypes, loadPrivateTypes, loadCommunityTypes, changeWorkflowType} from '../../redux/actions';


import TypeTable from './type-table';
import Box from 'components/box';
import Spinner from '../../../spinner';
import Pagination from '../../../system/pagination';
import history from '../../../history';
import Button from '../../../form-components/button';

const mapStateToProps = (state) => ({
	communities: state.adminDocuments.get('communityTypes'),
	communitiesIsFetching: state.adminDocuments.get('publicTypesIsLoading'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset) => {
		dispatch(loadCommunityTypes(25, offset));
	},
	onClick: (data) => {
		dispatch(changeWorkflowType(data));
		history.push(`/admin/documents/create/${data.slug}`);
	}
});

class CommunityTable extends Component {

  componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.onLoad(offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.onLoad(offset);
	}

	render() {

		if (this.props.communitiesIsFetching) {
			return <div><Spinner /></div>
		}

		if (this.props.communities == undefined) {
			return <div></div>;
		}

		return (
    <div>
      <TypeTable fetching={this.props.communitiesIsFetching} items={this.props.communities} click={this.props.onClick} />
      <Pagination counts={this.props.communities.count} path="/admin/documents/list/" matched={this.props.match.params.page} limits={25} />
    </div>
		);
	}
}

export default connect (mapStateToProps,mapDispatchToProps)(CommunityTable);
