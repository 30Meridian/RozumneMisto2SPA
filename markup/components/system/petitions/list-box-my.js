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
  isFetching: state.system.get('petitionsIsLoading'),
  hostEnable: state.system.get('standaloneHostEnable'),
});


const PetitionListBoxMy = (props) => (
  <Box>
    <h4>{props.header}:</h4>
     <table className="ui table">
              <thead>
                <tr>
                  <th>Ілюстрація</th>
                  <th>Номер заявки</th>
                  <th>Суть заявки</th>
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

      <Pagination counts={props.items.count} path={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/cabinet/my-petitions/`} matched={props.url} limits={25}/>


    </div>
  </Box>
);

export default connect(mapStateToProps)(PetitionListBoxMy);
