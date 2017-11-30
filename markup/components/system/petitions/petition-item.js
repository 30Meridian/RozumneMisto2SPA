import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../spinner';

import history from '../../history';


import styles from './styles.scss';


class PetitionItem extends Component {
	render() {

		const countsWidth = (this.props.item.votes_number / this.props.item.max_votes) * 100;
		const votesLength = {
			width: `${countsWidth}%`
		}
		if (!this.props.item) {
			return <div><Spinner /></div>
		};
		return (

			<tr onClick={(event) => {
                event.preventDefault();
                history.push(`${this.props.communitySlug}/petitions/document/${this.props.item.id}`)
              }}>
					<td className={styles.img}>
						<Link to={`${this.props.communitySlug}/petitions/document/${this.props.item.id}`}>
							{this.props.item.title_image ? (
								<img src={this.props.item.title_image} alt=""/>
							):(
							<img src="/assets/img/general/empty.gif" alt=""/>
							)}
						</Link>
					</td>
					<td className={styles.number}>
						<Link to={`${this.props.communitySlug}/petitions/document/${this.props.item.id}`}>
							<span className="hide-mb">Номер петиції: </span>{this.props.item.id}
						</Link>
					</td>
					<td>
						<Link className="default-link" to={`${this.props.communitySlug}/petitions/document/${this.props.item.id}`}>
							<span className="hide-mb">Суть звернення: </span>{this.props.item.title}
						</Link>
					</td>
					<td className={styles.voteTD}>
					<div className={styles.progress}>
						<div className={styles.progressBar} style={votesLength}></div>
					</div>
					<Link to={`${this.props.communitySlug}/petitions/document/${this.props.item.id}`}>
							{this.props.item.votes_number}
						</Link>
					</td>
			</tr>
		)
	}
}
export default PetitionItem;
