import { translate, init } from 'focus-core/translation';
import traductionFiles from '../../i18n';

export default () => {
    console.info('|--- TRANSLATIONS');

    // Initialize translations configuration.
    const i18nConfig = {
        resources: traductionFiles,
        nsSeparator: ':::',
        interpolation: { escapeValue: false },
        lng: 'fr-FR'///langOpts.i18nCulture
    };

    // Plugin initialization.
    init(i18nConfig, () => {
        return console.info('   |--- Translation correctly initialized.');
    });

}
