import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
 

import {ButtonGreen} from 'components/common-components/buttons';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';
import Spinner from '../../../spinner';
import Tab from '../../../../assets/js/libraries/tab';

import { loadUserProfileData } from '../../redux/actions';
import styles from './styles.scss';

const mapStateToProps = state => ({
  user: state.system.get('profileData'),
  isFetching: state.auth.get('userIsLoading')
});

const mapDispatchToProps = dispatch => ({
  loadUser: (user_id) => dispatch(loadUserProfileData(user_id))
});


class UserProfile extends Component {
  componentWillMount() {
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
			<Box>
				<Row>
					<Col md={12}>
						<div className="ui tabular menu bt">
							<div className="item active" data-tab="tab-name">Мої дані	профілю</div>
							<div className="item" data-tab="tab-name2">Підписка на дайджест</div>
						</div>
						<div className="ui tab active" data-tab="tab-name">
							<ul className={styles.list}>
								{item.get('first_name') ? <li><strong>Прізвище: </strong>{item.get('last_name')}</li> : null}
								{item.get('last_name') ? <li><strong>Ім'я: </strong>{item.get('first_name')}</li> : null}
								{item.get('middle_name') ? <li><strong>По батькові: </strong>{item.get('middle_name')}</li> : null}
								{item.get('email') ? <li><strong>Електронна пошта: </strong>{item.get('email')}</li> : null}
								{item.get('phone') ? <li><strong>Телефон: </strong>{item.get('phone')}</li> : null}
								{item.get('phone') ?
								<li><strong>Громади: </strong>
                  {item.get('community_list').map((value) =>(
                      <span className={styles.listCommunity}>{value.name}<span className="coma-span">, </span></span>
                  ))}
                </li>
							  : null}
							</ul>
              <ButtonGreen value="Вимкнути розсилку" />
						</div>
						<div className="ui tab" data-tab="tab-name2">
              Дайджест
						</div>
					</Col>
      </Row>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
