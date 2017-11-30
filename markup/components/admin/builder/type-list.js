import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import history from '../../history';
import { List, Button } from '../../form-components';
import Spinner from '../../spinner';
import Pagination from '../../system/pagination';
import Title from 'components/dynamic-title';
import Input from 'components/form-components/input';
import {GreenLink, ButtonTransparent} from 'components/common-components/buttons';
import { loadPublicTypes, changeWorkflowType, changeDocumentTypeFilter } from '../redux/actions';

import styles from './styles.scss';
import form from 'components/common-components/form.scss';


const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  available: state.adminDocuments.get('publicTypes'),
  isFetching: state.adminDocuments.get('publicTypesIsLoading'),
  typeFilter: state.adminDocuments.get('typeFilter'),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (offset, search) => dispatch(loadPublicTypes(25, offset, search)),
	changeTypeFilter: (event) => dispatch(changeDocumentTypeFilter(event.target.value)),
});

class TypeList extends Component {

  componentWillReceiveProps(nextProps) {
    const page = nextProps.match.params.page;
    const offset = 25 * (page - 1);
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.props.onLoad(offset, this.props.typeFilter);
    }
  }

  componentWillMount() {
    const page = this.props.match.params.page || 1;
    const offset = 25 * (page - 1);
    this.props.onLoad(offset);
  }

  render() {

    if (this.props.isFetching) {
      return <div><Spinner /></div>
    }

    if (this.props.available == undefined) {
      return <div></div>;
    }

    const page = this.props.match.params.page || 1;
    const offset = 25 * (page - 1);
    return (
      <div>
        <Title title={`Службовий кабінет. Управління бізнес-процесами. Інформаційна система "Розумне місто" `} />
        <div className="box-head">
					<div className="departmens-head">
						<h3>Управління бізнес-процесами</h3>
            <GreenLink to={'/admin/builder/workflow/0/step1'}>
              <i className={"fa fa-plus-circle"} ></i>{"Створити новий бізнес-процес"}
            </GreenLink>
					</div>
        </div>
        <div className="box-head">
          <div className={styles.documentsHeader}>
            <form className={styles.typeFilter + " " + "ui form"} onSubmit={(event) => {
              event.preventDefault();
              this.props.onLoad(offset, this.props.typeFilter);
            }}>
              <div className={styles.inputWrap}>
              <Input placeholder={"Введіть назву процесу"} value={this.props.typeFilter}
                onChange={this.props.changeTypeFilter}/>
              </div>
              <ButtonTransparent size="12px" iconClass="fa fa-search" type="submit" value={"Шукати"}/>
            </form>
          </div>
        </div>
        <Row>
          <Col md={12}>
            <div className="document-table">
      				<table className="ui single line table documents-table">
                <thead>
                  <tr>
      							<th>ID</th>
                    <th>Назва</th>
      							<th>Організація-власник</th>
      							<th>Категорія</th>
      						  <th>Видимість</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.available.results.map(item => (
                    <tr key={item.id}>
      								<td><span className="hide-desktop">ID: </span>{item.id}</td>
                      <td><span className="hide-desktop">Назва: </span><p><Link to={`/admin/builder/workflow/${item.id}/step1`}>
                        {item.title}</Link></p></td>
      								<td><span className="hide-desktop">Організація-власник: </span>{item.owner_name}</td>
      								<td><span className="hide-desktop">Категорія: </span>{item.category_name}</td>
                      <td><span className="hide-desktop">Видимість: </span>{item.public ? 'Публічний' : 'Організаційний'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination counts={this.props.available.count} path="/admin/builder/" matched={this.props.match.params.page} limits={25} />
          </Col>
        </Row>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeList);
