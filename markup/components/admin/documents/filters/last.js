import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {connect} from 'react-redux';

import Input from '../../../form-components/input';
import Button from '../../../form-components/button';
import {ButtonDefault} from 'components/common-components/buttons';
import Spinner from '../../../spinner';

import DocumentTable from '../table';
import {fetchIncomeDocuments, changeDocumentTypeFilter} from '../../redux/actions';

import styles from './styles.scss';
import form from '../../../common-components/form.scss';

import Box from 'components/box';

const mapStateToProps = state => ({
	items: state.adminDocuments.get('items'),
	isFetching: state.adminDocuments.get('documentsIsLoading'),
	typeFilter: state.adminDocuments.get('typeFilter')
});

const mapDispatchToProps = dispatch => ({
	fetchDocuments: (offset, filter = '') => dispatch(fetchIncomeDocuments(25, offset, filter)),
	changeTypeFilter: (event) => dispatch(changeDocumentTypeFilter(event.target.value))
});

class LastDocuments extends Component {
	componentWillReceiveProps(nextProps) {

		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.fetchDocuments(offset, this.props.typeFilter);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.fetchDocuments(offset);
	}
	render() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);

		if (this.props.isFetching) {
			return <div><Spinner/></div>
		}

		if (this.props.items == undefined) {
			return <div></div>;
		}
		return (
			<Box>
				<div className={styles.documentsHeader}>
					<h3>Документи в системі</h3>
					<form className={styles.typeFilter + " " + "ui form"} onSubmit={(event) => {
						event.preventDefault();
						this.props.fetchDocuments(offset, this.props.typeFilter);
					}}>
					<div className={styles.inputWrap}>
						<Input className={""} label={"Пошук процесу:"} placeholder={"Введіть частину або повну назву процесу"} value={this.props.typeFilter} onChange={this.props.changeTypeFilter}/>
					</div>
					<ButtonDefault size="12px" type="submit" value={"Шукати"}/>
				</form>
				</div>
				<DocumentTable items={this.props.items} url={"/admin/"} param={this.props.match.params.page} limit={30}/>
			</Box>
		)
	}
}

LastDocuments.propTypes = {
	items: PropTypes.instanceOf(List).isRequired,
	fetchDocuments: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LastDocuments)
