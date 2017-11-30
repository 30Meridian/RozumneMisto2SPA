import React, { Component } from 'react';

import VotePackage from './vote-package';

class PackageResolver extends Component {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => {
          switch (item) {
            case 'vote':
              return (<VotePackage key={index} id={this.props.id} />)
            default:
              return (<div key={index}>Unresolved package</div>)
          }
        })}
      </div>
    );
  }
};

export default PackageResolver;
