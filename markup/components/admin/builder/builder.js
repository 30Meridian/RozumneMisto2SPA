import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import TypeList from './type-list';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

import list from './styles.scss';


class Builder extends Component {
	render() {
		return (
			<div className="builder-steps">
					<div className="box-head">
						<h3>Додати бізнес-процес</h3>
					</div>
					<div className={list.btnGroup}>
					<div className="btn-group">
							<Link className="btn btn-default" to={`${this.props.match.url}/step1`}>1. Базова інформація</Link>
							<Link className="btn btn-default" to={`${this.props.match.url}/step2`}>2. Стани</Link>
							<Link className="btn btn-default" to={`${this.props.match.url}/step3`}>3. Переходи</Link>
							<Link className="btn btn-default" to={`${this.props.match.url}/step4`}>4. Відповідальний персонал</Link>
							</div>
					</div>
					<Switch>
						<Route path={`${this.props.match.path}/step1`} component={Step1}/>
						<Route path={`${this.props.match.path}/step2`} component={Step2}/>
						<Route path={`${this.props.match.path}/step3`} component={Step3}/>
						<Route path={`${this.props.match.path}/step4`} component={Step4}/>
					</Switch>
			</div>
		);
	}
};

export default Builder;
