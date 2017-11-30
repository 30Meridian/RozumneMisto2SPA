import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import history from '../../history';

import styles from './styles.scss';

import statuses from './statuses';

const DefectItem = (props) => {
	const url = `${props.communitySlug}/defects/document/${props.item.id}`;
	return (
		<tr onClick={(event) => {
                event.preventDefault();
                history.push(url)
              }}>
				<td>
					{props.item.title_image
						? (
							<div className={styles.simpleImg}>
								<Link to={url}>
									<img src={props.item.title_image} alt=""/>
								</Link>
							</div>
						)
						: (
							<div className={styles.simpleImg}>
								<Link to={url}>
									<img src="/assets/img/general/empty.gif" alt=""/>
								</Link>
							</div>
						)}
				</td>
				<td>
				<div className={styles.defectNumber}>
					<Link to={url}>
						<span className="hide-mb">Номер заявки: </span>{props.item.id}
					</Link>
				</div>
				</td>
				<td className={styles.linkTD}>
						<Link className="default-link" to={url}>
							<span className="hide-mb">Суть звернення: </span>{props.item.title}
						</Link>
						{props.item.value_list[1].value.address ? (
							<p className={styles.defectMarker}>
								<i className="fa fa-map-marker" aria-hidden="true"></i> {props.item.value_list[1].value.address}
							</p>
						):null}
				</td>
			<td>
				<div className={styles.statusWrap}>
					<Link to={url}>
						<span className="hide-mb">Статус: </span>{statuses[props.item.state_field_name]}
					</Link>
				</div>
			</td>
			</tr>
	);
}

export default DefectItem;
