import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';

import EventStore from '@/stores/event';
import eventActions from '@/action/event';
import { navigate } from '@/utilities/router';
import twitchFetch from '@/utilities/twitch-fetch';

export default React.createClass({
    displayName: 'UserCreationView',
    mixins: [formPreset],
    definitionPath: 'user',
    action: {},
    stores: [
        {
            store: EventStore,
            properties: ['eventUserDetail']
        }
    ],
    componentWillMount() {
        if (!this.props.forCreation) {
            eventActions.getUser({ id: this.props.id, idUser: this.props.idUser });
        }
        this.action.save = this.save;
    },

    componentDidMount() {
        if (this.props.forCreation) {
            this.refs['user.usersearch'].refs.input.refs.htmlInput.focus()
        } else {
            this.refs['user.status'].refs.input.refs.htmlSelect.focus()
        }
    },

    save() {
        const { reference, isEdit, isLoading, eventUserDetail, ...dataToSave } = this.state;
        const { id, idUser } = this.props;
        dataToSave.id = id;
        dataToSave.idUser = idUser;

        if (this.props.forCreation) {
            eventActions.addUser(dataToSave, this);
        } else {
            eventActions.updateUser(dataToSave, this);
        }
    },

    afterChange(changeInfos) {
        if (changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId) {
            if (changeInfos.status && changeInfos.status.name && changeInfos.status.name === 'saved') {
                this._displayMessageOnChange(changeInfos);
                if (this.props.onSave) {
                    eventActions.listUsers(this.props.id);
                    this.props.onSave();
                } else {
                    const id = EventStore.getEventDetail().id;
                    eventActions.listUsers(this.props.id);
                    navigate('event/' + id);
                }
            }
        }
    },

    searchUser(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            let userName = this.state.usersearch;
            let id = null;
            if (userName) {
                twitchFetch({ url: `https://api.twitch.tv/helix/users?login=${userName}`, method: 'GET' })
                    .then(jsondata => {
                        if (jsondata.data && jsondata.data.length > 0) {
                            id = jsondata.data[0].id;
                        }
                        this.setState({ usersearch: null, twitchId: id });
                    })
            }
        }
    },

    saveOnEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.clearError();
            if (this._validate()) {
                this.save.call();
            }
        }
    },

    deleteParticipant() {
        const { id, idUser } = this.props;
        eventActions.deleteUser({ id, idUser })
            .then(() => {
                eventActions.listUsers(this.props.id); this.props.onSave();
            });
    },

    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page' onKeyUp={this.saveOnEnter}>
                <h3 className='website-title'>{translate(!this.props.forCreation ? 'label.updateUser' : 'label.createUser')}</h3>
                {!this.props.forCreation && <Button type='button' label='label.deleteParticipant' onClick={this.deleteParticipant} />}
                <div>
                    {this.props.forCreation && this.fieldFor('usersearch', { isEdit: true, onKeyUp: this.searchUser })}
                    {this.fieldFor('twitchId', { isEdit: this.props.forCreation || false })}
                    {!this.props.forCreation && this.fieldFor('username', { isEdit: false })}
                    {this.fieldFor('status')}
                    {!this.props.forCreation && this.fieldFor('followers', { isEdit: false })}
                    {!this.props.forCreation && this.fieldFor('views', { isEdit: false })}
                    {this.buttonSave()}
                </div>
            </div>
        );
    }
});
