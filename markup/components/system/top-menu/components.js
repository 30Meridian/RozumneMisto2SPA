import styled from 'styled-components';

export const TopMenuWrapper = styled.div`
	position: relative;
	font-family: "PT Sans Narrow", sans-serif;
`;

export const TabWrapper = styled.div`
	line-height: 30px;
	float: right !important;

	@media (max-width: 768px) {
		display: none;
	}
`;

export const TabList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: flex;
`;

export const TabItem = styled.li`
	display: inline-block;
	padding: 1px 15px;
	background-color: #00a65a;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	border: 1px solid #fff;
	border-bottom: 0;
	margin-left: -1px;
	min-height: 35px;

	&:first-child {
    margin-left: 0;
  }

  &:last-child {
    border-right: 0;
  }

	a {
		color: #fff;
		transition: all .35s linear;
		border-bottom: ${props => props.cabinet ? "1px dashed #fff" : "0"};

		i {
	    margin-right: 4px;
	  }

	  &:hover, &:focus {
	    color: #fff;
	    text-decoration: none;
	  }
	}
`;

export const ToggleMenu = styled.div`

  > div {
    display: flex;
    align-items: center;
  }

  input {
    height: 80%;
    border-radius: 3px;
    border: 0;
    outline: 0;
    padding: 3px 15px 3px 6px;

		&:focus {
			border: 0;
		}
  }

  i {
    padding-left: 6px;
    color: #fff;
    cursor: pointer;
  }
`;

export const TopForm = styled.form`
  > div {
    margin: 3px;
  }
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #333;
    font-size: 14px;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #333;
    font-size: 14px;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #333;
    font-size: 14px;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #333;
    font-size: 14px;
  }
  label {
    display: none;
  }
  ul {
    position: absolute;
    z-index: 10;
    background: #fff;
    box-shadow: 0.1rem 0.1rem 3rem rgba(0,0,0,.25);
  }

  li {
    padding: 1px 4px;
    border-bottom: 1px solid #000;
    cursor: pointer;
    outline: none;

    @media screen and (max-width: 768px) {
      padding: 8px 4px;
    }

    &:hover {
      color: $green;
      transition: color .15s linear;
    }

    &:focus {
      color: $green;
      transition: color .15s linear;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;
