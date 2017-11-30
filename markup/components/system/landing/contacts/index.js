import React, {Component} from 'react';

import Title from 'components/dynamic-title';
import Nav from '../nav';

class Contacts extends Component {
	render() {
		return (
			<div className="contacts-page">
				<Title title={`Контакти. Інформаційна система "Розумне місто" `} />
			<Nav/>
				<div className="container-fluid">
					<div className="card">
						<div className="card-block text-nowrap">
							<div className="container container-fluid">
								<h3>Зв'яжіться з нами</h3>
								<div className="row">
									<div className="col-md-8 com-sm-12 col-xs-12">

										<form>
											<div className="form-group">
												<label for="InputName">Введіть своє ім'я:</label>
												<input type="name" className="form-control " placeholder="Ваше ім'я"/>
											</div>
											<div className="form-group ">
												<label for="InputEmail ">Введіть свій email:</label>
												<input type="email" className="form-control " placeholder="E-mail адреса "/>
											</div>
											<div className="form-group">
												<label for="InputPhone ">Введіть свій телефон:</label>
												<input type="phone" className="form-control " placeholder="Ваш телефон"/>
											</div>

											<div className="form-group ">
												<label for="Textarea ">Введіть ваше повідомлення:</label>
												<textarea className="form-control " rows="5 "></textarea>
											</div>

											<button type="submit " className="btn btn-primary ">Відправити</button>
										</form>

									</div>
									<div className="col-md-4 com-sm-12 col-xs-12">
										<div className="card-block text-xs-center">
											<p className="h3">Контактні дані</p>
											<p className="h6">
												+38(044) 539-44-22
											</p>
											<p className="h6">E-mail:
												<a className="nav-link" href="./index.html">office@rozumnemisto.org</a>
											</p>

										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Contacts;
