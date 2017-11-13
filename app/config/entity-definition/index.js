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
            domain: 'DO_ENTIER'
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
