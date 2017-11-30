import React, { Component } from 'react';

import Title from '../../dynamic-title';
import Box from 'components/box';

import styles from './styles.scss';

class DefectsHelp extends Component {
	render() {
		return(
			<Box title3={`Допомога по модулю "Заявки ЖКГ"`}>
				<Title title={`Заявки ЖКГ. Допомога. Інформаційна система "Розумне місто" `} />
				<strong>Як додати дефект чи проблему?</strong>
				<p>Для того, щоб створити заявку, користувачу необхідно:</p>
				<ul className={styles.helpList}>
					<li>
						<p>- зареєструватися на веб-порталі;</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/reg-1.jpg" />
					</li>
					<li>
						<p>- місто, яке було вказано при реєстрації, автоматично обирається у верхньому меню. При необхідності, Ви можете його змінити, натиснувши на назву міста та обравши інше на мапі;</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/reg-2.jpg" />
					</li>
					<li>
						<p>- в лівому меню «Заявку ЖКГ» обрати «Додати заявку»;</p>
						<img src="http://www.rozumnemisto.org/static/img/defects/def-1.jpg" />
					</li>
					<li>
						<p>- заповнити всі поля та натиснути на кнопку «Додати ефект»:</p>
						<ol>
							<li>– Мапа міста, на якій обирається де саме виявлена проблема;</li>
							<li>– Суть заявки;</li>
							<li>– Короткий опис проблеми;</li>
							<li>– Адреса дефекту (заповнюється автоматично після вибору місця на мапі);</li>
							<li>– Кнопка завантаження зображень (може бути декілька)</li>
							<li>– Кнопка «Додати заявку», для надіслання заявки на модерацію.</li>
						</ol>
						<img src="http://www.rozumnemisto.org/static/img/defects/def-2.jpg" />
						<p>Після розгляду Вашої заявки модератором, вона з’явиться на сайті. У випадку, якщо Ваша заявка не пройде модерацію, Вам буде повідомлено про це на вказаний при реєстрації е-мейл.</p>
					</li>
				</ul>
				<strong>Як слідкувати за вирішенням проблеми?</strong>
				<p>В залежності від стадії виконання заявки, вона має різні статуси, які Ви можете бачити в карточці заявки.</p>
				<img src="http://www.rozumnemisto.org/static/img/defects/def-3.jpg" />
			</Box>
		)
	}
}

export default DefectsHelp;
