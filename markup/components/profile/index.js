import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
 

import Box from 'components/box';
import Spinner from '../spinner';
import Tab from '../../assets/js/libraries/tab';
import Sidebar from '../system/sidebar';
import Title from 'components/dynamic-title';
import {Row, Col} from 'react-bootstrap';

import { loadUserProfileData } from '../system/redux/actions';
import history from '../history';
import styles from './styles.scss';

const mapStateToProps = state => ({
  user: state.system.get('profileData'),
  token: state.auth.get('token'),
  isFetching: state.auth.get('userIsLoading')
});

const mapDispatchToProps = dispatch => ({
  loadUser: (user_id) => dispatch(loadUserProfileData(user_id))
});


class Profile extends Component {
  componentWillMount() {
    if (!this.props.token) {
			history.push('/sign-in');
		}
    this.props.loadUser(this.props.match.params.user_id);
  }

	componentDidMount() {
		$('.tabular.menu .item').tab();
	}

	render() {
    const item = this.props.user;

    if (this.props.isFetching) {
      return <div><Spinner /></div>
    }

    if (!item)
      return (<div>Loading...</div>);

		return (
      <div className={styles.row}>
        <Title title={`Профіль користувача "${item.get('last_name')} ${item.get('first_name')}". Інформаційна система "Розумне місто" `} />
				<Sidebar />
				<div className={styles.content}>
					<div className={styles.contentWrap}>
						<div className={styles.contentBox}>
		          <Row>
	              <Col md={12} className={styles.profile}>
                  <h2 className="text-center"> <i className="fa fa-user-circle-o"></i></h2>
    							<h2 className="text-center">Профіль користувача</h2>

    							<ul className={styles.list}>
                    <li><strong>ID: </strong>{item.get('id')}</li>
      								{item.get('first_name') ? <li><strong>Прізвище: </strong>{item.get('last_name')}</li> : null}
      								{item.get('last_name') ? <li><strong>Ім'я: </strong>{item.get('first_name')}</li> : null}
      								{item.get('middle_name') ? <li><strong>По батькові: </strong>{item.get('middle_name')}</li> : null}
                      {item.get('community_list').length > 0 ?
                      <li><strong>Громади: </strong>
                        {item.get('community_list').map((value) =>(
                            <span className={styles.listCommunity}>{value.name}<span className="coma-span">, </span></span>
                        ))}
                    </li> : null}
    							</ul>
    						</Col>
              </Row>
             </div>
           </div>
         </div>
       </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
