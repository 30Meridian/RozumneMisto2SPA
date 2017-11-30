import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadPublicServices} from '../../redux/actions';
import history from '../../../history';
import {List, Button} from '../../../form-components';
import Box from 'components/box';
import Spinner from '../../../spinner';
import Pagination from '../../pagination';
import Title from 'components/dynamic-title';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';
import form from '../../../common-components/form.scss';

const mapStateToProps = (state) => ({
	services: state.system.get('services'),
	user: state.auth.get('user'),
	community: state.system.get('community'),
	isFetching: state.system.get('servicesIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => dispatch(loadPublicServices(slug, 25)),
	onClick: (data, slug) => {
		history.push(`${slug}/cabinet/documents/create/${data.slug}`);
	}
});

class CustomServices extends Component {

	componentWillMount() {
		this.props.onLoad(this.props.community.get('slug'));
	}

	render() {

		if (this.props.isFetching) {
			return <Box><Spinner/></Box>
		}

		if (this.props.services == undefined) {
			return <div></div>;
		}

		return (
			<div className="document-tables">
				<Title title={`Доступні послуги. Інформаційна система "Розумне місто" `} />
				<Box title4="Доступні послуги">
					<div>
						{this.props.services.results.length > 0
							? (
								<Row>
								{this.props.services.results.map(item => (
									<Col md={4}>
										<div className="request-btn" onClick={
                      (event) => {
                        history.push(`/cabinet/documents/create/${item.slug}`)
                      }
                    }>
											{item.title}
										</div>
									</Col>
								))}
							</Row>
							):(
								<div>
									<p>Доступні послуги відсутні для даного міста.</p>
									<p>Адміністратор міста може додати послуги через конструктор.</p>
								</div>
							)}
						</div>
				</Box>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomServices);
