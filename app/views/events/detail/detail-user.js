import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import EventStore from '@/stores/event';
import eventActions from '@/action/event';
import Button from 'focus-components/components/button';

// import Article from '../../components/article';
// import Section from '../../components/article';
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

        // // alert('TODO save \n' + JSON.stringify(data, null, 4));
        // this.props.onSave();
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
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page'>
                <h3 className='website-title'>{translate(!this.props.forCreation ? 'label.updateUser' : 'label.createUser')}</h3>
                {!this.props.forCreation && <Button label='label.deleteParticipant' onClick={() => { const { id, idUser } = this.props; eventActions.deleteUser({ id, idUser }).then(() => { eventActions.listUsers(this.props.id); this.props.onSave(); }) }} />}
                <div>
                    {this.props.forCreation && this.fieldFor('usersearch', { isEdit: true, onKeyUp: this.searchUser })}
                    {this.fieldFor('twitchId', { isEdit: this.props.forCreation || false })}
                    {!this.props.forCreation && this.fieldFor('username', { isEdit: false })}
                    {this.fieldFor('status')}
                    {!this.props.forCreation && this.fieldFor('followers', { isEdit: false })}
                    {!this.props.forCreation && this.fieldFor('views', { isEdit: false })}
                    {/* {this.fieldFor('date')} */}
                    {this.buttonSave()}
                </div>
            </div>
        );
    }
});
/*

followers
:
729
grade
:
4000
logo
:
"https://static-cdn.jtvnw.net/jtv_user_pictures/alexmogtv-profile_image-b9e9d6b7f81b7992-300x300.jpeg"
status
:
"VALIDATED"
twitchId
:
74010347
url
:
"https://www.twitch.tv/alexmogtv"
username
:
"AlexMogTV"
views
:
4442
*/
// {"id":3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
