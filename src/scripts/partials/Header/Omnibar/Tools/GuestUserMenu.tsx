import React, { Component, FormEvent } from 'react'
import { Dropdown, NavItem, Nav, Button, Form } from 'react-bootstrap';

import Icon from '../../../Icon';
import vBRoute from '../../../../bridge/vBRoute';
import AppContext from '../../../../AppContext';
import newcoreApi from '../../../../bridge/newcoreApi';

import '../../../../../styles/modules/Header/Omnibar/Tools/GuestUserMenu.scss';

interface IState {
  email: string;
  password: string;
}

export default class GuestUserMenu extends Component<{}, IState> {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
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

            <Form onSubmit={this.login}>
              <Form.Group controlId="email">
                <Form.Label>
                  Account Email
                </Form.Label>

                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Account Email"
                  onChange={
                    e => this.setState({ email: e.target.value })
                  }
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
                  onChange={
                    e => this.setState({ password: e.target.value })
                  }
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

            <Button href={vBRoute('register')} variant="primary">
              Create account
            </Button>
          </Dropdown.Header>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { email, password } = this.state;
    try {
      const response = await newcoreApi({
        url: '/auth/login',
        method: 'post',
        data: { email, password }
      });

      const user = response.data;
      this.context.setCurrentUser(user);
    } catch(e) {
      console.error(e);
    }
  }
}
