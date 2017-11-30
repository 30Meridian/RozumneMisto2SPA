import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPetitions } from '../redux/actions/documents';
import Spinner from '../../spinner';
import Box from 'components/box';
import PetitionListBoxSimple from './list-box-simple';


const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	petitions: state.system.get('petitions'),
	isFetching: state.system.get('petitionsIsLoading')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => dispatch(fetchPetitions('zbir-golosiv', 5, 0, slug)),
});

class MainPetitions extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.match.params.community_slug);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.url !== nextProps.match.url) {
			this.props.onLoad(nextProps.match.params.community_slug);
		}
	}

	render() {
		if (this.props.isFetching) {
			return <Box><Spinner /></Box>;
		}
		if (this.props.petitions == undefined){
			return <div></div>;}

		if (this.props.petitions.error) {
			return null;
		}
		if (this.props.petitions.results.length === 0) {
      return null;
    }
		return (
			<PetitionListBoxSimple header="Останні петиції, що збирають голоси" items={this.props.petitions} />
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPetitions));
