import { v4 as uuid } from 'uuid';
import UserStore from 'focus-core/user/built-in-store';

class FFSWebsocket {

    constructor(eventId, onMessage) {
        this.webSocket = new WebSocket(__WS_SOCKET_URL__);
        this.eventId = eventId;
        this.identifier = uuid();
        this.onMessageCb = onMessage;
        this.lastPong = +new Date();
        this.lastPing = +new Date();

        this.onopen = this.onopen.bind(this);
        this.onerror = this.onerror.bind(this);
        this.onclose = this.onclose.bind(this);
        this.onmessage = this.onmessage.bind(this);

        this.webSocket.onopen = this.onopen;
        this.webSocket.onerror = this.onerror;
        this.webSocket.onclose = this.onclose;
        this.webSocket.onmessage = this.onmessage;

        this.checkSocket = this.checkSocket.bind(this);
        this.checkSocketId = setInterval(this.checkSocket, 10000);
    }

    checkSocket() {
        console.log('checkSocket', this.lastPong, this.lastPing);
        if (Math.abs(this.lastPong - this.lastPing) > 5000) {
            try {
                clearInterval(this.handle);
                this.handle = null;
                this.webSocket.close()
            } catch (e) {
                // Fail silently
            }
            console.log('WS:Re-Opening Socket');

            this.webSocket = new WebSocket(__WS_SOCKET_URL__);
            this.webSocket.onopen = this.onopen;
            this.webSocket.onerror = this.onerror;
            this.webSocket.onclose = this.onclose;
            this.webSocket.onmessage = this.onmessage;
        }
    }

    close() {
        clearInterval(this.handle);
        clearInterval(this.checkSocketId);
        this.checkSocketId = null;
        this.handle = null;
        this.webSocket.close()
    }

    onopen() {
        this.subscribeToEvent(this.eventId);
        this.sendMessage('PING');
        this.lastPing = +new Date();
        this.handle = setInterval(() => {
            this.sendMessage('PING');
            this.lastPing = +new Date();
        }, 20000);
    }

    onerror(event) {
        console.log('WS:Error', event);
    }

    onclose(event) {
        if (this.handle) {
            clearInterval(this.handle);
        }
        console.log('WS:Close', event);
    }

    onmessage(event) {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
            case 'PONG':
                this.lastPong = +new Date();
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