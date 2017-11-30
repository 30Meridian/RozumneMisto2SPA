import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Row, Col} from 'react-bootstrap';
import { Input, Select } from '../../../form-components';

import { changeModuleModule, changeModuleWorkflow, changeModuleActive } from '../../redux/actions/settings/community';


const mapStateToProps = state => ({
  loadModules: state.settings.community.get('loadModules'),
  workflows: state.settings.community.get('generalWorkflows'),
});

const mapDispatchToProps = dispatch => ({
  onModuleChange: (value, key) => dispatch(changeModuleModule(value, key)),
  onWorkflowChange: (value, key) => dispatch(changeModuleWorkflow(value, key)),
  onActiveChange: (event, key) => dispatch(changeModuleActive(event.target.checked, key)),
});

class ModuleElement extends Component {
  render() {
    return (
      <Row>
        <Col md={4}>
          <Select label="Модуль" value={this.props.item.get('module')} valueKey="name" items={this.props.loadModules}
            onChange={(value) => this.props.onModuleChange(value, this.props.index)}/>
        </Col>
        <Col md={5}>
          <Select label="Модель бізнес-процесу" value={this.props.item.get('workflow_type')} valueKey="title"
            items={this.props.workflows} onChange={(value) => this.props.onWorkflowChange(value, this.props.index)}/>
        </Col>
        <Col md={3}>
          <div className="module-checkbox">
            <Input label="Активний" type="checkbox" checked={this.props.item.get('active')}
            onChange={(event) => this.props.onActiveChange(event, this.props.index)}/>
          </div>
        </Col>
      </Row>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleElement);
