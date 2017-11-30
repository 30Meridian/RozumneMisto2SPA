import styled from 'styled-components';
import {InputElement} from 'components/form-components/input';

export const HeaderWrap = styled.div`
  border: 0px solid transparent;
  background: #00a65a;
  box-shadow: none;
  border-bottom-right-radius: 0;
  border-radius: 0;
  margin-top: 0rem;
  margin-bottom: 0;
  display: flex;
  font-weight: normal;
  min-height: 2.85714286em;
  font-family: "PT Sans Narrow", sans-serif;
`;

export const HeaderRight = styled.div`
  display: flex;
  margin-left: auto !important;
  margin: 0em;

  a {
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    padding: 0 15px;
    transition: background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoItem = styled.div`
  position: relative;
  vertical-align: middle;
  line-height: 3;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  flex: 0 0 auto;
  user-select: none;
  background: none;
  padding: 0 1.14285714em;
  text-transform: none;
  color: #fff;
  font-weight: normal;
  transition: background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease;
  margin: 0em;
  background: transparent;
  box-shadow: none;

  img {
    width: 148px;;
  }
`;

export const Toggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
`;

export const SearchWrap = styled.div`
  position: relative;
  width: 300px;
  margin-left: 25px;

  i {
    position: absolute;
    top: 14px;
    left: 7px;
  }

  @media (max-width: 768px) {
    display: ${props => props.visible ? "block" : "none"};
  }
`;

export const HeadInput = styled(InputElement)`
  border-radius: 5px;
  border: 0;
  height: 31px;
  padding-left: 25px;
  margin-top: 6px;

  &:focus {
    border: 0;
  }
`
