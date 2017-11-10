import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
// import Article from '../../components/article';
// import Section from '../../components/article';

export default React.createClass({
    displayName: 'InscriptionView',
    mixins: [formPreset],
    definitionPath: 'inscription',
    action: { save: (data) => alert('TODO save \n' + JSON.stringify(data, null, 4)) },
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page'>
                <h3 className='website-title'>{translate('label.inscription')}</h3>
                <div>

                    {this.fieldFor('champ1')}
                    {this.fieldFor('champ2')}
                    {this.fieldFor('champ3')}
                    {this.fieldFor('champ4')}
                    {this.buttonSave()}
                </div>
            </div>
        );
    }
});
