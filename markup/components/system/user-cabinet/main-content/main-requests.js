import React, {Component} from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../spinner';

import DocumentTableRequest from '../documents-table/table-request';

import { fetchCabinetDocuments } from '../../redux/actions';

import Box from 'components/box';
import styles from './styles.scss';


const mapStateToProps = state => ({
  documents: state.system.get('documents'),
	community: state.system.get('community'),
  isFetching: state.system.get('documentsIsLoading'),
  hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => dispatch(fetchCabinetDocuments(5, 0)),
});

class MainRequests extends Component {
	componentWillMount() {
		this.props.onLoad();
	}

	render() {
    if (this.props.isFetching) {
      return <Box><Spinner /></Box>
    }

    if(this.props.documents == undefined) {
      return <div></div>;
    }

		return (
			<Box title4="Мої електронні послуги">
          {this.props.documents.results.length > 0 ? (
  				<DocumentTableRequest items={this.props.documents}
            slug={this.props.hostEnable ? '' : '/' + this.props.community.get('slug')} />
          ) : (
            "Ви не замовили жодної електронної послуги"
          )}
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRequests);
