import styled from 'styled-components';

export const SidebarWrap = styled.div`
  float: left;

  width: ${props => props.visible ? "50px" : "230px"};
  min-width: ${props => props.visible ? "50px" : "230px"};
  min-height: calc(100vh - 93px);

  border: 1px solid rgba(34, 36, 38, 0.15);
  background-color: #fff;

  font-family: "PT Sans Narrow", sans-serif;
  transition: all .15s ease;

  span {
    display: ${props => props.visible ? "none" : "inline-block"};
  }

  @media (max-width: 768px) {
    width: ${props => props.visible ? "0" : "230px"};
    min-width: ${props => props.visible ? "0" : "230px"};
  }

`;

export const SidebarInner = styled.div`
  margin-bottom: -10000%;
  padding-bottom: 10000%;
  background: #f9fafc;

  a {
    position: relative;
    display: block;
    padding: 12px 5px 12px 15px;
    transition: background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease;
    transition: color .25s linear;
    color: #444;

    &:hover, &:focus {
      text-decoration: none;

      color: #000;
      background: #f4f4f5;
    }
  }

  i {
    padding-right: 5px;
    font-size: 0.85714rem;
  }
`;

export const SidebarHead = styled.div`
  padding: 10px 25px 10px 15px;
  color: #848484;
  font-size: 0.85714rem;
  display: ${props => props.visible ? "none" : "block"};
`;
