import eventApiDriver from '../config/server/event';

export default {
    loadEvent(id) {
        return eventApiDriver.load({ id });
    },
    loadEventList(data) {
        let { status, skip, top } = data || {};
        const queryObj = {
            status: status || 'OPEN',
            start: skip || 0,
            end: top || 50
        };
        return eventApiDriver.search(null, null, { queryObj });
    },
    createEvent(data) {
        return eventApiDriver.create(null, data);
    },
    updateEvent(data) {
        return eventApiDriver.update({ id: data.id }, data);
    }
}

