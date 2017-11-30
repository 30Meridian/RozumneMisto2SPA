import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyDefects } from '../redux/actions/documents';

import Spinner from '../../spinner';
import DefectsListBoxSimple from './list-box-simple';
import Box from 'components/box';
import styles from './styles.scss';


const mapStateToProps = (state) => ({
	defects: state.system.get('defects'),
	isFetching: state.system.get('defectsIsLoading'),
	community: state.system.get('community')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch(fetchMyDefects(5, 0)),
})

class MyDefects extends Component {
	componentWillMount() {
		this.props.onLoad();
	}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner /></Box>;
		}

		if (this.props.community.get('payment_model') === 1) {
			return null;
		}

		if (this.props.defects == undefined) {
			return <div></div>;
		}

		if (!this.props.defects.results || this.props.defects.results.length === 0) {
      return (
      <Box>

        <h4 className="box-title">Ви не створили жодної заявки</h4>
      </Box>
      )
    }

		return (
			<Box title4="Мої заявки на усунення дефектів ЖКГ:">

				<DefectsListBoxSimple items={this.props.defects} />
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDefects);
