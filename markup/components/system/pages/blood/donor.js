import React, { Component } from 'react';

import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';

class Donor extends Component {
  render(props) {
    const item = this.props.item;

    if (!item)
      return (<div>dsadas</div>);
    return (
      <Col md={6}>
        <div className={styles.card}>
          <div className="donor-head">
            <a href="#!">
              <h3>{item.get('firstName')} {item.get('lastName')}</h3>
            </a>
            <div className={styles.cardImg}>
              <a href="#!">
                <img src={item.get('photoImage')} alt=""/>
              </a>
            </div>
          </div>
          <div className={styles.body}>
            <ul className={styles.topContent}>
              <li>
                <div><strong>{item.get('bloodGroup')}</strong></div>
                <div><span>Група крові</span></div>
              </li>
              <li>
                <div><strong>{item.get('neededDonorsCount')}</strong></div>
                <div><span>Потрібно донорів</span></div>
              </li>
              <li>
                <div><strong>{new Date(item.get('dateOfBirth')).toLocaleString('uk-UA')}</strong></div>
                <div><span>Рік народження</span></div>
              </li>
            </ul>
            <ul className={styles.bottomContent}>
              {item.get('disease') ? (<li><span>Діагноз: </span>{item.get('disease')}</li>):null}
              {item.get('contactPerson') ? (<li><span>Контактна особа: </span>{item.get('contactPerson')}</li>):(null)}
              {item.get('phone') ? (<li><span>Телефон: </span>{item.get('phone')}</li>):null}
              {item.get('email') ? (<li><span>Email: </span>{item.get('email')}</li>):null}
              {item.get('centerId')? (<li><span>Центр здачі крові: </span>{item.get('centerId')}</li>):null}
              {item.get('center') ? (<li><span>Адреса центру: </span>{item.get('center')}</li>):null}
              <li><span>Додано: </span>{new Date(item.get('dateAdded')).toLocaleString('uk-UA')}</li>
            </ul>
          </div>
        </div>
      </Col>
    )
  }
}

export default Donor;
