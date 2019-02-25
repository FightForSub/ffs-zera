import React from 'react';
import Select from 'focus-components/components/input/select';
import { translate } from 'focus-core/translation';

//OPEN, CLOSED, STARTED, ENDED

const VALUES = [
    { code: 'SCORE_ASC', label: 'select.scoreAscending' },
    { code: 'SCORE_DESC', label: 'select.scoreDescending' }
];

export default function domainRanking() {
    return Promise.resolve({
        name: 'DO_RANKING_SORT_LIST',
        InputComponent: (props) => <Select values={VALUES} {...props} />,
        DisplayComponent: ({ value }) => <span>{translate((VALUES.find(elt => elt.code === value) || {}).label)}</span>,
        formatter: translate,
        unformatter: (elt) => elt
    });
}