import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {fetchBudgetValue} from '../../redux/actions';
import {Row, Col} from 'react-bootstrap';
import Box from 'components/box';
import BudgetPlaceholder from './placeholder';
 
import styles from './styles.scss';

const mapStateToProps = state => ({
	value: state.system.get('value'),
	community: state.system.get('community')
});

const mapDispatchToProps = dispatch => ({
		fetchBudgetValue: (slug) => dispatch(fetchBudgetValue(slug))
});

class ApiBudget extends Component {

	componentDidMount() {

	 	$('.togg-budget').nextUntil('tr.togg-budget').toggle();

		$('.togg-budget').click(function(){
		   $(this).find('span').text(function(_, value){return value=='-'?'+':'-'});
		    $(this).nextUntil('tr.togg-budget').slideToggle(100, function(){
		    });
		});
	}

	componentWillMount() {
		this.props.fetchBudgetValue(this.props.community.get('slug'));

		RegExp.prototype.execAll = function(string) {
	    let match = null;
	    let matches = new Array();
	    while (match = this.exec(string)) {
	        let matchArray = [];
	        for (let i in match) {
	            if (parseInt(i) == i) {
	                matchArray.push(match[i]);
	            }
	        }
	        matches.push(matchArray);
	    }
	    return matches;
		}
	}

	componentDidUpdate() {
		let innerValue = this.props.value;
		if (innerValue) {
			let htmlResponse = innerValue.toString();
			let extractedScript = /<script[^>]*>{1}[\s\S]*?<\/script>/g.execAll(htmlResponse);
			for (let i = 0; i < extractedScript.length; i++) {
			  let scriptLines = extractedScript[i][0].split("\n");
				scriptLines.pop();
	      scriptLines[0] = "";
	      let cleanScript = scriptLines.join("\n");
	      window.eval(cleanScript);
			}
		}
	}

	render() {
		if (this.props.community	 == undefined) {
			return <div></div>;
		}

		return (
			<div>
				{this.props.community.get('payment_model') == 1 ? (
					<BudgetPlaceholder />
				):(
					<Row>
						<Col md={12}>
							<div className="budget"
								dangerouslySetInnerHTML={{__html: this.props.value}}>
							</div>
						</Col>
					</Row>
				)}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiBudget);
