import React from 'react';
import { translate } from 'focus-core/translation';

function Article({ title, children }) {
    return (
        <section className='section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp'>
            <div className='mdl-card mdl-cell mdl-cell--12-col'>
                <div className='mdl-card__supporting-text mdl-grid mdl-grid--no-spacing'>
                    <h1 className='mdl-cell mdl-cell--12-col'>{translate(title)}</h1>
                    {children}
                </div>
            </div>
        </section >
    );
    /*<button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onClick={() => this.setState({ isVisible: true })}>
        <i className="material-icons">more_vert</i>
      </button>*/
}


Article.propTypes = {

};
Article.defaultProps = {

};

export default Article;
