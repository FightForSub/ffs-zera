import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
// import Article from '../../components/article';
// import Section from '../../components/article';

export default React.createClass({
    displayName: 'EventCreationView',
    mixins: [formPreset],
    definitionPath: 'event',
    action: {},
    componentWillMount() {
        this.action.save = this.save;
    },
    save(data) {
        alert('TODO save \n' + JSON.stringify(data, null, 4));
        this.props.onSave();
    },
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page'>
                <h3 className='website-title'>{translate('label.createEvent')}</h3>
                <div>
                    {this.fieldFor('name')}
                    {this.fieldFor('date')}
                    {this.buttonSave()}
                </div>
            </div>
        );
    }
});
