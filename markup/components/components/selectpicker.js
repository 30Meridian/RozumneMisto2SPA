import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import {ButtonDefault} from 'components/common-components/buttons';
import Box from 'components/box';

import form from 'components/common-components/form.scss';


class SelectPicker extends Component {
	changeOpenState(event) {
		this.setState({open: !this.state.open});
	}

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			search: "",
			selectedKey: "",
			selectedValue: "",
		};

		this.changeOpenState = this.changeOpenState.bind(this);
	}

	componentWillMount() {
		if (this.props.title) {
			this.setState({selectedValue: this.props.title});
		}
	}

	render() {
		return (
			<div>
				<ButtonDefault block size="18px" type={"button"} title={this.props.value}
					onClick={this.changeOpenState} value={this.state.selectedValue || this.props.title || "Виберіть об'єкт зі списку"} />
				{this.state.open ? <div>
					<div className="ui form select-picker">
						<input value={this.state.search} placeholder={"Введіть дані для пошуку"}
							onChange={event => {
								this.setState({search: event.target.value});
								this.props.onSearchChange(event);
							}}/>
					</div>
					<ul className={"list-group"}>
						{this.props.items ? this.props.items.map((item, index) => (
							<li key={item.get(this.props.itemKey)} className={"list-group-item"}
								name={this.props.value == item.get(this.props.itemKey)}
								onClick={(event) => {
									this.setState({
										selectedValue: item.get(this.props.itemValue),
										selectedKey: item.get(this.props.itemKey),
										open: false,
									});
									this.props.onChange(event, item);
								}}>
								<span>
									{item.get(this.props.itemValue)}
								</span>
							</li>
						)) : null}
					</ul>
			</div> : null}
		</div>);
	}
}

SelectPicker.defaultProps = {
	itemKey: 'id',
	itemValue: 'value'
};

SelectPicker.propTypes = {
	items: PropTypes.instanceOf(List),
	itemKey: PropTypes.string.isRequired,
	itemValue: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSearchChange: PropTypes.func.isRequired,
	selectedValue: PropTypes.string,
	selectedKey: PropTypes.string,
};

export default SelectPicker;
