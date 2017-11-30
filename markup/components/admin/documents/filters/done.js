import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import DocumentTable from '../table';
import { fetchDoneDocuments } from '../../redux/actions';

import Box from 'components/box';

const mapStateToProps = state => ({
	items: state.adminDocuments.get('items')
});

const mapDispatchToProps = dispatch => ({
	fetchDocuments: () => dispatch(fetchDoneDocuments())
});

class DocumentsDone extends Component {
	componentWillMount() {
		this.props.fetchDocuments();
	}

	render() {

		if(this.props.items == undefined) {
			return <div></div>;
		}
		return (
			<Box>
				<h3>Виконані документи<small> у яких Ви фігуруєте:</small>
				</h3>
				<DocumentTable items={this.props.items}/>
			</Box>
		)
	}
}

DocumentsDone.propTypes = {
	items: React.PropTypes.instanceOf(List).isRequired,
	fetchDocuments: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsDone)
