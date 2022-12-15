import {createContext, useContext} from 'react';
import {ConfigurationContextType} from './ConfigurationContext.type';
import getConfigurationContextValue from './getConfigurationContextValue';

export const ConfigContext = createContext<ConfigurationContextType>(
  getConfigurationContextValue(),
);

export const useConfig = () => useContext(ConfigContext);
