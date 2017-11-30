import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {fetchDefects} from '../redux/actions/documents';
import Box from 'components/box';
import DefectsListBoxSimple from './list-box-simple';

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
	onLoad: (slug) => dispatch(fetchDefects('', '', 5, 0, slug))
});

class MainDefects extends Component {
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
			return <Box><Spinner/></Box>
		}
		if (this.props.defects == undefined) {
			return <div></div>;
		}

		if (this.props.defects.error) {
			return null;
		}

		if (this.props.defects.results.length === 0) {
			return null;
		}
		return (
			<Box>
				<h4>Останні заявки на усунення дефектів ЖКГ:</h4>
				<DefectsListBoxSimple items={this.props.defects}/>
				<div className={btn.btnWrap}>
					<div className="btn-group hide-mob">
						{this.props.token
							? (
								<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/defects/create`} className="btn btn-default">
									<i className="fa fa-plus-circle" aria-hidden="true"></i>
									Додати заявку
								</Link>
							)
							: (null)}

						<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/defects`} className="btn btn-default">
							Реєстр заявок
						</Link>
					</div>
				</div>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainDefects));
