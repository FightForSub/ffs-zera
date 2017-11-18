import React, { PropTypes } from 'react';

const onClickTab = (onClick) => (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onClick();
};

const TabComponent = ({ tabs, children }) => (
    <div className='mdl-tabs mdl-js-tabs mdl-js-ripple-effect is-upgraded'>
        <div className='mdl-tabs__tab-bar'>
            {tabs.map(({ label, isActive, onClick }, idx) => (
                <a
                    key={idx}
                    onClick={onClickTab(onClick)}
                    className={`mdl-tabs__tab ${isActive ? 'is-active' : ''}`}
                >
                    {label}
                </a>)
            )}
        </div>
        <div className='mdl-tabs__panel is-active'>{children}</div>
    </div>
);

TabComponent.propTypes = {
    children: PropTypes.any.isRequired,
    tabs: PropTypes.arrayOf({
        label: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    }).isRequired
}

export default TabComponent;