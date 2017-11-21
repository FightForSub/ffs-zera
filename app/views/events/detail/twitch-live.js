import React from 'react';
import Overlay from './overlay';
import buildQueryString from '@/utilities/build-query-string';

class TwitchLive extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showChat: true };
        this.closeOnEscape = this.closeOnEscape.bind(this);
    }

    componentWillMount() {
        console.log(document, document.documentElement, document.documentElement.requestFullscreen);

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }

    }

    componentDidMount() {
        document.addEventListener('keydown', this.closeOnEscape);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeOnEscape);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

    }

    closeOnEscape(evt) {
        console.log('KEY', evt.key, evt.keyCode);
        if (evt.key === 'Escape') {
            evt.preventDefault();
            evt.stopPropagation();
            this.props.onPopinClose();
        }
    }

    buildVideoUrl(channel) {
        const params = {
            allowfullscreen: false,
            playsinline: true,
            player: 'twitch_everywhere',
            channel
        };
        return `https://player.twitch.tv/?${buildQueryString(params)}`
    }

    buildChatUrl(channel) {
        const params = {
            darkpopout: true,
            'te-theme': 'dark'
            // player: 'twitch_everywhere'
        };
        return `https://www.twitch.tv/embed/${channel}/chat?${buildQueryString(params)}`
    }


    render() {
        //https://player.twitch.tv/?allowfullscreen=false&playsinline&player=twitch_everywhere&targetOrigin=https%3A%2F%2Fembed.twitch.tv&channel=zerator
        //https://www.twitch.tv/embed/zerator/chat?darkpopout=true&te-theme=dark&origin=https%3A%2F%2Fembed.twitch.tv
        // <TwitchEmbed channel={this.props.channel} width='100%' height='100%' />
        // <iframe src={this.buildVideoUrl(this.props.channel)} />
        // <iframe src={this.buildChatUrl(this.props.channel)} />

        return (
            <div className='twitch-popin' data-focus='popin' data-type='from-right'>
                <Overlay show clickHandler={() => { }} >
                    <div className='live-popin-container'>
                        <div>
                            {this.props.children}
                        </div>
                        <div className='live-iframe-container'>
                            <div className='twitch-header'>
                                <i className='material-icons' onClick={() => this.setState({ showChat: !this.state.showChat })} data-focus='popin-window-chat'>chat</i>
                                <i className='material-icons' onClick={() => this.props.onPopinClose()} data-focus='popin-window-close'>close</i>
                            </div>
                            <iframe className='video' src={this.buildVideoUrl(this.props.channel)} />
                            {this.state.showChat && <iframe className='chat' src={this.buildChatUrl(this.props.channel)} />}
                        </div>
                    </div>
                </Overlay>
            </ div >);
    }
}

export default TwitchLive;