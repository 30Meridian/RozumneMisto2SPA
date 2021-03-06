import React, {Component} from 'react';

import Box from 'components/box';

class DrugsPlaceholder extends Component {
	render() {
		return (
			<Box>
				<h3>Реєстр ліків</h3>
				<p>Модуль «Реєстр ліків» призначено для інформування мешканців про перелік залишків лікарських засобів, які надаються хворим безоплатно у лікарнях міста/громади Модуль ефективно працює там, де є відповідальна влада та прозорі медичні установи. Влада показує прозорість та отримує повагу мешканців.</p>
				<p>Також, ми допомагаємо містам автоматизувати процес надання медичних послуг, стати медичному сервісу ближче до людей.</p>
				<p>Працює у 1 місті</p>
			</Box >
		)
	}
}

export default DrugsPlaceholder;
