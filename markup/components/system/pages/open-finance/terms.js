import React, { Component } from 'react';

import Box from 'components/box';

import styles from './styles.scss';

class Terms extends Component {
  render() {
    return (
      <div className={styles.terms}>
       <p>Інформація експортується з порталу публічних коштів міністерства фінансів України через API у такому вигляді як вона є. Власники та розробники порталу "Розумне місто" не несуть відповідальності за зміст та якість інформації. Якщо ви не згодні з цими умовами - не користуйтесь модулем "Публічні фінанси".</p>
      </div>
    )
  }
}

export default Terms;
