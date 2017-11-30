import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../../../system/sign-in';
import CabinetWrapper from '../cabinet-wrapper';




class Wrap extends Component {
  render() {
    return (
      <CabinetWrapper />
    );
  }
}

export default Wrap;
