import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {DefaultLink, GreenLink} from 'components/common-components/buttons';
import Title from 'components/dynamic-title';
import DocumentContainer from './container';
import Box from 'components/box';

import { fetchIncomingDocuments } from '../../redux/actions';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';

class IncomingDocuments extends Component {
	render() {
		return (
			<Box>
				<Title title={`Службовий кабінет. Усі документи. Інформаційна система "Розумне місто" `} />
				<div className={"text-center"}>
					<h3>Документи</h3>
				</div>
				<div className={styles.documentsHeaderIncome}>
					<DefaultLink to={'/admin/'}>На опрацюванні</DefaultLink>
					<GreenLink to={'/admin/documents/all'}>Усі документи</GreenLink>
					<DefaultLink to={'/admin/documents/my'}>Мої документи</DefaultLink>
				</div>
				<DocumentContainer url={"/admin/documents/all/"} fetchDocuments={fetchIncomingDocuments}
					currentUrl={this.props.match.url} />
			</Box>
		);
	}
}

export default IncomingDocuments;
