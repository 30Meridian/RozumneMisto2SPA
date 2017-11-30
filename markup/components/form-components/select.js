import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import styled from 'styled-components';

import form from '../common-components/form.scss';

const Wrapper = styled.div`
	margin: 10px 0;
`;

const SelectItem = styled.select`
	display: block;
	width: 100%;
	height: auto;
	padding: 0.62em 1em;
	transition: color 0.1s ease, border-color 0.1s ease;
	color: rgba(0, 0, 0, 0.87);
	border: 1px solid rgba(34, 36, 38, 0.15);
	border-radius: 0.28571429rem;
	outline: 0;
	background: #FFFFFF;
	box-shadow: 0em 0em 0em 0em transparent inset;
`;

class Select extends Component {
	componentWillMount() {
		if (!this.props.value && !this.props.blankOption) {
			if (this.props.items.size > 0) {
				this.props.onChange(this.props.items.get(0).get('id'));
			}
		}
	}

	componentDidUpdate() {
		if (!this.props.value && !this.props.blankOption) {
			if (this.props.items.size > 0) {
				this.props.onChange(this.props.items.get(0).get('id'));
			}
		}
	}

	render() {
		return (
			<Wrapper>
				<label>{this.props.label} </label>
				<SelectItem value={this.props.value} onChange={(event) => {
					event.preventDefault();
					this.props.onChange(event.target.value)
				}}>
					{this.props.blankOption && (
						<option key="-1" value="">--------</option>
					)}
					{this.props.items.map((item, index) => (
						<option key={index} value={item.get('id')}>
							{item.get(this.props.valueKey)}
						</option>
					))}
				</SelectItem>
			</Wrapper>
		);
	}
}

Select.defaultProps = {
	items: new List([]),
	valueKey: 'value',
	blankOption: false,
};

Select.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.instanceOf(List).isRequired
};

export default Select;
