<h1>Розумне місто</h1>
<h3>Структура проекту:</h3>
<ul>
	<li>http://localhost:3004/index.html#/ - головна сторінка</li>
</ul>
<p>Builds - всі білди проекту</p>
<p>Dev - девелопмент фолдер</p>
<p>Markup - основний фолдер з компонентами та статикою:</p>
<ul>
	<li>Assets - cтатика проекту
		<ol>
			<li>fonts - шрифти, які підключені на проекті</li>
			<li>img - зображення, які використовуються. 2 типа зображень: content - використовуються для контенту і general - логотипи, іконки і т.д.</li>
			<li>js - всі js файли проекту</li>
			<li>scss - всі стилі проекту</li>
		</ol>
	</li>
	<li>components - всі компоненти проекту. В основному двух типів: HTML-компоненти та React-компоненти. Кожний компонент лежить в фолдері, який містить: js(чистий js або реакт компонент - jsx, scss - cтилі компоненту, HTML-компонент</li>
	<li>pages - основні сторінки проекту.
		<ol>
			<li>admin.html - сторінка адмінки, де ініціалізується React-застосунок за допомогою admin.js.</li>
			<li>index.html - головна сторінка, де ініціалізується React-застосунок за допомогою main.js</li>
		</ol>
	</li>
	<li>node_modules - фолдер всіх нод модулей, які встановлюються локально на проекті</li>
	<li>package.json - список залежностей</li>
	<li>webpack.config.js - основні налаштування проекту</li>
</ul>

<h3>Запуск та білд проекту</h3>
<p>Список команд білдера</p>
<ul>
	<li>tars dev - запускає дев версію проекту та локальний сервер</li>
	<li>tars build - створює білд з мініфікованими файлами</li>
	<li>tars update - оновлює TARS білдер</li>
</ul>
