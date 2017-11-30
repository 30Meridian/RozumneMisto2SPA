import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import history from '../../../history';
import {loadRecipientName, loadRecipientCodeEdr, loadPayerCodeEdr} from '../../redux/actions';

import styles from './styles.scss';

const mapDispatchToProps = (dispatch) => ({
  loadRecipientName: (value) => dispatch(loadRecipientName(value)),
  loadRecipientCodeEdr: (value) => dispatch(loadRecipientCodeEdr(value)),
  loadPayerCodeEdr: (value) => dispatch(loadPayerCodeEdr(value)),
});

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
  hostEnable: state.system.get('standaloneHostEnable'),
});

class FinanceItem extends Component {
  constructor(props) {
   super(props)
   this.onClickRecipient = this.onClickRecipient.bind(this)
   this.onClickPayer = this.onClickPayer.bind(this)
  }

  onClickRecipient(recipientCodeEdr, recipientName) {
    this.props.loadRecipientCodeEdr(recipientCodeEdr);
    this.props.loadRecipientName(recipientName);
    history.push(`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance/recipient`);
  }

  onClickPayer(payerCodeEdr) {
    this.props.loadPayerCodeEdr(payerCodeEdr);
    history.push(`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance/payer`);
  }

  render(props) {

    const recipientStyle = this.props.type === "recipientList" ? styles.listRecipeColorBlack : styles.listRecipe
    const payerStyle = this.props.type === "payerList" ? styles.listPayerColorBlack : styles.listPayer

    const item = this.props.item;

    return (
      <div className={styles.list}>
        <div className={styles.listAmount}>
          <span className="hide-tablet"><strong>Ціна:&nbsp;</strong></span>
          <div><strong>{item.amount}</strong></div>
          <div className={styles.itemCard}><i className="fa fa-file-text-o text-green"></i></div>
          <div>(№{item.id})</div>
        </div>
        <div className={styles.listDate}>
          <span className="hide-tablet"><strong>Дата:&nbsp;</strong></span>
					{item.trans_date}
        </div>

        <div className={payerStyle} onClick={(event) => this.onClickPayer(item.payer_edrpou)}>
        <span className="hide-tablet"><strong>Розпорядник коштів:&nbsp;</strong></span>
          {item.payer_name}
        </div>

        <div className={recipientStyle} onClick={(event) => this.onClickRecipient(item.recipt_edrpou, item.recipt_name)}>
          <span className="hide-tablet"><strong>Контрагент:&nbsp;</strong></span>
          {item.recipt_name}
        </div>
        <div className={styles.listDetail}>
          <span className="hide-tablet"><strong>Призначення платежу:&nbsp;</strong></span>
          {item.payment_details}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceItem);
