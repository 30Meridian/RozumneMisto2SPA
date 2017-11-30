import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import CKEditor from 'react-ckeditor-wrapper';
import styled from 'styled-components';
import Input from '../../bootstrap-components/input';
import Checkbox from '../../bootstrap-components/checkbox';

import form from '../../common-components/form.scss';

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

const FormResolver = (props) => (
  <div className="build-wrap">
    {props.items.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          return (<p key={index}>{item.label}</p>);
        case 'header':
          switch (item.subtype) {
            case 'h2':
              return (<h2 key={index}>{item.label}</h2>);
            case 'h3':
              return (<h3 key={index}>{item.label}</h3>);
            default:
              return (<h1 key={index}>{item.label}</h1>);
          }
        case 'checkbox-group':
          return (
            <div key={index} className="form-group">
              <label>{item.label}</label>
              <div className="checkbox-group">
                {item.values.map((value, valueIndex) => (
                  <div className="checkbox-inline" key={valueIndex}>
                    <label>
                    <input type="checkbox" value={value.value}
                      name={item.name} className="checkbox-group"
                      selected={props.values.get(index)[valueIndex]}
                      onChange={(event) => props.onValueChange(event.target.value, index)} />
                    {value.label}</label>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'radio-group':
          return (
            <div key={index} className="form-group">
              <label>{item.label}</label>
              <div className="radio-group">
                {item.values.map((value, valueIndex) => (
                  <div className="radio" key={valueIndex}>
                    <input type="radio" value={value.value}
                      name={item.name} id={valueIndex} className="radio-group" required={item.required}
                      selected={props.values.get(index) == value.value}
                      onChange={(event) => props.onValueChange(event.target.value, index)} />
                    <label htmlFor={valueIndex}>{value.label}</label>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'select':
          return (
            <div key={index} className="form-group">
              <label>{item.label}</label>
              <select type="select" className="form-control"
                value={props.values.get(index)}
                onChange={(event) => props.onValueChange(event.target.value, index)}>
                {item.values.map((value, valueIndex) => (
                  <option key={valueIndex} value={value.value}>{value.label}</option>
                ))}
              </select>
            </div>
          );
        case 'textarea':
          return (<div key={index} className={form.divider}>
            <Label>{item.label}:</Label>
            <Textarea required={item.required} value={props.values.get(index)} placeholder={item.placeholder}
            onChange={(event) => props.onValueChange(event.target.value, index)}></Textarea>
            </div>)
        case 'map':
          const position = props.values.get(index) || props.map || [50, 30];
          props.onValueChange({lat: position[0], lng: position[1]});
          return (
            <div key={index} style={{'height': "400px"}}>
              <Map center={position} zoom={8} onClick={(event) => {props.onValueChange(event.latlng, index)}}>
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
              <CKEditor value={props.values.get(index)}
                onChange={(value) => props.onValueChange(value, index)} />
            </div>
            );
        case 'file':
          return (<Input key={index} {...item}
            accept=".pdf, .doc, .docx, .png, .jpg, .jpeg, .gif, .xlsx, .xls, .odt, .tif, .tiff"
            onChange={(event) => props.onValueChange(event.target.files, index)} />);
        case 'checkbox':
          return (<Checkbox key={index} {...item} checked={props.values.get(index)}
            onChange={(event) => props.onValueChange(event.target.checked, index)} />);
        default:
          const {value, ...rest} = item;

          return (<Input key={index} {...rest} value={props.values.get(index)}
            onChange={(event) => props.onValueChange(event.target.value, index)} />)
      }
    })}
  </div>
);

export default FormResolver;
