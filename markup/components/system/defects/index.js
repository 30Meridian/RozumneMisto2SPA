import React, { Component } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchDefects } from '../redux/actions/documents';
import Box from 'components/box';
import DefectsListBox from './list-box';

import Spinner from '../../spinner';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';


const mapStateToProps = state => ({
	community: state.system.get('community'),
	defects: state.system.get('defects'),
	token: state.auth.get('token'),
	isFetching: state.system.get('defectsIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: (offset) => dispatch(fetchDefects('', '', 10, offset)),
});

class Defects extends Component {
	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 10 * (page - 1);
		if (nextProps.match.url !== this.props.match.url) {
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
		if (this.props.defects == undefined) {
			return <div></div>;
		}
		return (
			<div>
				<h4>Останні заявки на усунення дефектів ЖКГ:</h4>
				<DefectsListBox items={this.props.defects} url={this.props.match.params.page} limit={10}/>
				<div className={btn.btnWrap}>
					<div className="btn-group hide-mob">
					{this.props.token ? (
						<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/defects/create`} className="btn btn-default">
							<i className="fa fa-plus-circle" aria-hidden="true"></i>
							Додати заявку
						</Link>) : (null)}

						<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/defects`} className="btn btn-default">
							Реєстр заявок
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Defects);
