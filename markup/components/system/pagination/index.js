import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import styles from './styles.scss';

class Pagination extends Component {

	render(props) {
		const matched = this.props.matched
			? parseInt(this.props.matched)
			: 1;
		const limit = this.props.limits;
		const screenWidth = window.innerWidth;
		const totalPages = Math.ceil(this.props.counts / limit);
		let visiblePages = screenWidth > 375
			? 10
			: 3;

		if (screenWidth > 375 && screenWidth < 1200) {
			visiblePages = 5;
		}

		if (visiblePages > totalPages) {
			visiblePages = totalPages;
		}

		const half = Math.floor(visiblePages / 2);
		let firstVisiblePage = 1;
		let result = null;
		let first = null;
		let firstDots = null;
		let lastDots = null;
		let last = null;

		if (visiblePages !== totalPages) {
			lastDots = (
				<li>
					<Link to={`${this.props.path}${totalPages}`}>...</Link>
				</li>
			);
			last = (
				<li>
					<Link to={`${this.props.path}${totalPages}`}>{totalPages}</Link>
				</li>
			);
		}

		if (matched - half > 1) {
			firstVisiblePage = matched - half;
			if (visiblePages !== totalPages) {
				first = (
					<li>
						<Link to={`${this.props.path}1`}>1</Link>
					</li>
				);
				firstDots = (
					<li>
						<Link to={`${this.props.path}1`}>...</Link>
					</li>
				);
			}
		}
		if (matched - half < 0) {
			firstVisiblePage = 1;
		}
		if (matched + half > totalPages - 1) {
			firstVisiblePage = totalPages - visiblePages + 1;
			last = null;
			lastDots = null;
		}

		let prev = (matched == undefined || matched == 1
			? (
				<li>
					<Link className="disabled" to={`${this.props.path}${matched - 1}`}>
						<i className="fa fa-angle-double-left"></i>
					</Link>
				</li>
			)
			: (
				<li>
					<Link to={`${this.props.path}${matched - 1}`}>
						<i className="fa fa-angle-double-left"></i>
					</Link>
				</li>
			));

		let next = (matched == totalPages
			? (
				<li>
					<Link className="disabled" to={`${this.props.path}${ (matched == undefined
						? 1
						: matched) + 1}`}>
						<i className="fa fa-angle-double-right"></i>
					</Link>
				</li>
			)
			: (
				<li>
					<Link to={`${this.props.path}${parseInt(matched == undefined
						? 1
						: matched) + 1}`}>
						<i className="fa fa-angle-double-right"></i>
					</Link>
				</li>
			));

		if (screenWidth < 1024) {
			prev = (matched == undefined || matched == 1
				? (
					<li>
						<Link className="disabled" to={`${this.props.path}${matched - 1}`}>
							<i className="fa fa-toggle-left"></i>
						</Link>
					</li>
				)
				: (
					<li>
						<Link to={`${this.props.path}${matched - 1}`}>
							<i className="fa fa-toggle-left"></i>
						</Link>
					</li>
				));

			next = (matched == totalPages
				? (
					<li>
						<Link className="disabled" to={`${this.props.path}${ (matched == undefined
							? 1
							: matched) + 1}`}>
							<i className="fa fa-toggle-right"></i>
						</Link>
					</li>
				)
				: (
					<li>
						<Link to={`${this.props.path}${parseInt(matched == undefined
							? 1
							: matched) + 1}`}>
							<i className="fa fa-toggle-right"></i>
						</Link>
					</li>
				));
		}

		if (totalPages > 1) {
			result = (
				<ul className="pagination">
					{prev}
					{first}
					{firstDots}
					{Array(totalPages > visiblePages
						? visiblePages
						: totalPages).fill(1).map((el, i) => <li key={i}>
							{matched == parseInt(i + firstVisiblePage)
								? (
									<Link className="active" to={`${this.props.path}${i + firstVisiblePage}`}>{i + firstVisiblePage}</Link>
								)
								: (
									<Link to={`${this.props.path}${i + firstVisiblePage}`}>{i + firstVisiblePage}</Link>
								)}
						</li>)
}
					{lastDots}
					{last}
					{next}
				</ul>
			);
		}

		return result;
	}
}

export default Pagination;
