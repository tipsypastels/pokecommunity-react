import React, { Component } from 'react';

interface IProps {
  users: object[];
  guests: object[];
  viewing: string;
}

class Viewing extends Component<IProps> {
  render() {
    // TODO plurarize
    const { users, guests, viewing } = this.props;
    return (
      <div className="block Viewing">
        <header>
          <h4>
            {users.length} people viewing this {viewing}
          </h4>
          <small className="text-small">
            ({guests.length} guests)
            </small>
        </header>
      </div>
    )
  }
}

export default Viewing;