import React from 'react';
import Line from './line';
import './style.scss'

function ClassicList({ dataList, ContentLine, onLineClick, ...others }) {

    return (<ul {...others}>
        {dataList.map((data, idx) => <Line onLineClick={(evt) => onLineClick(evt, data)} key={others.key ? others.key : idx}><ContentLine key={idx} {...data} /></Line>)}
    </ul>);
}

ClassicList.defaultProps = {
    ContentLine: () => null,
    onLineClick: () => { },
    'data-list': 'classic'
};

export default ClassicList;