import { createContext, Dispatch } from 'react';
import { AppState, AppAction } from './App';

type AppContextProps = [AppState, Dispatch<AppAction>];
export default createContext<Partial<AppContextProps>>([]);