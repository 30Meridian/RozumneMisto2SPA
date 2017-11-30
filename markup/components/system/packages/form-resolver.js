import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker } from 'react-leaflet';
import CKEditor from 'react-ckeditor-wrapper';

import { Input } from '../../form-components';
import { changeDocumentFormValue } from '../redux/actions/documents';

import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
  values: state.documents.get('documentFormValue'),
  community: state.system.get('community'),
});

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (data, index) => dispatch(changeDocumentFormValue(data, index)),
});

class FormResolver extends Component {
  componentWillMount() {
    // Reset values
  }

  render() {
    return(
      <div className="build-wrap">
        {this.props.items.map((item, index) => {
          switch (item.type) {
            // case 'checkbox-group':
            //   return (<div key={index} >checkbox-group</div>)
            // case 'radio-group':
            //   return (<div key={index}>radio-group</div>)
            case 'textarea':
              return (<div key={index} className={form.divider}>
                <label>{item.label}:</label>
                <textarea required={item.required} value={this.props.values.get(index)}
                onChange={(event) => this.props.onValueChange(event.target.value, index)}></textarea>
                </div>)
            // case 'paragraph':
            //   return (<p key={index}>Paragraph</p>)
            case 'map':
              const position = this.props.values.get(index) ||
                [Number(this.props.community.get('map_lat')), Number(this.props.community.get('map_lon'))] ||
                [50, 30];
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
                  <CKEditor value={this.props.values.get(index)} onChange={(value) => this.props.onValueChange(value, index)} />
                </div>
                );
            default:
              return (<Input key={index} index={index} type={item.type} label={item.label} required={item.required}
                value={this.props.values.get(index)}
                onChange={(event) => this.props.onValueChange(event.target.value, index)} />)
          }
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResolver);
