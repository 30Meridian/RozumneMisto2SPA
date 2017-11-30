import React, { Component } from 'react';
import styled from 'styled-components';

const BoxWrap = styled.div`
  position: relative;
  border-radius: 3px;
  background: #fff;
  border-top: 1px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(63, 63, 68, 0.1);

  h2 {
    margin: 0 0 20px 0;
  }

  h4 {
    margin-top: 0;
  }
`;

const BoxHead = styled.div`
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
  border-bottom: 1px solid #f4f4f4;

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

const BoxContent = styled.div`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
  font-size: em(14);

  h4 {
    margin-top: 0;
  }
`;


export default class Box extends Component {
  render(props) {
    return (
      <BoxWrap>
        {this.props.title4 && (
          <BoxHead>
            <h4>{this.props.title4}</h4>
          </BoxHead>
        )}
        {this.props.title3 && (
          <BoxHead>
            <h3>{this.props.title3}</h3>
          </BoxHead>
        )}
        <BoxContent>
          {this.props.children}
        </BoxContent>
      </BoxWrap>
    )
  }
}
