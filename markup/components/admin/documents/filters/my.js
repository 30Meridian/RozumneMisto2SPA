import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {DefaultLink, GreenLink} from 'components/common-components/buttons';
import Title from 'components/dynamic-title';
import DocumentContainer from './container';
import Box from 'components/box';

import { fetchMyDocuments } from '../../redux/actions';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';


class MyDocuments extends Component {
	render() {
		return (
			<Box>
				<Title title={`Службовий кабінет. Мої документи. Інформаційна система "Розумне місто" `} />
				<div className={"text-center"}>
					<h3>Документи</h3>
				</div>
				<div className={styles.documentsHeaderIncome}>
					<DefaultLink to={'/admin/'}>На опрацюванні</DefaultLink>
					<DefaultLink to={'/admin/documents/all'}>Усі документи</DefaultLink>
					<GreenLink to={'/admin/documents/my'}>Мої документи</GreenLink>
				</div>
				<DocumentContainer url={"/admin/documents/my/"} fetchDocuments={fetchMyDocuments}
					currentUrl={this.props.match.url} />
			</Box>
		);
	}
}

export default MyDocuments;
