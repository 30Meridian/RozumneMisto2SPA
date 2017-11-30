import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Input from 'components/form-components/input';
import Button from 'components/form-components/button';
import {ButtonTransparent} from 'components/common-components/buttons';
import Spinner from 'components/spinner';
import DocumentTable from '../table';

import { changeDocumentTypeFilter } from '../../redux/actions';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';


const mapStateToProps = state => ({
	items: state.adminDocuments.get('items'),
	isFetching: state.adminDocuments.get('documentsIsLoading'),
	typeFilter: state.adminDocuments.get('typeFilter'),
});

const mapDispatchToProps = dispatch => ({
	loadDocuments: (func, offset, filter) => dispatch(func(25, offset, filter)),
	changeTypeFilter: (event) => dispatch(changeDocumentTypeFilter(event.target.value))
});

class DocumentContainer extends Component {
	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.page != nextProps.match.params.page) {
			const page = nextProps.match.params.page;
			const offset = 25 * (page - 1);
			this.props.loadDocuments(this.props.fetchDocuments, offset, this.props.typeFilter);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.loadDocuments(this.props.fetchDocuments, offset);
	}

	render() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);

		if (this.props.isFetching) {
			return (<div><Spinner/></div>);
		}

		return (
			<div>
				<div className="box-head">
					<div className={styles.documentsHeader}>
						<h3></h3>
						<form className={styles.typeFilter + " " + "ui form"} onSubmit={(event) => {
							event.preventDefault();
							this.props.loadDocuments(this.props.fetchDocuments, offset, this.props.typeFilter);
						}}>
							<div className={styles.inputWrap}>
								<Input className={""} placeholder={"Введіть назву типу документу"}
									value={this.props.typeFilter} onChange={this.props.changeTypeFilter}/>
							</div>
							<ButtonTransparent size="12px" iconClass="fa fa-search" type="submit" value={"Шукати"}/>
						</form>
					</div>
				</div>
				{this.props.items && this.props.items.results ?
					<DocumentTable items={this.props.items} url={this.props.url} param={this.props.match.params.page} limit={30}/>
				: null}
			</div>
		);
	}
}

DocumentContainer.propTypes = {
	items: PropTypes.instanceOf(List).isRequired,
	fetchDocuments: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentContainer));
