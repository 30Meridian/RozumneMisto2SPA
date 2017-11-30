import React, { Component } from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';

import {fetchOpenFinance, searchFinance, loadFinancePageType, loadRecipientCodeEdr, loadPayerCodeEdr} from '../../redux/actions';


const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	recipientCodeEdr: state.system.get('recipientCodeEdr'),
  payerCodeEdr: state.system.get('payerCodeEdr'),
	pageType: state.system.get('financePageType'),
});

const mapDispatchToProps = (dispatch) => ({
	loadFinance: (slug) => dispatch(fetchOpenFinance(slug)),
  changePageType: (value) => dispatch(loadFinancePageType(value)),
	onSubmitFinance: (slug, recipientCodeEdr, payerCodeEdr) => {
		if (recipientCodeEdr) {
      dispatch(loadRecipientCodeEdr(recipientCodeEdr));
      dispatch(loadPayerCodeEdr(''));
			dispatch(searchFinance(slug));
		}
    else if (payerCodeEdr) {
      dispatch(loadPayerCodeEdr(payerCodeEdr));
      dispatch(loadRecipientCodeEdr(''));
			dispatch(searchFinance(slug));
    }
	},
});

class FinanceItem extends Component {
  render(props) {

    const recipientStyle = this.props.type === "filteredByRecipient" ? styles.listRecipeColorBlack : styles.listRecipe
    const payerStyle = this.props.type === "filteredByPayer" ? styles.listPayerColorBlack : styles.listPayer

    const item = this.props.items;

    return (
      <div className={styles.list}>
        <div className={styles.listAmount}>
          <div><strong>{item.amount}</strong></div>
          <div className={styles.itemCard}><i className="fa fa-file-text-o text-green"></i></div>
          <div>(№{item.id})</div>
        </div>
        <div className={styles.listDate}>
					{item.trans_date}
        </div>

        <div className={payerStyle}
          onClick={
            (event) => {
              if (this.props.pageType !== "filteredByPayer") {
                this.props.changePageType("filteredByPayer");
                this.props.onSubmitFinance(this.props.community.get('slug'), '', item.payer_edrpou);
              }
            }
          }>
          {item.payer_name}
        </div>

        <div className={recipientStyle}
          onClick={
            (event) => {
              if (this.props.pageType !== "filteredByRecipient") {
                this.props.changePageType("filteredByRecipient");
                this.props.onSubmitFinance(this.props.community.get('slug'), item.recipt_edrpou);
              }
            }
          }>
          {item.recipt_name}
        </div>
        <div className={styles.listDetail}>
          {item.payment_details}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceItem);
