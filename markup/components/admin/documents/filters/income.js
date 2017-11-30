import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {DefaultLink, GreenLink} from 'components/common-components/buttons';
import DocumentContainer from './container';
import Box from 'components/box';
import Title from 'components/dynamic-title';
import { fetchIncomeDocuments } from '../../redux/actions';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';


class IncomeDocuments extends Component {
	render() {
		return (
			<Box>
				<Title title={`Службовий кабінет. Документи на опрацюванні. Інформаційна система "Розумне місто" `} />
				<div className={"text-center"}>
					<h3>Документи</h3>
				</div>
				<div className={styles.documentsHeaderIncome}>
					<GreenLink to={'/admin/'}>На опрацюванні</GreenLink>
					<DefaultLink to={'/admin/documents/all'}>Усі документи</DefaultLink>
					<DefaultLink to={'/admin/documents/my'}>Мої документи</DefaultLink>
				</div>
				<DocumentContainer url={"/admin/"} fetchDocuments={fetchIncomeDocuments}
					currentUrl={this.props.match.url} />
			</Box>
		);
	}
}

export default IncomeDocuments;
