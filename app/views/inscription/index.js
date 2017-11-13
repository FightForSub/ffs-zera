import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
// import Article from '../../components/article';
// import Section from '../../components/article';

const InscriptionView = React.createClass({
    displayName: 'InscriptionView',
    mixins: [formPreset],
    definitionPath: 'inscription',
    action: { save: (data) => alert('TODO save \n' + JSON.stringify(data, null, 4)) },
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='inscription-page'>
                <h3 className='website-title'>{translate('label.inscription')}</h3>
                <div className='header'>
                    <div>
                        <div className='logo-login' style={{ backgroundImage: `url(${this.props.logo}` }} />
                    </div>
                    <div className='data'>
                        {this.fieldFor('twitchId', { value: this.props.id, isEdit: false })}
                        {this.fieldFor('pseudo', { value: this.props.username, isEdit: false })}
                        {this.fieldFor('email', { value: this.props.email, isEdit: false })}
                    </div>
                </div>
                <hr />
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

const connect = connectToStore([{
    store: UserStore,
    properties: ['profile']
}], () => {
    return UserStore.getProfile()
});

export default connect(InscriptionView);