import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Box from 'components/box';
import Spinner from '../../../spinner';
import { fetchMyDocumentsCabinet, fetchDoneDocumentsCabinet, fetchActiveDocumentsCabinet } from '../../redux/actions/documents';

import styles from './styles.scss';


const mapStateToProps = state => ({
	myCabinetDocumets: state.system.get('myCabinetDocumets'),
	activeCabinetDocumets: state.system.get('activeCabinetDocumets'),
	doneCabinetDocumets: state.system.get('doneCabinetDocumets'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(fetchMyDocumentsCabinet());
	 	dispatch(fetchActiveDocumentsCabinet());
		dispatch(fetchDoneDocumentsCabinet());
	}
});

class Documents extends Component {

	componentWillMount() {
		this.props.onLoad();
	}

	render() {

		if (this.props.myCabinetDocumets == undefined || this.props.activeCabinetDocumets == undefined || this.props.doneCabinetDocumets == undefined) {
			return <Box><Spinner /></Box>;
		}
		return (
			<Box>
				<Row>
					<Col md={4}>
						<div className={styles.card + " " + styles.cardFirst}>
							<div className={styles.cardContent}>
								<Row>
									<Col xs={5}>
										<div className={styles.cardIcon}>
											<i className="fa fa-files-o"></i>
										</div>
									</Col>
									<Col xs={7}>
										<div className={styles.numbers}>
											<p>Моїх документів</p>
											{this.props.myCabinetDocumets.count}
										</div>
									</Col>
								</Row>
							</div>
						</div>
					</Col>

	        <Col md={4}>
						<div className={styles.card + " " + styles.cardSecond}>
							<div className={styles.cardContent}>
								<Row>
									<Col xs={5}>
										<div className={styles.cardIcon}>
											<i className="fa fa-file-text-o"></i>
										</div>
									</Col>
									<Col xs={7}>
										<div className={styles.numbers}>
											<p>В роботі</p>
											{this.props.activeCabinetDocumets.count}
										</div>
									</Col>
								</Row>
							</div>
						</div>
					</Col>

	        <Col md={4}>
						<div className={styles.card + " " + styles.cardThird}>
							<div className={styles.cardContent}>
								<Row>
									<Col xs={5}>
										<div className={styles.cardIcon}>
											<i className="fa fa-file-text"></i>
										</div>
									</Col>
									<Col xs={7}>
										<div className={styles.numbers}>
											<p>Завершено</p>
											{this.props.doneCabinetDocumets.count}
										</div>
									</Col>
								</Row>
							</div>
						</div>
					</Col>
				</Row>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
