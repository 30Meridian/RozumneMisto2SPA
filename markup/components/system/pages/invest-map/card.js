import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadInvestDetail} from '../../redux/actions';
import Title from 'components/dynamic-title';
import Box from 'components/box';

import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';

const mapStateToProps = (state) => ({detail: state.invest.get('detail')});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => dispatch(loadInvestDetail(id))
})

class InvestCard extends Component {

	componentWillMount() {
		this.props.onLoad(this.props.match.params.id);
	}

	render() {

		if (this.props.detail == undefined) {
			return <div></div>;
		}
		return (
			<div className={styles.detail}>
				<Title title={`Інвестиційна карта. ${this.props.detail.name}. Інформаційна система "Розумне місто"`} />
				<Box>
					<h2>{this.props.detail.name}</h2>
				</Box>
				<Box>
					<Row>
						<Col md={6}>
							<ul>
								<li><strong>Площа: &nbsp;</strong>{this.props.detail.metrics}</li>
								<li><strong>Адреса: &nbsp;</strong>{this.props.detail.address}</li>
								<li><strong>Ціна: &nbsp;</strong>{this.props.detail.price}</li>
								<li><strong>Контакти: &nbsp;</strong>{this.props.detail.contacts}</li>
							</ul>
						</Col>
						<Col md={6}>
              <div>
                <img src={this.props.detail.image} alt={this.props.detail.name} />
              </div>
            </Col>
					</Row>
				</Box>
        <Box>
          <Row>
            <Col md={12}>
              <h4>Опис проекту: </h4>
              <div dangerouslySetInnerHTML={{
                __html: this.props.detail.description
              }}></div>
            </Col>
          </Row>
        </Box>
			</div>
		)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestCard);
