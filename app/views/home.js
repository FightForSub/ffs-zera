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
                <Article>
                    <h1 className='display-1'>
                        {'Fight for '}<span className='green'>{'Sub'}</span>
                    </h1>
                    <Section title={translate('home.titles.whatIsIt')}>
                        <p>
                            {translate('home.paragraphs.game')}
                        </p>
                        <p>
                            {translate('home.paragraphs.sub')}
                        </p>
                    </Section>
                    <Section title={translate('home.titles.rules')}>
                        <h3 className='subheading title-blue'>
                            {translate('home.titles.basicRules')}
                        </h3>
                        <ul>
                            {rules}
                        </ul>
                        <h3 className='subheading title-green'>
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
