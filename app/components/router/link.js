import React from 'react';
import { Link } from 'react-router'

export default (props) => (<Link to={`${__BASE_URL__}${props.to?props.to:''}`} onClick={props.onClick}>{props.children}</Link>);
