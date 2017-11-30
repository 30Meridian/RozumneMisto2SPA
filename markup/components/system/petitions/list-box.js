import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import history from '../../history';
import config from '../../config';
import PetitionItem from './petition-item.js';
import Box from 'components/box';
import Spinner from '../../spinner';
import {DefaultHref} from 'components/common-components/buttons';

import Pagination from '../pagination';

import styles from './styles.scss';
import btn from '../../common-components/buttons.scss';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({community: state.system.get('community'), token: state.auth.get('token'), isFetching: state.system.get('petitionsIsLoading'), hostEnable: state.system.get('standaloneHostEnable')});

const PetitionListBox = (props) => (
	<Box>
		<div className="box-head">
			<Row>
				<Col md={8}>
					<h4>{props.header}:</h4>
				</Col>
				<Col md={4}>
					<div className="export-btn">
						<DefaultHref href={`${config.apiHost}/documents/?workflow_type=${props.workflow_type}&state=${props.state}&visible=True`} target="_blank" size="12px">
							Експорт JSON
						</DefaultHref>
					</div>
				</Col>
			</Row>
		</div>

		<div className="main-content">
			<table className="ui table">
				<thead>
					<tr>
						<th>Ілюстрація</th>
						<th>Номер петиції</th>
						<th>Суть петиції</th>
						<th className={styles.statusWrap}>Статус</th>
					</tr>
				</thead>
				{props.isFetching
					? (
						<div>
							<Spinner/>
						</div>
					)
					: (
						<tbody>
							{props.items.results.map((item) => (<PetitionItem communitySlug={props.hostEnable
								? ''
								: '/' + props.community.get('slug')} item={item}/>))}
						</tbody>
					)}
			</table>
		</div>

		<div className={styles.petition}>

			<Pagination counts={props.items.count} path={`${props.hostEnable
				? ''
				: '/' + props.community.get('slug')}/petitions/`} matched={props.url} limits={props.limit}/>

			<div className={btn.btnWrap}>

				<div className="btn-group hide-mob">
					{props.token
						? (
							<Link to={`${props.hostEnable
								? ''
								: '/' + props.community.get('slug')}/petitions/create`} className='btn btn-default'>
								<i className="fa fa-plus-circle" aria-hidden="true"></i>
								Додати петицію
							</Link>
						)
						: (null)}
					<Link to={`${props.hostEnable
						? ''
						: '/' + props.community.get('slug')}/petitions/`} className='btn btn-default'>
						Активні
					</Link>
					<Link to={`${props.hostEnable
						? ''
						: '/' + props.community.get('slug')}/petitions/considering`} className='btn btn-default'>
						Розглядаються
					</Link>
					<Link to={`${props.hostEnable
						? ''
						: '/' + props.community.get('slug')}/petitions/considered`} className='btn btn-default'>
						Розглянуті
					</Link>
				</div>
			</div>
		</div>
	</Box>
);

export default connect(mapStateToProps)(PetitionListBox);
