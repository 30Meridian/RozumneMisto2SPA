import React, {Component} from 'react';
import {connect} from 'react-redux';

 

import FinanceItem from './finance-item';
import ItemModal from './item-modal';
import Title from 'components/dynamic-title';
import Pagination from '../../pagination';
import Spinner from '../../../spinner';

import {fetchFinanceInfo} from '../../redux/actions';

import styles from './styles.scss';


const mapStateToProps = (state) => ({
	community: state.system.get('community'),
  financeInfo: state.system.get('financeInfo'),
	moduleIsLoading: state.system.get('moduleIsLoading'),

	sortedBy: state.system.get('sortedBy'),
	reversed: state.system.get('reverseFinanceList'),

	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFinanceInfo: (slug, limit, offset) => dispatch(fetchFinanceInfo(slug, limit, offset)),
});

class ItemsList extends Component {
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
		 this.props.fetchFinanceInfo(this.props.community.get('slug'), 15, offset);
		}
		else if (nextProps.sortedBy !== this.props.sortedBy || nextProps.reversed !== this.props.reversed) {
			this.props.fetchFinanceInfo(this.props.community.get('slug'), 15, offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 15 * (page - 1);
		this.props.fetchFinanceInfo(this.props.community.get('slug'), 15, offset);
	}

	componentDidMount() {
		$('#all-transactions').hide()
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

		const sortedBy = this.props.sortedBy;

		return (
			<div>
				<Title title={`Публічні фінанси. Список публічних закупівель. Інформаційна система "Розумне місто" `} />
				<div>
					{!this.props.moduleIsLoading
						? (transactions.length
							? transactions.map((item, id) => {
								return (
									<div key={item.id} onClick={(event) => this.handleOpenModal(item)}>
										<FinanceItem item={item}/>
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
						path={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/open-finance/`}
						matched={this.props.match.params.page} limits={15}/>)
					: null}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
