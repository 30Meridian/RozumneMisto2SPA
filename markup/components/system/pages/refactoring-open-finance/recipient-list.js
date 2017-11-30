import React, {Component} from 'react';
import {connect} from 'react-redux';

 

import styles from './styles.scss';
import FinanceItem from './finance-item';
import ItemModal from './item-modal';

import Pagination from '../../pagination';
import Spinner from '../../../spinner';
import history from '../../../history';

import {fetchFinanceRecipient} from '../../redux/actions';

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
  financeInfo: state.system.get('financeInfo'),
	moduleIsLoading: state.system.get('moduleIsLoading'),

	recipientCodeEdr: state.system.get('recipientCodeEdr'),
	recipientName: state.system.get('recipientName'),

	sortedBy: state.system.get('sortedBy'),
	reversed: state.system.get('reverseFinanceList'),

	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFinanceRecipient: (slug, limit, offset) => dispatch(fetchFinanceRecipient(slug, limit, offset)),
});

class RecipientItemsList extends Component {
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
		 this.props.fetchFinanceRecipient(this.props.community.get('slug'), 15, offset);
		}
		else if (nextProps.sortedBy !== this.props.sortedBy || nextProps.reversed !== this.props.reversed) {
			this.props.fetchFinanceRecipient(this.props.community.get('slug'), 15, offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 15 * (page - 1);
		this.props.fetchFinanceRecipient(this.props.community.get('slug'), 15, offset);
	}

	componentDidMount() {
		if (!this.props.recipientCodeEdr){
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
										<FinanceItem item={item} type={"recipientList"} />
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
						path={`${this.props.hostEnable ? "" : '/' + this.props.community.get('slug')}/open-finance/recipient/`}
						matched={this.props.match.params.page} limits={15}/>)
					: null}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipientItemsList);
