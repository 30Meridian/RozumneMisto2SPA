import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadPackageData, sendPackageData, fetchPetitionsVotes, loadPackageVote } from '../redux/actions/documents';

import Button from '../../form-components/button';
import {ButtonDanger, ButtonGreen} from 'components/common-components/buttons';

import form from '../../common-components/form.scss';

const mapStateToProps = state => ({
  document: state.documents.get('document'),
  package_data: state.documents.get('package_data').get('vote'),
  votes: state.documents.get('votes'),
});

const mapDispatchToProps = dispatch => ({
  onLoad: (id, package_name) => {
    dispatch(loadPackageData(id, package_name));
  },
  onClick: (id, package_name, data) => dispatch(sendPackageData(id, package_name, data)),
});

class VotePackage extends Component {
  componentWillMount() {
    this.props.onLoad(this.props.id, 'vote')
  }

  render() {
    const choice = this.props.package_data && this.props.package_data.get('valid');
    return (
      <div>
        {choice ?
          (<ButtonDanger size="18px" value="Відкликати голос" onClick={()=>this.props.onClick(this.props.id, 'vote', {choice: null})} /> ) :
          (<ButtonGreen size="18px" value="Підписати" onClick={()=>this.props.onClick(this.props.id, 'vote', {choice: null})} />
        )}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VotePackage);
