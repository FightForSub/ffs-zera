import React, { Fragment } from 'react';
import createReactClass from 'create-react-class';
import { mixin as lineMixin } from 'focus-components/list/selection/line';
import { translate } from 'focus-core/translation';
import Field from '@/components/field';
export default createReactClass({
    displayName: 'EventLineView',
    mixins: [lineMixin],
    definitionPath: 'event',
    /** @inheritDoc */
    renderLineContent({ status, reservedToAffiliates, reservedToPartners, current }) {
        return (
            <div data-app='line-event'>
                <i className='material-icons'>{status === 'OPEN' ? 'event_available' : status === 'STARTED' ? 'event_seat' : 'event_busy'}</i>
                {this.fieldFor('name')}
                {this.fieldFor('reservedToAffiliates', { hasLabel: true, value: '' + reservedToAffiliates })}
                {this.fieldFor('reservedToPartners', { hasLabel: true, value: '' + reservedToPartners })}
                {this.fieldFor('current', { hasLabel: true, value: '' + current })}
                {this.fieldFor('status')}
            </div>
        );
    }
});


export const NewEventLineView = function NewEventLineView({ name, reservedToAffiliates, reservedToPartners, current, status, rankingType }) {
    return (
        <Fragment>
            <i className='material-icons'>{status === 'OPEN' ? 'event_available' : status === 'STARTED' ? 'event_seat' : 'event_busy'}</i>
            <span>{name}</span>
            <Field entity='event' field='status' value={status} />
            <Field entity='event' field='rankingType' value={rankingType} isEdit />
            <div><label>{translate('event.reservedToAffiliates')}</label><span>{'' + reservedToAffiliates}</span></div>
            <div><label>{translate('event.reservedToPartners')}</label><span>{'' + reservedToPartners}</span></div>
            <div><label>{translate('event.current')}</label><span>{'' + reservedToPartners}</span></div>
            <span>{status}</span>
        </Fragment>
    );
}

    ;