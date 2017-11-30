import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDocument} from '../redux/actions/documents';
import Title from '../../dynamic-title';
import { FacebookButton, FacebookCount } from "react-social";

import BreadCrumbs from '../breadcrumbs';
import Box from 'components/box';
import FacebookShare from '../share';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import Spinner from 'components/spinner';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;

const mapStateToProps = (state) => ({
	document: state.documents.get('document'),
	formValues: state.documents.get('documentFormValues'),
	isFetching: state.documents.get('documentIsLoading')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => dispatch(fetchDocument(id))
});

class NewsCard extends Component {

	componentWillMount() {
		this.props.onLoad(this.props.match.params.id);
	}

	render() {

		if (this.props.isFetching) {
			return (
				<Box>
					<Spinner />
				</Box>
			)
		}

		return (
			<div>
				<Row>
          <Title title={`Новини. ${this.props.document.get('title')}. Інформаційна система "Розумне місто" `} />
					<div className="document-top">
						<div><BreadCrumbs documentLink="news" documentId={this.props.document.get('id')} documentName="Новини"/></div>
						<div>
              <FacebookButton url={window.location.href} message={this.props.document.get('title')} className={form.btnDefault + " " + form.btnFacebook} appId={259035427863157}>
                <i className="fa fa-facebook"></i>
                {" Поділитися "}
              </FacebookButton>
						</div>
					</div>
				</Row>
				<Box title4={this.props.document.get('title')}>
					<Row>
						<Col md={12}>
							<div className={styles.meta}>
								<ul>
									<li>
										<i className="fa fa-calendar"></i>
										{new Date(this.props.document.get('date_created')).toLocaleString('uk-UA')}
									</li>
								</ul>
							</div>
							<div className={styles.content}>
								{this.props.formValues.map((item, index) => (
									<div className={styles.newsBlock} key={item.get('id')}>
										<label>
											{item.get('form_component_name')}:
										</label>
										<div dangerouslySetInnerHTML={{
											__html: item.get('value')
										}}></div>
									</div>
								))}
							</div>
							<div className="clearfix"></div>
						</Col>
					</Row>
				</Box>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsCard);
