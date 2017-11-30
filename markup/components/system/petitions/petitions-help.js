import React, { Component } from 'react';

import Title from '../../dynamic-title';
import Box from 'components/box';

import styles from './styles.scss';

class PetitionsHelp extends Component {
	render() {
		return (
			<Box>
				<Title title={`Петиції. Допомога. Інформаційна система "Розумне місто" `} />
				<h3>Допомога по модулю "Петиції" </h3>
				<strong>Як створити петицію?</strong>
				<p>Для того, щоб створити петицію, користувачу необхідно:</p>
				<ul className={styles.helpList}>
					<li>
						<p>- зареєструватися на веб-порталі;</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/reg-1.jpg" />
					</li>
					<li>
						 <p>- місто, яке було вказано при реєстрації, автоматично обирається у верхньому меню. При необхідності, Ви можете його змінити, нажавши на назву міста та обравши нове на мапі;</p>
						 <img src="http://www.rozumnemisto.org/static/img/petitions/reg-2.jpg" />
					</li>
					<li>
						<p>- в лівому меню «Петиції» обрати «Додати петицію»;</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/reg-3.jpg" />
					</li>
					<li>
						<p>- заповнити всі поля та нажати на кнопку «Відправити»:
						</p>
						<ol>
							<li>– Назва петиції;</li>
							<li>– Текст-обгрунтування петиції;</li>
							<li>– Вимоги до органів влади;</li>
							<li>– Кнопка завантаження зображення;</li>
							<li>– Поставте галочку,що Ви згодні з обробкою Ваших персональних даних;</li>
							<li>– Кнопка «Відправити», для надіслання петиції на модерацію.</li>
						</ol>
						<img src="http://www.rozumnemisto.org/static/img/petitions/pic-5-1.png" />
					</li>
					<li>
						<p>Після розгляду Вашої петиції модератором, вона з’явиться на сайті. У випадку, якщо Ваша петиція не пройде модерацію, Вам буде повідомлено про це на вказаний при реєстрації е-мейл.</p>
					</li>
				</ul>
				<strong>Як підписати петицію?</strong>
				<ul className={styles.helpList}>
					<li>
						<p>Для того, щоб підписати петицію, необхідно зайти в меню «Петиції» - «Активні петиції». Підписані Вами петиції мають статус «Підписана», а ті, що можна підписати – «Не підписана».</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/pic-6.png" />
					</li>
					<li>
						<p>Натисніть на назву потрібної петиції та в картці петиції натисніть кнопку «Підписати». На даній сторінці Ви можете бачити опис петиції, кількість зібраних голосів, кількість днів, що залишилося для підписів.</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/pic-7.png" />
					</li>
					<li>
						<p>Якщо петиція вже підписана Вами, ви можете «забрати» свій підпис, натиснувши в картці петицій на кнопку «Відхилити».</p>
						<img src="http://www.rozumnemisto.org/static/img/petitions/pic-8.png" />
					</li>
				</ul>
			</Box>
		)
	}
}

export default PetitionsHelp;
