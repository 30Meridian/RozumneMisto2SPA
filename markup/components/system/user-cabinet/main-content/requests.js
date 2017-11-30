import React, {Component} from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../spinner';
import Pagination from '../../pagination';

import Title from 'components/dynamic-title';
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
	onLoad: (offset) => dispatch(fetchCabinetDocuments(10, offset)),
});

class Requests extends Component {
  componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 10 * (page - 1);
		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.onLoad(offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 10 * (page - 1);
		this.props.onLoad(offset);
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
        <Title title={`Мої електронні послуги. Інформаційна система "Розумне місто" `} />
        {this.props.documents.results.length > 0 ? (
				<DocumentTableRequest items={this.props.documents}
          slug={this.props.hostEnable ? "" : "/" + this.props.community.get('slug')} />
        ) : (
          "Ви не замовили жодної електронної послуги"
        )}
        <Pagination counts={this.props.documents.count} path={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/cabinet/my-services/`} matched={this.props.match.params.page} limits={10} />
 			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
