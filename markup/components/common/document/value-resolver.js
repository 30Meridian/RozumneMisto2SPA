import React from 'react';
import {Map, TileLayer, Marker} from 'react-leaflet';
import config from '../../config';


const ValueResolver = ({item, ...rest}) => {
	const value = item.get('value');
	switch (item.get('form_component_type')) {
		case "map":
			const position = [value['lat'], value['lng']] || [0, 0];
			if (rest.showModal)
				return null;

			return (
				<div style={{
					'height': "400px"
				}}>
					<Map center={position} zoom={12}>
						<TileLayer attribution='&copy; <a href="http://30meridian.com">30M</a>' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
						<Marker position={position}/>
					</Map>
				</div>
			);
		case "ckeditor":
			return (
				<div dangerouslySetInnerHTML={{
					__html: value
				}}></div>
			);
		case "checkbox":
			return <span>
				{value ? "Так" : "Ні"}
			</span>
		case "file":

			return (<div>
								{Object.keys(value).map(key => <a href={config.host + value[key]}><i className="fa fa-file-text-o" aria-hidden="true"></i> Переглянути файл</a>)}
							</div>);
		default:
			return <span>&nbsp;{String(value)}</span>;
	}
};

export default ValueResolver;
