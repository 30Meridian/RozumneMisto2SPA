import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import form from '../common-components/form.scss';

const Wrapper = styled.div`
  margin: 15px 0 10px 0;
`;

const InputElement = styled.input`
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  width: 100%;
  vertical-align: top;
  margin: 0;
  outline: none;
  tap-highlight-color: rgba(255, 255, 255, 0);
  line-height: 1.21428571em;
  padding: .67857143em 1em;
  background: #fff;
  border: 1px solid #E3E3E3;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 25px;
  box-shadow: 0 0 0 0 transparent inset;
  height: 38px;

  &:focus {
    border: 1px solid #00a65a;
    box-shadow: none;
    outline: 0 !important;
    color: #2c2c2c;
    transition: all 0.30s ease-in-out;
  }
`;

const LabelElement = styled.label`
  font-size: 1rem;
`;

const Input = (props) => {
  const rest = Object.assign({}, props);
  delete rest.pk;
  delete rest.description;
  delete rest.subtype;
  return (
    <Wrapper>
      <LabelElement>{props.label} </LabelElement>
      <InputElement {...rest} />
    </Wrapper>
  )
};

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Input;
