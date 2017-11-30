import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadModules, addModule } from '../../redux/actions/settings/community';
import { Button } from '../../../form-components';

import ModuleElement from './module-element';


const mapStateToProps = state => ({
  modules: state.settings.community.get('modules'),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadModules()),
  onAddClick: () => dispatch(addModule()),
});

class ModulesManagement extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div>
        {this.props.modules.map((item, index) => (
          <div className="module-element">
            <ModuleElement key={index} index={index} item={item} />
          </div>
        ))}
        <div className="manage-btn">
		      <Button  value="Додати" onClick={this.props.onAddClick}/>
        </div>
        <hr/>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModulesManagement);
