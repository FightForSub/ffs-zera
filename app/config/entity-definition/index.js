/**
* These metadatas are generated automatically.
* @type {Object}
*/

export default {
    results: {},
    user: {
        status: {
            required: true,
            domain: 'DO_STATUS_USER_LIST'
        },
        twitchId: {
            required: true,
            domain: 'DO_ID'
        },
        username: {
            required: true,
            domain: 'DO_LABEL_LONG'
        },
        followers: {
            required: true,
            domain: 'DO_ENTIER'
        },
        views: {
            required: true,
            domain: 'DO_ENTIER'
        },
        score: {
            required: true,
            domain: 'DO_ENTIER'
        },
        email: {
            required: true,
            domain: 'DO_LABEL_LONG'
        },
        event: {
            required: true,
            domain: 'DO_ID'
        }
    },
    event: {
        name: {
            required: true,
            domain: 'DO_LABEL_LONG'
        },
        description: {
            required: true,
            domain: 'DO_DESCRIPTION'
        },
        rankingType: {
            required: true,
            domain: 'DO_RANKING_SORT_LIST'
        },
        reservedToAffiliates: {
            required: true,
            domain: 'DO_YES_NO'
        },
        reservedToPartners: {
            required: true,
            domain: 'DO_YES_NO'
        },
        current: {
            required: true,
            domain: 'DO_YES_NO'
        },
        status: {
            required: true,
            domain: 'DO_STATUS_LIST'
        },
        date: {
            required: true,
            domain: 'DO_DATE'
        },
        minimumViews: {
            required: false,
            domain: 'DO_ENTIER'
        },
        minimumFollowers: {
            required: false,
            domain: 'DO_ENTIER'
        }
    },
    inscription: {
        champ1: {
            required: true,
            domain: 'DO_DATE'
        },
        champ2: {
            required: false,
            domain: 'DO_LABEL_LONG'
        },
        champ3: {
            required: false,
            domain: 'DO_YES_NO'
        },
        champ4: {
            required: false,
            domain: 'DO_EMAIL'
        }
    },
    participant: {}
};
