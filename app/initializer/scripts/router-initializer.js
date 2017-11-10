import { browserHistory } from 'react-router';
import { setNavigationFunctions } from 'focus-core/history';


import { navigate } from '../../utilities/router';

export default () => {
    console.info('|--- ROUTER');
    setNavigationFunctions(navigate, browserHistory.goBack);
    console.info('   |--- Navigation functions declared');
}
