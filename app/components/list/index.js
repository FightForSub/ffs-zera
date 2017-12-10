import React, { Component, PropTypes } from 'react';
import { Link } from '@/components/router';

const defaultProps = {
    dataList: [],
    isWrapping: false
};

const propTypes = {
    dataList: PropTypes.arrayOf(
        PropTypes.shape({
            avatar: PropTypes.shape({
                className: PropTypes.string,
                iconText: PropTypes.string
            }),
            LineContent: PropTypes.any.isRequired,
            actions: PropTypes.arrayOf(
                PropTypes.shape({
                    action: PropTypes.func.isRequired,
                    iconText: PropTypes.string.isRequired
                })
            )
        })
    ).isRequired,
    isWrapping: PropTypes.bool.isRequired,
    nbItems: PropTypes.number
};

const List = (props) => {
    return (
        <ul
            className='mdl-list'
            data-dd={(props.isWrapping ? 'empilable' : '') + ' ' + (props.nbItems ? 'nb-items-' + props.nbItems : '')}
        >
            {
                props.dataList.map(({ avatar, logoUrl, name, LineContent, actions, onClick, selected }, index) => {
                    return (
                        <li key={index} className='mdl-list__item'>
                            <span className='mdl-list__item-primary-content mdl-button--raised' data-dd={`list-grey-elt ${selected ? 'selected' : ''}`} onClick={(evt) => onClick(evt)}>
                                {avatar &&
                                    <i className={`${avatar.className || 'material-icons'} mdl-list__item-avatar`}>{avatar.iconText}</i>
                                }
                                {
                                    <img className={'mdl-list__item-avatar'} src={logoUrl ? logoUrl : undefined} />
                                }
                                <span>
                                    {LineContent}
                                </span>
                            </span>
                            <span className='mdl-list__item-secondary-content'>
                                {actions && actions.map(({ iconText, action }, idxAction) => (

                                    <button key={idxAction} className='mdl-list__item-secondary-action mdl-button mdl-js-button mdl-button--icon mdl-button--colored' onClick={action}>
                                        <i className='material-icons'>{iconText}</i>
                                    </button>
                                ))}
                            </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}


List.displayName = 'List';
List.defaultProps = defaultProps;
List.propTypes = propTypes;

export default List;