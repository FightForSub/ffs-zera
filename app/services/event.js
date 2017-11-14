import eventApiDriver from '@/config/server/event';

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
        const { id, current, ...toSave } = data;
        return eventApiDriver.create(null, toSave);
    },
    updateEvent(data) {
        const { id, ...toSave } = data;
        return eventApiDriver.update({ id: data.id }, toSave);
    },
    listUsers(id) {
        return eventApiDriver.listUsers({ id }).then(arr => {
            return arr.sort((a, b) => ((a || {}).username || '').localeCompare(((b || {}).username || '')));
        });
    },
    addUser(data) {
        const { id, idUser, status, twitchId } = data;
        return eventApiDriver.addUser({ id }, { twitch_id: +twitchId, status });
    },
    getUser({ id, idUser }) {
        return eventApiDriver.getUser({ id, idUser });
    },
    updateUser(data) {
        const { id, idUser, status, ...toSave } = data;
        return eventApiDriver.updateUser({ id, idUser }, { status });
    },
    deleteUser(data) {
        const { id, idUser } = data;
        return eventApiDriver.updateUser({ id, idUser });
    },
    getRounds(id) {
        return eventApiDriver.getRounds({ id });
    },
    getRoundScore({ id, idRound }) {
        return eventApiDriver.getRoundScore({ id, idRound });
    },
    createRound({ id }) {
        return eventApiDriver.createRound({ id });
    },
    deleteRound({ id, idRound }) {
        return eventApiDriver.deleteRound({ id, idRound });
    },
    updateUserScore({ id, idRound, idUser, score }) {
        return eventApiDriver.updateUserScore({ id, idRound, idUser }, { score });
    },
    getCurrentEvent() {
        return eventApiDriver.getCurrentEvent();
    }
}