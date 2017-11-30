import React, {Component} from 'react';

class Title extends Component {
	render(props) {
		document.title = this.props.title;
		return null;
	}
}

export default Title;
