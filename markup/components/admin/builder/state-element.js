import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { Input } from '../../form-components';
import Checkbox from '../../form-components/checkbox';
import { changeStateLabel, changeStateDescription, deleteStateElement, changeStateVisible } from '../redux/actions';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onLabelChange: (event, key) => dispatch(changeStateLabel(event.target.value, key)),
  onDescriptionChange: (event, key) => dispatch(changeStateDescription(event.target.value, key)),
  onVisibleChange: (event, key) => dispatch(changeStateVisible(event.target.checked, key)),
  onDeleteClick: (event, key, id) => dispatch(deleteStateElement(key, id)),
});

const DeleteIcon = styled.div`
  margin-top: 19px;

  i {
    cursor: pointer;
    &:hover {
      color: #00a65a;
    }
  }
`;

const SelectElement = (props) => (
  <div>
    <Row>
      <Col md={5}>
        <Input inline label="Стан" value={props.item.get('label')}
          onChange={(event) => props.onLabelChange(event, props.id)} />
      </Col>
      <Col md={4}>
        <Input inline label="Опис" value={props.item.get('description')}
          onChange={(event) => props.onDescriptionChange(event, props.id)} />
      </Col>
      <Col md={2}>
        <Checkbox type="checkbox" label="Видимий" checked={props.item.get('visible')}
          onChange={(event) => props.onVisibleChange(event, props.id)} />
      </Col>
      <Col md={1}>
        <DeleteIcon><i className="fa fa-times"
          onClick={(event) => props.onDeleteClick(event, props.id, props.item.get('id'))}>
        </i></DeleteIcon>
      </Col>
    </Row>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectElement);
