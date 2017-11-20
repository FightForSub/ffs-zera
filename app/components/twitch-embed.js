import React from 'react';


class TwitchEmbed extends React.Component {

    componentDidMount() {
        const { channel, width, height } = this.props;
        const twitchArg = this.buildTwitch(channel, width, height);
        this.twitch = new Twitch.Embed(channel, twitchArg);
    }

    buildTwitch(channel, width, height) {
        const twitchArg = { channel: this.props.channel, theme: 'dark', allowfullscreen: false };
        if (width) {
            twitchArg.width = width;
            twitchArg.height = height;
        }
        return twitchArg;
    }

    componentDidUpdate({ channel, width, height }) {
        if (channel && channel !== this.props.channel) {
            const twitchArg = this.buildTwitch(channel, width, height);
            const iframe = this.refs.container.children[0];
            if (iframe) {
                iframe.remove();
            }
            this.twitch = new Twitch.Embed(this.props.channel, twitchArg);
        }
    }

    render() {
        return <div ref='container' className='twitch-live-container' id={this.props.channel} />
    }
}


export default TwitchEmbed;