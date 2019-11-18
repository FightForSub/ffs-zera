import React from 'react';
import { translate } from 'focus-core/translation';

const SideMenuFooter = () => {
    return (
        <div className='side-menu-footer'>
            <ul>
                <li>
                    <a href='https://github.com/FightForSub' title={translate('global.sidemenu.labels.github')}>
                        <i className='fa fa-github' />
                        {translate('global.sidemenu.buttons.github')}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SideMenuFooter;
