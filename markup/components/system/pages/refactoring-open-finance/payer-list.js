import React, {Component} from 'react';
import {connect} from 'react-redux';

 

import styles from './styles.scss';
import FinanceItem from './finance-item';
import ItemModal from './item-modal';

import Pagination from '../../pagination';
import Spinner from '../../../spinner';
import history from '../../../history';

import {fetchFinancePayer} from '../../redux/actions';

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
  financeInfo: state.system.get('financeInfo'),
	moduleIsLoading: state.system.get('moduleIsLoading'),

	payerCodeEdr: state.system.get('payerCodeEdr'),

	sortedBy: state.system.get('sortedBy'),
	reversed: state.system.get('reverseFinanceList'),

	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFinancePayer: (slug, limit, offset) => dispatch(fetchFinancePayer(slug, limit, offset)),
});

class PayerItemsList extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			item: null,
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 15 * (page - 1);
		if (nextProps.match.params.page !== this.props.match.params.page) {
		 this.props.fetchFinancePayer(this.props.community.get('slug'), 15, offset);
		}
		else if (nextProps.sortedBy !== this.props.sortedBy || nextProps.reversed !== this.props.reversed) {
			this.props.fetchFinancePayer(this.props.community.get('slug'), 15, offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 15 * (page - 1);
		this.props.fetchFinancePayer(this.props.community.get('slug'), 15, offset);
	}

	componentDidMount(){
		if (!this.props.payerCodeEdr){
			history.push(`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance/`);
		}
		$('#all-transactions').show();
	}

	handleOpenModal(item) {
		this.setState({
			showModal: true,
			item,
		});
	}

	handleCloseModal() {
		this.setState({showModal: false});
	}

	render() {
		const transactions = this.props.financeInfo.transactions || [];
		return (
			<div>
				<div>
					{!this.props.moduleIsLoading
						? (transactions.length
							? transactions.map((item, id) => {
								return (
									<div key={item.id} onClick={(event) => this.handleOpenModal(item)}>
										<FinanceItem item={item} type={"payerList"}/>
									</div>
								)
							})
							: <div>Немає жодного платежу</div>)
						: <Spinner />
					}
				</div>
				{this.state.item ? (
					<ItemModal item={this.state.item}
						showModal={this.state.showModal}
						handleCloseModal={this.handleCloseModal}/>
				):null}
				{this.props.financeInfo
					? (<Pagination counts={this.props.financeInfo.count}
						path={`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance/payer/`}
						matched={this.props.match.params.page} limits={15}/>)
					: null}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PayerItemsList);
