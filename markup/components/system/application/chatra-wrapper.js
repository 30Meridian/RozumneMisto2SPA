import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
	user: state.auth.get('user'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

class ChatraWrapper extends Component {
	renderChatra(props) {
		if (props.user) {
			window.ChatraSetup = {
				clientId: props.user.get('chat_hash')
			};

			window.ChatraIntegration = {
					name: props.user.get('first_name') + ' ' + props.user.get('last_name'),
					email: props.user.get('email'),
					phone: props.user.get('phone'),
					'Місто': JSON.stringify(props.user.get('community_list').map(item => item['name']))
			};
		}

		(function (d, w, c) {
				var n = d.getElementsByTagName('script')[0],
						s = d.createElement('script');
				w[c] = w[c] || function () {
								(w[c].q = w[c].q || []).push(arguments);
						};

				s.async = true;
				s.src = (d.location.protocol === 'https:' ? 'https:' : 'http:')
						+ '//call.chatra.io/chatra.js';
				n.parentNode.insertBefore(s, n);
		})(document, window, 'Chatra');
	}

	componentWillMount() {
		if (!this.props.hostEnable) {
			this.renderChatra(this.props);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.hostEnable) {
			if (this.props.user && nextProps.user) {
				if (!this.props.user.get('email') === nextProps.user.get('email')) {
					this.renderChatra(nextProps);
				}
			} else if (this.props.user || nextProps.user) {
				this.renderChatra(nextProps);
			}
		}
	}

  render() {
    return this.props.children;
  }
}


export default withRouter(connect(mapStateToProps)(ChatraWrapper));
