import React, {Component} from 'react';

import Title from 'components/dynamic-title';
import Nav from '../nav';

class Team extends Component {
	render() {
		return (
			<div className="simple-page">
			<Nav/>
			<Title title={`Команда. Інформаційна система "Розумне місто" `} />
				<section className="team">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="col-lg-12">
									<h3>Наша команда</h3>
									<div className="row pt-md">
										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/zhenya-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Євгенія Поремчук</h1>
													<h2>Керівник проекту "Розумне місто", тренер "IRI" по е-врядуванню</h2>
													<a href="https://www.facebook.com/jenya.poremchuk">
														<i className="icon-facebook"></i>
													</a>
												</ul>
											</div>
											<h1>Євгенія Поремчук</h1>
											<h2>Керівник проекту "Розумне місто"</h2>
										</div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/slava1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Святослав Жлуктенко</h1>
													<h2>Менеджер проекту, аналітик</h2>
												</ul>
											</div>
											<h1>Святослав Жлуктенко</h1>
											<h2>Менеджер проекту, аналітик</h2>
										</div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/yura1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Юрій Олійник</h1>
													<h2>Менеджер проекту</h2>
													<a href="https://www.facebook.com/oliyura">
														<i className="icon-facebook"></i>
													</a>
												</ul>
											</div>
											<h1>Юрій Олійник</h1>
											<h2>Менеджер проекту</h2>
										</div>

										<div className="clearfix mobile"></div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/volodya-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Володимир Кашпоров</h1>
													<h2>Менеджер проекту, юрист</h2>
													<a href="https://www.facebook.com/vladimir.kashporov">
														<i className="icon-facebook"></i>
													</a>
												</ul>
											</div>
											<h1>Володимир Кашпоров</h1>
											<h2>Менеджер проекту, юрист</h2>
										</div>
										<div className="clearfix clear-desk"></div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/yevgen1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Євгеній Поремчук</h1>
													<h2>Програміст, засновник проекту "Розумне місто"</h2>
													<a href="https://www.facebook.com/e.poremchuk">
														<i className="icon-facebook"></i>
													</a>
												</ul>
											</div>
											<h1>Євгеній Поремчук</h1>
											<h2>Програміст, засновник проекту "Розумне місто"</h2>
										</div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/venya1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Веніамін Зіневич</h1>
													<h2>Програміст</h2>
													<a href="https://www.facebook.com/profile.php?id=100013953572724">
														<i className="icon-facebook"></i>
													</a>
												</ul>
											</div>
											<h1>Веніамін Зіневич</h1>
											<h2>Програміст</h2>
										</div>

										<div className="clearfix mobile"></div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/dima1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Дмитро Касянчик</h1>
													<h2>Програміст</h2>
												</ul>
											</div>
											<h1>Дмитро Касянчик</h1>
											<h2>Програміст</h2>
										</div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/vika1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Вікторія Жовтун</h1>
													<h2>Тестувальник</h2>
												</ul>
											</div>
											<h1>Вікторія Жовтун</h1>
											<h2>Тестувальник</h2>
										</div>
										<div className="clearfix clear-desk"></div>
										<div className="clearfix mobile"></div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/andrey1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Андрій Компанієць</h1>
													<h2>Фронт-енд програміст</h2>
													<a href="https://www.facebook.com/andrey.kompaniets.587">
														<i className="icon-facebook"></i>
													</a>
												</ul>
											</div>
											<h1>Андрій Компанієць</h1>
											<h2>Фронт-енд програміст</h2>
										</div>

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/new-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Сергій Пономарьов</h1>
													<h2>Менеджер</h2>
												</ul>
											</div>
											<h1>Сергій Пономарьов</h1>
											<h2>Менеджер</h2>
										</div>
										<div className="clearfix mobile"></div>
										{/* <div className="clearfix clear-desk"></div> */}

										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
											<div className="img-box">
												<img src="/assets/img/content/crew/dasha1-min.jpg" className="img-fluid"/>
												<ul className="text-center">
													<h1>Даша Ткач</h1>
													<h2>Помічник керівника</h2>
												</ul>
											</div>
											<h1>Даша Ткач</h1>
											<h2>Помічник керівника</h2>
										</div>
										<div className="clearfix clear-desk"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Team;
