import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


import styles from './styles.scss';


const mapStateToProps = (state) => ({
  community: state.system.get('community'),
  hostEnable: state.system.get('standaloneHostEnable'),
});

const BreadCrumbs = (props) => (
  <ul className={styles.breadcrumbs}>
    <li><Link to={`/`}><i className="fa fa-home"></i> Головна</Link> </li>
    <li><Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}`}>{props.community.get('name')}</Link> </li>
    <li><Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/${props.documentLink}`}>{props.documentName}</Link> </li>
    <li><Link to={`${props.hostEnable ? '' : '/' + props.community.get('slug')}/${props.documentLink}/document/${props.documentId}`}> №{props.documentId}</Link></li>
  </ul>
);

export default connect(mapStateToProps)(BreadCrumbs);
