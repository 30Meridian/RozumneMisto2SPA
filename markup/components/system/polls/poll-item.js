import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import history from '../../history';

import styles from './styles.scss';

class PollItem extends Component {
	render() {

    const item = this.props.item;
		const url = `${this.props.communitySlug}/polls/document/${item.id}`;

		const statuses = {
			'Збір голосів': (<span className={styles.status + " " + styles.open}>Збір голосів</span>),
			'Архівне': (<span className={styles.status + " " + styles.done}>Архівне</span>),
			'Заплановано': (<span className={styles.status + " " + styles.will}>Заплановано</span>),
			'Відхилено': (<span className={styles.status + " " + styles.declined}>Відхилено</span>),
		};

		return (
			<tr onClick={(event) => {
				event.preventDefault();
				history.push(url);
			}}>
						<td className={styles.pollNumber}>
							<div>
								<Link to={url}>
									<span className="hide-mb">Номер опитування: </span>{item.id}
								</Link>
							</div>
						</td>
						<td>
							<div>
								<Link to={url} className="default-link">
									<span className="hide-mb">Суть опитування: </span>{item.title}
								</Link>
							</div>
						</td>
						<td>
							<div>
								<span className="hide-mb">Початок опитування: </span>{new Date(item.date_created).toLocaleDateString('uk-UA')}
							</div>
						</td>
						<td>
							<div>
								<span className="hide-mb">Кінець опитування: </span>15-03-2017
							</div>
						</td>
						<td>
							<div>
								<Link to={url}>
									<span className="hide-mb">Статус: </span>{statuses[item.state_field_name]}
								</Link>
							</div>
						</td>
			</tr>
		)
	}
}

export default PollItem;
