import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import styles from './styles.scss'

const {PropTypes} = React;

const CustomTick = (props) => {
	const title = props.payload.value.length > 23
	? (props.payload.value.slice(0, 22) + "...")
	: (props.payload.value)

	const xPosition = props.x + 10;
	const yPosition = props.y;
	 return (

		 <g transform={`translate(${xPosition}, ${yPosition})`}>
			 <text x={0} y={0} dx="-10%" dy={0} style={{'fontSize': '10'}} transform={`rotate(-25)`} textAnchor="middle">{title}</text>
		 </g>
	 )
 }

 const CustomTooltip  = React.createClass({
   propTypes: {
     type: PropTypes.string,
     payload: PropTypes.array,
     label: PropTypes.string,
   },

   render() {
     const { active } = this.props;
     if (active) {
       const { payload, label } = this.props;
       return (
         <div className={styles.customTooltip}>
					 <p>{`${label}`}</p>
					 {payload? (<p>{`Значення: ${payload[0].value}`}</p>):(<p>{`Значення: }`}</p>)}
         </div>
       );
     }

     return null;
   }
 });


class SimpleBarChart extends Component {
	render () {
  	return (
			<div className={styles.responsiveContainer}>
				<ResponsiveContainer>
			  	<BarChart data={this.props.data}
			          margin={{top: 5, right: 30, left: 20, bottom: 5}}>

					 <XAxis
					     dataKey="name"
							  interval={0}
								tick={CustomTick}
					  />
					<YAxis />
			     <CartesianGrid strokeDasharray="3 3"/>
			     <Tooltip  content={<CustomTooltip/>}/>
			     <Bar dataKey="value" fill="#8884d8" />
			    </BarChart>
				</ResponsiveContainer>
			</div>
    );
  }
}

export default SimpleBarChart;
