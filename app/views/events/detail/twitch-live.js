import React from 'react';
import Overlay from '@/components/popin/overlay';
import buildQueryString from '@/utilities/build-query-string';
import { throttle } from 'lodash/function';
class TwitchLive extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showChat: true };
        this.closeOnEscape = this.closeOnEscape.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.throttledResize = throttle(this.handleResize, 100);
        window.addEventListener('resize', this.throttledResize);
    }

    componentWillMount() {
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
        window.removeEventListener('resize', this.throttledResize);
    }

    handleResize() {
        this.forceUpdate();
    }

    closeOnEscape(evt) {
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
        };
        return `https://www.twitch.tv/embed/${channel}/chat?${buildQueryString(params)}`
    }


    render() {
        const shouldRenderChat = document.documentElement.clientWidth >= 720;
        return (
            <div className='twitch-popin' data-focus='popin' data-type='from-right'>
                <Overlay show clickHandler={() => { }} >
                    <div className='live-popin-container'>
                        <div>
                            {this.props.children}
                        </div>
                        <div className='live-iframe-container'>
                            <div className='twitch-header'>
                                {shouldRenderChat && <i className='material-icons' onClick={() => this.setState({ showChat: !this.state.showChat })} data-focus='popin-window-chat'>chat</i>}
                                <i className='material-icons' onClick={() => this.props.onPopinClose()} data-focus='popin-window-close'>close</i>
                            </div>
                            <iframe className='video' src={this.buildVideoUrl(this.props.channel)} />
                            {shouldRenderChat && this.state.showChat && <iframe className='chat' src={this.buildChatUrl(this.props.channel)} />}
                        </div>
                    </div>
                </Overlay>
            </ div >);
    }
}

export default TwitchLive;