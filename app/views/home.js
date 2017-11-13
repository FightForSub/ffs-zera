import React from 'react';
import { translate } from 'focus-core/translation';
import Article from '../components/article';
import Section from '../components/article/section';

export default React.createClass({
    displayName: 'HomeView',

    render() {
        return (
            <div data-app='home-page'>
                <h3 className='website-title'>{translate('website.home')}</h3>
                <Article>
                    <Section title={translate('home.whatIsIt')}>
                        <div>Une centaine de streamers s'affrontent lors d'une compétition tous les mois sur le jeu PlayerUnknow's Battlegrounds, organisée et commentée par Zerator.</div>
                        <div> Tous les participants de la compétition doivent s'abonner à la chaine Twitch du vainqueur.</div>
                    </Section>
                    <Section title={translate('home.rules')}>
                        <div className='title-section'>Règles de base</div>

                        <ul>
                            <li>3 parties (4 en cas d'égalité au bout de 3 parties)</li>
                            <li>Une fois par mois</li>
                            <li>Uniquement des streamers (affiliate ou partner)</li>
                            <li>La moyenne de votre classement dans les 3 games détermine votre place finale (ce qui veut dire que quelqu'un qui fait TOP 3 - TOP 3 - TOP 3 gagne face à quelqu'un qui fait TOP 1 / TOP 1 / TOP 10)</li>
                            <li>Les kills ne changent rien aux points</li>
                            <li>Mode : TPP (non FPP)</li>
                            <li>Solo only, pas de duo ni de squad</li>
                            <li>Si vous êtes dans le top 15, vous devez fermez votre t'chat de stream.</li>
                            <li>Quand le gagnant sera désigné, il faudra vous abonner à lui EN LIVE devant vos viewers avant de cut le live</li>
                        </ul>

                        <div className='title-section'>Handicap pour certains joueurs (validé avec les concernés)</div>
                        <ul>
                            <li>Pas de stuff T2 / T3 SAUF casque T2</li>
                            <li>Pas d'utilisation de Painkiller/Boissons/Adrenaline Syringe</li>
                            <li>Pas le droit de loot le drop ni de loot sur quelqu'un les objects suivants (AWM, M24, Mk14 EBR, M249, Groza, Ghillie Suit)</li>
                            <li>Pas d'utilisation ni de 8x, ni de 15x</li>
                        </ul>

                    </Section>

                </Article>
            </div >
        );
    }
});
