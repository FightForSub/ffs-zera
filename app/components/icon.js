import PropTypes from 'prop-types';
import React from 'react';


const Icon = ({ children, iconLib }) => (
    <i className={iconLib}>{children}</i>
);

Icon.defaultProps = {
    iconLib: 'material-icons'
};

Icon.propTypes = {
    iconLib: PropTypes.string,
    children: PropTypes.any.isRequired
}
export default Icon;