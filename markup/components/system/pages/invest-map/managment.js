import React, {Component} from 'react';
import Box from 'components/box';
import Title from 'components/dynamic-title';

class Managment extends Component {
	render() {
		return (
			<Box>
				<Title title={`Інвестиційна карта. Керівництво міста. Інформаційна система "Розумне місто"`} />
				<div className="text-center">
					<p>
						<strong>Нетішинська міська рада та її виконавчий комітет</strong>
					</p>
					<p>
						30100, м. Нетішин, вул. Шевченка, 1,
						<br/>
						тел. (03842) 3-37-02, факс (03842) 9-00-94,
						<br/>
						miskrada@netishynrada.gov.ua
						<br/>
					</p>
				</div>
			</Box>
		)
	}
}

export default Managment;
