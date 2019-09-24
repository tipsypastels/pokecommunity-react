import React, { FormEvent, useContext, useState } from 'react'
import { Dropdown, NavItem, Nav, Button, Form } from 'react-bootstrap';

import Icon from '../../../Icon';
import AppContext from '../../../../AppContext';
import newcoreApi from '../../../../bridge/newcoreApi';

import SmartLink from '../../../SmartLink';
import Cookies from 'js-cookie';

export default function GuestUserMenu() {
  const [, appDispatch] = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await newcoreApi({
        url: '/auth/login',
        method: 'post',
        data: { email, password }
      });

      const { user, access, refresh } = response.data;
      appDispatch({ type: 'SIGN_IN', user });

      Cookies.set('access', access);
      Cookies.set('refresh', refresh);

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dropdown
      alignRight
      as={NavItem}
      className="GuestUserMenu"
      id="user-menu"
    >
      <Dropdown.Toggle id="user-menu-toggle" as={Nav.Link}>
        Sign In
        </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>
          <Icon name="user-circle" group="fal" />

          <h2>
            Sign into your account.
            </h2>

          <Form onSubmit={login}>
            <Form.Group controlId="email">
              <Form.Label>
                Account Email
                </Form.Label>

              <Form.Control
                name="email"
                type="email"
                placeholder="Account Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>
                Password
                </Form.Label>

              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign in
              </Button>
          </Form>
        </Dropdown.Header>

        <Dropdown.Header>
          <Icon name="puzzle-piece" group="fal" />

          <h2>
            No account? No worries.
            </h2>

          <Button {...SmartLink.shim('/newaccount.php')} variant="primary">
            Create account
            </Button>
        </Dropdown.Header>
      </Dropdown.Menu>
    </Dropdown>
  );
}