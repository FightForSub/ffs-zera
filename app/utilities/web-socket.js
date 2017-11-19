import { v4 as uuid } from 'uuid';
import UserStore from 'focus-core/user/built-in-store';

const __WS_SOCKET_URL__ = 'wss://pubsub-ffs-test.zerator.com/';

class FFSWebsocket {

    constructor(eventId, onMessage) {
        this.webSocket = new WebSocket(__WS_SOCKET_URL__);
        this.eventId = eventId;
        this.identifier = uuid();
        this.onMessageCb = onMessage;

        this.onopen = this.onopen.bind(this);
        this.onerror = this.onerror.bind(this);
        this.onclose = this.onclose.bind(this);
        this.onmessage = this.onmessage.bind(this);

        this.webSocket.onopen = this.onopen;
        this.webSocket.onerror = this.onerror;
        this.webSocket.onclose = this.onclose;
        this.webSocket.onmessage = this.onmessage;
    }

    close() {
        clearInterval(this.handle);
    }

    onopen() {
        this.subscribeToEvent(this.eventId);
        this.sendMessage('PING');
        this.handle = setInterval(() => {
            this.sendMessage('PING');
        }, 20000);
    }

    onerror(event) {
        console.log('WS:Error', event);
    }

    onclose(event) {
        console.log('WS:Close', event);
    }

    onmessage(event) {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
            case 'PONG':
                this.lastPong = +new Date();
                console.log('WS LAST PONG', this.lastPong);
                break;
            case 'RESPONSE':
                // TODO check subscription
                break;
            case 'MESSAGE':
                // TODO check if this is for current subscription
                this.onMessageCb(JSON.parse(msg.data.message), msg.data.topic);
                break;

            default:
                throw new Error(`Unexpected message type:${msg.type}, with data :${msg.data}`)
        }
    }

    sendMessage(type, data = {}) {
        this.webSocket.send(JSON.stringify({
            ...data,
            type
        }));
    }

    subscribe(topics) {
        const authToken = (UserStore.getProfile() || {}).apiToken;
        const subscription = {
            nonce: this.identifier,
            topics
        };
        if (authToken) {
            subscription.auth_token = authToken;
        }
        this.sendMessage('SUBSCRIBE', subscription);
    }

    subscribeToEvent(eventId) {
        this.subscribe([`event-score-v1.${eventId}`]);
    }

    unsubscribe(topics) {
        const unsub = {
            nonce: this.identifier,
            topics
        };
        this.sendMessage('UNSUBSCRIBE', unsub);
    }

    unsubscribeToEvent(eventId) {
        this.unsubscribe([`event-score-v1.${eventId}`]);
    }

    changeEventSubcription(eventId) {
        this.unsubscribeToEvent(this.eventId);
        this.eventId = eventId;
        this.subscribeToEvent(eventId);
    }
}

export default FFSWebsocket;