import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import form from '../common-components/form.scss';


class List extends Component {
  onClick(event, data) {
    event.preventDefault();
    this.props.onClick(data);
  }

  render() {
    return (
      <div className={form.inlineField}>
        <label>{this.props.label}: </label>
        <ul className={this.props.className} >
          {this.props.items.map((item, index) => (
            <li key={index} onClick={(event) => this.onClick(event, item)}>
              {item.get(this.props.valueKey)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

List.defaultProps = {
  items: new Immutable.List([]),
  valueKey: "value",
};

List.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  items: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default List;
