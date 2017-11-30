import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import CKEditor from 'react-ckeditor-wrapper';
import styled from 'styled-components';

import Input from '../../../bootstrap-components/input';
import Checkbox from '../../../bootstrap-components/checkbox';

import form from '../../../common-components/form.scss';

const Label = styled.label`
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  margin: 0;
  font-family: 'PT Sans',sans-serif;
  -webkit-appearance: none;
  padding: .78571429em 1em;
  background: #fff;
  border: 1px solid #e3e3e3;
  outline: none;
  color: rgba(0,0,0,.87);
  border-radius: 10px;
  box-shadow: 0 0 0 0 transparent inset;
  transition: color .1s ease,border-color .1s ease;
  font-size: 1em;
  line-height: 1.2857;
  resize: vertical;
  width: 100%;
  vertical-align: top;
`;

class FormResolver extends Component {
  componentWillMount() {
    // Reset values
  }

  render() {
    return(
      <div className="build-wrap">
        {this.props.items.map((item, index) => {
          switch (item.type) {
            case 'checkbox-group':
              return (<div key={index} >checkbox-group</div>)
            case 'radio-group':
              return (<div key={index}>radio-group</div>)
            case 'textarea':
              return (<div key={index} className={form.dividers}>
                <Label>{item.label}:</Label>
                <Textarea required={item.required} value={this.props.values.get(index)}
                onChange={(event) => this.props.onValueChange(event.target.value, index)}></Textarea>
                </div>)
            case 'map':
              const position = this.props.values.get(index) || [50, 30];
              return (
                <div key={index} style={{'height': "400px"}}>
                  <Map center={position} zoom={8} onClick={(event) => this.props.onValueChange(event.latlng, index)}>
      							<TileLayer
      								attribution='&copy; <a href="http://30meridian.com">30M</a>'
      								url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      								/>
                    <Marker position={position} />
      						</Map>
                </div>
              )
            case 'ckeditor':
              return (
                <div key={index}>
                  <label>{item.label}:</label>
                  <CKEditor value={this.props.values.get(index)}
                    onChange={(value) => this.props.onValueChange(value, index)} />
                </div>
                );
            case 'file':
              return (<Input key={index} {...item}
                accept=".pdf, .doc, .docx, .png, .jpg, .jpeg, .gif, .xlsx, .xls, .odt, .tif, .tiff"
                onChange={(event) => this.props.onValueChange(event.target.files, index)} />);
            case 'checkbox':
              return (<Checkbox key={index} {...item} checked={this.props.values.get(index)}
                onChange={(event) => this.props.onValueChange(event.target.checked, index)} />);
            default:
              const {value, ...rest} = item;

              return (<Input key={index} {...rest} value={this.props.values.get(index)}
                onChange={(event) => this.props.onValueChange(event.target.value, index)} />)
          }
        })}
      </div>
    )
  }
}

export default FormResolver;
