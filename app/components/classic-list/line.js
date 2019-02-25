import React from 'react';

function Line({ onLineClick, children, ...others }) {
    return (<li onClick={onLineClick} {...others}>
        {children}
        {/* {Object.entries(others).map(([key, value]) => <span key={key}>{value}</span>)} */}
    </li>);
}


Line.defaultProps = {
};

export default Line;