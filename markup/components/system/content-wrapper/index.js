import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { fetchCommunityBySlug } from '../redux/actions';
import { loadUser } from '../../common/redux/actions/auth';

import Content from '../content';
import WrapperCabinet from '../user-cabinet/cabinet-content';
import Page404 from '../pages/not-found';
import Page403 from '../pages/not-found/403';


const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	user: state.auth.get('user'),
	community: state.system.get('community'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => dispatch(fetchCommunityBySlug(slug)),
});

class ContentWrapper extends Component {
  componentWillMount() {
		if (!this.props.hostEnable) {
			this.props.onLoad(this.props.match.params.community_slug);
		} else {
			this.props.onLoad(this.props.community.get('slug'));
		}
  }

	componentWillReceiveProps(nextProps) {
		if(!this.props.hostEnable && this.props.match.params.community_slug !== nextProps.match.params.community_slug){
			this.props.onLoad(nextProps.match.params.community_slug);
		}
	}

  render() {
		const path = this.props.match.path;

    if (!this.props.community)
      return null;

		if (this.props.community.size === 0)
			return (
				<Page404>
					<div className="text-center">
						<h2>Місто не знайдено</h2>
					</div>
				</Page404>
			);

    return (
      <Switch>
        <Route path={`${path}/cabinet`} component={WrapperCabinet} />
        <Route strict path={`${path}`} component={Content} />
      </Switch>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);
