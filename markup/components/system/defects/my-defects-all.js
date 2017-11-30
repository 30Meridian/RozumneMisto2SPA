import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyDefects } from '../redux/actions/documents';

import Title from 'components/dynamic-title';
import Spinner from '../../spinner';
import DefectsListBoxMy from './list-box-my';
import Box from 'components/box';
import styles from './styles.scss';


const mapStateToProps = (state) => ({
	defects: state.system.get('defects'),
	isFetching: state.system.get('defectsIsLoading'),
	community: state.system.get('community')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset) => dispatch(fetchMyDefects(25, offset)),
})

class MyDefectsAll extends Component {
	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.url !== this.props.match.url) {
			this.props.onLoad(offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.onLoad(offset);
	}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner /></Box>;
		}

		if (this.props.community.get('payment_model') === 1) {
			return <Box>
				<Title title={`Мої заявки ЖКГ. Інформаційна система "Розумне місто" `} />
				<h2 className="module-header">Модуль не підключений</h2>
			</Box>;
		}

		if (this.props.defects == undefined) {
			return <div></div>;
		}

		if (this.props.defects.results.length === 0) {
      return (
      <Box>
				<Title title={`Мої заявки ЖКГ. Інформаційна система "Розумне місто" `} />
        <h4 className="box-title">Ви не створили жодної заявки</h4>
      </Box>
      )
    }

		return (
			<Box title4="Мої заявки на усунення дефектів ЖКГ:">
				<Title title={`Мої заявки ЖКГ. Інформаційна система "Розумне місто" `} />
				<DefectsListBoxMy items={this.props.defects} url={this.props.match.params.page} />
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDefectsAll);
