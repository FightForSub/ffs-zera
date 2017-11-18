import React, { PropTypes } from 'react';
import { translate } from 'focus-core/translation';
import Icon from './icon';

const Field = ({ fieldName, value }) => (
    value[fieldName] ? <span>{translate(`user.${fieldName}`) + ' : ' + value[fieldName]}</span> : null
);

const UserLine = (value) => {
    const { url, username } = value;
    return (
        <span className='detail-user-line-content'>
            <a target='_blank' href={url} onClick={evt => evt.stopPropagation()}>
                <Icon iconLib='fa fa-icon'>{'\uF1E8'}</Icon>
                <span>{username}</span>
            </a>
            <Field fieldName='score' value={value} />
            <Field fieldName='followers' value={value} />
            <Field fieldName='views' value={value} />
        </span>)
};

UserLine.defaultProps = {
    score: null
};

UserLine.propTypes = {
    username: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    score: PropTypes.number,
}

export default UserLine;