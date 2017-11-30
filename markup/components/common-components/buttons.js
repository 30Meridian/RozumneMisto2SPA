import styled from 'styled-components';
import Button from 'components/form-components/button';
import {Link} from 'react-router-dom';
import { FacebookButton, FacebookCount } from "react-social";

export const ButtonDefault = styled(Button).attrs({
	 size: props => props.size || '14px'
  })`
  display: ${props => props.block ? "block" : "inline-block"};
  width: ${props => props.block ? "100%" : "auto"};
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  transition: all .15s ease-in-out;
  font-size: ${props => props.size};
  line-height: 1.35em;
  border: none;
  border-radius: 0.1875rem;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #888;
  color: #FFFFFF;
  outline: 0 !important;

  &:hover, &:focus {
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.17);
    background-color: #979797;
		color: #fff;
  }

	i {
		margin-right: 4px;
	}
`;

export const ButtonGreen = ButtonDefault.extend`
  border-color: #008d4c;
  background-color: #00a65a;

  &:hover, &:focus {
    background-color: #339933;
		color: #fff;
  }
`;

export const ButtonRed = ButtonDefault.extend`
  border-color: #d73925;
  background-color: #dd4b39;

  &:hover {
    background-color: #CC0033;
  }
`;

export const ButtonPrimary = ButtonDefault.extend`
  background-color: #f96332;
  border-color: #f96332;

  &:hover {
    background-color: #fa7a50;
    border-color: #fa7a50;
  }
`;

export const ButtonInfo = ButtonDefault.extend`
  background-color: #17a2b8;
  border-color: #17a2b8;

  &:hover {
    background-color: #2CA8FF;
    color: #fff;
  }
`;

export const ButtonWarning = ButtonDefault.extend`
  background-color: #FFB236;

  &:hover {
    background-color: #e0a800;
    border-color: #d39e00;
  }
`;

export const ButtonDanger = ButtonDefault.extend`
  background-color: #c82333;

  &:hover, &:focus{
    background-color: #FF3636;
    border-color: #bd2130;
  }
`;

export const ButtonTransparent = ButtonDefault.extend`
  background: transparent;
  color: #888;
  border: 1px solid #888;

  &:hover, &:focus {
    color: #888;
    background: transparent;
  }
`;

export const ButtonFacebook = ButtonDefault.extend`
  background-color: #337ab7;
  border-color: #2e6da4;

  &:hover {
    background-color: #286090;
    border-color: #204d74;
  }
`;

export const FacebookBtn = styled(FacebookButton)`
	color: #fff;
`;

export const DefaultLink = ButtonDefault.withComponent(Link);
export const GreenLink = ButtonGreen.withComponent(Link);
export const InfoLink = ButtonInfo.withComponent(Link);

export const DefaultHref = ButtonDefault.withComponent('a');
