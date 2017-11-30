import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom';
import {fetchCommunities, changeCitySearchValueMain, submitCitySearchMain, clearCitySearchValueMain} from '../../redux/actions';

import styled from 'styled-components';
import {redirectToCommunity} from '../../redux/actions';
import Input from '../../../form-components/input';
import Button from '../../../form-components/button';
import history from '../../../history';
import {InputElement} from '../../../form-components/input';

import styles from './styles.scss';

const mapStateToProps = (state) => ({communities: state.system.get('communities'), cityValueMain: state.system.get('cityValueMain'), searchedCities: state.system.get('searchedCities')});

const mapDispatchToProps = (dispatch) => ({
  onSelectChange: (id) => {
    dispatch(redirectToCommunity(id))
    dispatch(clearCitySearchValueMain())
  },
  fetchCommunities: () => dispatch(fetchCommunities()),
  changeCityValue: (event) => {
    dispatch(changeCitySearchValueMain(event.target.value))
    dispatch(submitCitySearchMain())
  },
  onSubmitCitySearch: () => dispatch(submitCitySearchMain())
});

const SearchWrap = styled.div`
  position: relative;
  max-width: 510px;
  margin: 0 auto;
`;

const SearchButton = styled(Button)`
  position: absolute;
  top: 3px;
  right: 4px;
  display: block;
  width: 44px;
  height: 44px;
  padding: 8px 14px;
  outline: 0;

  transition: all .2s;
  color: #666666;
  border: none;
  background: #FFFFFF;
  line-height: 29px;
  border-radius: 50%;
`;

export const HeadInput = styled(InputElement)`
  height: 50px;
  border: 0;
  background-color: rgba(0,0,0,.3);
  font-size: 18px;
  transition: all .35s ease;

  &::-webkit-input-placeholder {
    color: #fff;
    font-size: 14px;
  }

  &:-moz-placeholder {
    color: #fff;
    font-size: 14px;
  }

  &:-ms-input-placeholder {
    color: #fff;
    font-size: 14px;
  }

  &:focus {
    background-color: rgba(0,0,0,.9)!important;
    color: #fff;
    border: none;

    &::-webkit-input-placeholder {
      color: transparent;
    }

    &:-moz-placeholder {
      color: transparent;
    }

    &:-ms-input-placeholder {
      color: transparent;
    }
  }
`;

class Head extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
    };
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

  componentWillMount() {
    this.props.fetchCommunities();
  }

  render() {
    return (
      <header className="landing-header">
        <div className="header-content">
          <h1 className="display-3">РОЗУМНЕ МІСТО</h1>
          <h2 className="m-b-3 hidden-sm-down">всеукраїнська платформа електронного врядування та демократії</h2>
          <div className="container-fluid">
            <SearchWrap>
              <form onKeyDown={(event) => this.handleKeyDown(event)}>
                <HeadInput tabIndex="0" value={this.props.cityValueMain} onChange={this.props.changeCityValue}
                  inputClassName="form-control form-control-search"
                  placeholder="Знайди свою громаду"/>
                  <SearchButton iconClass="fa fa-search"/>
                  {this.props.searchedCities.length > 0 && this.props.cityValueMain.length > 0 &&(
                    <div className={styles.searchDropdown}>

                      <ul>
                        {this.props.searchedCities.map((value, i) => <li
                          ref={(item) => this.dropItems[i] = item}
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              this.props.onSelectChange(value.id);
                            }
                          }}
                          onClick={() => this.props.onSelectChange(value.id)}>
                          <span>{value.name}</span> ({value.region})
                        </li>)}
                      </ul>
                    </div>
                  )}
                </form>
              </SearchWrap>
            </div>

            <div className={styles.buttonsWrapper}>

              <Link to="/kuzn">
              <div className="btn-default">
                <i className="fa fa-home" aria-hidden="true"></i>
                Тестове місто
              </div>
            </Link>

            <a href="https://www.facebook.com/rozumnemisto.org/" target="_blank">
            <div className="btn-default">
              <i className="fa fa-facebook" aria-hidden="true"></i>
              Ми на Facebook
            </div>
          </a>

          <a href="https://www.youtube.com/channel/UCRK-b3HwqcdJd-KisCp64Dg" target="_blank">
          <div className="btn-default">
            <i className="fa fa-youtube" aria-hidden="true"></i>
            Ми на YouTube
          </div>
        </a>
      </div>

    </div>
  </header>
)
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Head);
