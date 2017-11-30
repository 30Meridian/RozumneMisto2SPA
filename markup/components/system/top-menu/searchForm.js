import React, { Component } from 'react';

import {Input} from '../../form-components';
import {TopForm} from './components';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.focusOnKeyDown = this.focusOnKeyDown.bind(this);
    this.iteration = -1;
    this.dropItems = {};
  }

  focusOnKeyDown(index) {
    this.dropItems[index].focus();
  }

  handleKeyDown(event) {
    const searchedCities = this.props.searchedCities;
    switch(event.key) {
      case 'ArrowUp':
        if (this.iteration > 0) {
          this.iteration--;
          this.focusOnKeyDown(this.iteration);
          event.preventDefault();
        }
        break;
      case 'ArrowDown':
        if (this.iteration < searchedCities.length - 1) {
          this.iteration++;
          this.focusOnKeyDown(this.iteration);
          event.preventDefault();
        }
        break;
      case 'Enter':
        break;
      default:
        this.iteration = -1;
        break;
    }
  }

  render() {
    return (
      <TopForm onKeyDown={(event) => this.handleKeyDown(event)}>
        <Input tabIndex="0" value={this.props.cityValue} onChange={this.props.changeCityValue} inputClassName="form-control form-control-search form-control-search searchForm-input" placeholder="Введіть назву громади"/> {this.props.searchedCities.length > 0 && this.props.cityValue.length > 0 && (
          <div>
            <ul>
              {this.props.searchedCities.map((value, i) => (
                <li
                  ref={(item) => this.dropItems[i] = item}
                  onClick={(event) => {
                    this.props.onSelectChange(value.id);
                    this.props.changeState(false);
                  }}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      this.props.onSelectChange(value.id);
                      this.props.changeState(false);
                    }
                  }}
                >
                  <span>{value.name}</span>
                  ({value.region})
                </li>
              ))}
            </ul>
          </div>
        )}
    </TopForm>
  );
  }
}

export default SearchForm;
