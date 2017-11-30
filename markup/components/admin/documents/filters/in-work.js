import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import DocumentTable from '../table';
import { fetchActiveDocuments } from '../../redux/actions';

import Box from 'components/box';

const mapStateToProps = state => ({
	items: state.adminDocuments.get('items')
});

const mapDispatchToProps = dispatch => ({
	fetchDocuments: () => dispatch(fetchActiveDocuments())
});

class InWork extends Component {
	componentWillMount() {
		this.props.fetchDocuments();
	}

	render() {
		if(this.props.items == undefined) {
			return <div></div>;
		}
		return (
			<Box>
				<h3>Документи у роботі<small> у яких Ви фігуруєте:</small>
				</h3>
				<DocumentTable items={this.props.items}/>
			</Box>
		)
	}
}

InWork.propTypes = {
	items: React.PropTypes.instanceOf(List).isRequired,
	fetchDocuments: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(InWork)
