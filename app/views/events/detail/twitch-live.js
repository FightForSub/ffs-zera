import React from 'react';
import Overlay from './overlay';
import TwitchEmbed from '@/components/twitch-embed';
class TwitchLive extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div className='twitch-popin' data-focus='popin' data-type='from-right'>
                <Overlay show clickHandler={() => { }} >
                    <div className='live-popin-container'>
                        <div>
                            {this.props.children}
                        </div>
                        <div>
                            <div className='twitch-header'><i className='material-icons' onClick={() => this.props.onPopinClose()} data-focus='popin-window-close'>close</i></div>
                            <TwitchEmbed channel={this.props.channel} width='100%' height='100%' />
                        </div>
                    </div>
                </Overlay>
            </ div >);
    }
}

export default TwitchLive;