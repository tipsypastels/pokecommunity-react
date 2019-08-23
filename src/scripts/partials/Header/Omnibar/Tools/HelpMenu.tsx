import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import SmartLink from '../../../SmartLink';
import OmnibarTool from './OmnibarTool';

export default function HelpMenu() {
  const [search, setSearch] = useState('');

  return (
    <OmnibarTool name="help-menu" icon="question-circle">
      <Form className="p-2" action="/faq.php" method="get">
        <input type="hidden" name="do" value="search" />

        <Form.Control
          placeholder="Search Help"
          name="q"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form>

      <Dropdown.Item {...SmartLink.shim('/forumdisplay.php?fn=support')}>
        Feedback & Support
      </Dropdown.Item>

      <Dropdown.Item {...SmartLink.shim('/rules')}>
        Community Rules
      </Dropdown.Item>

      <Dropdown.Item {...SmartLink.shim('/rules/moderation-policy')}>
        Moderation Policy
      </Dropdown.Item>

      <Dropdown.Item {...SmartLink.shim('/faq.php')}>
        Help Center
      </Dropdown.Item>

      <Dropdown.Item {...SmartLink.shim('/docs/bbcode')}>
        BBCode List
      </Dropdown.Item>

      <Dropdown.Item {...SmartLink.shim('/docs/emoji')}>
        Emoji List
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item {...SmartLink.shim('/servicepanel.php?do=newbuzzentry')}>
        Promote Content
      </Dropdown.Item>
    </OmnibarTool>
  );
}
