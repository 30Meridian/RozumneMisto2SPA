import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({hostEnable: state.system.get('standaloneHostEnable')});

class Spinner extends Component {
	render() {
		return (
			<div className="spinner">
				<img src="/assets/img/general/spinner.svg"/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Spinner);
