import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';


const ItemModal = (props) => {
  return (
    <ReactModal isOpen={props.showModal} onRequestClose={props.handleCloseModal} contentLabel="Modal" className={{
      base: 'itemModal',
      afterOpen: 'myClass_after-open',
      beforeClose: 'myClass_before-close'
    }} overlayClassName={{
      base: 'doctorOverlay',
      afterOpen: 'myOverlayClass_after-open',
      beforeClose: 'myOverlayClass_before-close'
    }}>
      <Row>
        <Col md={12}>
          <div className="modal-header">
            Інформація про платіж
            <i className="fa fa-times" aria-hidden="true" onClick={(event) => props.handleCloseModal()}></i>
            <div style={{"float": "right"}} className="text-right">
              {props.item.id}&nbsp;
              <span className="fa fa-barcode" aria-hidden="true"></span>
            </div>
          </div>
          <ul className={styles.modal}>
            <li>
              <strong>Дата платежу: &nbsp;</strong>{props.item.trans_date}</li>
            <li>
              <strong>Сума транзакції: &nbsp;</strong>{props.item.amount}</li>
            <li>
              <strong>Призначення: &nbsp;</strong>{props.item.payment_details}</li>
            <li>
              <strong>Платник: &nbsp;</strong>{props.item.payer_name}</li>
            <li>
              <strong>МФО банку платника: &nbsp;</strong>{props.item.payer_mfo}</li>
            <li>
              <strong>Банк платника: &nbsp;</strong>{props.item.payer_bank}</li>
            <li>
              <strong>ЄРДПОУ платника: &nbsp;</strong>{props.item.payer_edrpou}</li>
            <li>
              <strong>Отримувач платежу: &nbsp;</strong>{props.item.recipt_name}</li>
            <li>
              <strong>МФО банку отримувача: &nbsp;</strong>{props.item.recipt_mfo}</li>
            <li>
              <strong>Банк отримувача: &nbsp;</strong>{props.item.recipt_bank}</li>
            <li>
              <strong>ЄРДПОУ отримувача: &nbsp;</strong>{props.item.recipt_edrpou}</li>
          </ul>
        </Col>
      </Row>
    </ReactModal>
  )
}

export default ItemModal;
