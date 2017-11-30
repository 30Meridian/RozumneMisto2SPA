import React, {Component} from 'react';

class Flips extends Component {
	render() {
		return (
			<section className="section-features text-xs-center">
				<div className="container text-center">
					<h3 className="text-xs-center p-t-1">
						<span className="line"></span>
						<span className="text">Мешканцям</span>
					</h3>
					<div className="project-cards" id="citizens">
						<div className="container">


								<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
									<div className="flip">
										<div className="card">
											<div className="face front">
												<div className="inner">
													<img src="/assets/img/general/defects.svg" className="img-fluid"/>
												</div>
												<p>Модуль «Заявки ЖКГ»
												</p>
											</div>
											<div className="face back">
												<div className="inner text-center">
													<p>Знаєте про дефекти житлово-комунального господарства – у вашому домі, під’їзді, дворі, на дорозі ? – залиште заявку про потребу виправлення за допомогою модуля «Заявки ЖКГ»</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
									<div className="flip">
										<div className="card">
											<div className="face front">
												<div className="inner">
													<img src="/assets/img/general/card.svg" className="img-fluid rounded mx-auto d-block"/>
													<p>Модуль «Відкритий бюджет»</p>
												</div>
											</div>
											<div className="face back">
												<div className="inner text-center">
													<p>Хочете переконатися, що бюджет вашого міста формується і розподіляється як годиться? – перевірте це за допомогою модуля «Відкритий бюджет»
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="clearfix sm"></div>

								<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
									<div className="flip">
										<div className="card">
											<div className="face front">
												<div className="inner">
													<img src="/assets/img/general/open.svg" className="img-fluid "/>
													<p>Модуль «Публічні фінанси»</p>
												</div>
											</div>
											<div className="face back">
												<div className="inner text-center">
													<p>
														Потребуєте інформації про видатки, які здійснюються розпорядниками і одержувачами бюджетних коштів ? – скористайтеся модулем «Публічні фінанси».
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="clearfix flip-md"></div>

								<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
									<div className="flip">
										<div className="card">
											<div className="face front">
												<div className="inner">
													<img src="/assets/img/general/e-service.svg" className="img-fluid"/>
													<p>Модуль «Електронні послуги»</p>
												</div>
											</div>
											<div className="face back">
												<div className="inner text-center">
													<p>
														Не хочете витрачати час на черги за довідками ? - скористайтеся державними електронними сервісами за допомогою модуля «Електронні послуги»
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="clearfix sm"></div>


							<div className="clearfix m-t-3"></div>
							<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
								<div className="flip">
									<div className="card">
										<div className="face front">
											<div className="inner">
												<img src="/assets/img/general/purchase.svg" className="img-fluid"/>
												<p>Модуль «Електронні закупівлі»
												</p>
											</div>
										</div>
										<div className="face back">
											<div className="inner text-center">
												<p>Цікавитеся закупівлями, які здійснюються органами/підприємствами міста/громади? – зверніться до модуля «Електронні закупівлі»
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
								<div className="flip">
									<div className="card">
										<div className="face front">
											<div className="inner">
												<img src="/assets/img/general/blood.svg" className="img-fluid"/>
												<p>Модуль «Донорство крові»</p>
											</div>
										</div>
										<div className="face back">
											<div className="inner text-center">
												<p>Ви є донором крові чи самі шукаєте донорів ? – для Вас працює модуль «Донорство крові»
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="clearfix sm"></div>

							<div className="clearfix flip-md"></div>

							<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
								<div className="flip">
									<div className="card">
										<div className="face front">
											<div className="inner">
												<img src="/assets/img/general/petition1.svg" className="img-fluid"/>
												<p>Модуль «Петиції»</p>
											</div>
										</div>
										<div className="face back">
											<div className="inner text-center">
												<p>Бажаєте змінити своє місто на краще? – напишіть колективне звернення у модулі «Петиції»</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-xs-12 col-md-4 col-sm-6 col-xl-3">
								<div className="flip">
									<div className="card">
										<div className="face front">
											<div className="inner">
												<img src="/assets/img/general/news.svg" className="img-fluid"/>
												<p>Модуль «Новини міста»</p>
											</div>
										</div>
										<div className="face back">
											<div className="inner text-center">
												<p>
													Бажаєте дізнатися останні новини свого міста? – для Вас модуль «Новини міста»
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="clearfix sm"></div>
							<div className="clearfix flip-md"></div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Flips;
