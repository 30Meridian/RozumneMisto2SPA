import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { fetchDocument, loadDocumentVoteList, patchVoteInstance } from '../../redux/actions/documents';

import history from 'components/history';
import Box from 'components/box';
import Button from 'components/form-components/button';
import {ButtonGreen, ButtonDanger} from 'components/common-components/buttons';
import Pagination from 'components/system/pagination';

import form from 'components/common-components/form.scss';


const mapStateToProps = state => ({
	documentCard: state.adminDocuments.get('documentCard'),
	documentVoteList: state.adminDocuments.get('documentVoteList'),
});

const mapDispatchToProps = dispatch => ({
	onMount: (id, offset) => {
		dispatch(fetchDocument(id));
		dispatch(loadDocumentVoteList(id, 50, offset));
	},
	patchVoteInstance: (id, obj, doc_id) => dispatch(patchVoteInstance(id, obj, doc_id)),
})

class DocumentVoteList extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.page !== this.props.match.params.page) {
			const page = nextProps.match.params.page;
			const offset = 50 * (page - 1);
			this.props.onMount(this.props.match.params.id, offset);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 50 * (page - 1);
		this.props.onMount(this.props.match.params.id, offset);
	}

	render() {
		return (
			<div>
				<Box>
					<div className="document-title">
						<h3 className="box-title">Список голосів за {this.props.documentCard.get('title')}</h3>
						<span onClick={(event) => {
							history.goBack()
						}}>
							<i className="fa fa-arrow-circle-o-left"></i>
						</span>
					</div>
				</Box>
				<Box>
					<div>
						<h4>Усього голосів: {this.props.documentVoteList.get('count')}</h4>
					</div>
				</Box>
				<Box>
				 <table className="ui table">
              <thead>
                <tr>
                  <th>Прізвище Ім'я По-батькові</th>
                  <th>Контактні дані</th>
                  <th>Дата голосування</th>
                  <th>Заблокувати</th>
                </tr>
              </thead>

              <tbody>
               	{this.props.documentVoteList.get('results') ? this.props.documentVoteList.get('results').map(item => (
               		<tr key={item.get('id')}>
               			<td> {item.get('user_name')} </td>
               			<td>{item.get('user_email')} / {item.get('user_phone')}</td>
               			<td>{new Date(item.get('date_voted')).toLocaleString('uk-UA')}</td>
               			<td>{item.get('blocked') ?
										<ButtonGreen value={"Розблокувати голос"}
											onClick={(event) => this.props.patchVoteInstance(item.get('id'), {blocked: false},
											this.props.match.params.id)} /> :
										<ButtonDanger value={"Заблокувати голос"}
											onClick={(event) => this.props.patchVoteInstance(item.get('id'), {blocked: true},
											this.props.match.params.id)} />
									}</td>
               		</tr>
               		)):null}
              </tbody>
            </table>

					<Pagination counts={this.props.documentVoteList.get('count')}
	          path={`/admin/documents/document/${this.props.match.params.id}/votelist/`}
	          matched={this.props.match.params.page} limits={50}/>
					</Box>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentVoteList);
