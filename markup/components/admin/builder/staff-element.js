import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { Select, Button } from '../../form-components';
import {ButtonDefault} from 'components/common-components/buttons.js';
import { addStaff, changeStaffField, loadTransitionStaffList, deleteStaffElement } from '../redux/actions';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
  staff: state.builder.four.get('staff'),
  attachedStaff: state.builder.four.get('attachedStaff'),
});

const mapDispatchToProps = (dispatch) => ({
  onPositionChange: (data, transition_key, staff_key, staff_key_field) =>
    dispatch(changeStaffField(data, transition_key, staff_key, staff_key_field)),
  onAddClick: (event, key, id) => {
    event.preventDefault();
    dispatch(addStaff(key, id));
  },
  loadTransitionStaffList: (order, transitionId) => dispatch(loadTransitionStaffList(transitionId, order)),
  onDeleteClick: (event, transition_key, staff_key, id) => dispatch(deleteStaffElement(transition_key, staff_key, id)),
});

class StaffElement extends Component {
  componentWillMount() {
    this.props.loadTransitionStaffList(this.props.id, this.props.item.get('id'));
  }

  render(){
    return(
      <div className="multi-field">
        <div className="">
          <h4>
            Перехід: {this.props.item.get('source_state_name')} => {this.props.item.get('destination_state_name')}
          </h4>
        </div>
        <div className={form.inlineField}>
          <Row>
          {this.props.attachedStaff.get(this.props.id) ? this.props.attachedStaff.get(this.props.id)
            .map((item, index) => (!item.get('isDeleted') ?
             <div>
              <Col md={11}>
            <Select key={index} id={index} value={item.get('staff')}
              label="Відповідальний / виконавець" items={this.props.staff} onChange={(value) =>
                this.props.onPositionChange(value, this.props.id, index, "staff")} />
              </Col>
              <Col md={1}>
                <div><i className="fa fa-times"
                  onClick={(event) => this.props.onDeleteClick(event, this.props.id, index, item.get('id'))}>
                </i></div>
              </Col>
            </div> : null
            )) : ''}
          </Row>
        </div>
        <ButtonDefault value="Додати" onClick={(event) =>
            this.props.onAddClick(event, this.props.id, this.props.item.get('id'))} />
      </div>
    );
  }
}
//
export default connect(mapStateToProps, mapDispatchToProps)(StaffElement);
