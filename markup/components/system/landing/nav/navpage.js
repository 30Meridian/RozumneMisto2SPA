import React, { Component } from 'react';

class NavPage extends Component {
	render() {

		return (

     <nav className="navbar navbar-dark bg-inverse fixed-top navbar-pic">
        <div className="container">
            <a className="navbar-brand" href="./index.html">
                <img src="/assets/img/general/logo.png" width="230px" />
                <span className="sr-only">Розумне місто</span>
            </a>
            <a className="navbar-toggler hidden-md-up pull-xs-right" data-toggle="collapse" href="#collapsingNavbar" aria-expanded="false" aria-controls="collapsingNavbar">
                    &#9776;
                </a>
            <a className="navbar-toggler navbar-toggler-custom hidden-md-up pull-xs-right" data-toggle="collapse" href="#collapsingMobileUser" aria-expanded="false" aria-controls="collapsingMobileUser">
                <span className="icon-user"></span>
            </a>
            <div id="collapsingNavbar" className="collapse navbar-toggleable-custom" role="tabpanel" aria-labelledby="collapsingNavbar">
                <ul className="nav navbar-nav pull-xs-right">

                    <li className="nav-item dropdown hidden-sm-down textselect-off nav-item-toggable active">
                        <a className="nav-link dropdown-toggle" id="dropdownMenu2" href="./index.html" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Проект <span className="icon-caret-down"></span>
                        </a>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Мета проекту</a>
                            <a className="dropdown-item" href="#">Наші мікросервіси</a>
                            <a className="dropdown-item" href="#">Мешканцям</a>
                            <a className="dropdown-item" href="#">Владі</a>
                            <a className="dropdown-item" href="#">Підключити місто</a>
                        </div>
                    </li>


                    <li className="nav-item nav-item-toggable">
                        <a className="nav-link" href="./results.html">Результати</a>
                    </li>

                    <li className="nav-item nav-item-toggable">
                        <a className="nav-link" href="./team.html">Команда</a>
                    </li>

                    <li className="nav-item nav-item-toggable">
                        <a className="nav-link" href="./contacts.html">Контакти</a>
                    </li>

                    <li className="nav-item nav-item-toggable">
                        <a className="nav-link" href="https://github.com/tatygrassini/landio-html" target="_blank">Варашанська громада</a>
                    </li>
                    <li className="nav-item dropdown hidden-sm-down textselect-off">
                        <a className="nav-link dropdown-toggle nav-dropdown-user" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="/ssets/img/content/face5.jpg" height="40" width="40" alt="Avatar" className="img-circle" /> <span className="icon-caret-down"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-user dropdown-menu-animated leftFix" aria-labelledby="dropdownMenu2">
                            <div className="media">
                                <div className="media-left">
                                    <img src="/assets/img/content/face5.jpg" height="60" width="60" alt="Avatar" className="img-circle" />
                                </div>
                                <div className="media-body media-middle">
                                    <h5 className="media-heading">Кузьма Салогуб</h5>
                                    <h6>hey@joelfisher.com</h6>
                                </div>
                            </div>
                            <a href="#" className="dropdown-item text-uppercase">Мій кабінет</a>
                            <a href="#" className="dropdown-item text-uppercase">Мій профіль</a>
                            <a href="#" className="btn-circle has-gradient pull-xs-right">
                                <span className="sr-only">Вийти</span>
                                <span className="icon-cut"></span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="collapsingMobileUser" className="collapse navbar-toggleable-custom dropdown-menu-custom p-x-1 hidden-md-up" role="tabpanel" aria-labelledby="collapsingMobileUser">
                <div className="media m-t-1">
                    <div className="media-left">
                        <img src="/assets/img/content/face5.jpg" height="60" width="60" alt="Avatar" className="img-circle" />
                    </div>
                    <div className="media-body media-middle">
                        <h5 className="media-heading">Кузьма Салогуб</h5>
                        <h6>hey@joelfisher.com</h6>
                    </div>
                </div>
                <a href="#" className="dropdown-item text-uppercase">View posts</a>
                <a href="#" className="dropdown-item text-uppercase">Manage groups</a>
                <a href="#" className="dropdown-item text-uppercase">Subscription &amp; billing</a>
                <a href="#" className="dropdown-item text-uppercase text-muted">Log out</a>
                <a href="#" className="btn-circle has-gradient pull-xs-right m-b-1">
                    <span className="sr-only">Edit</span>
                    <span className="icon-edit"></span>
                </a>
            </div>
        </div>
    </nav>

	)
}
}

export default NavPage;
