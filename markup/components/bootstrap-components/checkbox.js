import React from 'react';
import PropTypes from 'prop-types';

import form from '../common-components/form.scss';

const Checkbox = (props) => {
	const rest = Object.assign({}, props);
	delete rest.pk;
	delete rest.description;
	delete rest.subtype;
	return (
		<div className="form-group checkbox-groups">
			<div className="custom-checkbox">
			<input id={props.name} {...rest} />
			<label htmlFor={props.name}>

					{props.label} </label>
      </div>
		</div>
	)
};

Checkbox.defaultProps = {
	type: 'text'
};

Checkbox.propTypes = {
	type: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default Checkbox;
