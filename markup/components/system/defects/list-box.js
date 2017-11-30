import React, {Component} from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import history from '../../history';
import DefectItem from './defect-item.js';

import Spinner from '../../spinner';
import Pagination from '../pagination';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';


  const mapStateToProps = (state) => ({
  community: state.system.get('community'),
  hostEnable: state.system.get('standaloneHostEnable'),
});

const DefectsListBox = (props) => (
			<div>
			<table className="ui table">
							<thead>
								<tr>
									<th>Ілюстрація</th>
									<th>Номер заявки</th>
									<th>Суть заявки</th>
									<th className={styles.statusWrap}>Статус</th>
								</tr>
							</thead>
							<tbody>
								{props.items.results.map((item) => (

              <DefectItem item={item} communitySlug={props.hostEnable ? '' : '/' + props.community.get('slug')} />
        
          ))}
							</tbody>
						</table>

        <Pagination counts={props.items.count} path={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/defects/`} matched={props.url} limits={props.limit} />
      </div>
		)

export default connect(mapStateToProps)(DefectsListBox);
