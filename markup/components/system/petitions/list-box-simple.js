import React, {Component} from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../history';
import PetitionItem from './petition-item.js';
import Box from 'components/box';
import Spinner from '../../spinner';

import Pagination from '../pagination';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';


const mapStateToProps = (state) => ({
  community: state.system.get('community'),
  token: state.auth.get('token'),
  hostEnable: state.system.get('standaloneHostEnable'),
});


const PetitionListBoxSimple = (props) => (
  <Box title4={props.header}>
     <table className="ui table">
              <thead>
                <tr>
                  <th>Ілюстрація</th>
                  <th>Номер петиції</th>
                  <th>Суть петиції</th>
                  <th className={styles.statusWrap}>Статус</th>
                </tr>
              </thead>
               {props.isFetching ? (
        <div> <Spinner/> </div>
        ):(
              <tbody>
                {props.items.results.map((item) => (

             <PetitionItem communitySlug={props.hostEnable ? '' : '/' + props.community.get('slug')} item={item} />

          ))}
              </tbody>
              )}
            </table>

    <div className={styles.petition}>

      <div className={btn.btnWrap}>

        <div className="btn-group hide-mob cab-group">
        {props.token ? (
          <Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/petitions/create`} className='btn btn-default'>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            Додати петицію
          </Link>
          ):(null)}
          <Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/petitions/`} className='btn btn-default'>
            Активні
          </Link>
          <Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/petitions/considering`} className='btn btn-default'>
            Розглядаються
          </Link>
          <Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/petitions/considered`} className='btn btn-default'>
            Розглянуті
          </Link>
        </div>
      </div>
    </div>
  </Box>
);

export default connect(mapStateToProps)(PetitionListBoxSimple);
