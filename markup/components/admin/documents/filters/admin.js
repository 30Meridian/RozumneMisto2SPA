import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from 'components/dynamic-title';
import DocumentContainer from './container';
import Box from 'components/box';

import { fetchDocuments } from '../../redux/actions';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';

class AdminDocuments extends Component {
	render() {
		return (
			<Box>
				<Title title={`Службовий кабінет. Документи в системі. Інформаційна система "Розумне місто" `} />
				<div className={"text-center"}>
					<h3>Документи в системі</h3>
				</div>
				<DocumentContainer url={"/admin/documents/admin/"} fetchDocuments={fetchDocuments}
					currentUrl={this.props.match.url} />
			</Box>
		);
	}
}

export default AdminDocuments;
