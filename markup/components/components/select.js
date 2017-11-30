import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';


class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKey: "",
			selectedValue: "",
		};
	}

	componentWillMount() {
	}

	render() {
		return (
			<div>
				<select value={this.props.value} onChange={(event) => {
					event.preventDefault();
					this.props.onChange(event);
				}}>
					{this.props.blankOption && (
						<option key="-1" value="">------------</option>
					)}
					{this.props.items.map((item, index) => (
						<option key={index} value={item.get(this.props.itemKey)}>
							{item.get(this.props.itemValue)}
						</option>
					))}
				</select>
			</div>
		);
	}
}

Select.defaultProps = {
	itemKey: 'id',
	itemValue: 'value',
	blankOption: false,
};

Select.propTypes = {
	items: PropTypes.instanceOf(List).isRequired,
	itemKey: PropTypes.string.isRequired,
	itemValue: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	blankOption: PropTypes.bool,
};

export default Select;
