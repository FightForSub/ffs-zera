import React from 'react';
import { translate } from 'focus-core/translation';
import Article from '../components/article';
import Section from '../components/article/section';

export default React.createClass({
    displayName: 'HomeView',
    render() {
        const rules = translate('home.paragraphs.rules', { returnObjects: true })
            .map(rule => {
                return <li>{rule}</li>;
            });
        const handicaps = translate('home.paragraphs.handicaps', { returnObjects: true })
            .map(handi => {
                return <li>{handi}</li>;
            });

        return (
            <div data-app='home-page'>
                <h1 className='display-1'>
                    {translate('website.home')}
                </h1>
                <Article>
                    <Section title={translate('home.titles.whatIsIt')}>
                        <p>
                            {translate('home.paragraphs.game')}
                        </p>
                        <p>
                            {translate('home.paragraphs.sub')}
                        </p>
                    </Section>
                    <Section title={translate('home.titles.rules')}>
                        <h3 className='subheading'>
                            {translate('home.titles.basicRules')}
                        </h3>
                        <ul>
                            {rules}
                        </ul>
                        <h3 className='subheading'>
                            {translate('home.titles.handicap')}
                        </h3>
                        <ul>
                            {handicaps}
                        </ul>
                    </Section>
                </Article>
            </div >
        );
    }
});
