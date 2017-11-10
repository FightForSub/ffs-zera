import React from 'react';
import { translate } from 'focus-core/translation';


const Section = ({title, children, size: sizeObj}) => {
    const {desktop, tablet, phone} = sizeObj || {};
    const desktopSize = desktop ? `mdl-cell--${desktop}-col-desktop ` : '';
    const tabletSize = tablet ? `mdl-cell--${tablet}-col-tablet ` : '';
    const phoneSize = phone ? `mdl-cell--${phone}-col-phone ` : '';
    const size = desktop || tablet || phone || 'mdl-cell--12-col';

    return (
        <div className={`section__text mdl-cell ${size}`}>
            {title && <h5>{translate(title)}</h5>}
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


