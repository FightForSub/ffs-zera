import React, { PropTypes } from 'react';
import { translate } from 'focus-core/translation';
import { format } from 'focus-core/definition/formatter/number';

import Icon from './icon';

const Field = ({ fieldName, value, formatter }) => (
    value[fieldName] ? <span>{translate(`user.${fieldName}`) + ' : ' + formatter(+value[fieldName])}</span> : null
);

const UserLine = (value) => {
    const { url, username } = value;
    return (
        <span className='detail-user-line-content'>
            {url && <a target='_blank' href={url} onClick={evt => evt.stopPropagation()}>
                <Icon iconLib='fa fa-icon'>{'\uF1E8'}</Icon>
                <span>{username}</span>
            </a>}
            {!url && <span>{username}</span>}
            <Field fieldName='score' value={value} formatter={format} />
            <Field fieldName='followers' value={value} formatter={format} />
            <Field fieldName='views' value={value} formatter={format} />
        </span>)
};

UserLine.defaultProps = {
    score: null
};

UserLine.propTypes = {
    username: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    score: PropTypes.number
}

export default UserLine;