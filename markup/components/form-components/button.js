import React from 'react';
import PropTypes from 'prop-types';

import form from '../common-components/form.scss';


const Button = (props) => (
  <button type={props.type} className={props.className} value={props.value} onClick={props.onClick}>
    <i className={props.iconClass}></i>
    {props.value}
  </button>
)

Button.defaultProps = {
  type: 'button',
  className: form.btnDefault,
  onClick: undefined
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Button;
