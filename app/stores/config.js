import { CoreStore } from 'focus-core/store';

/**
* Store dealing with application configuration (can be used to load config from server before starting app).
*/
const configStore = new CoreStore({
    definition: {
        config: 'config'
    }
});

configStore.getConfigValue = (name) => (this.getConfig()[name]);

// Example methods
// configStore.getPasswordMessageSecurite = () => (configStore.getConfigValue('passwordMessageSecurite'));

export default configStore; 
