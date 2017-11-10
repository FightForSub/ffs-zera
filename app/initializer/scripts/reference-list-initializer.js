import { config } from 'focus-core/reference';
//import masterdataServices from '../../services/masterdata';
function _applyAdditionalScopeProperties(scope) {
    switch (scope.code) {
        case 'ALL':
            scope.icon = 'all_inclusive';
            break;
        case 'movie':
            scope.icon = 'movie'
            break;
        case 'person':
            scope.icon = 'person';
            break;
        default:
            scope.icon = 'mood_bad'
            break;
    }
}
// load here all your reference lists
export default () => {
    console.info('|--- REFERENCES');
    //config.set({genders: masterdataServices.loadGenders});
    config.set({
        scopes: () => {
            return Promise.resolve(
                //here call your webservice to get scope references
                [
                    { code: 'ALL', label: 'search.scope.all' },
                    { code: 'movie', label: 'search.scope.movie' },
                    { code: 'person', label: 'search.scope.person' }
                ]
            ).then(scopes => {
                //here define application icons
                scopes.map(_applyAdditionalScopeProperties);
                return scopes;
            });
        }
    });
}


