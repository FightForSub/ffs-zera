import dispatchLogger from 'focus-devtools/logger/dispatch-logger';
import dispatcher from 'focus-core/dispatcher';
import CoreStore from 'focus-core/store/CoreStore'

export default () => {
    console.info('|--- DEV TOOLS');

    if (__DEV__) {
        console.info('   |--- Activating dev tools logger.');
        dispatchLogger(dispatcher, () => CoreStore.prototype._instances);
    } else {
        console.info('   |--- Not activating dev tools logger.');
    }
}
