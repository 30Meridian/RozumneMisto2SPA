import React, {Component} from 'react';

import history from '../../history';

import {Link} from 'react-router-dom';

import styles from './styles.scss';

class NewsItem extends Component {
	render(props) {
		const item = this.props.item;
		const url = `/${this.props.communitySlug}/news/document/${item.id}`;

		return (
			<tr onClick={(event) => {
                event.preventDefault();
                history.push(url)
              }}>
				<td className={styles.singleImg}>
					<Link to={url}>
						{item.title_image
							? (<img src={item.title_image} alt="news img"/>)
							: (<img src="/assets/img/general/empty.gif" alt="placeholder image"/>)}
					</Link>
				</td>

					<td className={styles.newsText}>
					<p>
							<Link className="default-link" to={url}>
								<strong>{item.title}</strong>
							</Link>
						</p>
						{item.text}
						{item.value_list && item.value_list[0] ? item.value_list[0].value : null}
					</td>
						<td className={styles.newsHead}>

						<span className={styles.newsTime}>
							<i className="fa fa-clock-o"></i>
							{new Date(item.date_updated).toLocaleString('uk-UA')}
						</span>
					</td>
			</tr>
		)
	}
}

export default NewsItem;
