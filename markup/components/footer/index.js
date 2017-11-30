import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.footer`
	margin: 0 -15px;
	padding: 15px;

	display: flex;
	justify-content: space-between;

	color: #444;
	border-top: 1px solid #d2d6de;
	background: #fff;

	font-family: "PT Sans Narrow", sans-serif;
	font-size: em(13);

	a {
		color: #00a65a;
		padding-left: 4px;
	}

	i {
		margin: 0 3px;
	}

	@media (max-width: 768px) {
		.footer {
	    flex-direction: column;
	  }
	}
`;

const Footer = () => (
	<FooterWrap>
		<div>
			<strong>© 2017
				<a href="https://www.facebook.com/rozumnemisto.org" target="_blank">Інформаційна система "Розумне місто"</a>
			</strong>. Усі права захищено.
		</div>
		<div>
			З великою
			<i className="fa fa-heart text-red"></i>
			Ваш
			<a href="http://30meridian.com/">"30th Meridian LTD"</a>
		</div>
	</FooterWrap>
);

export default Footer;
