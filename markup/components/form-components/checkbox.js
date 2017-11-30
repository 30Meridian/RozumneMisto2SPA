import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import form from '../common-components/form.scss';

const Wrapper = styled.div`
  margin: 15px 0;
`;

const CheckboxInput = styled.input`
  opacity: 0;
  position: absolute;
  left: 100px;
  top: 10px;
  display: none;
  outline: 0;
`;

const Label = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding-left: 0;
  line-height: 26px;
  margin-bottom: 0;

  &:before, &:after {
    content: " ";
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 20px;
    right: -27px;
    cursor: pointer;
    border-radius: 3px;
    top: 3px;
    background-color: transparent;
    border: 1px solid #E3E3E3;
    -webkit-transition: opacity 0.3s linear;
    transition: opacity 0.3s linear
  }

  &:after {
    font-family: "FontAwesome";
    content: "\f00c";
    top: 1px;
    text-align: center;
    font-size: 13px;
    opacity: ${props => props.checked ? "1" : "0"};
    color: #555555;
    border: 0;
    background-color: inherit;
  }
`;

const Checkbox = (props) => (
  <Wrapper>
   <CheckboxInput type={props.type} required={props.required} className={props.inputClassName} multiple={props.multiple}
    accept={props.accept} id={props.label} checked={props.checked} value={props.value} disabled={props.disabled}
    onChange={props.onChange} onFocus={props.onFocus} placeholder={props.placeholder} />
    <Label checked={props.checked} htmlFor={props.label}>{props.label}: </Label>
  </Wrapper>
);

Checkbox.defaultProps = {
  type: 'text'
};

Checkbox.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
};

export default Checkbox;
