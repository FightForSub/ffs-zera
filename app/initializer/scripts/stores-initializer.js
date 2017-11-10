import builtInReferenceAction from 'focus-core/reference/built-in-action';
import dispatcher from 'focus-core/dispatcher';
import {advancedSearchStore, quickSearchStore} from 'focus-core/search/built-in-store';

// ordonnancement des chargements de stores
export default () => {
    console.info('|--- STORES');

    const loadReferences = builtInReferenceAction(['scopes']);

    loadReferences().then(() => {
        //loading of advanced search scope store
        dispatcher.handleServerAction({
            data: {
                scope: 'ALL'
            },
            type: 'update',
            identifier: advancedSearchStore.identifier
        });
        //loading of quick search scope store
        dispatcher.handleServerAction({
            data: {
                scope: 'ALL'
            },
            type: 'update',
            identifier: quickSearchStore.identifier
        });
    });
}
