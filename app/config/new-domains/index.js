import doRanking from './do-ranking-sort-list';

export default function resolveDomains() {
    return Promise.all([
        doRanking()
    ])
        .then(resolved => resolved.reduce((acc, elt) => {
            acc[elt.name] = elt;
            return acc;
        }, {}));
}