import React, { useContext, useState, useEffect } from 'react';
import domainsFetcher from '@/config/new-domains';

import InputText from 'focus-components/components/input/text';

export const DomainContext = React.createContext({});

const defaultDomain = Object.freeze({
    InputComponent: InputText,
    DisplayComponent: 'span',
    LabelComponent: 'label',
    formatter: (elt) => elt,
    unformatter: (elt) => elt
});

export function useDomain(domainName) {
    let selectedDomain = useContext(DomainContext)[domainName];
    if (!selectedDomain) {
        console.warn('Missing domain ' + domainName);
        console.warn('Returning default domain');
        selectedDomain = defaultDomain;
    }
    return selectedDomain;
}

export default function DomainProvider({ children }) {

    const [domains, setDomains] = useState({});
    useEffect(
        () => {
            domainsFetcher().then(domainList => setDomains(domainList))
        },
        []
    );

    return (
        <DomainContext.Provider value={domains}>
            {children}
        </DomainContext.Provider>
    );
}
