import React from 'react';
import { translate } from 'focus-core/translation';


const Section = ({ title, children, size: sizeObj }) => {
    const { desktop, tablet, phone } = sizeObj || {};
    const size = desktop || tablet || phone || 'mdl-cell--12-col';

    return (
        <div className={`section__text mdl-cell ${size}`}>
            {title && <h2>{translate(title)}</h2>}
            {children}
        </div>
    );
}

Section.displayName = 'Section';
Section.propTypes = {

};
Section.defaultProps = {

};

export default Section;


