/** @jsx jsx */
import { jsx } from '@emotion/core';
import NotificationInterface from '../../../../types/NotificationInterface';
import { Dropdown } from 'react-bootstrap';
import SmartLink from '../../../SmartLink';
import { notificationDateFormat } from '../../../../helpers/DateHelpers';
import SideBySide from '../../../../designs/layout/SideBySide';
import Avatar from '../../../../designs/Avatar';
import Spacing from '../../../../designs/layout/Spacing';
import Text from '../../../../designs/typography/Text';

export default function ClickableNotification(props: NotificationInterface) {
  return (
    <Dropdown.Item 
      {...SmartLink.shim(props.url)}
      css={{
        backgroundColor: props.read 
          ? 'inherit' 
          : 'rgba(216, 238, 255, 0.3)', // TODO variables
      }}
    >
      <SideBySide>
        <Spacing margin={{ right: 'small' }}>
          <Avatar 
            for={props.fromUser} 
            size="smallish" 
            appearance="square"
          />
        </Spacing>

        <SideBySide.Grow>
          <SideBySide>
            <SideBySide.Grow>
              <strong>{props.fromUser.username}</strong> {props.action}
            </SideBySide.Grow>

            <Text variant="time">
              {notificationDateFormat(props.created)}
            </Text>
          </SideBySide>

          <div>
            {props.content}
          </div>
        </SideBySide.Grow>
      </SideBySide>
    </Dropdown.Item>
  )
}
