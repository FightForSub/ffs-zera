import React from 'react';
import { translate } from 'focus-core/translation';

function SideMenuFooter() {
    return (
        <div className='side-menu-footer'>
            <ul>
                <li>
                    <a href='https://github.com/FightForSub' title={translate('global.sidemenu.labels.github')}>
                        <i className='fa fa-github' />
                        {translate('global.sidemenu.buttons.github')}
                    </a>
                </li>
                <li>
                    <a href='https://status.unexpected-studio.com/' title={translate('global.sidemenu.labels.status')}>
                        {translate('global.sidemenu.buttons.status')}
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideMenuFooter;
