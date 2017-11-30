import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Box from 'components/box';
import MainNews from '../news/news-main';
import MainPetitions from '../petitions/main-petitions';
import MainPolls from '../polls/polls-main';
import MainDefects from '../defects/defects-main';
import CustomServices from '../user-cabinet/services/custom-services';
import Spinner from '../../spinner';

import styles from './styles.scss';


const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	hostEnable: state.system.get('standaloneHostEnable')
});

const mapDispatchToProps = dispatch => ({});

class MainPage extends Component {
	render() {
		if (this.props.community == undefined) {
			return null;
		}

		return (
			<div className="main-page">
				<div className={styles.banner}>
					{this.props.hostEnable ? (
						<img src="/assets/img/general/banner-drohobych.png" />
					):(
						<img src={this.props.community.get('image')} />
					)}

				</div>
				{this.props.community.get('payment_model') == 1 ? (
					<Box>
						<div className={styles.basic}>
							<p><h4>{this.props.community.get('name')}</h4> безкоштовно підключена до всеукраїнського сервісу "Розумне місто" з 4 модулями.</p>
							<p>Допоможіть впровадити електронне врядування у громаді в повному обсязі за 1 день! </p>
							<p>+ 10 модулів та +5 типових рішень</p>
							<p>Для цього просто зв'яжіться з нами:</p>
							<p>
								<ul>
									<li><a href="tel:044 539-44-22"><i className="fa fa-phone"></i> 044 539-44-22</a></li>
									<li><a href="tel:+38(067) 569-44-22"><i className="fa fa-phone"></i> +38(067) 569-44-22</a></li>
									<li><a href=":mailto:office@rozumnemisto.org"><i className="fa fa-envelope"></i> office@rozumnemisto.org</a></li>
								</ul>
							</p>
					 </div>
			 		</Box>
			 ) : this.props.community.get('payment_model') == 2 ? (
				 <div>
					 <MainNews/>
				 </div>
			 ) : this.props.community.get('payment_model') == 3 ? (
				 <div>
					 {this.props.hostEnable ? (
						 <CustomServices />
					 ):null}
					 <MainNews/>
					 <MainPetitions/>
					 <MainDefects/>
					 <MainPolls/>
				 </div>
			 ) : null}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
