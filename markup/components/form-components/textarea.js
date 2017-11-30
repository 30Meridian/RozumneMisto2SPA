import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import form from '../common-components/form.scss';

// const InputElement = styled.input`
//   font-size: 1rem;
//   width: 100%;
//   vertical-align: top;
//   margin: 0;
//   outline: none;
//   -webkit-appearance: none;
//   tap-highlight-color: rgba(255, 255, 255, 0);
//   line-height: 1.21428571em;
//   padding: .67857143em 1em;
//   background: #fff;
//   border: 1px solid #E3E3E3;
//   color: rgba(0, 0, 0, 0.87);
//   border-radius: 25px;
//   box-shadow: 0 0 0 0 transparent inset;
//
//   &:focus {
//     border: 1px solid #00a65a;
//     box-shadow: none;
//     outline: 0 !important;
//     color: #2c2c2c;
//     transition: all 0.30s ease-in-out;
//   }
// `;
//
// const LabelElement = styled.label`
//   font-size: 1rem;
// `;

const Input = (props) => (
  <div className={props.className}>
    <label>{props.label} </label>
    <input type={props.type} required={props.required} className={props.inputClassName} multiple={props.multiple}
      accept={props.accept} checked={props.checked} value={props.value} disabled={props.disabled} min={props.min}
      onChange={props.onChange} onFocus={props.onFocus} placeholder={props.placeholder} />
  </div>
);

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
};

export default Input;
