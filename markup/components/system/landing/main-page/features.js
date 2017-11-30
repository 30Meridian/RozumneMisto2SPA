import React, {Component} from 'react';

import Modules from './modules';
import Typical from './typical';

class Features extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modules: true,
			typical: false
		}
	}

	render() {

		const modules = this.state.modules && !this.state.typical
			? "modules.open"
			: "modules";
		const typical = !this.state.modules && this.state.typical
			? "typical.open"
			: "typical";

		return (
			<div className="section-features text-xs-center">
				<div className="container">
					<div className="tab features-tab">
						<div className="row">
							<div className="col-md-6">
								<button type="radio" onClick={() => this.setState({modules: true, typical: false})} className="btn btn-primary /has-gradient/ btn-block" name="tab" id="tab-first" checked>
									Модулі системи
								</button>
							</div>
							<div className="col-md-6">
								<button type="radio" onClick={() => this.setState({modules: false, typical: true})} className="btn btn-primary /has-gradient/ btn-block" name="tab" id="tab-second" checked>
									Типові рішення
								</button>
							</div>
						</div>
					</div>
					<br/>

					<div className={modules}>
						<Modules/>
					</div>

					<div className={typical}>
						<Typical/>
					</div>

				</div>
			</div>

		)
	}
}

export default Features;
