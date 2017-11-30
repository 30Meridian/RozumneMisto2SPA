import React, { Component } from 'react';
import {connect} from 'react-redux';
import history from '../../../history';
import {loadPublicTypes, loadPrivateTypes, loadCommunityTypes, changeWorkflowType} from '../../redux/actions';


import TypeTable from './type-table';
import Box from 'components/box';
import Spinner from '../../../spinner';
import Pagination from '../../../system/pagination';

// import Button from '../../../form-components/button';

const mapStateToProps = (state) => ({
	available: state.adminDocuments.get('privateTypes'),
	availableIsFetching: state.adminDocuments.get('publicTypesIsLoading')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset) => {
		dispatch(loadPrivateTypes(5, offset));
	},
	onClick: (data) => {
		dispatch(changeWorkflowType(data));
		history.push(`/admin/documents/create/${data.slug}`);
	}
});

class AvailableTable extends Component {

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

		if (this.props.availableIsFetching) {
			return <div><Spinner /></div>
		}

		if (this.props.available == undefined) {
			return <div></div>;
		}

		return (
    <div>
      <TypeTable fetching={this.props.availableIsFetching} items={this.props.available} click={this.props.onClick} />
      <Pagination counts={this.props.available.count} path="/admin/documents/list/private/" matched={this.props.match.params.page} limits={25} />
    </div>
		);
	}
}

export default connect (mapStateToProps,mapDispatchToProps)(AvailableTable);
