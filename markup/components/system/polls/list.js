import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap'

import history from '../../history';
import config from '../../config';
import {DefaultHref} from 'components/common-components/buttons';
import Box from 'components/box';

import PollItem from './poll-item';

import Spinner from '../../spinner';

import styles from './styles.scss';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({community: state.system.get('community'), hostEnable: state.system.get('standaloneHostEnable')});

const PollsListBox = (props) => (
	<div>
		<Row>
			<Col md={8}>
				<h4>{props.header}</h4>
			</Col>
			<Col md={4}>
				<div className="export-btn">
					<DefaultHref size="12px" href={`${config.apiHost}/documents/?workflow_type=${props.workflow_type}&state=&visible=True`} target="_blank">
						Експорт JSON
					</DefaultHref>
				</div>
			</Col>
		</Row>

		<table className="ui table">
			<thead>
				<tr>
					<th>Номер</th>
					<th>Назва опитування</th>
					<th>Старт опитування</th>
					<th>Кінець опитування</th>
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
						{props.items.map((item) => (<PollItem item={item} communitySlug={props.hostEnable
							? ''
							: '/' + props.community.get('slug')}/>))}
					</tbody>
				)}
		</table>
	</div>
);

export default connect(mapStateToProps)(PollsListBox);
