import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import DocumentTable from '../table';
import { fetchArchiveDocuments } from '../../redux/actions';

import Box from 'components/box';
import Spinner from '../../../spinner';

const mapStateToProps = state => ({
	items: state.adminDocuments.get('items'),
	isFetching: state.adminDocuments.get('documentsIsLoading'),
});

const mapDispatchToProps = dispatch => ({
	fetchDocuments: () => dispatch(fetchArchiveDocuments())
});

class Archive extends Component {
	componentWillMount() {
		this.props.fetchDocuments();
	}

	render() {

		if (this.props.isFetching) {
			return <div><Spinner /></div>
		}

		if(this.props.items == undefined) {
			return <div></div>;
		}

		return (
			<Box>
				<h3>Архівні документи<small> у яких Ви фігуруєте:</small>
				</h3>
				<DocumentTable items={this.props.items} />
			</Box>
		)
	}
}

Archive.propTypes = {
	items: React.PropTypes.instanceOf(List).isRequired,
	fetchDocuments: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive)
