import styled from 'styled-components';
import {Input} from '../../form-components';
import {InputElement} from '../../form-components/input';
import {Row} from 'react-bootstrap';

export const Head = styled.div`
	display: flex;
	min-height: 2.85714286em;
	margin-top: 0rem;
	margin-bottom: 0;
	border: 0px solid transparent;
	border-radius: 0;
	border-bottom-right-radius: 0;
	background-color: ${props =>
		!props.check ? "#00a65a" : "#00a65a"};
	box-shadow: none;
	font-family: "PT Sans Narrow", sans-serif;
	font-weight: normal;
`;

export const Fonts = styled.div`
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 1.14286rem;

	div {
		cursor: pointer;
		&:first-child {
			position: relative;
	    margin-right: 8px;
		}
	}
`;

export const Search = styled.div`
	position: relative;
	width: 300px;
	margin-left: 20px;

	i {
		position: absolute;
		top: 14px;
		left: 7px;
	}
`;

export const Toggle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 10px;
	cursor: pointer;
	color: #fff;
	font-size: 18px;
`;

export const Logo = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex: 0 0 auto;
	margin: 0em;
	padding: 0 1.14285714em;
	user-select: none;
	transition: background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease;
	vertical-align: middle;
	text-decoration: none;
	text-transform: none;
	color: rgba(0, 0, 0, 0.87);
	color: #fff;
	background: none;
	background: transparent;
	box-shadow: none;
	font-weight: normal;
	line-height: 1;
	-webkit-tap-highlight-color: transparent;

	img {
		max-width: 150px;
		max-height: 45px;
	}
`;

export const HeadInput = styled(InputElement)`
		width: 100%;
		height: 31px;
		margin-top: 7px;
		padding-left: 25px;
		border: 0;
		border-radius: 5px;
		outline: 0;
		&:focus {
			border: 0;
		}
`;

export const RightHeader = styled.div`
	display: flex;
	justify-content: center;
	width: 100px;
	margin: 0em;
	margin-left: auto !important;
`;

export const HeaderRow = styled(Row)`
	display: ${props => props.visible ? "none" : "block"};
`;
