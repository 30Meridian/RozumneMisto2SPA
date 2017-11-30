import React, { Component } from 'react';

import Title from 'components/dynamic-title';
import Box from 'components/box';

import styles from './styles.scss';

class Terms extends Component {
  render() {
    return (
      <div className={styles.terms}>
        <Title title={`Публічні фінанси. Умови використання. Інформаційна система "Розумне місто" `} />
       <p>Інформація експортується з порталу публічних коштів міністерства фінансів України через API у такому вигляді як вона є. Власники та розробники порталу "Розумне місто" не несуть відповідальності за зміст та якість інформації. Якщо ви не згодні з цими умовами - не користуйтесь модулем "Відкриті фінанси".</p>
      </div>
    )
  }
}

export default Terms;
