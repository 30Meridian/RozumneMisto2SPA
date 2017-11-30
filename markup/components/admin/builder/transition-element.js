import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { Select, Button } from '../../form-components';
import {ButtonDefault} from 'components/common-components/buttons';
import Box from 'components/box';

import { changeTransitionSource, changeTransitionDestination, changeTransitionFeature,
  changeTransitionDirection, deleteTransitionElement } from '../redux/actions';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
  features: state.builder.three.get('features'),
  directions: state.builder.three.get('directions'),
  states: state.builder.three.get('states'),
});

const mapDispatchToProps = (dispatch) => ({
  onSourceChange: (value, key) => dispatch(changeTransitionSource(value, key)),
  onDestinationChange: (value, key) => dispatch(changeTransitionDestination(value, key)),
  onFeatureChange: (value, key) => dispatch(changeTransitionFeature(value, key)),
  onDirectionChange: (value, key) => dispatch(changeTransitionDirection(value, key)),
  onDeleteClick: (event, key, id) => dispatch(deleteTransitionElement(key, id)),
});

const TransitionElement = (props) => (
  <Box>
  <Row>
    <Col md={6}>
    <Select label="Початковий стан" value={props.item.get('source_state')} items={props.states} valueKey="label"
      onChange={(value) => props.onSourceChange(value, props.id)} />
    </Col>
    <Col md={6}>
    <Select label="Кінцевий стан" value={props.item.get('destination_state')} items={props.states} valueKey="label"
      onChange={(value) => props.onDestinationChange(value, props.id)} />
    </Col>
    <Col md={6}>
    <Select label="Послідовність виконання" value={props.item.get('feature')} items={props.features}
      onChange={(value) => props.onFeatureChange(value, props.id)} />
    </Col>
    <Col md={6}>
    <Select label="Напрямок" value={props.item.get('direction')} items={props.directions}
      onChange={(value) => props.onDirectionChange(value, props.id)} />
    </Col>
    <Col md={12}>
    <ButtonDefault value="Видалити"
      onClick={(event) => props.onDeleteClick(event, props.id, props.item.get('id'))}/>
    </Col>
    {/*
    <div><i className="fa fa-times"
      onClick={(event) => props.onDeleteClick(event, props.id, props.item.get('id'))}>
    </i></div>
    */}
  </Row>
</Box>
);

export default connect(mapStateToProps, mapDispatchToProps)(TransitionElement);
