import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CustomLink = (props) => {
    return (
        <Link
            to={`${__BASE_URL__}${props.to ? props.to : ''}`}
            onClick={props.onClick}
            className={props.className}
        >
            {props.children}
        </Link>
    );
};

CustomLink.defaultProps = {
    className: null
};

CustomLink.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default CustomLink;
