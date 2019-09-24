import React, { useContext } from 'react';
import UserInterface from '../types/UserInterface';
import AppContext from '../AppContext';

interface IProps {
  of: UserInterface;
  equality?: string;
}

export default function Pronoun({ of: user, equality }: IProps) {
  const [{ currentUser }] = useContext(AppContext);
  let result;

  if (!currentUser || currentUser.id !== user.id) {
    if (user.username.endsWith('s')) {
      result = `${user.username}'`;
    } else {
      result = `${user.username}'s`;
    }
  } else {
    result = equality || 'your';
  }

  return <>{result}</>;
}