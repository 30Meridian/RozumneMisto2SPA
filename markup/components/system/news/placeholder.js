import React, {Component} from 'react';

import Title from '../../dynamic-title';
import Box from 'components/box';

class NewsPlaceholder extends Component {
  render() {
    return(
      <div>
        <Title title={`Новини. Інформаційна система "Розумне місто" `} />
        <h2>Новини міста</h2>
        <p>Модуль «Новини міста» призначено для оприлюднення новин міста/громади, оперативного донесення важливої та цікавої інформації мешканцям.</p>
        <p>Влада показує прозорість та отримує повагу мешканців. Гарними справами прославитися можна.</p>
        <p>Працює у 105 містах</p>
      </div>
    )
  }
}

export default NewsPlaceholder;
