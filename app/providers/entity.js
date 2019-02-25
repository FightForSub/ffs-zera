import React, { useContext, useState, useEffect } from 'react';
import entitiesFetcher from '@/config/new-entities';
import { useDomain } from './domain';

export const EntityContext = React.createContext({});

export function useEntity(entityName) {
    let selectedEntity = useContext(EntityContext)[entityName];
    if (!selectedEntity) {
        console.warn('Missing entity ' + entityName);
        console.warn('Returning empty entity');
        selectedEntity = {};
    }
    return selectedEntity;
}

export function useEntityField(entityName, fieldName) {
    let field = useEntity(entityName)[fieldName];
    if (!field) {
        console.warn('Missing field ' + fieldName + ' in entity ' + entityName);
        console.warn('Returning default field');
        field = { required: false };
    }

    return { ...field, ...useDomain(field.domain) };
}

export default function EntityProvider({ children }) {

    const [entities, setEntities] = useState({});
    useEffect(
        () => {
            entitiesFetcher().then(entities => setEntities(entities))
        },
        []
    );

    return (
        <EntityContext.Provider value={entities}>
            {children}
        </EntityContext.Provider>
    );
}
