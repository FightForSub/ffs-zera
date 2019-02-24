import React, { useEffect, useReducer } from 'react';
import localForage from 'localforage';
import twitchFetch from '@/utilities/twitch-fetch';

export const UserContext = React.createContext({});

function initPersistedAuth(dispatchUser) {
    localForage.getItem('twitch_data').then(data => {
        if (data) {
            const { token, scope } = data;
            twitchFetch({ url: 'https://api.twitch.tv/kraken', method: 'GET' }, { headers: { Authorization: `OAuth ${token}` } }).then(response => {
                if (response && response.token && response.token.valid) {
                    dispatchUser({
                        payload: { scope, token },
                        type: 'merge'
                    })
                    // dispatchData('profile');
                } else {
                    dispatchUser({ type: 'reset' })
                    localForage.clear();
                    // dispatchData('profile', null);
                }
            }).catch(() => {
                dispatchUser({ type: 'reset' })
                localForage.clear();
                // dispatchData('profile', null);
            });
        }
    });
}


function userReducer(state, { type, payload }) {
    switch (type) {
        case 'reset':
            return {};
        case 'merge':
            return { ...state, ...payload };
        default:
            throw 'Unhandled case ' + type;
    }
}

export default function UserProvider({ children }) {

    const [userState, dispatchUser] = useReducer(userReducer, {});

    useEffect(
        () => initPersistedAuth(dispatchUser),
        []
    );

    return (
        <UserContext.Provider value={{ profile: userState, dispatchUser }}>
            {children}
        </UserContext.Provider>
    );
}

// function init(initialCount) {
//     return {count: initialCount};
//   }

//   function reducer(state, action) {
//     switch (action.type) {
//       case 'increment':
//         return {count: state.count + 1};
//       case 'decrement':
//         return {count: state.count - 1};
//       case 'reset':
//         return init(action.payload);
//       default:
//         throw new Error();
//     }
//   }

//   function Counter({initialCount}) {
//     const [state, dispatch] = useReducer(reducer, initialCount, init);
//     return (
//       <>
//         Count: {state.count}
//         <button
//           onClick={() => dispatch({type: 'reset', payload: initialCount})}>
//           Reset
//         </button>
//         <button onClick={() => dispatch({type: 'increment'})}>+</button>
//         <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       </>
//     );
//   }