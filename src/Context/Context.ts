import { createContext } from 'react';
import { GlobalAppContextPropsInterface } from '../Types';

export const GlobalAppContext =
  createContext<GlobalAppContextPropsInterface>('');
