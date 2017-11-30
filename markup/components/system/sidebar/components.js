import Dropdown from 'react-simple-dropdown/lib/components/Dropdown.js';
import styled from 'styled-components';

export const DropdownWrap = styled(Dropdown)`
	> div {
		padding-left: 5px;
		background-color: #f4f4f5;
	}
`;

export const SidebarMenu = styled.div`
	display: ${props => props.check ? "none" : "block"};
	float: left;
	width: 230px;
	min-width: 230px;
	min-height: calc(100vh - 168px);
	transition: all .15s ease;
	opacity: 1;
	border: 1px solid rgba(34, 36, 38, 0.15);
	background-color: #fff;
	font-family: "PT Sans Narrow", sans-serif;

	i {
		padding-right: 5px;
		font-size: 0.85714rem;
		min-width: 20px;
	}

	a {
		position: relative;
		display: block;
		flex: 0 0 auto;
		padding: 12px 5px 12px 15px;
		user-select: none;
		-webkit-transition: color .25s linear;
		transition: background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease;
		transition: color .25s linear;
		vertical-align: middle;
		text-decoration: none;
		text-transform: none;
		color: rgba(0, 0, 0, 0.87);
		color: #444;
		border-top: none;
		border-right: none;
		background: none;
		background: none;
		font-size: 1rem;
		font-weight: normal;
		-webkit-tap-highlight-color: transparent;
		&:hover {
			text-decoration: none;
			color: #000;
			background: #f4f4f5;
		}
	}

	@media (min-width: 768px) {
		width: ${props => props.toggle ? "50px" : "230px"};
		min-width: ${props => props.toggle ? "50px" : "230px"};
		span {
			display: ${props => props.toggle ? "none" : "inline"};
		}
	}

	@media (max-width: 768px) {
		width: ${props => props.toggle ? "0" : "230px"};
		min-width: ${props => props.toggle ? "0" : "230px"};
		opacity: ${props => props.toggle ? "0" : "1"};
		span {
			display: ${props => props.toggle ? "none" : "inline"};
		}
	}

	> div {
		display: block;
    flex-direction: column;
    width: 100%;
    margin-top: 0rem;
    margin-bottom: -10000%;
    padding-bottom: 10000%;
    border: 0;
    border-radius: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: #f9fafc;
    box-shadow: none;
	}
`;

export const SidebarHead = styled.div`
	padding: 10px 25px 10px 15px;
	color: #848484;
	background: #f9fafc;
	font-size: .85714rem;
`;

export const SidebarSwitch = styled.div`
	display: flex;
	align-items: center;
	padding-left: 15px;

	a {
		padding-left: 0;
	}
`;

export const SidebarMobile = styled.div`
	@media (min-width: 768px) {
		display: none;
	}
`;

export const Alert = styled.span`
	color: #c84513;
`;
