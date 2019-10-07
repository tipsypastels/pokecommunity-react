import React, { useContext } from 'react'
import OmnibarTool from './OmnibarTool'
import { Dropdown } from 'react-bootstrap'
import SmartLink from '../../../SmartLink';
import Icon from '../../../Icon';
import AppContext from '../../../../AppContext';
import { hasGlobalPerm } from '../../../../helpers/PermissionsHelpers';

interface ActionOptions {
  name: string,
  icon: string;
  url: string;
  if?: any;
}

// TODO fetch badges for these
export default function ModMenu() {
  const [{ currentUser }] = useContext(AppContext);
  
  function action(opts: ActionOptions) {
    if ('if' in opts && !opts.if) {
      return null;
    }

    return (
      <SmartLink className="mod-menu-item" to={opts.url}>
        <Icon.Maybe from={opts.icon} />

        <span>
          {opts.name}
        </span>
      </SmartLink>
    )
  }

  return (
    <OmnibarTool name="mod-menu" icon="toolbox">
      <Dropdown.Header>
        {action({
          name: 'Staff Dashboard',
          icon: 'tachometer',
          url: '/dashboard/staff',
          if: hasGlobalPerm(currentUser, 'canModerateSomething'),
        })}
        
        {action({
          name: 'Reports',
          icon: 'exclamation-circle',
          url: '/dashboard/staff/reports',
          if: hasGlobalPerm(currentUser, 'canModerateSomething'),
        })}

        {action({
          name: 'Promoted Content',
          icon: 'bolt',
          url: '/servicepanel.php?do=managebuzz',
          if: hasGlobalPerm(currentUser, 'canAccessMedia'),
        })}

        {action({
          name: 'Daily Login',
          icon: 'sign-in-alt',
          url: 'https://daily.pokecommunity.com/daily-staff-account-login',
          if: hasGlobalPerm(currentUser, 'canAccessMedia')
        })}

        {action({
          name: 'Audit New Content',
          icon: 'badge-check',
          url: '/dashboard/staff/content-audit/new',
          if: hasGlobalPerm(currentUser, 'canModerateSomething'),
        })}

        {action({
          name: 'Moderated Content',
          icon: 'comment-slash',
          url: '/dashboard/staff/content-audit/moderated',
          if: hasGlobalPerm(currentUser, 'canModerateSomething'),
        })}

        {action({
          name: 'Manage Users',
          icon: 'users',
          url: '/nest/user.php',
          if: hasGlobalPerm(currentUser, 'canAdminister'),
        })}

        {action({
          name: 'Bans',
          icon: 'user-slash',
          url: '/modcp/banning.php',
          if: hasGlobalPerm(currentUser, 'canModerateEverything'),
        })}

        {action({
          name: 'Audit Sign-Ins',
          icon: 'sign-in',
          url: '/dashboard/staff/signin-audit',
          if: hasGlobalPerm(currentUser, 'canModerateEverything'),
        })}

        {action({
          name: 'IP Address Lookup',
          icon: 'globe',
          url: '/dashboard/staff/ip-check',
          if: hasGlobalPerm(currentUser, 'canModerateEverything'),
        })}

        {action({
          name: 'Manage Notices',
          icon: 'megaphone',
          url: '/nest/notice.php',
          if: hasGlobalPerm(currentUser, 'canAdminister'),
        })}

        {action({
          name: 'Post Announcement',
          icon: 'bullhorn',
          url: '/announcement.php?do=edit',
          if: hasGlobalPerm(currentUser, 'canModerateSomething'),
        })}

        {action({
          name: 'Control Panel',
          icon: 'sliders-h-square',
          url: '/nest.php',
          if: hasGlobalPerm(currentUser, 'canAdminister'),
        })}
      </Dropdown.Header>
    </OmnibarTool>
  );
}
