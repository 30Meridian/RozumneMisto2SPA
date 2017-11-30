import React, {Component} from 'react';
 
import { connect } from 'react-redux';

import Title from 'components/dynamic-title';
import MyDefects from '../../defects/my-defects';
import MyPetitionsMain from '../../petitions/my-petitions-main';
import MainRequests from './main-requests';
import Documents from './documents';
import CustomServices from '../services/custom-services';

import { fetchPetitions } from '../../redux/actions/documents';

import Tab from '../../../../assets/js/libraries/tab';
import Box from 'components/box';


const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	hostEnable: state.system.get('standaloneHostEnable')
});

const mapDispatchToProps = dispatch => ({});

class MainContent extends Component {
	render() {
		return (
			<div>
				<Title title={`Кабінет користувача. Інформаційна система "Розумне місто" `} />
				<Documents />
				{this.props.hostEnable ? <CustomServices /> : null}
				<MainRequests />
				<MyPetitionsMain />
				<MyDefects />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
